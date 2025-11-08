"use client";

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  particleCount?: number;
  animationDuration?: number;
  className?: string;
}

export default function ParticleText({
  text,
  fontSize = 80,
  color = '#000000',
  particleCount = 2000,
  animationDuration = 3000,
  className = '',
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const isDarkMode = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // 检测暗黑模式
    const updateDarkMode = () => {
      isDarkMode.current = document.documentElement.classList.contains('dark');
    };
    updateDarkMode();

    // 监听暗黑模式变化
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // 设置 canvas 尺寸
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 绘制文字到临时 canvas 获取像素数据
    const getTextPixels = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return [];

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.fillStyle = '#ffffff';
      tempCtx.font = `bold ${fontSize}px "Inter", sans-serif`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels: { x: number; y: number }[] = [];

      // 采样像素点（每隔几个像素取一个，避免粒子过多）
      const gap = Math.ceil(Math.sqrt((tempCanvas.width * tempCanvas.height) / particleCount));

      for (let y = 0; y < tempCanvas.height; y += gap) {
        for (let x = 0; x < tempCanvas.width; x += gap) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = imageData.data[index + 3];
          if (alpha > 128) {
            pixels.push({ x: x / window.devicePixelRatio, y: y / window.devicePixelRatio });
          }
        }
      }

      return pixels;
    };

    // 初始化粒子
    const initParticles = () => {
      const pixels = getTextPixels();
      const rect = canvas.getBoundingClientRect();

      particlesRef.current = pixels.map((pixel) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        targetX: pixel.x,
        targetY: pixel.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
      }));
    };

    initParticles();
    startTimeRef.current = Date.now();

    // 动画循环
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const elapsed = Date.now() - startTimeRef.current;
      const cycle = elapsed % (animationDuration * 2); // 完整循环：汇聚 + 散开
      const progress = cycle / animationDuration;

      let t: number;
      if (progress < 1) {
        // 汇聚阶段
        t = easeOutCubic(progress);
      } else {
        // 散开阶段
        t = 1 - easeInCubic(progress - 1);
      }

      // 更新和绘制粒子
      particlesRef.current.forEach((particle) => {
        if (progress < 1) {
          // 汇聚：粒子向目标位置移动
          particle.x = particle.x + (particle.targetX - particle.x) * t;
          particle.y = particle.y + (particle.targetY - particle.y) * t;
        } else {
          // 散开：粒子随机散开
          const angle = Math.random() * Math.PI * 2;
          const distance = (progress - 1) * 200;
          particle.x = particle.targetX + Math.cos(angle) * distance;
          particle.y = particle.targetY + Math.sin(angle) * distance;
        }

        // 绘制粒子
        ctx.fillStyle = isDarkMode.current ? '#ffffff' : color;
        ctx.globalAlpha = progress < 1 ? t : 1 - (progress - 1);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [text, fontSize, color, particleCount, animationDuration]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}

// 缓动函数
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}
