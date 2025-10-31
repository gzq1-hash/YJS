/**
 * Pure TypeScript implementation of technical indicators
 * No external dependencies
 */

/**
 * Calculate Simple Moving Average (SMA)
 */
export function calculateSMA(values: number[], period: number): number[] {
  if (values.length < period) {
    return [];
  }

  const results: number[] = [];
  for (let i = period - 1; i < values.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += values[i - j];
    }
    results.push(sum / period);
  }
  return results;
}

/**
 * Calculate Exponential Moving Average (EMA)
 */
export function calculateEMA(values: number[], period: number): number[] {
  if (values.length < period) {
    return [];
  }

  const results: number[] = [];
  const multiplier = 2 / (period + 1);

  // First EMA is SMA
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += values[i];
  }
  let ema = sum / period;
  results.push(ema);

  // Calculate remaining EMAs
  for (let i = period; i < values.length; i++) {
    ema = (values[i] - ema) * multiplier + ema;
    results.push(ema);
  }

  return results;
}

/**
 * Calculate Average True Range (ATR)
 */
export function calculateATR(
  high: number[],
  low: number[],
  close: number[],
  period: number
): number[] {
  if (high.length < period || low.length < period || close.length < period) {
    return [];
  }

  // Calculate True Range for each period
  const trueRanges: number[] = [];
  for (let i = 1; i < high.length; i++) {
    const tr1 = high[i] - low[i];
    const tr2 = Math.abs(high[i] - close[i - 1]);
    const tr3 = Math.abs(low[i] - close[i - 1]);
    trueRanges.push(Math.max(tr1, tr2, tr3));
  }

  // Calculate ATR using EMA-like smoothing
  const results: number[] = [];
  let atr = 0;

  // First ATR is SMA of true ranges
  for (let i = 0; i < period; i++) {
    atr += trueRanges[i];
  }
  atr = atr / period;
  results.push(atr);

  // Subsequent ATRs use smoothing
  for (let i = period; i < trueRanges.length; i++) {
    atr = ((atr * (period - 1)) + trueRanges[i]) / period;
    results.push(atr);
  }

  return results;
}

/**
 * Calculate Standard Deviation
 */
export function calculateStdDev(values: number[], period: number): number[] {
  if (values.length < period) {
    return [];
  }

  const results: number[] = [];
  for (let i = period - 1; i < values.length; i++) {
    // Calculate mean
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += values[i - j];
    }
    const mean = sum / period;

    // Calculate variance
    let variance = 0;
    for (let j = 0; j < period; j++) {
      const diff = values[i - j] - mean;
      variance += diff * diff;
    }
    variance = variance / period;

    results.push(Math.sqrt(variance));
  }
  return results;
}

/**
 * Calculate Bollinger Bands
 */
export interface BollingerBandsResult {
  upper: number;
  middle: number;
  lower: number;
}

export function calculateBollingerBands(
  values: number[],
  period: number,
  stdDev: number
): BollingerBandsResult[] {
  if (values.length < period) {
    return [];
  }

  const sma = calculateSMA(values, period);
  const stdDevValues = calculateStdDev(values, period);

  const results: BollingerBandsResult[] = [];
  for (let i = 0; i < sma.length; i++) {
    results.push({
      upper: sma[i] + stdDevValues[i] * stdDev,
      middle: sma[i],
      lower: sma[i] - stdDevValues[i] * stdDev,
    });
  }

  return results;
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 */
export interface MACDResult {
  MACD: number;
  signal: number;
  histogram: number;
}

export function calculateMACD(
  values: number[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number
): MACDResult[] {
  if (values.length < slowPeriod + signalPeriod) {
    return [];
  }

  // Calculate fast and slow EMAs
  const fastEMA = calculateEMA(values, fastPeriod);
  const slowEMA = calculateEMA(values, slowPeriod);

  // Align arrays (slowEMA is shorter)
  const startOffset = fastEMA.length - slowEMA.length;
  const macdLine: number[] = [];

  for (let i = 0; i < slowEMA.length; i++) {
    macdLine.push(fastEMA[i + startOffset] - slowEMA[i]);
  }

  // Calculate signal line (EMA of MACD line)
  const signalLine = calculateEMA(macdLine, signalPeriod);

  // Calculate histogram
  const results: MACDResult[] = [];
  const histogramStartOffset = macdLine.length - signalLine.length;

  for (let i = 0; i < signalLine.length; i++) {
    const macd = macdLine[i + histogramStartOffset];
    const signal = signalLine[i];
    results.push({
      MACD: macd,
      signal: signal,
      histogram: macd - signal,
    });
  }

  return results;
}

/**
 * Calculate CCI (Commodity Channel Index)
 */
export function calculateCCI(
  high: number[],
  low: number[],
  close: number[],
  period: number
): number[] {
  if (high.length < period || low.length < period || close.length < period) {
    return [];
  }

  // Calculate typical price
  const typicalPrices: number[] = [];
  for (let i = 0; i < high.length; i++) {
    typicalPrices.push((high[i] + low[i] + close[i]) / 3);
  }

  // Calculate SMA of typical prices
  const sma = calculateSMA(typicalPrices, period);

  // Calculate mean deviation
  const results: number[] = [];
  for (let i = period - 1; i < typicalPrices.length; i++) {
    const smaValue = sma[i - period + 1];

    // Calculate mean absolute deviation
    let meanDeviation = 0;
    for (let j = 0; j < period; j++) {
      meanDeviation += Math.abs(typicalPrices[i - j] - smaValue);
    }
    meanDeviation = meanDeviation / period;

    // CCI = (Typical Price - SMA) / (0.015 * Mean Deviation)
    const cci = (typicalPrices[i] - smaValue) / (0.015 * meanDeviation);
    results.push(cci);
  }

  return results;
}
