import type {
  Candle,
  Signal,
  IndicatorValues,
  StrategyConfig,
  TradingConfig,
} from '../types';
import {
  calculateKeltnerChannel,
  getLatestKeltnerChannel,
  KeltnerChannelConfig,
} from '../indicators/keltner';
import {
  calculateBollingerBands,
  getLatestBollingerBands,
  BollingerBandsConfig,
} from '../indicators/bollinger';
import {
  calculateMACD,
  getLatestMACD,
  isMACDBullishCrossover,
  isMACDBearishCrossover,
  MACDConfig,
} from '../indicators/macd';
import {
  calculateCCI,
  getLatestCCI,
  CCIConfig,
} from '../indicators/cci';
import {
  calculateSuperTrend,
  getLatestSuperTrend,
  SuperTrendConfig,
} from '../indicators/supertrend';
import { calculateATR } from '../indicators/pure-indicators';

/**
 * XAUUSD Hybrid Optimized Strategy
 *
 * Matches Python implementation in fastq/src/strategy/hybrid_optimized_strategy.py
 *
 * Core Entry Logic (KC + BB + MACD):
 * - Price breaks above/below BOTH Keltner AND Bollinger
 * - MACD crossover confirms (CRITICAL: must be a crossover, not just position)
 *
 * Aggressiveness Levels:
 * - Level 1 (Conservative): CCI > 50/-50, All conditions must meet
 * - Level 2 (Moderate): CCI > 20/-20, 3/5 conditions
 * - Level 3 (Aggressive): CCI > 0, MACD position only
 *
 * Exit Logic:
 * - Stop Loss: Initially at KC/BB bands (whichever is closer)
 * - Trailing Stop: Activates at 0.8R profit, trails by 1.0x ATR
 * - Take Profit: 1.5R, 2.5R, 4.0R
 */

export class XAUUSDStrategy {
  private config: TradingConfig;

  constructor(config: TradingConfig) {
    this.config = config;
  }

  /**
   * Calculate all indicator values for current candles
   */
  private calculateIndicators(candles: Candle[]): IndicatorValues | null {
    try {
      const keltnerConfig: KeltnerChannelConfig = {
        maPeriod: this.config.strategy.indicators.keltner.maPeriod,
        atrPeriod: this.config.strategy.indicators.keltner.atrPeriod,
        atrMultiple: this.config.strategy.indicators.keltner.atrMultiple,
      };

      const bollingerConfig: BollingerBandsConfig = {
        period: this.config.strategy.indicators.bollinger.period,
        deviation: this.config.strategy.indicators.bollinger.deviation,
      };

      const macdConfig: MACDConfig = {
        fastPeriod: this.config.strategy.indicators.macd.fastPeriod,
        slowPeriod: this.config.strategy.indicators.macd.slowPeriod,
        signalPeriod: this.config.strategy.indicators.macd.signalPeriod,
      };

      const cciConfig: CCIConfig = {
        period: this.config.strategy.indicators.cci.period,
      };

      const supertrendConfig: SuperTrendConfig = {
        period: this.config.strategy.indicators.supertrend.period,
        multiplier: this.config.strategy.indicators.supertrend.multiplier,
      };

      const keltner = getLatestKeltnerChannel(candles, keltnerConfig);
      const bollinger = getLatestBollingerBands(candles, bollingerConfig);
      const macd = getLatestMACD(candles, macdConfig);
      const cci = getLatestCCI(candles, cciConfig);
      const supertrend = getLatestSuperTrend(candles, supertrendConfig);

      // Calculate ATR
      const atrValues = calculateATR(
        candles.map(c => c.high),
        candles.map(c => c.low),
        candles.map(c => c.close),
        this.config.strategy.indicators.keltner.atrPeriod
      );

      if (
        !keltner ||
        !bollinger ||
        !macd ||
        cci === null ||
        !supertrend ||
        atrValues.length === 0
      ) {
        return null;
      }

      return {
        keltner,
        bollinger,
        macd,
        cci,
        supertrend,
        atr: atrValues[atrValues.length - 1],
      };
    } catch (error) {
      console.error('Error calculating indicators:', error);
      return null;
    }
  }

