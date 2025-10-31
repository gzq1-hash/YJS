import Binance, { CandleChartInterval_LT } from 'binance-api-node';
import type { Candle, BinanceCredentials, OrderResult } from '../types';

/**
 * Binance API Connector
 *
 * Handles all interactions with Binance Futures API:
 * - Fetching historical candle data
 * - Placing market/limit/stop orders
 * - Checking positions and balances
 * - Managing open orders
 */
export class BinanceConnector {
  private client: ReturnType<typeof Binance>;
  private testnet: boolean;

  constructor(credentials: BinanceCredentials) {
    this.testnet = credentials.testnet || false;

    this.client = Binance({
      apiKey: credentials.apiKey,
      apiSecret: credentials.apiSecret,
      httpBase: this.testnet
        ? 'https://testnet.binancefuture.com'
        : 'https://fapi.binance.com',
      wsBase: this.testnet
        ? 'wss://stream.binancefuture.com'
        : 'wss://fstream.binance.com',
    });
  }

  /**
   * Convert interval string to Binance interval type
   */
  private convertInterval(interval: string): CandleChartInterval_LT {
    const intervalMap: Record<string, CandleChartInterval_LT> = {
      '1m': '1m',
      '5m': '5m',
      '15m': '15m',
      '1h': '1h',
      '4h': '4h',
      '1d': '1d',
    };
    return intervalMap[interval] || '1m';
  }

  /**
   * Fetch historical candlestick data
   */
  public async getHistoricalCandles(
    symbol: string,
    interval: string,
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<Candle[]> {
    try {
      const candles = await this.client.futuresCandles({
        symbol: symbol.replace('/', ''), // XAUUSD -> XAUUSDT
        interval: this.convertInterval(interval),
        limit,
        startTime,
        endTime,
      });

      return candles.map(c => ({
        openTime: c.openTime,
        open: parseFloat(c.open),
        high: parseFloat(c.high),
        low: parseFloat(c.low),
        close: parseFloat(c.close),
        volume: parseFloat(c.volume),
        closeTime: c.closeTime,
      }));
    } catch (error) {
      console.error('Error fetching historical candles:', error);
      throw new Error(`Failed to fetch candles: ${error}`);
    }
  }

  /**
   * Get latest candle
   */
  public async getLatestCandle(symbol: string, interval: string): Promise<Candle | null> {
    const candles = await this.getHistoricalCandles(symbol, interval, 1);
    return candles.length > 0 ? candles[0] : null;
  }

  /**
   * Place market order
   */
  public async placeMarketOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number
  ): Promise<OrderResult> {
    try {
      const order = await this.client.futuresOrder({
        symbol: symbol.replace('/', ''),
        side,
        type: 'MARKET',
        quantity: quantity.toString(),
      });

      return {
        orderId: order.orderId.toString(),
        symbol: order.symbol,
        side: order.side as 'BUY' | 'SELL',
        type: order.type as 'MARKET',
        quantity: parseFloat(order.origQty),
        price: order.price ? parseFloat(order.price) : undefined,
        status: order.status as OrderResult['status'],
        executedQty: parseFloat(order.executedQty),
      };
    } catch (error) {
      console.error('Error placing market order:', error);
      throw new Error(`Failed to place market order: ${error}`);
    }
  }

