"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // 计算捐赠金额：从2025年10月1日开始，每天增加$5
  useEffect(() => {
    const startDate = new Date('2025-10-01T00:00:00');
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentAmount = 999 + (daysPassed * 5);
    setDonationAmount(Math.max(999, currentAmount)); // 最低999
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black dark:bg-white border-b-4 border-black dark:border-white">
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-white dark:text-black"
          >
            全球试用会员招募
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 dark:text-gray-800 max-w-2xl mx-auto"
          >
            自2025年10月1日起全球范围接受捐赠成为90天试用会员
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Donation Amount Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">当前捐赠金额</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-6xl font-bold text-black dark:text-white">
                ${donationAmount}
              </span>
              <span className="text-2xl text-gray-600 dark:text-gray-400">USDT/USDC</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 text-xs font-bold">提示</span> 金额每日自动增加 $5
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white p-4 text-left">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong className="text-black dark:text-white">支付方式：</strong>仅接受 USDT 或 USDC 加密货币捐赠
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            试用会员权益
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white">
              <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-white dark:text-black font-bold">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  顶尖交易员集训
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  参与会员社区的顶尖交易员集训课程，学习专业交易技术和策略
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white">
              <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-white dark:text-black font-bold">B</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  21天教练陪跑
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  专业教练一对一指导，21天密集训练，快速提升交易能力
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white">
              <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-white dark:text-black font-bold">C</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  挑战晋级机会
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  成绩优异可自愿参与挑战，挑战成功获得终身进阶受训资格
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenge Success Reward */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              挑战成功奖励
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              证明自己的实力，获得终身职业发展机会
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-sm mr-2">A</span>
                终身进阶受训
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                获得终身进阶培训资格，持续提升交易技能，成为顶尖交易员
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-sm mr-2">B</span>
                1-20万$ MOM操作权
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                获得 1万到20万美元的资金管理权限，在顶尖矩阵俱乐部进行实盘操作
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black dark:bg-white p-8 border-2 border-black dark:border-white"
        >
          <h2 className="text-2xl font-bold mb-4 text-white dark:text-black">
            <span className="bg-white dark:bg-black text-black dark:text-white px-2 py-1 text-sm mr-2">说明</span>
            重要说明
          </h2>
          <div className="space-y-3 text-gray-200 dark:text-gray-800">
            <p className="flex items-start gap-2">
              <span className="text-white dark:text-black font-bold">•</span>
              <span>捐赠将默认为<strong className="text-white dark:text-black">私人自愿行为</strong>，无任何商业承诺和约束力</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-white dark:text-black font-bold">•</span>
              <span>试用会员期限：<strong className="text-white dark:text-black">90天</strong></span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-white dark:text-black font-bold">•</span>
              <span>参与条件：需完成心理测评并通过初步筛选</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-white dark:text-black font-bold">•</span>
              <span>挑战机会：成绩优异者可自愿参与，非强制要求</span>
            </p>
          </div>
        </motion.div>

        {/* How to Donate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-50 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              如何进行捐赠
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              完成心理测评后，通过邮件联系我们获取捐赠地址
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 mb-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
              捐赠流程
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">完成心理测评</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    首先完成心理测评，确保您具备成为职业交易员的心理素质
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">发送邮件申请</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    邮件至 <span className="font-mono text-black dark:text-white font-bold">x.stark.dylan@gmail.com</span>，说明您的意向
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">获取捐赠地址</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    我们将通过邮件回复您具体的 USDT/USDC 捐赠地址
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">完成捐赠并开始培训</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    按照提供的地址完成捐赠后，即可开始90天试用会员培训
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/splan/psychology-test"
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all border-2 border-black dark:border-white text-center"
            >
              立即完成心理测评
            </a>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-bold border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all text-center"
            >
              发送邮件申请
            </button>
          </div>
        </motion.div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="申请成为会员"
      />
    </div>
  );
}
