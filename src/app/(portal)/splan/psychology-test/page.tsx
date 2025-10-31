"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface QuestionOption {
  text: string;
  score: number;
}

interface Question {
  id: number;
  category: string;
  dimension: keyof typeof DIMENSIONS;
  text: string;
  options: QuestionOption[];
}

interface DimensionConfig {
  name: string;
  icon: string;
  color: string;
}

interface ScoreResult {
  total: number;
  percentage: number;
  dimensions: {
    [key: string]: {
      score: number;
      count: number;
      average: number;
      percentage: number;
    };
  };
}

// Dimensions configuration
const DIMENSIONS: Record<string, DimensionConfig> = {
  risk: { name: "风险承受能力", icon: "R", color: "#000000" },
  emotion: { name: "情绪控制能力", icon: "E", color: "#000000" },
  decision: { name: "决策能力", icon: "D", color: "#000000" },
  discipline: { name: "纪律性", icon: "D", color: "#000000" },
  stress: { name: "压力管理", icon: "S", color: "#000000" },
};

// 20 questions data
const QUESTIONS: Question[] = [
  // Risk tolerance (4 questions)
  {
    id: 1,
    category: "风险承受能力",
    dimension: "risk",
    text: "当您的交易账户在一天内亏损10%时，您会如何反应？",
    options: [
      { text: "立即平仓，停止交易", score: 1 },
      { text: "感到焦虑，但继续观察", score: 2 },
      { text: "保持冷静，分析原因", score: 3 },
      { text: "认为这是正常波动，继续执行策略", score: 4 },
    ],
  },
  {
    id: 2,
    category: "风险承受能力",
    dimension: "risk",
    text: "在制定交易计划时，您通常会设定多大的单笔风险敞口？",
    options: [
      { text: "不超过账户的1%", score: 2 },
      { text: "账户的1-2%", score: 4 },
      { text: "账户的2-5%", score: 3 },
      { text: "没有固定标准，根据感觉来", score: 1 },
    ],
  },
  {
    id: 3,
    category: "风险承受能力",
    dimension: "risk",
    text: "您更倾向于哪种交易方式？",
    options: [
      { text: "保守稳健，追求小额稳定收益", score: 2 },
      { text: "平衡风险收益，适度激进", score: 4 },
      { text: "高风险高收益，追求大幅盈利", score: 2 },
      { text: "完全看市场机会决定", score: 1 },
    ],
  },
  {
    id: 4,
    category: "风险承受能力",
    dimension: "risk",
    text: '当看到一个"确定性很高"的交易机会时，您会投入多少仓位？',
    options: [
      { text: "10-20%的仓位", score: 4 },
      { text: "20-40%的仓位", score: 3 },
      { text: "40-60%的仓位", score: 2 },
      { text: "全仓或者加杠杆", score: 1 },
    ],
  },
  // Emotion control (4 questions)
  {
    id: 5,
    category: "情绪控制能力",
    dimension: "emotion",
    text: "当连续出现3次亏损交易后，您的心态会是？",
    options: [
      { text: "非常沮丧，怀疑自己的能力", score: 1 },
      { text: "有些失落，但告诉自己要坚持", score: 2 },
      { text: "保持平静，回顾交易寻找问题", score: 4 },
      { text: "完全不受影响，这是交易的一部分", score: 3 },
    ],
  },
  {
    id: 6,
    category: "情绪控制能力",
    dimension: "emotion",
    text: "盈利时，您会有怎样的情绪反应？",
    options: [
      { text: "兴奋激动，想要加大仓位", score: 1 },
      { text: "高兴，但会提醒自己保持理性", score: 3 },
      { text: "平静记录，继续执行计划", score: 4 },
      { text: "担心盈利回吐，想要立即止盈", score: 2 },
    ],
  },
  {
    id: 7,
    category: "情绪控制能力",
    dimension: "emotion",
    text: "在重要的经济数据发布前，您的状态通常是？",
    options: [
      { text: "紧张焦虑，难以集中注意力", score: 1 },
      { text: "有些紧张，但能控制", score: 2 },
      { text: "保持警觉，但情绪稳定", score: 4 },
      { text: "完全放松，按计划行事", score: 3 },
    ],
  },
  {
    id: 8,
    category: "情绪控制能力",
    dimension: "emotion",
    text: "当市场走势与您的预判完全相反时？",
    options: [
      { text: '固执己见，等待市场"回头"', score: 1 },
      { text: "情绪波动，但会考虑止损", score: 2 },
      { text: "立即止损，重新分析", score: 4 },
      { text: "保持冷静，检查止损位", score: 3 },
    ],
  },
  // Decision making (4 questions)
  {
    id: 9,
    category: "决策能力",
    dimension: "decision",
    text: "您在进行交易决策时主要依据什么？",
    options: [
      { text: "直觉和感觉", score: 1 },
      { text: "技术指标和图表", score: 3 },
      { text: "基本面分析", score: 3 },
      { text: "综合分析和交易系统", score: 4 },
    ],
  },
  {
    id: 10,
    category: "决策能力",
    dimension: "decision",
    text: "面对突发市场事件，您通常会？",
    options: [
      { text: "立即跟随市场情绪操作", score: 1 },
      { text: "先观望，再做决定", score: 3 },
      { text: "按照预案执行", score: 4 },
      { text: "暂停交易，等待明朗", score: 2 },
    ],
  },
  {
    id: 11,
    category: "决策能力",
    dimension: "decision",
    text: "您制定交易计划的频率是？",
    options: [
      { text: "没有固定计划，随机应变", score: 1 },
      { text: "偶尔做计划", score: 2 },
      { text: "每周制定计划", score: 3 },
      { text: "每次交易前都有详细计划", score: 4 },
    ],
  },
  {
    id: 12,
    category: "决策能力",
    dimension: "decision",
    text: "在决策时间紧迫的情况下，您的表现如何？",
    options: [
      { text: "容易慌乱，做出冲动决定", score: 1 },
      { text: "有些紧张，但能做决定", score: 2 },
      { text: "保持冷静，快速分析", score: 4 },
      { text: "宁愿错过，也不冲动", score: 3 },
    ],
  },
  // Discipline (4 questions)
  {
    id: 13,
    category: "纪律性",
    dimension: "discipline",
    text: "您设置止损后，执行情况如何？",
    options: [
      { text: "经常移动或取消止损", score: 1 },
      { text: "有时会调整止损", score: 2 },
      { text: "基本严格执行", score: 3 },
      { text: "始终严格执行", score: 4 },
    ],
  },
  {
    id: 14,
    category: "纪律性",
    dimension: "discipline",
    text: "关于交易日志，您的习惯是？",
    options: [
      { text: "从不记录", score: 1 },
      { text: "偶尔记录重要交易", score: 2 },
      { text: "经常记录", score: 3 },
      { text: "每笔交易都详细记录", score: 4 },
    ],
  },
  {
    id: 15,
    category: "纪律性",
    dimension: "discipline",
    text: "当达到预定的盈利目标后，您会？",
    options: [
      { text: "继续交易，想赚更多", score: 1 },
      { text: "视情况而定", score: 2 },
      { text: "通常会停止交易", score: 3 },
      { text: "严格执行，立即停止", score: 4 },
    ],
  },
  {
    id: 16,
    category: "纪律性",
    dimension: "discipline",
    text: "您是否会在情绪化的状态下进行交易？",
    options: [
      { text: "经常会", score: 1 },
      { text: "有时会", score: 2 },
      { text: "很少会", score: 3 },
      { text: "从不会", score: 4 },
    ],
  },
  // Stress management (4 questions)
  {
    id: 17,
    category: "压力管理",
    dimension: "stress",
    text: "在高强度交易期间，您的睡眠质量如何？",
    options: [
      { text: "严重失眠，无法休息", score: 1 },
      { text: "睡眠质量下降", score: 2 },
      { text: "稍有影响，但基本正常", score: 3 },
      { text: "完全不受影响", score: 4 },
    ],
  },
  {
    id: 18,
    category: "压力管理",
    dimension: "stress",
    text: "当面临重大交易决策的压力时，您会？",
    options: [
      { text: "感到巨大压力，影响判断", score: 1 },
      { text: "有压力，但能够应对", score: 2 },
      { text: "压力适中，反而更专注", score: 4 },
      { text: "没有压力，平常心对待", score: 3 },
    ],
  },
  {
    id: 19,
    category: "压力管理",
    dimension: "stress",
    text: "交易之外，您如何缓解压力？",
    options: [
      { text: "没有固定的方式", score: 1 },
      { text: "偶尔做些放松活动", score: 2 },
      { text: "定期运动或冥想", score: 4 },
      { text: "有完整的压力管理计划", score: 3 },
    ],
  },
  {
    id: 20,
    category: "压力管理",
    dimension: "stress",
    text: "长期交易对您的生活影响如何？",
    options: [
      { text: "严重影响生活和人际关系", score: 1 },
      { text: "有一定影响", score: 2 },
      { text: "影响较小，能平衡", score: 3 },
      { text: "完全平衡，互不干扰", score: 4 },
    ],
  },
];

