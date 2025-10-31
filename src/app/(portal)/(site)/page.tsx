"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';

const DummyContent = () => {
  const router = useRouter();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className="w-full pt-20">{/* Added pt-20 for fixed navbar */}
      <BackgroundBeamsWithCollision>
        <div className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
          <div className="w-full">
            <Flex width="100%" align="center" justify="center" direction="column">
              <div className="mb-4 flex justify-center">
                <span className="px-4 py-2 bg-black text-white text-sm font-semibold border border-gray-800">
                  Professional FX Trader Training Platform
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
                <span className="font-black">FX</span> <span className="font-normal text-gray-600 dark:text-gray-400">Killer</span>
              </h1>
              <p className="text-2xl md:text-3xl text-center text-gray-700 dark:text-gray-200 mb-12 font-semibold">
                精准、专业、高效 - 培养真正的外汇交易专家
              </p>
            </Flex>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => router.push('/splan/join-us')}
                className="px-10 py-5 bg-black text-white text-lg font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                了解外汇培训
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-10 py-5 bg-white text-black text-lg font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                进入交易系统
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* 核心价值 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          为什么选择 FX Killer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">精准筛选</h3>
            <p className="text-gray-600 dark:text-gray-400">
              30个工作日内判断是否适合外汇交易，避免浪费时间。不适合我们会如实告知，适合则全力培养。
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">快速成长</h3>
            <p className="text-gray-600 dark:text-gray-400">
              科学避开错误定式，让合适的人在30个工作日内达到专家10-20年的外汇交易水平。
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">高额分成</h3>
            <p className="text-gray-600 dark:text-gray-400">
              战利品至少60%属于你，随能力提升最高可达90%以上。荣辱与共，合作共赢。
            </p>
          </div>
        </div>
      </div>

      {/* 职业发展路径 */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 border-y-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
            职业发展路径
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            30个工作日系统化培养，从新手到职业外汇交易员
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-black dark:bg-white"></div>

            <div className="space-y-12">
              {/* Phase 1 */}
              <div className="relative flex items-center md:justify-between">
                <div className="hidden md:block w-5/12"></div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black dark:bg-white border-4 border-white dark:border-gray-900 items-center justify-center z-10">
                  <span className="text-white dark:text-black font-bold text-lg">1</span>
                </div>
                <div className="w-full md:w-5/12 md:pl-8">
                  <div className="bg-white dark:bg-gray-800 p-6 border-l-4 border-black dark:border-white">
                    <div className="inline-block px-4 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold mb-3">
                      第1-5个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">规则学习</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      完成15个标准进场点练习，熟悉外汇交易系统基本规则
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-500 p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        ⚠️ 3天不能完成规则考核将被劝退
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative flex items-center md:justify-between">
                <div className="w-full md:w-5/12 md:pr-8 md:text-right">
                  <div className="bg-white dark:bg-gray-800 p-6 border-l-4 md:border-l-0 md:border-r-4 border-gray-600 dark:border-gray-400">
                    <div className="inline-block px-4 py-1 bg-gray-600 dark:bg-gray-400 text-white dark:text-black text-sm font-semibold mb-3">
                      第6-20个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">盈利练习</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      找到适合自己的外汇交易品种，按照盈利考核标准进行练习
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-600 p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        💡 保持操作一致性，不错单、不漏单、不亏损
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-600 dark:bg-gray-400 border-4 border-white dark:border-gray-900 items-center justify-center z-10">
                  <span className="text-white dark:text-black font-bold text-lg">2</span>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>

              {/* Phase 3 */}
              <div className="relative flex items-center md:justify-between">
                <div className="hidden md:block w-5/12"></div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 dark:bg-gray-300 border-4 border-white dark:border-gray-900 items-center justify-center z-10">
                  <span className="text-white dark:text-black font-bold text-lg">3</span>
                </div>
                <div className="w-full md:w-5/12 md:pl-8">
                  <div className="bg-white dark:bg-gray-800 p-6 border-l-4 border-gray-700 dark:border-gray-300">
                    <div className="inline-block px-4 py-1 bg-gray-700 dark:bg-gray-300 text-white dark:text-black text-sm font-semibold mb-3">
                      第21-30个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">盈利考核</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      连续10个工作日每天做到不错单、不漏单、不亏损
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-700 p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        ✅ 通过考核进入小额实盘阶段
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative flex items-center md:justify-between">
                <div className="w-full md:w-5/12 md:pr-8 md:text-right">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 border-l-4 md:border-l-0 md:border-r-4 border-black dark:border-white">
                    <div className="inline-block px-4 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold mb-3">
                      小额实盘 → 大额矩阵
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">职业交易员</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      20个工作日小额实盘固化后，进入大额矩阵
                    </p>
                    <div className="bg-white dark:bg-gray-700 border-l-4 border-black p-3">
                      <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                        🎯 完全自由的工作时间，开始独立外汇交易员生涯
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black dark:bg-white border-4 border-white dark:border-gray-900 items-center justify-center z-10">
                  <span className="text-white dark:text-black font-bold text-lg">★</span>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 基本要求 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          你是否符合基本条件
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          严格的准入标准，确保外汇培训质量
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 人群画像 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black dark:bg-white flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">人群画像</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">学历与年龄</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">大专学历以上，35岁以下</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">心理素质</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">认真、细心、耐心、心理健康</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">性格特质</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">性格内向、稳重、纪律严明且执行力强</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 基本要求 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black dark:bg-white flex items-center justify-center">
                <span className="text-4xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">基本要求</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">时间投入</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">连续30个工作日（约45天），Windows电脑</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">环境要求</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">独立的交易环境，专注不被打扰</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">在线时间</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">周一到周五 13:30-21:30 在线</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">团队复盘</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">每天20:00团队长会议室复盘</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <svg className="w-6 h-6 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">重要提醒</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                每个人<strong>只有一次进入的机会</strong>。请在充分了解并确认自己符合全部条件后再申请。我们专注培养真正适合外汇交易的人才。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black dark:bg-gray-950 py-20 w-full border-y-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开启你的外汇交易员生涯了吗？
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            记住：最大风险是淘汰，成本是时间。若明朗、准备就绪，预约面试。通过后，入训。
          </p>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-10 py-5 bg-white text-black font-bold text-lg border-2 border-white hover:bg-black hover:text-white transition-colors"
          >
            立即预约面试
          </button>
        </div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#000"
        />
      </div>
      <DummyContent />
    </div>
  );
}
