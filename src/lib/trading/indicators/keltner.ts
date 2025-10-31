import { calculateATR, calculateEMA } from './pure-indicators';
import type { Candle, KeltnerChannelResult } from '../types';

export interface KeltnerChannelConfig {
  maPeriod: number; // Default: 15
  atrPeriod: number; // Default: 10
  atrMultiple: number; // Default: 0.5
}

/**
 * Calculate Keltner Channel
 *
 * Keltner Channel consists of:
 * - Middle line: EMA of close prices
 * - Upper band: Middle + (ATR * multiplier)
 * - Lower band: Middle - (ATR * multiplier)
 *
 * @param candles - Array of candlestick data
 * @param config - Keltner Channel configuration
 * @returns Array of Keltner Channel values
 */
export function calculateKeltnerChannel(
  candles: Candle[],
  config: KeltnerChannelConfig
): KeltnerChannelResult[] {
  const { maPeriod, atrPeriod, atrMultiple } = config;

  if (candles.length < Math.max(maPeriod, atrPeriod)) {
    throw new Error(
      `Insufficient data: need at least ${Math.max(maPeriod, atrPeriod)} candles`
    );
  }

  // Extract price data
  const closePrices = candles.map(c => c.close);
  const highPrices = candles.map(c => c.high);
  const lowPrices = candles.map(c => c.low);

  // Calculate EMA (middle line)
  const emaValues = calculateEMA(closePrices, maPeriod);

  // Calculate ATR
  const atrValues = calculateATR(highPrices, lowPrices, closePrices, atrPeriod);

  // Align arrays (both EMA and ATR will have fewer values than input)
  const startIndex = Math.max(
    closePrices.length - emaValues.length,
    closePrices.length - atrValues.length
  );

  const results: KeltnerChannelResult[] = [];

  // Calculate Keltner bands
  for (let i = 0; i < emaValues.length; i++) {
    const atrIndex = i + (emaValues.length - atrValues.length);

    if (atrIndex >= 0 && atrIndex < atrValues.length) {
      const middle = emaValues[i];
      const atr = atrValues[atrIndex];
      const channelWidth = atr * atrMultiple;

      results.push({
        upper: middle + channelWidth,
        middle: middle,
        lower: middle - channelWidth,
      });
    }
  }

  return results;
}

/**
 * Get the latest Keltner Channel value
 */
export function getLatestKeltnerChannel(
  candles: Candle[],
  config: KeltnerChannelConfig
): KeltnerChannelResult | null {
  const results = calculateKeltnerChannel(candles, config);
  return results.length > 0 ? results[results.length - 1] : null;
}
