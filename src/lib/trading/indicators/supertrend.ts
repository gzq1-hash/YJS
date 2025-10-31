import { calculateATR } from './pure-indicators';
import type { Candle, SuperTrendResult } from '../types';

export interface SuperTrendConfig {
  period: number; // Default: 10
  multiplier: number; // Default: 3.0
}

/**
 * Calculate SuperTrend indicator
 *
 * SuperTrend is a trend-following indicator that uses ATR to determine
 * support and resistance levels.
 *
 * Formula:
 * - Basic Upper Band = HL/2 + (multiplier * ATR)
 * - Basic Lower Band = HL/2 - (multiplier * ATR)
 * - Final Upper Band = Basic Upper Band < Final Upper Band[-1] or Close[-1] > Final Upper Band[-1]
 *                      ? Basic Upper Band : Final Upper Band[-1]
 * - Final Lower Band = Basic Lower Band > Final Lower Band[-1] or Close[-1] < Final Lower Band[-1]
 *                      ? Basic Lower Band : Final Lower Band[-1]
 * - SuperTrend = Trend == up ? Final Lower Band : Final Upper Band
 *
 * @param candles - Array of candlestick data
 * @param config - SuperTrend configuration
 * @returns Array of SuperTrend values
 */
export function calculateSuperTrend(
  candles: Candle[],
  config: SuperTrendConfig
): SuperTrendResult[] {
  const { period, multiplier } = config;

  if (candles.length < period) {
    throw new Error(`Insufficient data: need at least ${period} candles`);
  }

  // Extract price data
  const highPrices = candles.map(c => c.high);
  const lowPrices = candles.map(c => c.low);
  const closePrices = candles.map(c => c.close);

  // Calculate ATR
  const atrValues = calculateATR(highPrices, lowPrices, closePrices, period);

  // Calculate HL/2 (middle price)
  const hlAverage = candles.map(c => (c.high + c.low) / 2);

  const results: SuperTrendResult[] = [];
  const startIndex = candles.length - atrValues.length;

  let finalUpperBand = 0;
  let finalLowerBand = 0;
  let trend: 'up' | 'down' = 'up';

  for (let i = 0; i < atrValues.length; i++) {
    const currentIndex = startIndex + i;
    const atr = atrValues[i];
    const hl = hlAverage[currentIndex];
    const close = closePrices[currentIndex];

    // Calculate basic bands
    const basicUpperBand = hl + multiplier * atr;
    const basicLowerBand = hl - multiplier * atr;

    // Calculate final bands
    if (i === 0) {
      finalUpperBand = basicUpperBand;
      finalLowerBand = basicLowerBand;
    } else {
      const prevClose = closePrices[currentIndex - 1];

      // Final upper band
      if (basicUpperBand < finalUpperBand || prevClose > finalUpperBand) {
        finalUpperBand = basicUpperBand;
      }

      // Final lower band
      if (basicLowerBand > finalLowerBand || prevClose < finalLowerBand) {
        finalLowerBand = basicLowerBand;
      }
    }

    // Determine trend
    if (i > 0) {
      const prevTrend = trend;
      if (prevTrend === 'up' && close <= finalLowerBand) {
        trend = 'down';
      } else if (prevTrend === 'down' && close >= finalUpperBand) {
        trend = 'up';
      }
    } else {
      // Initial trend determination
      trend = close > hl ? 'up' : 'down';
    }

    // SuperTrend value
    const value = trend === 'up' ? finalLowerBand : finalUpperBand;

    results.push({
      value: value,
      trend: trend,
    });
  }

  return results;
}

/**
 * Get the latest SuperTrend value
 */
export function getLatestSuperTrend(
  candles: Candle[],
  config: SuperTrendConfig
): SuperTrendResult | null {
  const results = calculateSuperTrend(candles, config);
  return results.length > 0 ? results[results.length - 1] : null;
}

/**
 * Check if SuperTrend just changed to uptrend (buy signal)
 */
export function isSuperTrendBuySignal(
  candles: Candle[],
  config: SuperTrendConfig
): boolean {
  const results = calculateSuperTrend(candles, config);
  if (results.length < 2) return false;

  const current = results[results.length - 1];
  const previous = results[results.length - 2];

  return previous.trend === 'down' && current.trend === 'up';
}

/**
 * Check if SuperTrend just changed to downtrend (sell signal)
 */
export function isSuperTrendSellSignal(
  candles: Candle[],
  config: SuperTrendConfig
): boolean {
  const results = calculateSuperTrend(candles, config);
  if (results.length < 2) return false;

  const current = results[results.length - 1];
  const previous = results[results.length - 2];

  return previous.trend === 'up' && current.trend === 'down';
}
