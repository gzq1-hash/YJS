"use client";

import { NeuralBackground } from '@/components/ui/neural-background';
import { useEffect, useState } from 'react';

export default function DarkModeBackground() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 初始加载时检测主题（切换主题后需要刷新页面）
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  return (
    <>
      {/* 暗色模式全局背景 - 仅在暗色模式下显示 */}
      {isDark && (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <NeuralBackground
            hue={200}
            saturation={0.5}
            chroma={0.4}
            isDark={true}
          />
        </div>
      )}
    </>
  );
}
