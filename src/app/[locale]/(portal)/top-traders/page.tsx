"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TopTrader } from '@/types/top-traders';
import { convertDbTraderToDisplay } from '@/lib/topTradersMigration';
import type { TopTrader as DbTrader } from '@/lib/supabase';
import { LeaderboardPeriod } from '@/types/top-traders';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import ShineButton from '@/components/custom/ShineButton';

export default function TopTradersPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [traders, setTraders] = useState<TopTrader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch traders from API
  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/top-traders');

        if (!response.ok) {
          throw new Error('Failed to fetch traders');
        }

        const dbTraders: DbTrader[] = await response.json();
        const displayTraders = dbTraders.map(convertDbTraderToDisplay);
        setTraders(displayTraders);
      } catch (err) {
        console.error('Error fetching traders:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getReturnColor = (value: number) => {
    if (value >= 30) return 'text-green-600 dark:text-green-400';
    if (value >= 20) return 'text-blue-600 dark:text-blue-400';
    return 'text-gray-900 dark:text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin w-12 h-12 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg font-bold text-black dark:text-white">
            {isZh ? '加载中...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            {isZh ? '加载失败' : 'Failed to load'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (traders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
          {isZh ? '暂无数据' : 'No data available'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
              {isZh ? '交易员排行榜' : 'Trader Leaderboard'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '天梯' : 'Leaderboard'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '顶尖交易员季度排名，见证卓越交易表现'
              : 'Top traders quarterly ranking, witness excellent trading performance'}
          </p>
          <p className="text-sm text-gray-400 mt-4">
            {isZh ? '数据每季度更新一次' : 'Data updated quarterly'}
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{traders.length}</span> {isZh ? '位交易员' : 'Traders'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(traders.reduce((sum, t) => sum + t.monthlyReturn, 0) / traders.length)}%
              </span> {isZh ? '平均月收益' : 'Avg Monthly Return'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(traders.reduce((sum, t) => sum + t.winRate, 0) / traders.length)}%
              </span> {isZh ? '平均胜率' : 'Avg Win Rate'}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {traders.slice(0, 3).map((trader, index) => (
            <motion.div
              key={trader.traderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-900 border-2 p-6 ${
                trader.rank === 1
                  ? 'border-yellow-500 order-first md:order-2'
                  : trader.rank === 2
                  ? 'border-gray-400 order-2 md:order-first'
                  : 'border-orange-600 order-3'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{getRankBadge(trader.rank)}</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                  {trader.nickname}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {trader.country}
                </p>
                <div className={`text-3xl font-black mb-2 ${getReturnColor(trader.monthlyReturn)}`}>
                  +{formatNumber(trader.monthlyReturn)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {isZh ? '月收益率' : 'Monthly Return'}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{isZh ? '胜率' : 'Win Rate'}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatNumber(trader.winRate)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{isZh ? '交易数' : 'Trades'}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{trader.totalTrades}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left font-bold text-sm">
                    {isZh ? '排名' : 'Rank'}
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-sm">
                    {isZh ? '交易员' : 'Trader'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '月收益%' : 'Monthly %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '总收益%' : 'Total %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '胜率%' : 'Win Rate %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '盈利因子' : 'Profit Factor'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '最大回撤%' : 'Max DD %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '夏普比率' : 'Sharpe'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '账户规模' : 'Account'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '当前仓位' : 'Position'}
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-sm">
                    {isZh ? '矩阵' : 'Matrix'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {traders.map((trader, index) => (
                  <motion.tr
                    key={trader.traderId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 font-bold text-sm">
                        {getRankBadge(trader.rank)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {trader.nickname}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {trader.country} • {trader.tradingDays} {isZh ? '天' : 'days'}
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-right font-bold ${getReturnColor(trader.monthlyReturn)}`}>
                      +{formatNumber(trader.monthlyReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-gray-900 dark:text-white">
                      +{formatNumber(trader.totalReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.winRate)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.profitFactor)}
                    </td>
                    <td className="px-4 py-4 text-right text-red-600 dark:text-red-400">
                      -{formatNumber(trader.maxDrawdown)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.sharpeRatio)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(trader.accountSize)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(trader.currentPosition)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {trader.inMatrix ? (
                        <span className="inline-block w-5 h-5 text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="inline-block w-5 h-5 text-gray-400">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics Legend */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            {isZh ? '指标说明' : 'Metrics Explanation'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '月收益率：' : 'Monthly Return: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '当月账户增长百分比' : 'Account growth percentage for the month'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '胜率：' : 'Win Rate: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '盈利交易占比' : 'Percentage of profitable trades'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '盈利因子：' : 'Profit Factor: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '总盈利/总亏损' : 'Total profit / Total loss'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '夏普比率：' : 'Sharpe Ratio: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '风险调整后收益' : 'Risk-adjusted returns'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '当前仓位：' : 'Current Position: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '当前持仓规模' : 'Current position size'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '矩阵：' : 'Matrix: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '是否在交易矩阵中' : 'Whether in trading matrix'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Trading CTA Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black border-t-2 border-gray-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)',
            color: 'white'
          }} />
        </div>

        {/* Animated Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-1 bg-white dark:bg-white origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white dark:bg-white origin-right"
        />

        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-6 py-2 bg-white dark:bg-gray-800 text-black dark:text-white text-sm font-bold tracking-wider border-2 border-white dark:border-white">
              {isZh ? '顶尖交易员跟单服务' : 'TOP TRADER COPY TRADING SERVICE'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-center mb-4 text-white dark:text-white"
          >
            {isZh ? '跟随高手，稳健盈利' : 'Follow Experts, Steady Profits'}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-6 text-gray-300 dark:text-gray-300"
          >
            {isZh ? '跟单天梯排行榜中的顶尖交易员' : 'Copy Trade Top Traders from the Leaderboard'}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12 text-gray-400 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {isZh
              ? '通过我们的跟单服务，您可以自动复制榜单上顶尖交易员的交易策略。无需盯盘，专业团队为您把关，让您的资金跟随高手一起成长。'
              : 'Through our copy trading service, you can automatically replicate the trading strategies of top traders on the leaderboard. No need to monitor the market, our professional team manages everything for you.'}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/20 p-4 text-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl mb-2 text-white dark:text-white">💰</div>
              <div className="text-sm font-bold text-white dark:text-white mb-1">
                {isZh ? '15万美金起' : '$150K Minimum'}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-400">
                {isZh ? '起步门槛' : 'Starting Capital'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/20 p-4 text-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl mb-2 text-white dark:text-white">🎯</div>
              <div className="text-sm font-bold text-white dark:text-white mb-1">
                {isZh ? '实时跟单' : 'Real-time Copy'}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-400">
                {isZh ? '毫秒级同步' : 'Millisecond Sync'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/20 p-4 text-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl mb-2 text-white dark:text-white">🛡️</div>
              <div className="text-sm font-bold text-white dark:text-white mb-1">
                {isZh ? '风控保护' : 'Risk Protection'}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-400">
                {isZh ? '智能止损' : 'Smart Stop Loss'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/20 p-4 text-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl mb-2 text-white dark:text-white">📊</div>
              <div className="text-sm font-bold text-white dark:text-white mb-1">
                {isZh ? '透明报告' : 'Transparent Reports'}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-400">
                {isZh ? '每日推送' : 'Daily Updates'}
              </div>
            </motion.div>
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white/5 border-2 border-white/20 p-6 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="text-white text-xl mt-0.5">✓</div>
                <div>
                  <strong className="text-white block mb-1">
                    {isZh ? '精选交易员' : 'Vetted Traders'}
                  </strong>
                  {isZh
                    ? '只跟单天梯排行榜中经过严格筛选的顶尖交易员，确保稳定盈利能力'
                    : 'Only copy trade rigorously vetted top traders from the leaderboard with proven track records'}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white text-xl mt-0.5">✓</div>
                <div>
                  <strong className="text-white block mb-1">
                    {isZh ? '资金安全' : 'Capital Security'}
                  </strong>
                  {isZh
                    ? '您的资金在您的券商账户中，我们仅提供信号服务，资金安全可控'
                    : 'Your funds stay in your broker account, we only provide trading signals for maximum security'}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white text-xl mt-0.5">✓</div>
                <div>
                  <strong className="text-white block mb-1">
                    {isZh ? '灵活配置' : 'Flexible Settings'}
                  </strong>
                  {isZh
                    ? '可自定义跟单比例、止损止盈等参数，完全控制您的风险偏好'
                    : 'Customize copy ratio, stop loss/profit parameters to match your risk preferences'}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white text-xl mt-0.5">✓</div>
                <div>
                  <strong className="text-white block mb-1">
                    {isZh ? '专业团队' : 'Professional Team'}
                  </strong>
                  {isZh
                    ? '专业技术团队7x24小时监控，确保跟单系统稳定运行'
                    : 'Professional technical team monitors 24/7 to ensure stable copy trading system'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mb-8"
          >
            <ShineButton
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-12 py-5 bg-white dark:bg-white text-black dark:text-black text-xl font-bold border-4 border-white dark:border-white hover:bg-black hover:text-white dark:hover:bg-gray-800 dark:hover:text-white shadow-2xl"
            >
              {isZh ? '立即申请跟单' : 'Apply for Copy Trading Now'}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                →
              </motion.span>
            </ShineButton>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 italic"
          >
            {isZh
              ? '注：跟单服务最低起步金额为15万美金，提交申请后我们的团队将在24小时内联系您'
              : 'Note: Minimum starting capital is $150,000 USD. Our team will contact you within 24 hours after submission'}
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-20 h-20 border-4 border-white/10 dark:border-white/10"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white/10 dark:border-white/10"
        />
      </section>

      {/* Email Modal */}
      <EmailContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isZh ? '跟单服务申请' : 'Copy Trading Application'}
      />
    </div>
  );
}
