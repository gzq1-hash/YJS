"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BrandNameProps {
  inNavbar?: boolean; // 是否在导航栏中使用
  inHero?: boolean; // 是否在 Hero 中使用（黑色背景）
}

export default function BrandName({ inNavbar = false, inHero = false }: BrandNameProps) {
  const { language } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // 标记动画已播放，避免切换语言时重复播放
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const text = language === 'zh' ? '元金石' : 'AurumFoundry';
  const chars = text.split('');

  return (
    <>
      {chars.map((char, index) => {
        const isSecondPart = language === 'zh' ? index >= 1 : index >= 2;

        // 根据使用场景决定颜色
        let colorClass;
        
        if (language === 'zh') {
          if (char === '金') {
            colorClass = 'font-black text-brand-accent';
          } else {
            if (inHero) {
              colorClass = 'font-black text-white';
            } else {
              colorClass = 'font-black text-foreground';
            }
          }
        } else {
          if (inHero) {
            // Hero 中始终是白色（因为背景是黑色）
            colorClass = isSecondPart ? 'font-normal text-brand-text-muted' : 'font-black text-brand-text';
          } else {
            // 导航栏和其他地方使用语义颜色
            colorClass = isSecondPart ? 'font-normal text-muted-foreground' : 'font-black text-foreground';
          }
        }

        return (
          <motion.span
            key={`${language}-${index}`}
            className={colorClass}
            initial={hasAnimated ? false : {
              x: (index % 2 === 0 ? -1 : 1) * 150,
              y: (index % 3 === 0 ? -1 : 1) * 80,
              opacity: 0,
              rotate: (index % 2 === 0 ? -1 : 1) * 45,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: hasAnimated ? 0 : index * 0.08,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}
