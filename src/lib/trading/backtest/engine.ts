import type { Candle, Trade, BacktestResult, TradingConfig, Signal } from '../types';
import { XAUUSDStrategy } from '../strategies/xauusd-strategy';
import { RiskManager } from './risk-manager';
import { v4 as uuidv4 } from 'uuid';

export interface BacktestConfig {
  startDate: number;
  endDate: number;
  initialCapital: number;
  tradingConfig: TradingConfig;
}

/**
 * Backtest Engine
 *
 * Simulates trading strategy on historical data and generates performance metrics
 */
export class BacktestEngine {
  private config: BacktestConfig;
  private strategy: XAUUSDStrategy;
  private riskManager: RiskManager;
  private trades: Trade[] = [];
  private capital: number;
  private equityCurve: { timestamp: number; equity: number }[] = [];

  constructor(config: BacktestConfig) {
    this.config = config;
    this.capital = config.initialCapital;
    this.strategy = new XAUUSDStrategy(config.tradingConfig);
    this.riskManager = new RiskManager(
      config.tradingConfig.risk,
      config.initialCapital
    );
  }

  /**
   * Run backtest on historical candle data
   */
  public async runBacktest(candles: Candle[]): Promise<BacktestResult> {
    // Reset state
    this.trades = [];
    this.capital = this.config.initialCapital;
    this.equityCurve = [];
    this.riskManager.reset(this.config.initialCapital);

    // Filter candles by date range
    const filteredCandles = candles.filter(
      c =>
        c.closeTime >= this.config.startDate &&
        c.closeTime <= this.config.endDate
    );

    if (filteredCandles.length === 0) {
      throw new Error('No candles in specified date range');
    }

    // Need sufficient warmup period for indicators
    const warmupPeriod = 100; // Should cover all indicator periods
    let openTrades: Trade[] = [];

    // Process each candle
    for (let i = warmupPeriod; i < filteredCandles.length; i++) {
      const currentCandle = filteredCandles[i];
      const historicalCandles = filteredCandles.slice(0, i + 1);

      // Update equity curve
      this.equityCurve.push({
        timestamp: currentCandle.closeTime,
        equity: this.capital,
      });

      // Check if we can open new trades
      const canTrade = this.riskManager.canOpenNewTrade(
        openTrades.length,
        this.capital,
        currentCandle.closeTime
      );

      // Process open trades (check exits)
      for (let j = openTrades.length - 1; j >= 0; j--) {
        const trade = openTrades[j];
        const exitResult = this.checkExit(trade, currentCandle, historicalCandles);

        if (exitResult.shouldExit) {
          // Close trade
          trade.exitTime = currentCandle.closeTime;
          trade.exitPrice = exitResult.exitPrice;
          trade.exitReason = exitResult.reason;
          trade.status = 'closed';

          // Calculate P&L
          const pnl = this.calculatePnL(trade);
          trade.pnl = pnl;
          trade.pnlPercent = (pnl / this.capital) * 100;

          // Update capital
          this.capital += pnl;

          // Update risk manager
          this.riskManager.updateDailyPnL(trade);
          this.riskManager.updatePeakCapital(this.capital);

          // Move to closed trades
          this.trades.push(trade);
          openTrades.splice(j, 1);
        } else {
          // Update trailing stop if applicable
          const indicators = this.strategy.generateSignal(historicalCandles).indicators;
          if (indicators) {
            const trailingResult = this.strategy.calculateTrailingStop(
              trade.entryPrice,
              currentCandle.close,
              trade.highestPrice,
              trade.lowestPrice,
              trade.initialStopLoss,
              trade.side,
              indicators.atr
            );

            // Update trade with new trailing stop data
            if (trailingResult.active) {
              if (
                trade.trailingStop === undefined ||
                (trade.side === 'long' && trailingResult.trailingStop! > trade.trailingStop) ||
                (trade.side === 'short' && trailingResult.trailingStop! < trade.trailingStop)
              ) {
                trade.trailingStop = trailingResult.trailingStop!;
              }
            }
            // Always update highest/lowest prices
            trade.highestPrice = trailingResult.highestPrice;
            trade.lowestPrice = trailingResult.lowestPrice;
          }
        }
      }

      // Generate new signal if no open positions and trading allowed
      if (canTrade.allowed && openTrades.length === 0) {
        const signal = this.strategy.generateSignal(historicalCandles);

        if (signal.type === 'long' || signal.type === 'short') {
          const newTrade = this.openTrade(signal, currentCandle);
          if (newTrade) {
            openTrades.push(newTrade);
          }
        }
      }
    }

    // Close any remaining open trades at the last candle
    const lastCandle = filteredCandles[filteredCandles.length - 1];
    for (const trade of openTrades) {
      trade.exitTime = lastCandle.closeTime;
      trade.exitPrice = lastCandle.close;
      trade.exitReason = 'signal';
      trade.status = 'closed';
      trade.pnl = this.calculatePnL(trade);
      trade.pnlPercent = (trade.pnl / this.capital) * 100;
      this.capital += trade.pnl;
      this.trades.push(trade);
    }

    // Calculate final metrics
    return this.calculateResults();
  }

