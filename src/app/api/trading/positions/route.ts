import { NextRequest, NextResponse } from 'next/server';
import { BinanceConnector } from '@/lib/trading/connectors/binance';

/**
 * GET /api/trading/positions
 *
 * Get current positions and account balance
 *
 * Query params:
 * - symbol?: string (optional, filter by symbol)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'XAUUSDT';

    const apiKey = process.env.BINANCE_API_KEY || '';
    const apiSecret = process.env.BINANCE_API_SECRET || '';
    const useTestnet = process.env.BINANCE_TESTNET === 'true';

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Binance API credentials not configured' },
        { status: 500 }
      );
    }

    const binance = new BinanceConnector({
      apiKey,
      apiSecret,
      testnet: useTestnet,
    });

    // Test connection
    const connected = await binance.testConnection();
    if (!connected) {
      return NextResponse.json(
        { error: 'Failed to connect to Binance API' },
        { status: 500 }
      );
    }

    // Get position
    const position = await binance.getPosition(symbol);

    // Get balance
    const balance = await binance.getBalance();

    // Get open orders
    const openOrders = await binance.getOpenOrders(symbol);

    return NextResponse.json({
      position,
      balance,
      openOrders,
    });
  } catch (error) {
    console.error('Positions error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
