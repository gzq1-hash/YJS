"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  email: string;
  message: string;
}

// 生成随机Gmail邮箱（中间部分用*替代）
function generateRandomEmail(): string {
  const prefixes = ['user', 'trader', 'investor', 'crypto', 'finance', 'bitcoin', 'eth', 'trade', 'market', 'pro'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNum = Math.floor(Math.random() * 9999);

  // 邮箱格式: us***23@gmail.com
  const visibleStart = prefix.substring(0, 2);
  const visibleEnd = randomNum.toString().substring(0, 2);

  return `${visibleStart}***${visibleEnd}@gmail.com`;
}

// 随机消息内容
function getRandomMessage(): string {
  const messages = [
    '已联系团队长参加外汇交易员培训',
    '已成为试用会员'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function SubscriptionNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const showNotification = () => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        email: generateRandomEmail(),
        message: getRandomMessage(),
      };

      setNotifications(prev => [...prev, newNotification]);

      // 3秒后自动移除通知
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 3000);
    };

    // 首次延迟2秒显示
    const initialTimeout = setTimeout(showNotification, 2000);

    // 之后每8-15秒随机显示一次
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 7000 + 8000); // 8-15秒随机间隔

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
            }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            transition={{
              duration: 0.3,
            }}
            className="mb-3 pointer-events-auto"
          >
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 max-w-sm">
              <div className="flex items-start gap-3">
                {/* 图标 */}
                <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-sm">NEW</span>
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                    {notification.email}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    刚刚
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