  /**
   * Open a new trade based on signal
   */
  private openTrade(signal: Signal, candle: Candle): Trade | null {
    if (!signal.indicators) return null;

    const side = signal.type === 'long' ? 'long' : 'short';
    const entryPrice = candle.close;
    const stopLoss = this.strategy.calculateStopLoss(
      entryPrice,
      side,
      signal.indicators  // FIXED: Pass full indicators, not just atr
    );

    const takeProfitLevels = this.strategy.calculateTakeProfitLevels(
      entryPrice,
      stopLoss,
      side
    );

    const trade: Trade = {
      id: uuidv4(),
      symbol: this.config.tradingConfig.symbol,
      side,
      entryTime: candle.closeTime,
      entryPrice,
      positionSize: this.riskManager.getPositionSize(),
      stopLoss,
      initialStopLoss: stopLoss, // FIXED: Track initial stop loss for R calculation
      takeProfit: takeProfitLevels[0], // Use first TP level
      highestPrice: side === 'long' ? entryPrice : undefined, // FIXED: Track for trailing stop
      lowestPrice: side === 'short' ? entryPrice : undefined, // FIXED: Track for trailing stop
      status: 'open',
    };

    return trade;
  }

  /**
   * Check if trade should be exited
   */
  private checkExit(
    trade: Trade,
    candle: Candle,
    historicalCandles: Candle[]
  ): { shouldExit: boolean; exitPrice: number; reason: Trade['exitReason'] } {
    // Check stop loss
    if (trade.side === 'long' && candle.low <= trade.stopLoss) {
      return { shouldExit: true, exitPrice: trade.stopLoss, reason: 'stop_loss' };
    }
    if (trade.side === 'short' && candle.high >= trade.stopLoss) {
      return { shouldExit: true, exitPrice: trade.stopLoss, reason: 'stop_loss' };
    }

    // Check trailing stop
    if (trade.trailingStop !== undefined) {
      if (trade.side === 'long' && candle.low <= trade.trailingStop) {
        return { shouldExit: true, exitPrice: trade.trailingStop, reason: 'trailing_stop' };
      }
      if (trade.side === 'short' && candle.high >= trade.trailingStop) {
        return { shouldExit: true, exitPrice: trade.trailingStop, reason: 'trailing_stop' };
      }
    }

    // Check take profit
    if (trade.takeProfit !== undefined) {
      if (trade.side === 'long' && candle.high >= trade.takeProfit) {
        return { shouldExit: true, exitPrice: trade.takeProfit, reason: 'take_profit' };
      }
      if (trade.side === 'short' && candle.low <= trade.takeProfit) {
        return { shouldExit: true, exitPrice: trade.takeProfit, reason: 'take_profit' };
      }
    }

    // Check opposite signal
    const signal = this.strategy.generateSignal(historicalCandles);
    if (
      (trade.side === 'long' && signal.type === 'short') ||
      (trade.side === 'short' && signal.type === 'long')
    ) {
      return { shouldExit: true, exitPrice: candle.close, reason: 'signal' };
    }

    return { shouldExit: false, exitPrice: 0, reason: undefined };
  }

  /**
   * Calculate P&L for a trade
   */
  private calculatePnL(trade: Trade): number {
    if (!trade.exitPrice) return 0;

    const priceDiff =
      trade.side === 'long'
        ? trade.exitPrice - trade.entryPrice
        : trade.entryPrice - trade.exitPrice;

    // For XAUUSD, 1 lot = 100 oz, price is per oz
    const contractSize = 100;
    return priceDiff * trade.positionSize * contractSize;
  }

  /**
   * Calculate backtest results and metrics
   */
  private calculateResults(): BacktestResult {
    const winningTrades = this.trades.filter(t => (t.pnl || 0) > 0);
    const losingTrades = this.trades.filter(t => (t.pnl || 0) < 0);

    const totalWins = winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const totalLosses = Math.abs(
      losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0)
    );

    const winRate =
      this.trades.length > 0 ? (winningTrades.length / this.trades.length) * 100 : 0;

    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? Infinity : 0;

    const totalPnl = this.capital - this.config.initialCapital;
    const totalPnlPercent = (totalPnl / this.config.initialCapital) * 100;

    // Calculate max drawdown
    let maxDrawdown = 0;
    let maxDrawdownPercent = 0;
    let peak = this.config.initialCapital;

    for (const point of this.equityCurve) {
      if (point.equity > peak) {
        peak = point.equity;
      }
      const drawdown = peak - point.equity;
      const drawdownPercent = (drawdown / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
        maxDrawdownPercent = drawdownPercent;
      }
    }

    // Calculate average win/loss
    const averageWin =
      winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / winningTrades.length
        : 0;
    const averageLoss =
      losingTrades.length > 0
        ? losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / losingTrades.length
        : 0;

    // Calculate largest win/loss
    const largestWin =
      winningTrades.length > 0 ? Math.max(...winningTrades.map(t => t.pnl || 0)) : 0;
    const largestLoss =
      losingTrades.length > 0 ? Math.min(...losingTrades.map(t => t.pnl || 0)) : 0;

    // Calculate trades per day
    const tradingDays =
      (this.config.endDate - this.config.startDate) / (1000 * 60 * 60 * 24);
    const tradesPerDay = tradingDays > 0 ? this.trades.length / tradingDays : 0;

    return {
      trades: this.trades,
      totalTrades: this.trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate,
      profitFactor,
      totalPnl,
      totalPnlPercent,
      maxDrawdown,
      maxDrawdownPercent,
      averageWin,
      averageLoss,
      largestWin,
      largestLoss,
      tradesPerDay,
      startCapital: this.config.initialCapital,
      endCapital: this.capital,
      startDate: this.config.startDate,
      endDate: this.config.endDate,
      equityCurve: this.equityCurve,
    };
  }
}
