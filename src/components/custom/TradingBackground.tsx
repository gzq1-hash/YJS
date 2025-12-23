"use client";

import React, { useEffect, useRef } from 'react';

interface TradingBackgroundProps {
  className?: string;
}

const TradingBackground: React.FC<TradingBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Chart configuration
    const candleWidth = 15;
    const candleSpacing = 8;
    const totalCandleWidth = candleWidth + candleSpacing;
    
    // Multiple chart lines to create depth
    const charts = [
      {
        color: 'rgba(184, 115, 51, 0.25)', // Dark Gold/Copper, heavier
        speed: 0.5,
        y: height * 0.5,
        data: [] as { open: number; close: number; high: number; low: number }[],
        volatility: 2
      },
      {
        color: 'rgba(184, 115, 51, 0.4)', // Slightly more visible, heavier
        speed: 1,
        y: height * 0.6,
        data: [] as { open: number; close: number; high: number; low: number }[],
        volatility: 3
      },
      {
        color: 'rgba(255, 215, 0, 0.3)', // Gold, heavier
        speed: 0.8,
        y: height * 0.4,
        data: [] as { open: number; close: number; high: number; low: number }[],
        volatility: 2.5
      }
    ];

    // Initialize data
    charts.forEach(chart => {
      const maxCandles = Math.ceil(width / totalCandleWidth) + 20;
      let currentPrice = chart.y;
      
      for (let i = 0; i < maxCandles; i++) {
        const change = (Math.random() - 0.5) * chart.volatility * 10;
        const open = currentPrice;
        const close = currentPrice + change;
        const high = Math.max(open, close) + Math.random() * chart.volatility * 5;
        const low = Math.min(open, close) - Math.random() * chart.volatility * 5;
        
        chart.data.push({ open, close, high, low });
        currentPrice = close;
      }
    });

    const resize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        width = canvas.width;
        height = canvas.height;
        
        // Re-initialize chart Y positions based on new height
        charts[0].y = height * 0.5;
        charts[1].y = height * 0.6;
        charts[2].y = height * 0.4;

        // Ensure enough data
        charts.forEach(chart => {
            const neededCandles = Math.ceil(width / totalCandleWidth) + 20;
            if (chart.data.length < neededCandles) {
                let currentPrice = chart.data.length > 0 ? chart.data[chart.data.length - 1].close : chart.y;
                for (let i = chart.data.length; i < neededCandles; i++) {
                    const change = (Math.random() - 0.5) * chart.volatility * 10;
                    const open = currentPrice;
                    const close = currentPrice + change;
                    const high = Math.max(open, close) + Math.random() * chart.volatility * 5;
                    const low = Math.min(open, close) - Math.random() * chart.volatility * 5;
                    
                    chart.data.push({ open, close, high, low });
                    currentPrice = close;
                }
            }
        });
      }
    };

    window.addEventListener('resize', resize);
    // Initial resize
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      charts.forEach(chart => {
        // Update data (scroll effect)
        if (Math.random() > 0.5) { // Update frequency
             // Shift data
             // In a real scrolling chart, we'd shift the array. 
             // For a simple background, we can just redraw with an offset or shift the data array.
             // Let's shift the data array slowly.
        }
        
        // Move the chart "forward" by generating new data at the end and removing from start
        // To make it smooth, we might need a more complex offset system, 
        // but for a background, simply adding/removing candles at a set interval works.
        
        // Let's just draw the static data for now but animate the "current price" or add a new candle occasionally.
        // Actually, a smooth scrolling effect is better.
        
        // Simple approach: Re-generate the last candle to simulate "live" trading
        const lastCandle = chart.data[chart.data.length - 1];
        const change = (Math.random() - 0.5) * chart.volatility;
        lastCandle.close += change;
        lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
        lastCandle.low = Math.min(lastCandle.low, lastCandle.close);
        
        // Draw candles
        chart.data.forEach((candle, index) => {
            const x = index * totalCandleWidth;
            
            // Draw wick
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, candle.high);
            ctx.lineTo(x + candleWidth / 2, candle.low);
            ctx.strokeStyle = chart.color;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw body
            ctx.fillStyle = chart.color;
            const bodyHeight = Math.max(Math.abs(candle.close - candle.open), 1);
            const bodyY = Math.min(candle.open, candle.close);
            ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
        });
      });
      
      // To make it truly dynamic (scrolling), we need to shift the array
      charts.forEach(chart => {
          // Only shift occasionally to control speed
          if (Math.random() < 0.05 * chart.speed) {
              chart.data.shift();
              const lastCandle = chart.data[chart.data.length - 1];
              const change = (Math.random() - 0.5) * chart.volatility * 10;
              const open = lastCandle.close;
              const close = open + change;
              const high = Math.max(open, close) + Math.random() * chart.volatility * 5;
              const low = Math.min(open, close) - Math.random() * chart.volatility * 5;
              chart.data.push({ open, close, high, low });
          }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.4 }}
    />
  );
};

export default TradingBackground;