  /**
   * Place stop market order (for stop loss)
   */
  public async placeStopOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number,
    stopPrice: number
  ): Promise<OrderResult> {
    try {
      const order = await this.client.futuresOrder({
        symbol: symbol.replace('/', ''),
        side,
        type: 'STOP_MARKET',
        quantity: quantity.toString(),
        stopPrice: stopPrice.toString(),
      });

      return {
        orderId: order.orderId.toString(),
        symbol: order.symbol,
        side: order.side as 'BUY' | 'SELL',
        type: 'STOP_MARKET',
        quantity: parseFloat(order.origQty),
        price: parseFloat(order.stopPrice || '0'),
        status: order.status as OrderResult['status'],
        executedQty: parseFloat(order.executedQty),
      };
    } catch (error) {
      console.error('Error placing stop order:', error);
      throw new Error(`Failed to place stop order: ${error}`);
    }
  }

  /**
   * Place limit order (for take profit)
   */
  public async placeLimitOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number,
    price: number
  ): Promise<OrderResult> {
    try {
      const order = await this.client.futuresOrder({
        symbol: symbol.replace('/', ''),
        side,
        type: 'LIMIT',
        quantity: quantity.toString(),
        price: price.toString(),
        timeInForce: 'GTC',
      });

      return {
        orderId: order.orderId.toString(),
        symbol: order.symbol,
        side: order.side as 'BUY' | 'SELL',
        type: 'LIMIT',
        quantity: parseFloat(order.origQty),
        price: parseFloat(order.price),
        status: order.status as OrderResult['status'],
        executedQty: parseFloat(order.executedQty),
      };
    } catch (error) {
      console.error('Error placing limit order:', error);
      throw new Error(`Failed to place limit order: ${error}`);
    }
  }

  /**
   * Cancel an order
   */
  public async cancelOrder(symbol: string, orderId: string): Promise<void> {
    try {
      await this.client.futuresCancelOrder({
        symbol: symbol.replace('/', ''),
        orderId: parseInt(orderId),
      });
    } catch (error) {
      console.error('Error canceling order:', error);
      throw new Error(`Failed to cancel order: ${error}`);
    }
  }

  /**
   * Get current position for a symbol
   */
  public async getPosition(symbol: string): Promise<{
    symbol: string;
    positionAmount: number;
    entryPrice: number;
    unrealizedProfit: number;
    leverage: number;
  } | null> {
    try {
      const positions = await this.client.futuresPositionRisk({
        symbol: symbol.replace('/', ''),
      });

      const position = positions.find(p => p.symbol === symbol.replace('/', ''));
      if (!position || parseFloat(position.positionAmt) === 0) {
        return null;
      }

      return {
        symbol: position.symbol,
        positionAmount: parseFloat(position.positionAmt),
        entryPrice: parseFloat(position.entryPrice),
        unrealizedProfit: parseFloat(position.unRealizedProfit),
        leverage: parseInt(position.leverage),
      };
    } catch (error) {
      console.error('Error getting position:', error);
      throw new Error(`Failed to get position: ${error}`);
    }
  }

  /**
   * Get account balance
   */
  public async getBalance(): Promise<{
    totalBalance: number;
    availableBalance: number;
    totalUnrealizedProfit: number;
  }> {
    try {
      const account = await this.client.futuresAccountBalance();
      const usdtBalance = account.find(b => b.asset === 'USDT');

      if (!usdtBalance) {
        return {
          totalBalance: 0,
          availableBalance: 0,
          totalUnrealizedProfit: 0,
        };
      }

      return {
        totalBalance: parseFloat(usdtBalance.balance),
        availableBalance: parseFloat(usdtBalance.availableBalance),
        totalUnrealizedProfit: parseFloat(usdtBalance.crossUnPnl || '0'),
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  /**
   * Set leverage for a symbol
   */
  public async setLeverage(symbol: string, leverage: number): Promise<void> {
    try {
      await this.client.futuresLeverage({
        symbol: symbol.replace('/', ''),
        leverage,
      });
    } catch (error) {
      console.error('Error setting leverage:', error);
      throw new Error(`Failed to set leverage: ${error}`);
    }
  }

  /**
   * Get open orders
   */
  public async getOpenOrders(symbol?: string): Promise<OrderResult[]> {
    try {
      const params = symbol ? { symbol: symbol.replace('/', '') } : {};
      const orders = await this.client.futuresOpenOrders(params);

      return orders.map(o => ({
        orderId: o.orderId.toString(),
        symbol: o.symbol,
        side: o.side as 'BUY' | 'SELL',
        type: o.type as OrderResult['type'],
        quantity: parseFloat(o.origQty),
        price: o.price ? parseFloat(o.price) : undefined,
        status: o.status as OrderResult['status'],
        executedQty: parseFloat(o.executedQty),
      }));
    } catch (error) {
      console.error('Error getting open orders:', error);
      throw new Error(`Failed to get open orders: ${error}`);
    }
  }

  /**
   * Close all positions for a symbol
   */
  public async closePosition(symbol: string): Promise<OrderResult | null> {
    try {
      const position = await this.getPosition(symbol);
      if (!position || position.positionAmount === 0) {
        return null;
      }

      const side = position.positionAmount > 0 ? 'SELL' : 'BUY';
      const quantity = Math.abs(position.positionAmount);

      return await this.placeMarketOrder(symbol, side, quantity);
    } catch (error) {
      console.error('Error closing position:', error);
      throw new Error(`Failed to close position: ${error}`);
    }
  }

  /**
   * Test connection to Binance API
   */
  public async testConnection(): Promise<boolean> {
    try {
      await this.client.futuresPing();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
