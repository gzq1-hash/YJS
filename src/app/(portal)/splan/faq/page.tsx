"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';

// FAQ data types
interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  course: FAQ[];
  learning: FAQ[];
  pricing: FAQ[];
  support: FAQ[];
  other: FAQ[];
}

// FAQ data
const faqData: FAQData = {
  course: [
    {
      question: '什么是 FX Killer 外汇交易员培训？',
      answer: '我们是一个专注于筛选和培养顶尖外汇交易员的专业培训平台。我们致力于用最短的时间从大量人群中筛选出少数适合做交易的人才并进行培养。我们将在<strong> 30个工作日</strong>内判断新人是否是做交易的可塑之才。通过考核者将获得资金支持，成为独立交易员或基金经理。'
    },
    {
      question: '为什么筛选如此严格？',
      answer: '我们的理念是<strong>培养真正适合的人，留下极少数，劝返大多数</strong>。在交易的世界里，有些人天生不适合。我们用严格的筛选机制确保只有真正适合的人才能进入。这不是贬低，而是对每个人负责——不让不适合的人在二级市场上成为韭菜。'
    },
    {
      question: '30个工作日会学习什么？',
      answer: '<strong>第1-3天</strong>：完成规则练习，熟悉交易系统基本规则（15个标准进场点不出错）<br/><strong>第3-20天</strong>：盈利练习，找到适合自己的品种，要求连续10个工作日不错单、不漏单、不亏损<br/><strong>第20-40天</strong>：小额实盘训练（如通过盈利考核）<br/>软件到期前不能完成考核，将被劝退。'
    },
    {
      question: '为什么只有一次机会？',
      answer: '因为交易就像做手术，务必严肃，容不得任何不遵守规则的人。一旦开始职业交易训练，会投入大量精力和时间去培养。每个人的时间和精力都很宝贵，我们需要确保双方的投入都是值得的。<strong>匹配度决定一切。</strong>'
    },
    {
      question: '通过考核的概率有多大？',
      answer: '根据历史数据，通过考核的概率<strong> &lt; 18%</strong>。但对你而言，要么是1%，要么是99%。这取决于你是否真正适合做交易，是否严格遵守纪律，是否能承受压力并保持情绪稳定。'
    }
  ],
  learning: [
    {
      question: '培训是免费的吗？',
      answer: '是的，培训过程不收取学费。但你需要付出的是<strong>时间和精力</strong>。免费的往往是最"贵"的——一旦被选中进入培训，需要全身心投入。真正能坚持下来的人虽然不会为金钱所累，但的确"任重道远"。'
    },
    {
      question: '需要什么样的基础条件？',
      answer: '<ul><li>大专学历以上，35岁以下</li><li>认真、细心、耐心、心理健康</li><li>连续30个工作日可投入</li><li>Windows电脑，独立的交易环境</li><li>周一到周五，每天最低保证 13:30 - 21:30 在线</li><li>北京时间20:00参加团队长会议室复盘</li></ul>'
    },
    {
      question: '3天不能完成规则考核会怎样？',
      answer: '3天不能完成规则考核，将<strong>酌情劝退处理</strong>。我们的筛选机制非常严格，如果连基本规则都无法快速掌握，说明可能不适合这个行业。这是为了保护你，避免浪费更多时间。'
    },
    {
      question: '通过考核后可以获得什么？',
      answer: '通过考核后，我们会为你分配资金：<ul><li><strong>小额实盘</strong>：20美金仓位，配资100美金</li><li><strong>大额实盘</strong>：根据小额实盘表现设定</li><li><strong>分润比例</strong>：60%-90%+（随能力提升而提高）</li><li><strong>完全自由</strong>：不受时间空间限制，可以在世界任何角落工作</li></ul>'
    },
    {
      question: '学习过程中可以提问吗？',
      answer: '可以。每天北京时间20:00有团队长会议室复盘，可以直接开麦与团队长沟通。其他时间可以通过微信与团队长联系。但请注意：<strong>学员之间不得加微信、电话等联系方式</strong>，这是纪律红线。'
    }
  ],
  pricing: [
    {
      question: '关于收入、社保、底薪和薪资结构',
      answer: '任何盈利导向的企业，都不会做亏本买卖。在我们这个极简行业，所有价值都源于二级市场的买卖差价——简单、直接、残酷。<strong>在你证明盈利能力（通过考核）之前，我们不会投入一分钱。</strong>考核通过后，你的实际收入，绝不会超过你在"战场"（二级市场）上缴获的"战利品"。'
    },
    {
      question: '通过考核后的收入分配如何？',
      answer: '你在战场获得的战利品，<strong>至少 60% 属于你个人</strong>，随着你的能力提升，这个比例也会随之提高，<strong>至高可达 90% 以上</strong>。剩下的属于我们，所以我们会用心培养每一位准交易员——你战场战利品多，我们战利品也才会多，我们是一条船上的战友，荣辱与共！'
    },
    {
      question: '小额实盘的风控要求是什么？',
      answer: '小额实盘<strong>只有一次机会</strong>，请珍惜：<ul><li>日回撤不超过 20%</li><li>周总回撤不得超过 30%</li><li>超过回撤要求即视为失败，劝退</li></ul>这是硬性规定，目的是培养你的风险管理能力。'
    },
    {
      question: '为什么不需要付学费？',
      answer: '跟传统学科不同，不需要你付出数万美金的"学费"，毕竟这是一个钱生钱的行当。我们的模式是：我们培养你，你通过后我们分享你的战果。这是一种<strong>合作共赢</strong>的关系，而非雇佣关系。你是一个独立的创业者，独立的个体。'
    }
  ],
  support: [
    {
      question: '什么是交易铁律？',
      answer: '交易纪律就像法律法规，触碰一次就会被标上不信任的标签。<strong>一旦触碰，就再也无法进入矩阵团队；第二次触碰红线，直接劝退离开团队。</strong>交易就像做手术，务必严肃，容不得任何不遵守规则的人。'
    },
    {
      question: '交易规则红线有哪些？',
      answer: '<ul><li>硬止损线不能移动，位置务必设置正确</li><li>只有标准和激进两种进场方式（盈利训练阶段额外增加破止损线入场），其他都是错单</li><li>不能跨越红折线持仓</li><li>止损和出场必须满足规则条件，不满足一律按错单处理</li><li>5倍以上利润才能使用止盈线</li></ul>'
    },
    {
      question: '会议纪律红线有哪些？',
      answer: '<ul><li><strong>学员之间不得加微信、电话等联系方式</strong></li><li>会议室内保持严肃，不得谈论除交易外其他话题</li></ul>违反以上任何一条，都将被视为触碰红线。'
    },
    {
      question: '如果不适合做交易会怎样？',
      answer: '如果在30个工作日内，我们判断你不适合做交易，会如实告知，并<strong>劝诫其此生不要踏足二级市场</strong>。这不是侮辱，而是保护。不适合的人进入二级市场，最终只会成为韭菜，亏损累累。我们帮你避免这个结局。'
    }
  ],
  other: [
    {
      question: '为什么说"年轻人更适合"？',
      answer: '国内多数"经验丰富"的中年交易员，往往是失败者：不良习惯缠身，或在不上不下的泥沼中挣扎。<strong>经验有时是枷锁，而非利剑。</strong>真正适配的是20-35岁的年轻人：学习迅捷、适应力强，能直面市场风暴。我们计划在30个工作日内，让年轻人直达那些"专家"10-20年的盈利高度。'
    },
    {
      question: '交易有风险吗？',
      answer: '<strong>交易存在较高风险</strong>，可能导致本金损失。市场波动、杠杆使用、情绪化决策等都可能带来亏损。我们会系统教授风险管理知识，但请务必记住：<strong>交易有风险，投资需谨慎</strong>，不要投入超过您承受能力的资金。'
    },
    {
      question: '我可以一边工作一边参加培训吗？',
      answer: '不可以。培训要求<strong>连续30个工作日</strong>，周一到周五每天最低保证 13:30 - 21:30 在线。这是全职投入的筛选和培养过程。如果无法保证时间投入，建议不要申请，因为这会浪费双方的时间。'
    },
    {
      question: '通过考核后还需要每天在线吗？',
      answer: '不需要。通过考核进入大额矩阵后，你将拥有<strong>完全自由的工作时间</strong>，每天不限制交易量，只需保证每日不亏的底线即可。你可以在阿尔卑斯山滑雪，夏威夷游泳或北海道发呆……金钱会源源不断地自动流入你的口袋。'
    }
  ]
};

