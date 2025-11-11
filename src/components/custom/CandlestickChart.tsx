"use client";

import { useEffect, useRef, useState } from 'react';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function CandlestickChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    // Check periodically in case theme changes
    const interval = setInterval(checkDarkMode, 1000);
    return () => clearInterval(interval);
  }, []);

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

    // Trend state management
    let currentTrend: 'up' | 'down' | 'sideways' = 'up';
    let trendDuration = 0;
    const minTrendDuration = 8; // Minimum candles before trend can change
    const maxTrendDuration = 25; // Maximum candles before trend must change

    // Update trend state
    const updateTrend = () => {
      trendDuration++;

      // Check if we should change trend
      const shouldChangeTrend =
        trendDuration >= maxTrendDuration ||
        (trendDuration >= minTrendDuration && Math.random() < 0.15);

      if (shouldChangeTrend) {
        const trends: Array<'up' | 'down' | 'sideways'> = ['up', 'down', 'sideways'];
        const otherTrends = trends.filter(t => t !== currentTrend);
        currentTrend = otherTrends[Math.floor(Math.random() * otherTrends.length)];
        trendDuration = 0;
      }
    };

    // Generate a single candle with trend
    const generateCandle = (previousClose: number): Candle => {
      const time = Date.now();
      const open = previousClose;

      // Update trend state
      updateTrend();

      // 10-15% chance to generate a large candle (大阳线/大阴线)
      const isLargeCandle = Math.random() < 0.12;

      let changePercent;

      // Calculate change based on trend
      if (currentTrend === 'up') {
        // Uptrend: 70% bullish, 30% bearish
        const isBullish = Math.random() < 0.7;
        if (isLargeCandle) {
          changePercent = isBullish ? Math.random() * 0.02 : -Math.random() * 0.01;
        } else {
          changePercent = isBullish ? Math.random() * 0.008 : -Math.random() * 0.005;
        }
      } else if (currentTrend === 'down') {
        // Downtrend: 70% bearish, 30% bullish
        const isBearish = Math.random() < 0.7;
        if (isLargeCandle) {
          changePercent = isBearish ? -Math.random() * 0.02 : Math.random() * 0.01;
        } else {
          changePercent = isBearish ? -Math.random() * 0.008 : Math.random() * 0.005;
        }
      } else {
        // Sideways: 50/50 with smaller moves
        if (isLargeCandle) {
          changePercent = (Math.random() - 0.5) * 0.015;
        } else {
          changePercent = (Math.random() - 0.5) * 0.006;
        }
      }

      let close = open * (1 + changePercent);

      // Clamp close price to stay within range (970-1030)
      close = Math.max(970, Math.min(1030, close));

      // Random wick length: 0% to 0.3% (更短的影线)
      const upperWickPercent = Math.random() * 0.003;
      const lowerWickPercent = Math.random() * 0.003;

      let high = Math.max(open, close) * (1 + upperWickPercent);
      let low = Math.min(open, close) * (1 - lowerWickPercent);

      // Clamp high and low to stay within range
      high = Math.min(1040, high);
      low = Math.max(960, low);

      // Generate volume (random between 5000 and 50000, larger for big candles)
      const baseVolume = isLargeCandle ? 30000 : 15000;
      const volumeVariance = isLargeCandle ? 20000 : 10000;
      const volume = baseVolume + Math.random() * volumeVariance;

      return { time, open, high, low, close, volume };
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

    // Calculate CCI (Commodity Channel Index)
    const calculateCCI = (candles: Candle[], period: number): number[] => {
      const cciData: number[] = [];

      for (let i = 0; i < candles.length; i++) {
        if (i < period - 1) {
          cciData[i] = 0;
          continue;
        }

        // Calculate Typical Price for the period
        const typicalPrices: number[] = [];
        for (let j = i - period + 1; j <= i; j++) {
          const tp = (candles[j].high + candles[j].low + candles[j].close) / 3;
          typicalPrices.push(tp);
        }

        // Calculate SMA of Typical Price
        const smaTP = typicalPrices.reduce((a, b) => a + b, 0) / period;

        // Calculate Mean Deviation
        let meanDeviation = 0;
        for (let j = 0; j < typicalPrices.length; j++) {
          meanDeviation += Math.abs(typicalPrices[j] - smaTP);
        }
        meanDeviation /= period;

        // Calculate CCI
        const currentTP = (candles[i].high + candles[i].low + candles[i].close) / 3;
        if (meanDeviation !== 0) {
          cciData[i] = (currentTP - smaTP) / (0.015 * meanDeviation);
        } else {
          cciData[i] = 0;
        }
      }

      return cciData;
    };

    // Get candle color based on CCI (NS Indicator logic)
    const getCandleColor = (cci1: number, cci2: number, isBullish: boolean, isDarkMode: boolean): { body: string; wick: string; hollow: boolean } => {
      // Sensitivity = 1 (default): CCI1 period = 7, CCI2 period = 49

      if (isDarkMode) {
        // Dark mode: use red/green colors
        if (cci1 >= 0 && cci2 >= 0) {
          // Strong uptrend - Green border, hollow
          return { body: 'rgba(34, 197, 94, 1)', wick: 'rgba(34, 197, 94, 1)', hollow: true };
        } else if (cci1 < 0 && cci2 >= 0) {
          // Weak/warning - Light gray, bullish candles hollow
          return { body: 'rgba(180, 180, 180, 1)', wick: 'rgba(180, 180, 180, 1)', hollow: isBullish };
        } else if (cci1 < 0 && cci2 < 0) {
          // Strong downtrend - Red, filled
          return { body: 'rgba(239, 68, 68, 1)', wick: 'rgba(239, 68, 68, 1)', hollow: false };
        } else { // cci1 > 0 && cci2 < 0
          // Bounce/weak - Light gray, bullish candles hollow
          return { body: 'rgba(180, 180, 180, 1)', wick: 'rgba(180, 180, 180, 1)', hollow: isBullish };
        }
      } else {
        // Light mode: use black/gray colors
        if (cci1 >= 0 && cci2 >= 0) {
          // Strong uptrend - Black border, hollow
          return { body: 'rgba(0, 0, 0, 1)', wick: 'rgba(0, 0, 0, 1)', hollow: true };
        } else if (cci1 < 0 && cci2 >= 0) {
          // Weak/warning - Light gray, bullish candles hollow
          return { body: 'rgba(180, 180, 180, 1)', wick: 'rgba(180, 180, 180, 1)', hollow: isBullish };
        } else if (cci1 < 0 && cci2 < 0) {
          // Strong downtrend - Black, filled
          return { body: 'rgba(0, 0, 0, 1)', wick: 'rgba(0, 0, 0, 1)', hollow: false };
        } else { // cci1 > 0 && cci2 < 0
          // Bounce/weak - Light gray, bullish candles hollow
          return { body: 'rgba(180, 180, 180, 1)', wick: 'rgba(180, 180, 180, 1)', hollow: isBullish };
        }
      }
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

    // Initialize - 生成676根K线用于维加斯通道
    let candles: Candle[] = [];
    let lastPrice = 1000;

    // 预生成676根K线
    for (let i = 0; i < 676; i++) {
      const newCandle = generateCandle(lastPrice);
      candles.push(newCandle);
      lastPrice = newCandle.close;
    }

    // Fixed price range for stable display (不自动缩放)
    const fixedMinPrice = 950;  // 固定最低价
    const fixedMaxPrice = 1050; // 固定最高价
    const fixedPriceRange = fixedMaxPrice - fixedMinPrice;

    let currentBidPrice = lastPrice - 0.3; // Bid price (买价) = lower
    let currentAskPrice = lastPrice + 0.3; // Ask price (卖价) = higher
    const candleWidth = 10;
    const candleSpacing = 14;

    let animationId: number;
    let lastCandleTime = Date.now();
    const candleInterval = 150;

    // Smooth scrolling animation
    let scrollOffset = 0; // 0 to 1, represents how far we've scrolled
    let isScrolling = false;

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

        // Start scrolling animation
        scrollOffset = 0;
        isScrolling = true;
      }

      // Update scroll animation
      if (isScrolling) {
        scrollOffset += 0.08; // Adjust this value to control scroll speed (0.08 = ~12 frames for full scroll at 60fps)
        if (scrollOffset >= 1) {
          scrollOffset = 0;
          isScrolling = false;
        }
      }

      // Reserve space on the right to see new candles appearing (subtract 5 candles worth of space)
      // Keep at least 676 candles in memory for Vegas Channel 2 calculation
      const visibleCandles = Math.floor(rect.width / candleSpacing) - 5;
      const maxCandlesInMemory = 676;

      // Only keep maxCandlesInMemory candles in memory
      if (candles.length > maxCandlesInMemory) {
        candles.shift();
      }

      if (candles.length === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Calculate which candles to display (only the last visibleCandles)
      const displayStartIndex = Math.max(0, candles.length - visibleCandles);
      const displayCandles = candles.slice(displayStartIndex);

      // Apply smooth scroll offset
      const pixelOffset = scrollOffset * candleSpacing;

      // Use fixed price range (no auto-scaling)
      const minPrice = fixedMinPrice;
      const maxPrice = fixedMaxPrice;
      const priceRange = fixedPriceRange;
      const padding = { top: 0, bottom: 0, left: 0, right: 0 };

      // Use full canvas height for main chart (no sub chart)
      const mainChartHeight = rect.height;

      // Calculate CCI for NS indicator (Sensitivity = 1)
      const cci1 = candles.length >= 7 ? calculateCCI(candles, 7) : [];
      const cci2 = candles.length >= 49 ? calculateCCI(candles, 49) : [];

      // ===== MAIN CHART (full height) =====

      // Draw vertical grid lines (main chart)
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < displayCandles.length; i += 10) {
        const x = i * candleSpacing + candleWidth / 2 - pixelOffset;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, mainChartHeight);
        ctx.stroke();
      }

      // Draw horizontal grid lines (main chart)
      for (let i = 0; i <= 6; i++) {
        const y = padding.top + (mainChartHeight / 6) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // Draw Vegas Channel 1 (EMA144-169) - 在K线之前绘制
      if (candles.length >= 169) {
        const closes = candles.map(c => c.close);
        const ema144 = calculateEMA(closes, 144);
        const ema169 = calculateEMA(closes, 169);

        // Only draw the visible portion
        const ema144Display = ema144.slice(displayStartIndex);
        const ema169Display = ema169.slice(displayStartIndex);

        // Fill the channel area (淡紫色填充)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.08)';
        ctx.beginPath();
        // Draw upper line
        ema144Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        // Draw lower line in reverse
        for (let index = ema169Display.length - 1; index >= 0; index--) {
          const value = ema169Display[index];
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Draw upper band (EMA144)
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.6)'; // 淡紫色
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ema144Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // Draw lower band (EMA169)
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.6)'; // 淡紫色
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ema169Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }

      // Draw Vegas Channel 2 (EMA576-676) - 在K线之前绘制
      if (candles.length >= 676) {
        const closes = candles.map(c => c.close);
        const ema576 = calculateEMA(closes, 576);
        const ema676 = calculateEMA(closes, 676);

        // Only draw the visible portion
        const ema576Display = ema576.slice(displayStartIndex);
        const ema676Display = ema676.slice(displayStartIndex);

        // Fill the channel area (淡蓝紫色填充)
        ctx.fillStyle = 'rgba(139, 167, 250, 0.08)';
        ctx.beginPath();
        // Draw upper line
        ema576Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        // Draw lower line in reverse
        for (let index = ema676Display.length - 1; index >= 0; index--) {
          const value = ema676Display[index];
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Draw upper band (EMA576)
        ctx.strokeStyle = 'rgba(139, 167, 250, 0.6)'; // 淡蓝紫色
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ema576Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // Draw lower band (EMA676)
        ctx.strokeStyle = 'rgba(139, 167, 250, 0.6)'; // 淡蓝紫色
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ema676Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }

      // Draw candles with NS indicator colors
      displayCandles.forEach((candle, index) => {
        const x = index * candleSpacing + candleWidth / 2 - pixelOffset;

        const highY = padding.top + ((maxPrice - candle.high) / priceRange) * mainChartHeight;
        const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * mainChartHeight;
        const openY = padding.top + ((maxPrice - candle.open) / priceRange) * mainChartHeight;
        const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * mainChartHeight;
        const bodyTop = Math.min(openY, closeY);
        const bodyBottom = Math.max(openY, closeY);
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

        // Determine if bullish (阳线) or bearish (阴线)
        const isBullish = candle.close > candle.open;

        // Get CCI-based color for this candle (use global index)
        const globalIndex = displayStartIndex + index;
        const currentCCI1 = cci1[globalIndex] || 0;
        const currentCCI2 = cci2[globalIndex] || 0;
        const candleColor = getCandleColor(currentCCI1, currentCCI2, isBullish, isDark);

        // Draw wick with CCI color
        ctx.strokeStyle = candleColor.wick;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Draw body with CCI color
        if (candleColor.hollow) {
          // Hollow candle (空心)
          // First fill with background color to hide the wick
          ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)';
          ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
          // Then draw the border
          ctx.strokeStyle = candleColor.body;
          ctx.lineWidth = 2;
          ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        } else {
          // Filled candle (实心)
          ctx.fillStyle = candleColor.body;
          ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        }
      });

      // Draw ask price line (卖价 - red, higher price)
      const askY = padding.top + ((maxPrice - currentAskPrice) / priceRange) * mainChartHeight;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // Red - Ask (higher)
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, askY);
      ctx.lineTo(rect.width, askY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw bid price line (买价 - green, lower price)
      const bidY = padding.top + ((maxPrice - currentBidPrice) / priceRange) * mainChartHeight;
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)'; // Green - Bid (lower)
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, bidY);
      ctx.lineTo(rect.width, bidY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw EMA20 line (light gray 4px)
      if (candles.length >= 20) {
        const closes = candles.map(c => c.close);
        const ema20 = calculateEMA(closes, 20);
        const ema20Display = ema20.slice(displayStartIndex);

        ctx.strokeStyle = 'rgba(180, 180, 180, 1)'; // Light gray
        ctx.lineWidth = 4;
        ctx.beginPath();
        ema20Display.forEach((value, index) => {
          const x = index * candleSpacing + candleWidth / 2 - pixelOffset;
          const y = padding.top + ((maxPrice - value) / priceRange) * mainChartHeight;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [isDark]);

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
