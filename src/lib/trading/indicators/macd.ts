import { calculateMACD as calculateMACDPure } from './pure-indicators';
import type { Candle, MACDResult } from '../types';

export interface MACDConfig {
  fastPeriod: number; // Default: 12
  slowPeriod: number; // Default: 26
  signalPeriod: number; // Default: 9
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 *
 * MACD consists of:
 * - MACD line: EMA(fast) - EMA(slow)
 * - Signal line: EMA of MACD line
 * - Histogram: MACD line - Signal line
 *
 * @param candles - Array of candlestick data
 * @param config - MACD configuration
 * @returns Array of MACD values
 */
export function calculateMACD(
  candles: Candle[],
  config: MACDConfig
): MACDResult[] {
  const { fastPeriod, slowPeriod, signalPeriod } = config;

  const minPeriod = Math.max(fastPeriod, slowPeriod) + signalPeriod;
  if (candles.length < minPeriod) {
    throw new Error(`Insufficient data: need at least ${minPeriod} candles`);
  }

  // Extract close prices
  const closePrices = candles.map(c => c.close);

  // Calculate MACD using pure TypeScript implementation
  const macdValues = calculateMACDPure(closePrices, fastPeriod, slowPeriod, signalPeriod);

  // Convert to our interface format
  const results: MACDResult[] = macdValues.map(m => ({
    macd: m.MACD || 0,
    signal: m.signal || 0,
    histogram: m.histogram || 0,
  }));

  return results;
}

/**
 * Get the latest MACD value
 */
export function getLatestMACD(
  candles: Candle[],
  config: MACDConfig
): MACDResult | null {
  const results = calculateMACD(candles, config);
  return results.length > 0 ? results[results.length - 1] : null;
}

/**
 * Check if MACD has a bullish crossover (MACD crosses above signal)
 */
export function isMACDBullishCrossover(
  candles: Candle[],
  config: MACDConfig
): boolean {
  const results = calculateMACD(candles, config);
  if (results.length < 2) return false;

  const current = results[results.length - 1];
  const previous = results[results.length - 2];

  return previous.macd <= previous.signal && current.macd > current.signal;
}

/**
 * Check if MACD has a bearish crossover (MACD crosses below signal)
 */
export function isMACDBearishCrossover(
  candles: Candle[],
  config: MACDConfig
): boolean {
  const results = calculateMACD(candles, config);
  if (results.length < 2) return false;

  const current = results[results.length - 1];
  const previous = results[results.length - 2];

  return previous.macd >= previous.signal && current.macd < current.signal;
}
