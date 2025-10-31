import { NextRequest, NextResponse } from 'next/server';
import { BacktestEngine } from '@/lib/trading/backtest/engine';
import { BinanceConnector } from '@/lib/trading/connectors/binance';
import { HistoricalDataProvider } from '@/lib/trading/connectors/historicalDataProvider';
import type { TradingConfig, Candle } from '@/lib/trading/types';

/**
 * POST /api/trading/backtest
 *
 * Run backtest on historical data
 *
 * Request body:
 * {
 *   startDate: number (timestamp)
 *   endDate: number (timestamp)
 *   initialCapital: number
 *   tradingConfig: TradingConfig
 *   binanceApiKey?: string
 *   binanceApiSecret?: string
 *   useTestnet?: boolean
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
      binanceApiKey,
      binanceApiSecret,
      useTestnet = true,
      useHistoricalData = false, // New option to skip Binance and use generated data
    } = body;

    // Validate required fields
    if (!startDate || !endDate || !initialCapital || !tradingConfig) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let candles: Candle[] = [];
    let dataSource = 'generated';

    // Try to fetch from Binance first (if credentials provided and not explicitly using historical data)
    if (!useHistoricalData) {
      const apiKey = binanceApiKey || process.env.BINANCE_API_KEY || '';
      const apiSecret = binanceApiSecret || process.env.BINANCE_API_SECRET || '';

      if (apiKey && apiSecret) {
        try {
          console.log(`Attempting to connect to Binance API...`);
          const binance = new BinanceConnector({
            apiKey,
            apiSecret,
            testnet: useTestnet,
          });

          // Test connection
          const connected = await binance.testConnection();

          if (connected) {
            console.log(`Fetching candles from Binance for ${tradingConfig.symbol}...`);
            candles = await binance.getHistoricalCandles(
              tradingConfig.symbol,
              tradingConfig.interval,
              20000, // Increased to match historical data provider limit
              startDate,
              endDate
            );

            if (candles.length > 0) {
              dataSource = 'binance';
              console.log(`Fetched ${candles.length} candles from Binance`);
            }
          }
        } catch (error) {
          console.warn('Binance connection failed, falling back to historical data provider:', error);
        }
      }
    }

    // Fallback to historical data provider if Binance failed or not used
    if (candles.length === 0) {
      console.log('Using historical data provider...');
      const historicalProvider = new HistoricalDataProvider();

      // Calculate number of candles needed based on date range and interval
      const intervalMs = getIntervalMs(tradingConfig.interval);
      const candlesNeeded = Math.min(
        20000, // Increased limit to support longer backtests (was 1500)
        Math.ceil((endDate - startDate) / intervalMs)
      );

      candles = await historicalProvider.generateHistoricalCandles(
        tradingConfig.symbol,
        tradingConfig.interval,
        candlesNeeded,
        startDate,
        endDate
      );

      console.log(`Generated ${candles.length} historical candles`);
    }

    if (candles.length === 0) {
      return NextResponse.json(
        { error: 'No candles found for specified date range' },
        { status: 404 }
      );
    }

    // Run backtest
    const engine = new BacktestEngine({
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    });

    console.log('Running backtest...');
    const results = await engine.runBacktest(candles);
    console.log('Backtest complete');

    return NextResponse.json({
      ...results,
      candles: candles.slice(-500), // Return last 500 candles for charting
      dataSource, // Indicate whether data came from Binance or was generated
    });
  } catch (error) {
    console.error('Backtest error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to convert interval string to milliseconds
 */
function getIntervalMs(interval: string): number {
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