// FAQ Item component
const FAQItem = ({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border-2 overflow-hidden transition-all ${
        isOpen ? 'border-black dark:border-white' : 'border-gray-200 dark:border-gray-700 hover:border-gray-600 dark:hover:border-gray-500'
      }`}
    >
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
          isOpen ? 'bg-gray-50 dark:bg-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-900'
        }`}
      >
        <span className="flex-1 pr-4 font-semibold text-base text-gray-900 dark:text-white">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-xl flex-shrink-0 ${isOpen ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const filterFAQs = (faqs: FAQ[]) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">常见问题解答</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">开启职业交易之路前，先读懂这些问题</p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索问题..."
              className="w-full px-5 py-4 pr-12 text-base border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold">
              搜索
            </span>
          </div>
        </div>

        {/* Course FAQs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于 FX Killer</h2>
            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold">
              {filterFAQs(faqData.course).length}个问题
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filterFAQs(faqData.course).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`course-${index}`)}
                onClick={() => toggleItem('course', index)}
              />
            ))}
          </div>
        </section>

        {/* Learning FAQs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于培训</h2>
            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold">
              {filterFAQs(faqData.learning).length}个问题
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filterFAQs(faqData.learning).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`learning-${index}`)}
                onClick={() => toggleItem('learning', index)}
              />
            ))}
          </div>
        </section>

        {/* Pricing FAQs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于收入与分润</h2>
            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold">
              {filterFAQs(faqData.pricing).length}个问题
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filterFAQs(faqData.pricing).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`pricing-${index}`)}
                onClick={() => toggleItem('pricing', index)}
              />
            ))}
          </div>
        </section>

        {/* Support FAQs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">交易铁律</h2>
            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold">
              {filterFAQs(faqData.support).length}个问题
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filterFAQs(faqData.support).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`support-${index}`)}
                onClick={() => toggleItem('support', index)}
              />
            ))}
          </div>
        </section>

        {/* Other FAQs */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">其他问题</h2>
            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold">
              {filterFAQs(faqData.other).length}个问题
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filterFAQs(faqData.other).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`other-${index}`)}
                onClick={() => toggleItem('other', index)}
              />
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <div className="bg-black dark:bg-white p-10 text-center border-2 border-black dark:border-white">
          <h3 className="text-2xl font-bold mb-3 text-white dark:text-black">没有找到答案？</h3>
          <p className="text-base mb-6 text-gray-200 dark:text-gray-800">联系我们的团队长，我们将尽快为您解答</p>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-8 py-3 bg-white dark:bg-black text-black dark:text-white font-semibold border-2 border-white dark:border-black hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            联系团队长
          </button>
        </div>

        {/* Email Contact Modal */}
        <EmailContactModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          title="咨询团队长"
        />
      </div>
    </div>
  );
}
