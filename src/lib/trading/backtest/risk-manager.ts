import type { Trade, RiskConfig } from '../types';

/**
 * Risk Manager for trading system
 *
 * Enforces risk management rules:
 * - Daily maximum loss limit
 * - Maximum drawdown limit
 * - Maximum number of concurrent positions
 * - Position sizing
 */
export class RiskManager {
  private config: RiskConfig;
  private dailyPnL: number = 0;
  private dailyStartDate: number = 0;
  private peakCapital: number = 0;

  constructor(config: RiskConfig, initialCapital: number) {
    this.config = config;
    this.peakCapital = initialCapital;
    this.dailyStartDate = this.getStartOfDay(Date.now());
  }

  /**
   * Get start of day timestamp
   */
  private getStartOfDay(timestamp: number): number {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  /**
   * Reset daily P&L if new day
   */
  private checkDailyReset(timestamp: number): void {
    const currentDayStart = this.getStartOfDay(timestamp);
    if (currentDayStart > this.dailyStartDate) {
      this.dailyPnL = 0;
      this.dailyStartDate = currentDayStart;
    }
  }

  /**
   * Update daily P&L with new trade result
   */
  public updateDailyPnL(trade: Trade): void {
    this.checkDailyReset(trade.exitTime || Date.now());
    if (trade.pnl !== undefined) {
      this.dailyPnL += trade.pnl;
    }
  }

  /**
   * Update peak capital for drawdown calculation
   */
  public updatePeakCapital(currentCapital: number): void {
    if (currentCapital > this.peakCapital) {
      this.peakCapital = currentCapital;
    }
  }

  /**
   * Check if daily loss limit has been reached
   */
  public isDailyLossLimitReached(): boolean {
    return Math.abs(this.dailyPnL) >= this.config.maxDailyLoss;
  }

  /**
   * Check if maximum drawdown has been reached
   */
  public isMaxDrawdownReached(currentCapital: number): boolean {
    const drawdown = (this.peakCapital - currentCapital) / this.peakCapital;
    return drawdown >= this.config.maxDrawdown;
  }

  /**
   * Check if maximum position limit has been reached
   */
  public isMaxPositionsReached(currentPositions: number): boolean {
    return currentPositions >= this.config.maxPositions;
  }

  /**
   * Get position size in lots
   */
  public getPositionSize(): number {
    return this.config.positionSize;
  }

  /**
   * Check if new trade is allowed based on risk rules
   */
  public canOpenNewTrade(
    currentPositions: number,
    currentCapital: number,
    timestamp: number
  ): { allowed: boolean; reason: string } {
    this.checkDailyReset(timestamp);

    if (this.isDailyLossLimitReached()) {
      return {
        allowed: false,
        reason: `Daily loss limit reached: $${Math.abs(this.dailyPnL).toFixed(2)} / $${this.config.maxDailyLoss}`,
      };
    }

    if (this.isMaxDrawdownReached(currentCapital)) {
      const drawdown = ((this.peakCapital - currentCapital) / this.peakCapital) * 100;
      return {
        allowed: false,
        reason: `Max drawdown reached: ${drawdown.toFixed(2)}% / ${(this.config.maxDrawdown * 100).toFixed(2)}%`,
      };
    }

    if (this.isMaxPositionsReached(currentPositions)) {
      return {
        allowed: false,
        reason: `Max positions reached: ${currentPositions} / ${this.config.maxPositions}`,
      };
    }

    return { allowed: true, reason: 'Trade allowed' };
  }

  /**
   * Get current daily P&L
   */
  public getDailyPnL(): number {
    return this.dailyPnL;
  }

  /**
   * Get current drawdown percentage
   */
  public getCurrentDrawdown(currentCapital: number): number {
    return ((this.peakCapital - currentCapital) / this.peakCapital) * 100;
  }

  /**
   * Reset risk manager state
   */
  public reset(initialCapital: number): void {
    this.dailyPnL = 0;
    this.peakCapital = initialCapital;
    this.dailyStartDate = this.getStartOfDay(Date.now());
  }
}