  /**
   * Check if long entry conditions are met - MATCHES PYTHON VERSION
   */
  private checkLongEntry(
    price: number,
    indicators: IndicatorValues,
    candles: Candle[],
    aggressiveness: 1 | 2 | 3
  ): { signal: boolean; reason: string } {
    const macdConfig: MACDConfig = {
      fastPeriod: this.config.strategy.indicators.macd.fastPeriod,
      slowPeriod: this.config.strategy.indicators.macd.slowPeriod,
      signalPeriod: this.config.strategy.indicators.macd.signalPeriod,
    };

    // Base conditions (from Python line 212-216)
    const priceAboveKeltner = price > indicators.keltner.upper;
    const priceAboveBollinger = price > indicators.bollinger.upper;
    const macdCrossoverUp = isMACDBullishCrossover(candles, macdConfig);

    const longBase = priceAboveKeltner && priceAboveBollinger && macdCrossoverUp;

    if (!longBase) {
      return { signal: false, reason: 'Base conditions not met' };
    }

    // Aggressiveness filters
    let longFilter = false;
    let reason = '';

    if (aggressiveness === 1) {
      // Conservative: Python line 219-224
      const cciThreshold = 50;
      longFilter =
        indicators.cci > cciThreshold &&
        indicators.macd.macd > indicators.macd.signal &&
        indicators.cci > 0;
      reason = longFilter
        ? `LONG: KC/BB breakout + MACD crossover + CCI>${cciThreshold}`
        : `CCI or MACD conditions failed`;
    } else if (aggressiveness === 2) {
      // Moderate: Python line 225-229
      const cciThreshold = 20;
      longFilter =
        indicators.cci > cciThreshold &&
        indicators.macd.macd > indicators.macd.signal;
      reason = longFilter
        ? `LONG: KC/BB breakout + MACD crossover + CCI>${cciThreshold}`
        : `CCI>${cciThreshold} or MACD position failed`;
    } else {
      // Aggressive: Python line 230-231
      longFilter = indicators.macd.macd > indicators.macd.signal;
      reason = longFilter
        ? `LONG (aggressive): KC/BB breakout + MACD crossover + MACD bullish`
        : `MACD not bullish`;
    }

    return { signal: longFilter, reason };
  }

  /**
   * Check if short entry conditions are met - MATCHES PYTHON VERSION
   */
  private checkShortEntry(
    price: number,
    indicators: IndicatorValues,
    candles: Candle[],
    aggressiveness: 1 | 2 | 3
  ): { signal: boolean; reason: string } {
    const macdConfig: MACDConfig = {
      fastPeriod: this.config.strategy.indicators.macd.fastPeriod,
      slowPeriod: this.config.strategy.indicators.macd.slowPeriod,
      signalPeriod: this.config.strategy.indicators.macd.signalPeriod,
    };

    // Base conditions (from Python line 236-240)
    const priceBelowKeltner = price < indicators.keltner.lower;
    const priceBelowBollinger = price < indicators.bollinger.lower;
    const macdCrossoverDown = isMACDBearishCrossover(candles, macdConfig);

    const shortBase = priceBelowKeltner && priceBelowBollinger && macdCrossoverDown;

    if (!shortBase) {
      return { signal: false, reason: 'Base conditions not met' };
    }

    // Aggressiveness filters
    let shortFilter = false;
    let reason = '';

    if (aggressiveness === 1) {
      // Conservative: Python line 242-247
      const cciThreshold = 50;
      shortFilter =
        indicators.cci < -cciThreshold &&
        indicators.macd.macd < indicators.macd.signal &&
        indicators.cci < 0;
      reason = shortFilter
        ? `SHORT: KC/BB breakdown + MACD crossover + CCI<-${cciThreshold}`
        : `CCI or MACD conditions failed`;
    } else if (aggressiveness === 2) {
      // Moderate: Python line 248-252
      const cciThreshold = 20;
      shortFilter =
        indicators.cci < -cciThreshold &&
        indicators.macd.macd < indicators.macd.signal;
      reason = shortFilter
        ? `SHORT: KC/BB breakdown + MACD crossover + CCI<-${cciThreshold}`
        : `CCI<-${cciThreshold} or MACD position failed`;
    } else {
      // Aggressive: Python line 253-254
      shortFilter = indicators.macd.macd < indicators.macd.signal;
      reason = shortFilter
        ? `SHORT (aggressive): KC/BB breakdown + MACD crossover + MACD bearish`
        : `MACD not bearish`;
    }

    return { signal: shortFilter, reason };
  }

