"use client";

import React, { useEffect, useState } from 'react';
import { fetchTopCryptos, connectWebSocket, disconnectWebSocket } from '@/commons/fetchCryptoData';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Marquee } from "@/components/magicui/marquee";
import {Flex, Text} from "@radix-ui/themes";
import {Separator} from "@/components/ui/separator";

// 定义 WebSocket 返回的数据结构
interface CryptoData {
  c: string; // 最新价格
  P: string; // 24小时价格变化百分比
}

export default function CryptoMarquee() {
  const [cryptos, setCryptos] = useState<string[]>([]); // 货币符号列表
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({}); // 实时数据

  // 初始化数据和 WebSocket 连接
  useEffect(() => {
    async function loadData() {
      const topCryptos = await fetchTopCryptos(); // 获取前 20 个货币
      setCryptos(topCryptos);
      connectWebSocket(topCryptos, setCryptoData); // 建立 WebSocket 连接
    }
    loadData();

    // 组件卸载时断开 WebSocket
    return () => disconnectWebSocket();
  }, []);

  return (
    <Marquee pauseOnHover className="[--duration:60s] bg-black">
      {cryptos.map((symbol) => {
        const data = cryptoData[symbol];
        if (!data) return null; // 数据未加载时跳过渲染

        const currentPrice = parseFloat(data.c); // 最新价格
        const priceChangePercent = parseFloat(data.P); // 当日涨跌幅

        const arrow = priceChangePercent > 0 ? (
          <ArrowUp className="inline text-green-500" size="16" />
        ) : priceChangePercent < 0 ? (
          <ArrowDown className="inline text-red-500" size="16" />
        ) : null; // 涨跌箭头

        const prize = priceChangePercent > 0 ? (
          <Text className="text-green-500">{currentPrice.toFixed(4)}</Text>
        ) : priceChangePercent < 0 ? (
          <Text className="text-red-500">{currentPrice.toFixed(4)}</Text>
        ) : null; // 涨跌箭头

        return (
          <Flex align="center" justify="center" key={symbol} width="180px">
            {arrow}
            <Text ml="1" className="text-white">{priceChangePercent.toFixed(2)}%</Text>
            <Text ml="2" className="text-white">{symbol}</Text>
            <div className="ml-2">
              {prize}
            </div>
          </Flex>
        );
      })}
    </Marquee>
  );
}