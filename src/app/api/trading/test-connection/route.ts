import { NextResponse } from 'next/server';
import { BinanceConnector } from '@/lib/trading/connectors/binance';

/**
 * GET /api/trading/test-connection
 *
 * Test Binance API connection
 */
export async function GET() {
  try {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const useTestnet = process.env.BINANCE_TESTNET === 'true';

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Binance API credentials not configured in .env.local'
        },
        { status: 500 }
      );
    }

    console.log('Testing Binance connection...');
    console.log('Using testnet:', useTestnet);

    const binance = new BinanceConnector({
      apiKey,
      apiSecret,
      testnet: useTestnet,
    });

    // Test connection
    const connected = await binance.testConnection();

    if (!connected) {
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to Binance API',
      }, { status: 500 });
    }

    // Get account balance
    const balance = await binance.getBalance();

    // Get a few candles to test data fetching
    const candles = await binance.getHistoricalCandles(
      'XAUUSDT',
      '1m',
      10
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Binance API',
      environment: useTestnet ? 'Testnet' : 'Production',
      balance: {
        total: balance.totalBalance,
        available: balance.availableBalance,
        unrealizedPnl: balance.totalUnrealizedProfit,
      },
      dataTest: {
        candlesFetched: candles.length,
        latestPrice: candles[candles.length - 1]?.close || 0,
      },
    });
  } catch (error) {
    console.error('Binance connection test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: String(error),
      },
      { status: 500 }
    );
  }
}
