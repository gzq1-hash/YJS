"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

// 定义交易数据类型
interface Trade {
  coin: string; // 币种
  type: 'spot' | 'futures' | 'options'; // 交易方式
  profit: number; // 利润
}

interface MonthlyData {
  month: string; // 月份
  trades: Trade[]; // 该月交易列表
}

// 模拟最近 4 个月的交易数据
const getHistoricalData = (): MonthlyData[] => {
  return [
    {
      month: '2023年1月',
      trades: [
        { coin: 'BTC', type: 'spot', profit: 1000 },
        { coin: 'ETH', type: 'futures', profit: 500 },
      ],
    },
    {
      month: '2023年2月',
      trades: [
        { coin: 'ADA', type: 'options', profit: 200 },
        { coin: 'SOL', type: 'spot', profit: 300 },
      ],
    },
    {
      month: '2023年3月',
      trades: [
        { coin: 'BTC', type: 'futures', profit: 700 },
        { coin: 'ETH', type: 'spot', profit: 400 },
      ],
    },
    {
      month: '2023年4月',
      trades: [
        { coin: 'ADA', type: 'spot', profit: 150 },
        { coin: 'SOL', type: 'options', profit: 250 },
      ],
    },
  ];
};

const images = [
  "/profits/2025-4.png",
  "/profits/2025-5.png",
  "/profits/2025-6.png",
  "/profits/2025-cover.png",
  "/profits/2025-4.png",
  "/profits/2025-4-kaito.png",
  "/profits/2025-5.png",
  "/profits/2025-4.png",
  "/profits/2025-5.png",
  "/profits/2025-cover.png",
  "/profits/2025-4-kaito.png",
  "/profits/2025-6.png",
  "/profits/2025-5.png",
  "/profits/2025-6.png",
  "/profits/2025-4-moodeng.png",
  "/profits/2025-cover.png",
  "/profits/2025-5.png",
  "/profits/2025-cover.png",
  "/profits/2025-4.png",
  "/profits/2025-6.png",
  "/profits/2025-5.png",
  "/profits/2025-cover.png",
  "/profits/2025-4-kaito.png",
  "/profits/2025-6.png",
  "/profits/2025-5.png",
  "/profits/2025-cover.png",
  "/profits/2025-4.png",
  "/profits/2025-6.png",
  "/profits/2025-5.png",
  "/profits/2025-cover.png",
  "/profits/2025-4-moodeng.png",
  "/profits/2025-6.png",
];

const HistoricalEarnings: React.FC = () => {
  const data = getHistoricalData();

  return (
    <div id="profits" className="w-full">
      <ThreeDMarquee images={images} />
    </div>
  );
};

export default HistoricalEarnings;