  /**
   * Generate trading signal based on current market conditions
   */
  public generateSignal(candles: Candle[]): Signal {
    if (candles.length === 0) {
      return {
        type: 'none',
        reason: 'No candle data',
        timestamp: Date.now(),
        price: 0,
      };
    }

    const latestCandle = candles[candles.length - 1];
    const price = latestCandle.close;

    // Calculate all indicators
    const indicators = this.calculateIndicators(candles);
    if (!indicators) {
      return {
        type: 'none',
        reason: 'Insufficient data for indicators',
        timestamp: latestCandle.closeTime,
        price,
      };
    }

    // Check long entry
    const longCheck = this.checkLongEntry(
      price,
      indicators,
      candles,
      this.config.strategy.aggressiveness
    );
    if (longCheck.signal) {
      return {
        type: 'long',
        reason: longCheck.reason,
        timestamp: latestCandle.closeTime,
        price,
        indicators,
      };
    }

    // Check short entry
    const shortCheck = this.checkShortEntry(
      price,
      indicators,
      candles,
      this.config.strategy.aggressiveness
    );
    if (shortCheck.signal) {
      return {
        type: 'short',
        reason: shortCheck.reason,
        timestamp: latestCandle.closeTime,
        price,
        indicators,
      };
    }

    return {
      type: 'none',
      reason: 'No entry conditions met',
      timestamp: latestCandle.closeTime,
      price,
      indicators,
    };
  }

  /**
   * Calculate stop loss price - MATCHES PYTHON VERSION
   * Python line 260, 285: Uses min/max of KC and BB bands
   */
  public calculateStopLoss(
    entryPrice: number,
    side: 'long' | 'short',
    indicators: IndicatorValues
  ): number {
    if (side === 'long') {
      // Python line 260: stop_loss = min(kc_lower_1m, bb_lower_1m)
      return Math.min(indicators.keltner.lower, indicators.bollinger.lower);
    } else {
      // Python line 285: stop_loss = max(kc_upper_1m, bb_upper_1m)
      return Math.max(indicators.keltner.upper, indicators.bollinger.upper);
    }
  }

  /**
   * Calculate take profit levels based on R multiples
   * Python line 264-268, 288-292: 1.5R, 2.5R, 4.0R
   */
  public calculateTakeProfitLevels(
    entryPrice: number,
    stopLoss: number,
    side: 'long' | 'short'
  ): number[] {
    const risk = Math.abs(entryPrice - stopLoss);
    const rMultiples = [1.5, 2.5, 4.0]; // Python line 264

    return rMultiples.map(rMultiple => {
      return side === 'long'
        ? entryPrice + (risk * rMultiple)
        : entryPrice - (risk * rMultiple);
    });
  }

  /**
   * Calculate trailing stop price - MATCHES PYTHON VERSION
   * Python line 477-511: Activates at 0.8R, trails by 1.0x ATR
   */
  public calculateTrailingStop(
    entryPrice: number,
    currentPrice: number,
    highestPrice: number | undefined,
    lowestPrice: number | undefined,
    initialStopLoss: number,
    side: 'long' | 'short',
    atr: number
  ): { trailingStop: number | null; highestPrice: number; lowestPrice: number; active: boolean } {
    const risk = Math.abs(entryPrice - initialStopLoss);
    const trailingActivationR = this.config.strategy.trailingActivation; // 0.8
    const trailingDistanceATR = this.config.strategy.trailingDistance; // 1.0

    if (side === 'long') {
      // Update highest price (Python line 482-483)
      const newHighest = highestPrice === undefined ? currentPrice : Math.max(highestPrice, currentPrice);

      // Check if should activate (Python line 485-488)
      const profit = currentPrice - entryPrice;
      const profitR = profit / risk;

      if (profitR < trailingActivationR) {
        return { trailingStop: null, highestPrice: newHighest, lowestPrice: 0, active: false };
      }

      // Calculate trailing stop (Python line 493-495)
      const newTrailing = newHighest - (atr * trailingDistanceATR);

      return { trailingStop: newTrailing, highestPrice: newHighest, lowestPrice: 0, active: true };
    } else {
      // Update lowest price (Python line 498-499)
      const newLowest = lowestPrice === undefined ? currentPrice : Math.min(lowestPrice, currentPrice);

      // Check if should activate (Python line 501-504)
      const profit = entryPrice - currentPrice;
      const profitR = profit / risk;

      if (profitR < trailingActivationR) {
        return { trailingStop: null, highestPrice: 0, lowestPrice: newLowest, active: false };
      }

      // Calculate trailing stop (Python line 509-511)
      const newTrailing = newLowest + (atr * trailingDistanceATR);

      return { trailingStop: newTrailing, highestPrice: 0, lowestPrice: newLowest, active: true };
    }
  }
}
