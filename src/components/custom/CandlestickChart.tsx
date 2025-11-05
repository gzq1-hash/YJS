"use client";

import { useEffect, useRef } from 'react';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function CandlestickChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Generate a single candle
    const generateCandle = (previousClose: number): Candle => {
      const time = Date.now();
      const open = previousClose;
      const changePercent = (Math.random() - 0.5) * 0.04;
      const close = open * (1 + changePercent);
      const high = Math.max(open, close) * (1 + Math.random() * 0.015);
      const low = Math.min(open, close) * (1 - Math.random() * 0.015);

      return { time, open, high, low, close };
    };

    // Calculate EMA
    const calculateEMA = (data: number[], period: number): number[] => {
      const k = 2 / (period + 1);
      const emaData: number[] = [];
      emaData[0] = data[0];

      for (let i = 1; i < data.length; i++) {
        emaData[i] = data[i] * k + emaData[i - 1] * (1 - k);
      }

      return emaData;
    };

    // Calculate Simple Moving Average (SMA)
    const calculateSMA = (data: number[], period: number): number[] => {
      const smaData: number[] = [];
      for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
          smaData[i] = data[i]; // Not enough data yet
        } else {
          const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
          smaData[i] = sum / period;
        }
      }
      return smaData;
    };

    // Calculate ATR (Average True Range)
    const calculateATR = (candles: Candle[], period: number): number[] => {
      const atrData: number[] = [];
      const trueRanges: number[] = [];

      for (let i = 0; i < candles.length; i++) {
        if (i === 0) {
          trueRanges[i] = candles[i].high - candles[i].low;
        } else {
          const tr1 = candles[i].high - candles[i].low;
          const tr2 = Math.abs(candles[i].high - candles[i - 1].close);
          const tr3 = Math.abs(candles[i].low - candles[i - 1].close);
          trueRanges[i] = Math.max(tr1, tr2, tr3);
        }
      }

      // Calculate ATR using SMA of true ranges
      for (let i = 0; i < trueRanges.length; i++) {
        if (i < period - 1) {
          atrData[i] = trueRanges[i];
        } else {
          const sum = trueRanges.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
          atrData[i] = sum / period;
        }
      }

      return atrData;
    };

    // Calculate Keltner Channel
    const calculateKeltnerChannel = (candles: Candle[], period: number, atrMultiplier: number): { middle: number[], upper: number[], lower: number[] } => {
      const closes = candles.map(c => c.close);
      const middle = calculateSMA(closes, period);
      const atr = calculateATR(candles, period);

      const upper = middle.map((m, i) => m + atr[i] * atrMultiplier);
      const lower = middle.map((m, i) => m - atr[i] * atrMultiplier);

      return { middle, upper, lower };
    };

    // Calculate ZigZag indicator
    const calculateZigZag = (candles: Candle[], depth: number): Array<{ index: number; price: number; type: 'high' | 'low' }> => {
      if (candles.length < depth) return [];

      const zigzagPoints: Array<{ index: number; price: number; type: 'high' | 'low' }> = [];
      let lastHighIndex = 0;
      let lastLowIndex = 0;
      let lastHigh = candles[0].high;
      let lastLow = candles[0].low;
      let searchingForHigh = true;

      for (let i = 0; i < candles.length; i++) {
        if (searchingForHigh) {
          if (candles[i].high > lastHigh) {
            lastHigh = candles[i].high;
            lastHighIndex = i;
          }
          // Check if we found a significant low
          if (lastHigh - candles[i].low >= depth * 0.01) {
            zigzagPoints.push({ index: lastHighIndex, price: lastHigh, type: 'high' });
            lastLow = candles[i].low;
            lastLowIndex = i;
            searchingForHigh = false;
          }
        } else {
          if (candles[i].low < lastLow) {
            lastLow = candles[i].low;
            lastLowIndex = i;
          }
          // Check if we found a significant high
          if (candles[i].high - lastLow >= depth * 0.01) {
            zigzagPoints.push({ index: lastLowIndex, price: lastLow, type: 'low' });
            lastHigh = candles[i].high;
            lastHighIndex = i;
            searchingForHigh = true;
          }
        }
      }

      return zigzagPoints;
    };

    // Initialize
    let candles: Candle[] = [];
    let lastPrice = 1000;
    let currentBidPrice = lastPrice - 0.3; // Bid price (买价) = lower
    let currentAskPrice = lastPrice + 0.3; // Ask price (卖价) = higher
    const candleWidth = 10;
    const candleSpacing = 14;

    let animationId: number;
    let lastCandleTime = Date.now();
    const candleInterval = 150;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Add new candle
      const now = Date.now();
      if (now - lastCandleTime >= candleInterval) {
        const newCandle = generateCandle(lastPrice);
        candles.push(newCandle);
        lastPrice = newCandle.close;
        const spread = 0.3 + Math.random() * 0.4;
        currentBidPrice = lastPrice - spread / 2; // Bid = lower than mid price
        currentAskPrice = lastPrice + spread / 2; // Ask = higher than mid price
        lastCandleTime = now;
      }

      // Reserve space on the right to see new candles appearing (subtract 5 candles worth of space)
      const maxCandles = Math.floor(rect.width / candleSpacing) - 5;
      if (candles.length > maxCandles) {
        candles.shift();
      }

      if (candles.length === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Calculate price range
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      candles.forEach(candle => {
        minPrice = Math.min(minPrice, candle.low);
        maxPrice = Math.max(maxPrice, candle.high);
      });

      minPrice = Math.min(minPrice, currentAskPrice - 5);
      maxPrice = Math.max(maxPrice, currentBidPrice + 5);

      const priceRange = maxPrice - minPrice;
      const padding = { top: 0, bottom: 0, left: 0, right: 0 };
      const chartHeight = rect.height - padding.top - padding.bottom;

      // Draw vertical grid lines
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < candles.length; i += 10) {
        const x = i * candleSpacing + candleWidth / 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let i = 0; i <= 8; i++) {
        const y = padding.top + (chartHeight / 8) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // Draw candles - starting from left edge
      candles.forEach((candle, index) => {
        const x = index * candleSpacing + candleWidth / 2;
        const isUp = candle.close > candle.open;

        const highY = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight;
        const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight;
        const openY = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight;
        const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight;
        const bodyTop = Math.min(openY, closeY);
        const bodyBottom = Math.max(openY, closeY);
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

        // Draw wick
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Draw body
        if (isUp) {
          ctx.strokeStyle = '#000000';
          ctx.fillStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
          ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        } else {
          ctx.fillStyle = '#000000';
          ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        }
      });

      // Draw ask price line (卖价 - red, higher price)
      const askY = padding.top + ((maxPrice - currentAskPrice) / priceRange) * chartHeight;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // Red - Ask (higher)
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, askY);
      ctx.lineTo(rect.width, askY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw bid price line (买价 - green, lower price)
      const bidY = padding.top + ((maxPrice - currentBidPrice) / priceRange) * chartHeight;
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)'; // Green - Bid (lower)
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, bidY);
      ctx.lineTo(rect.width, bidY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw EMA20 line
      if (candles.length >= 20) {
        const closes = candles.map(c => c.close);
        const ema20 = calculateEMA(closes, 20);

        ctx.strokeStyle = 'rgba(128, 128, 128, 0.7)'; // Gray
        ctx.lineWidth = 4;
        ctx.beginPath();

        ema20.forEach((emaValue, index) => {
          const x = index * candleSpacing + candleWidth / 2;
          const y = padding.top + ((maxPrice - emaValue) / priceRange) * chartHeight;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.stroke();
      }

      // Draw Keltner Channel (MA20, ATR multiplier 0.5, purple 1px)
      if (candles.length >= 20) {
        const keltner = calculateKeltnerChannel(candles, 20, 0.5);

        // Draw upper band
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.8)'; // Purple
        ctx.lineWidth = 1;
        ctx.beginPath();
        keltner.upper.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2;
          const y = padding.top + ((maxPrice - value) / priceRange) * chartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // Draw middle line (MA20)
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.8)'; // Purple
        ctx.lineWidth = 1;
        ctx.beginPath();
        keltner.middle.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2;
          const y = padding.top + ((maxPrice - value) / priceRange) * chartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // Draw lower band
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.8)'; // Purple
        ctx.lineWidth = 1;
        ctx.beginPath();
        keltner.lower.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2;
          const y = padding.top + ((maxPrice - value) / priceRange) * chartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }

      // Draw ZigZag indicator (depth 35, 2px line)
      if (candles.length >= 10) {
        const zigzagPoints = calculateZigZag(candles, 35);

        if (zigzagPoints.length >= 2) {
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'; // Blue
          ctx.lineWidth = 2;
          ctx.beginPath();

          zigzagPoints.forEach((point, index) => {
            const x = point.index * candleSpacing + candleWidth / 2;
            const y = padding.top + ((maxPrice - point.price) / priceRange) * chartHeight;

            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });

          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      {/* K-line chart with 3D tilt and floating animation */}
      <div
        className="w-full h-full animate-float-3d"
        style={{
          transform: 'perspective(800px) rotateX(5deg) rotateY(-3deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />
      </div>

      <style jsx>{`
        @keyframes float-3d {
          0%, 100% {
            transform: perspective(800px) rotateX(5deg) rotateY(-3deg) translateZ(0px) translateY(0px);
          }
          25% {
            transform: perspective(800px) rotateX(4deg) rotateY(-2deg) translateZ(8px) translateY(-3px);
          }
          50% {
            transform: perspective(800px) rotateX(6deg) rotateY(-4deg) translateZ(12px) translateY(2px);
          }
          75% {
            transform: perspective(800px) rotateX(5deg) rotateY(-2.5deg) translateZ(6px) translateY(-2px);
          }
        }

        .animate-float-3d {
          animation: float-3d 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
