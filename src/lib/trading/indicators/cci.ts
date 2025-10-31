import { calculateCCI as calculateCCIPure } from './pure-indicators';
import type { Candle } from '../types';

export interface CCIConfig {
  period: number; // Default: 20
}

/**
 * Calculate CCI (Commodity Channel Index)
 *
 * CCI measures the deviation of price from its statistical mean.
 * Formula: (Typical Price - SMA(Typical Price)) / (0.015 * Mean Deviation)
 * Where Typical Price = (High + Low + Close) / 3
 *
 * Interpretation:
 * - CCI > 100: Overbought condition
 * - CCI < -100: Oversold condition
 * - CCI > 0: Bullish momentum
 * - CCI < 0: Bearish momentum
 *
 * @param candles - Array of candlestick data
 * @param config - CCI configuration
 * @returns Array of CCI values
 */
export function calculateCCI(candles: Candle[], config: CCIConfig): number[] {
  const { period } = config;

  if (candles.length < period) {
    throw new Error(`Insufficient data: need at least ${period} candles`);
  }

  // Extract price data
  const highPrices = candles.map(c => c.high);
  const lowPrices = candles.map(c => c.low);
  const closePrices = candles.map(c => c.close);

  // Calculate CCI using pure TypeScript implementation
  const cciValues = calculateCCIPure(highPrices, lowPrices, closePrices, period);

  return cciValues;
}

/**
 * Get the latest CCI value
 */
export function getLatestCCI(
  candles: Candle[],
  config: CCIConfig
): number | null {
  const results = calculateCCI(candles, config);
  return results.length > 0 ? results[results.length - 1] : null;
}

/**
 * Check if CCI indicates bullish momentum (CCI > threshold)
 */
export function isCCIBullish(
  candles: Candle[],
  config: CCIConfig,
  threshold: number = 50
): boolean {
  const latest = getLatestCCI(candles, config);
  return latest !== null && latest > threshold;
}

/**
 * Check if CCI indicates bearish momentum (CCI < threshold)
 */
export function isCCIBearish(
  candles: Candle[],
  config: CCIConfig,
  threshold: number = -50
): boolean {
  const latest = getLatestCCI(candles, config);
  return latest !== null && latest < threshold;
}

/**
 * Check if CCI is in overbought territory (> 100)
 */
export function isCCIOverbought(candles: Candle[], config: CCIConfig): boolean {
  const latest = getLatestCCI(candles, config);
  return latest !== null && latest > 100;
}

/**
 * Check if CCI is in oversold territory (< -100)
 */
export function isCCIOversold(candles: Candle[], config: CCIConfig): boolean {
  const latest = getLatestCCI(candles, config);
  return latest !== null && latest < -100;
}
