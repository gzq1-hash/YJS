"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function CandlestickChart3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let animationId: number;
    let renderer: any;

    const init = async () => {
      try {
        const THREE = await import('three');
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          60,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        camera.position.set(20, 15, 30);
        camera.lookAt(0, 0, 0);

        // Lighting - 主题联动
        const isDark = theme === 'dark';
        const ambientLight = new THREE.AmbientLight(isDark ? 0x404040 : 0xffffff, isDark ? 0.8 : 1);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(isDark ? 0x8888ff : 0xffffff, isDark ? 1.5 : 1);
        mainLight.position.set(10, 20, 10);
        scene.add(mainLight);

        const accentLight1 = new THREE.PointLight(isDark ? 0x00ffff : 0x4488ff, isDark ? 2 : 1, 50);
        accentLight1.position.set(-15, 10, 10);
        scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(isDark ? 0xff00ff : 0xff8844, isDark ? 2 : 1, 50);
        accentLight2.position.set(15, 10, -10);
        scene.add(accentLight2);

        // Candle generation
        let candles: Candle[] = [];
        let lastPrice = 1000;
        let currentTrend: 'up' | 'down' | 'sideways' = 'up';
        let trendDuration = 0;

        const generateCandle = (previousClose: number): Candle => {
          trendDuration++;
          const shouldChangeTrend = trendDuration >= 25 || (trendDuration >= 8 && Math.random() < 0.15);

          if (shouldChangeTrend) {
            const trends: Array<'up' | 'down' | 'sideways'> = ['up', 'down', 'sideways'];
            const otherTrends = trends.filter(t => t !== currentTrend);
            currentTrend = otherTrends[Math.floor(Math.random() * otherTrends.length)];
            trendDuration = 0;
          }

          const isLargeCandle = Math.random() < 0.12;
          let changePercent;

          if (currentTrend === 'up') {
            const isBullish = Math.random() < 0.7;
            changePercent = isLargeCandle
              ? (isBullish ? Math.random() * 0.06 : -Math.random() * 0.03)
              : (isBullish ? Math.random() * 0.025 : -Math.random() * 0.015);
          } else if (currentTrend === 'down') {
            const isBearish = Math.random() < 0.7;
            changePercent = isLargeCandle
              ? (isBearish ? -Math.random() * 0.06 : Math.random() * 0.03)
              : (isBearish ? -Math.random() * 0.025 : Math.random() * 0.015);
          } else {
            changePercent = isLargeCandle ? (Math.random() - 0.5) * 0.05 : (Math.random() - 0.5) * 0.02;
          }

          const open = previousClose;
          const close = open * (1 + changePercent);
          const high = Math.max(open, close) * (1 + Math.random() * 0.008);
          const low = Math.min(open, close) * (1 - Math.random() * 0.008);

          return { time: Date.now(), open, high, low, close };
        };

        // Materials
        const bullishMaterial = new THREE.MeshPhysicalMaterial({
          color: isDark ? 0x00ff88 : 0x22c55e,
          metalness: 0.3,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          emissive: isDark ? 0x00ff88 : 0x000000,
          emissiveIntensity: isDark ? 0.3 : 0,
        });

        const bearishMaterial = new THREE.MeshPhysicalMaterial({
          color: isDark ? 0xff0066 : 0xef4444,
          metalness: 0.3,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          emissive: isDark ? 0xff0066 : 0x000000,
          emissiveIntensity: isDark ? 0.3 : 0,
        });

        const wickMaterial = new THREE.MeshStandardMaterial({
          color: isDark ? 0xaaaaaa : 0x666666,
          metalness: 0.5,
          roughness: 0.3,
        });

        const candleMeshes: any[] = [];
        const maxCandles = 40;
        const candleSpacing = 1.5;

        const createCandleMesh = (candle: Candle, index: number) => {
          const group = new THREE.Group();
          const isBullish = candle.close > candle.open;

          // Body
          const bodyHeight = Math.max(Math.abs(candle.close - candle.open), 0.1);
          const bodyGeometry = new THREE.BoxGeometry(0.8, bodyHeight, 0.8);
          const bodyMesh = new THREE.Mesh(bodyGeometry, isBullish ? bullishMaterial : bearishMaterial);
          bodyMesh.position.y = (candle.open + candle.close) / 2 - 1000;

          // Edge glow for dark mode
          if (isDark) {
            const edgesGeometry = new THREE.EdgesGeometry(bodyGeometry);
            const edgesMaterial = new THREE.LineBasicMaterial({
              color: isBullish ? 0x00ffaa : 0xff0088,
            });
            const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
            edges.position.copy(bodyMesh.position);
            group.add(edges);
          }

          group.add(bodyMesh);

          // Upper wick
          const upperWickHeight = candle.high - Math.max(candle.open, candle.close);
          if (upperWickHeight > 0) {
            const upperWickGeometry = new THREE.CylinderGeometry(0.08, 0.08, upperWickHeight, 8);
            const upperWickMesh = new THREE.Mesh(upperWickGeometry, wickMaterial);
            upperWickMesh.position.y = Math.max(candle.open, candle.close) + upperWickHeight / 2 - 1000;
            group.add(upperWickMesh);
          }

          // Lower wick
          const lowerWickHeight = Math.min(candle.open, candle.close) - candle.low;
          if (lowerWickHeight > 0) {
            const lowerWickGeometry = new THREE.CylinderGeometry(0.08, 0.08, lowerWickHeight, 8);
            const lowerWickMesh = new THREE.Mesh(lowerWickGeometry, wickMaterial);
            lowerWickMesh.position.y = candle.low + lowerWickHeight / 2 - 1000;
            group.add(lowerWickMesh);
          }

          group.position.x = index * candleSpacing - (maxCandles * candleSpacing) / 2;
          return group;
        };

        // Initialize candles
        for (let i = 0; i < maxCandles; i++) {
          const candle = generateCandle(lastPrice);
          candles.push(candle);
          lastPrice = candle.close;

          const mesh = createCandleMesh(candle, i);
          candleMeshes.push(mesh);
          scene.add(mesh);
        }

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationY = 0;
        let targetRotationX = 0;

        const handleMouseMove = (event: MouseEvent) => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          targetRotationY = mouseX * 0.3;
          targetRotationX = mouseY * 0.2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let lastTime = Date.now();
        const updateInterval = 200;

        const animate = () => {
          animationId = requestAnimationFrame(animate);

          const now = Date.now();

          // Update candles
          if (now - lastTime > updateInterval) {
            candles.shift();
            const newCandle = generateCandle(lastPrice);
            candles.push(newCandle);
            lastPrice = newCandle.close;

            const oldMesh = candleMeshes.shift();
            if (oldMesh) {
              scene.remove(oldMesh);
              oldMesh.traverse((child: any) => {
                if (child.geometry) child.geometry.dispose();
              });
            }

            const newMesh = createCandleMesh(newCandle, maxCandles - 1);
            candleMeshes.push(newMesh);
            scene.add(newMesh);

            candleMeshes.forEach((mesh: any, index: number) => {
              mesh.position.x = index * candleSpacing - (maxCandles * candleSpacing) / 2;
            });

            lastTime = now;
          }

          // Camera rotation
          camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
          camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;

          // Animate lights
          const time = Date.now() * 0.001;
          accentLight1.position.x = Math.sin(time * 0.5) * 15;
          accentLight1.position.z = Math.cos(time * 0.5) * 15;
          accentLight2.position.x = Math.sin(time * 0.7 + Math.PI) * 15;
          accentLight2.position.z = Math.cos(time * 0.7 + Math.PI) * 15;

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          if (!container) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          if (animationId) cancelAnimationFrame(animationId);
          if (container && renderer?.domElement) {
            container.removeChild(renderer.domElement);
          }
          scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((mat: any) => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
          if (renderer) renderer.dispose();
        };
      } catch (err) {
        console.error('Three.js error:', err);
      }
    };

    init();
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