export default function PsychologyTestPage() {
  const [screen, setScreen] = useState<'welcome' | 'test' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [scores, setScores] = useState<ScoreResult | null>(null);

  const startTest = () => {
    setScreen('test');
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUESTIONS.length).fill(-1));
  };

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateAndShowResults(newAnswers);
      }
    }, 300);
  };

  const calculateAndShowResults = (finalAnswers: number[]) => {
    const result: ScoreResult = {
      total: 0,
      percentage: 0,
      dimensions: {},
    };

    // Initialize dimensions
    Object.keys(DIMENSIONS).forEach(key => {
      result.dimensions[key] = { score: 0, count: 0, average: 0, percentage: 0 };
    });

    // Calculate scores
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const question = QUESTIONS[questionIndex];
      const score = question.options[answerIndex].score;
      result.total += score;
      result.dimensions[question.dimension].score += score;
      result.dimensions[question.dimension].count++;
    });

    // Calculate percentages
    const maxScore = QUESTIONS.length * 4;
    result.percentage = Math.round((result.total / maxScore) * 100);

    Object.keys(result.dimensions).forEach(dim => {
      const dimData = result.dimensions[dim];
      dimData.average = dimData.count > 0 ? dimData.score / dimData.count : 0;
      dimData.percentage = Math.round((dimData.average / 4) * 100);
    });

    setScores(result);
    setScreen('result');
  };

  const getScoreLevel = (percentage: number) => {
    if (percentage >= 85) {
      return {
        level: "优秀交易员",
        description: "您展现出了出色的交易心理素质。在风险控制、情绪管理、决策能力等方面都表现优异。继续保持这种专业的交易态度，您很可能成为一名成功的交易员。",
        color: "#000000"
      };
    } else if (percentage >= 70) {
      return {
        level: "良好交易员",
        description: "您具备较好的交易心理素质，在多个维度上表现良好。通过持续学习和实践，关注弱项的改进，您有很大的提升空间。",
        color: "#374151"
      };
    } else if (percentage >= 55) {
      return {
        level: "合格交易员",
        description: "您具备基本的交易心理素质，但在某些方面还需要加强。建议重点关注得分较低的维度，通过学习和训练来提升。",
        color: "#6b7280"
      };
    } else {
      return {
        level: "需要提升",
        description: "您的交易心理素质还有很大的提升空间。建议在进行实盘交易前，先系统学习交易心理学，并通过模拟交易来锻炼心理素质。",
        color: "#9ca3af"
      };
    }
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {screen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 p-12 border-2 border-gray-200 dark:border-gray-700 text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex p-6 bg-black dark:bg-white mb-8 border-2 border-black dark:border-white">
                <svg className="w-16 h-16 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">交易员心理测试</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">全面评估您的交易心理素质</p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white">
                    <span className="text-white dark:text-black font-bold text-sm">时长</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">测试时长</h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">约 5-8 分钟</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white">
                    <span className="text-white dark:text-black font-bold text-sm">题目</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">题目数量</h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">20 道题目</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white">
                    <span className="text-white dark:text-black font-bold text-sm">维度</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">评估维度</h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">5 个核心维度</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 mb-10 text-left border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white">测试维度包括：</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(DIMENSIONS).map((dim, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold">{dim.icon}</span>
                      <span>{dim.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={startTest}
                className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
              >
                开始测试
              </button>

              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">请根据您的真实感受作答，没有对错之分</p>
            </motion.div>
          )}

          {/* Test Screen */}
          {screen === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress Bar */}
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 mb-8">
                <div className="flex justify-between mb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <span>问题 {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                  <span className="text-black dark:text-white">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    className="h-full bg-black dark:bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-gray-800 p-10 border-2 border-gray-200 dark:border-gray-700 min-h-[450px]"
              >
                <div className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold mb-6">
                  {currentQuestion.category}
                </div>
                <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white leading-snug">
                  {currentQuestion.text}
                </h2>
                <div className="flex flex-col gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => selectOption(index)}
                      whileHover={{ x: 8 }}
                      className={`w-full p-5 text-left border-2 transition-all ${
                        answers[currentQuestionIndex] === index
                          ? 'bg-gray-100 dark:bg-gray-700 border-black dark:border-white text-black dark:text-white font-semibold'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-600 dark:hover:border-gray-500'
                      }`}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Results Screen */}
          {screen === 'result' && scores && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-12">
                <div className="inline-block mb-4 px-6 py-3 bg-black dark:bg-white">
                  <span className="text-white dark:text-black font-bold text-2xl">完成</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">测试完成</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">您的交易心理素质评估报告</p>
              </div>

              {/* Overall Score */}
              <div className="bg-white dark:bg-gray-800 p-10 border-2 border-gray-200 dark:border-gray-700 mb-8 flex items-center gap-12">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" className="dark:stroke-gray-700"/>
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#000000"
                      className="dark:stroke-white"
                      strokeWidth="12"
                      strokeLinecap="square"
                      strokeDasharray={565.48}
                      initial={{ strokeDashoffset: 565.48 }}
                      animate={{ strokeDashoffset: 565.48 - (scores.percentage / 100) * 565.48 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-black dark:text-white">{scores.percentage}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">综合得分</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{getScoreLevel(scores.percentage).level}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{getScoreLevel(scores.percentage).description}</p>
                </div>
              </div>

              {/* Dimension Scores */}
              <div className="bg-white dark:bg-gray-800 p-10 border-2 border-gray-200 dark:border-gray-700 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">各维度得分</h3>
                <div className="flex flex-col gap-6">
                  {Object.keys(DIMENSIONS).map((key, index) => {
                    const dim = DIMENSIONS[key];
                    const data = scores.dimensions[key];
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold">{dim.icon}</span>
                            {dim.name}
                          </span>
                          <span className="font-bold text-black dark:text-white">{data.percentage}分</span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                          <motion.div
                            className="h-full bg-black dark:bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${data.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-800 p-10 border-2 border-gray-200 dark:border-gray-700 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">改进建议</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "学习", title: "系统学习", text: "深入学习交易心理学和行为金融学，理解交易中的心理陷阱和认知偏差。" },
                    { label: "记录", title: "记录交易日志", text: "详细记录每笔交易的心理状态、决策过程和结果，定期回顾总结。" },
                    { label: "训练", title: "模拟训练", text: "通过模拟交易来锻炼决策能力和情绪控制，在无风险环境中提升技能。" },
                    { label: "专注", title: "冥想练习", text: "每天进行10-15分钟的冥想，提升专注力和情绪管理能力。" },
                  ].map((rec, index) => (
                    <div key={index} className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                      <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white flex items-center justify-center border-2 border-black dark:border-white">
                        <span className="text-white dark:text-black font-bold text-xs">{rec.label}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{rec.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (confirm('确定要重新开始测试吗？当前结果将会丢失。')) {
                      startTest();
                    }
                  }}
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  重新测试
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
