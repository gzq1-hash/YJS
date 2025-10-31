import type { Candle } from '../types';

/**
 * Historical Data Provider
 *
 * Generates realistic historical candle data for backtesting without requiring
 * a live API connection. Uses a random walk with realistic volatility patterns.
 */
export class HistoricalDataProvider {
  /**
   * Generate historical candles using a deterministic algorithm
   * Uses date-based seed for consistency
   */
  public async generateHistoricalCandles(
    symbol: string,
    interval: string,
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<Candle[]> {
    const intervalMs = this.getIntervalMs(interval);
    const now = endTime || Date.now();
    const start = startTime || (now - (limit * intervalMs));

    const candles: Candle[] = [];

    // Set base price based on symbol
    let basePrice = this.getBasePrice(symbol);

    // Volatility parameters
    const volatility = 0.01; // 1% typical move
    const trendStrength = 0.0002; // Slight upward bias

    let currentTime = start;
    let currentPrice = basePrice;

    // Use deterministic pseudo-random based on timestamp
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < limit && currentTime < now; i++) {
      const openTime = currentTime;
      const closeTime = currentTime + intervalMs - 1;

      // Generate OHLC using deterministic values
      const open = currentPrice;

      // Simulate intrabar volatility with deterministic random
      const rand1 = seededRandom(openTime + i);
      const rand2 = seededRandom(openTime + i + 1000);
      const rand3 = seededRandom(openTime + i + 2000);
      const rand4 = seededRandom(openTime + i + 3000);
      const rand5 = seededRandom(openTime + i + 4000);
      const rand6 = seededRandom(openTime + i + 5000);

      const bodySize = basePrice * volatility * (rand1 * 0.5 + 0.5);
      const wickSize = bodySize * (rand2 * 0.8 + 0.2);

      const direction = rand3 > 0.5 ? 1 : -1;
      const close = open + (bodySize * direction) + (basePrice * trendStrength);

      const high = Math.max(open, close) + wickSize * rand4;
      const low = Math.min(open, close) - wickSize * rand5;

      // Generate volume (higher volume on larger moves)
      const priceChange = Math.abs(close - open);
      const baseVolume = this.getBaseVolume(symbol);
      const volume = baseVolume * (1 + (priceChange / basePrice) * 100) * (rand6 * 0.5 + 0.75);

      candles.push({
        openTime,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: Number(volume.toFixed(2)),
        closeTime,
      });

      // Update for next candle
      currentPrice = close;
      currentTime += intervalMs;

      // Add occasional larger moves (simulating news events) - deterministic
      if (seededRandom(openTime + i + 6000) < 0.05) {
        const jumpDirection = seededRandom(openTime + i + 7000) > 0.5 ? 1 : -1;
        currentPrice += basePrice * volatility * 2 * jumpDirection;
      }

      // Mean reversion - prevent price from drifting too far
      const drift = currentPrice - basePrice;
      if (Math.abs(drift) > basePrice * 0.1) {
        currentPrice -= drift * 0.1;
      }
    }

    return candles;
  }

  /**
   * Convert interval string to milliseconds
   */
  private getIntervalMs(interval: string): number {
    const intervalMap: Record<string, number> = {
      '1m': 60 * 1000,
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '4h': 4 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000,
    };
    return intervalMap[interval] || 60 * 1000;
  }

  /**
   * Get realistic base price for different symbols
   */
  private getBasePrice(symbol: string): number {
    const symbolUpper = symbol.toUpperCase().replace('/', '');

    // Common trading pairs with realistic prices
    const priceMap: Record<string, number> = {
      'BTCUSDT': 45000,
      'ETHUSDT': 2500,
      'BNBUSDT': 350,
      'XRPUSDT': 0.55,
      'ADAUSDT': 0.45,
      'SOLUSDT': 110,
      'DOGEUSDT': 0.08,
      'DOTUSDT': 7.5,
      'MATICUSDT': 0.85,
      'SHIBUSDT': 0.00001,
      'AVAXUSDT': 38,
      'LINKUSDT': 15,
      'ATOMUSDT': 10,
      'UNIUSDT': 6.5,
      'LTCUSDT': 85,
      'XAUUSDT': 2050, // Gold
      'XAUUSD': 2050,
      'DEFAULT': 100,
    };

    return priceMap[symbolUpper] || priceMap['DEFAULT'];
  }

  /**
   * Get realistic base volume for different symbols
   */
  private getBaseVolume(symbol: string): number {
    const symbolUpper = symbol.toUpperCase().replace('/', '');

    const volumeMap: Record<string, number> = {
      'BTCUSDT': 1000000,
      'ETHUSDT': 800000,
      'BNBUSDT': 500000,
      'XRPUSDT': 5000000,
      'ADAUSDT': 3000000,
      'SOLUSDT': 600000,
      'DOGEUSDT': 10000000,
      'XAUUSDT': 50000,
      'XAUUSD': 50000,
      'DEFAULT': 100000,
    };

    return volumeMap[symbolUpper] || volumeMap['DEFAULT'];
  }

  /**
   * Fetch candles from CoinGecko API (free, no auth required)
   * This is a fallback method for real data when available
   */
  public async fetchFromCoinGecko(
    symbol: string,
    days: number = 30
  ): Promise<Candle[]> {
    try {
      // Convert symbol to CoinGecko format (e.g., BTCUSDT -> bitcoin)
      const coinId = this.symbolToCoinGeckoId(symbol);
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();

      // Convert CoinGecko format to our Candle format
      const candles: Candle[] = [];
      const prices = data.prices || [];

      for (let i = 0; i < prices.length - 1; i++) {
        const [timestamp, price] = prices[i];
        const [nextTimestamp] = prices[i + 1];

        // Since CoinGecko doesn't provide OHLC, we approximate it
        const open = price;
        const close = prices[i + 1]?.[1] || price;
        const volatility = Math.abs(close - open) * 0.5;
        const high = Math.max(open, close) + volatility * Math.random();
        const low = Math.min(open, close) - volatility * Math.random();

        candles.push({
          openTime: timestamp,
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          volume: 0, // CoinGecko free API doesn't provide volume in this endpoint
          closeTime: nextTimestamp - 1,
        });
      }

      return candles;
    } catch (error) {
      console.warn('CoinGecko fetch failed, falling back to generated data:', error);
      // Fall back to generated data
      return this.generateHistoricalCandles(symbol, '1d', days);
    }
  }

  /**
   * Convert trading symbol to CoinGecko coin ID
   */
  private symbolToCoinGeckoId(symbol: string): string {
    const symbolUpper = symbol.toUpperCase().replace('USDT', '').replace('USDC', '').replace('/', '');

    const idMap: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'BNB': 'binancecoin',
      'XRP': 'ripple',
      'ADA': 'cardano',
      'SOL': 'solana',
      'DOGE': 'dogecoin',
      'DOT': 'polkadot',
      'MATIC': 'matic-network',
      'SHIB': 'shiba-inu',
      'AVAX': 'avalanche-2',
      'LINK': 'chainlink',
      'ATOM': 'cosmos',
      'UNI': 'uniswap',
      'LTC': 'litecoin',
    };

    return idMap[symbolUpper] || 'bitcoin';
  }
}
