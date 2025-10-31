"use client";

import React, { useState } from 'react';
import EmailContactModal from '@/components/custom/EmailContactModal';

export default function JoinUsPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleApply = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-black text-white border-b-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-black">FX Killer</span> 外汇交易员培训
          </h1>
          <p className="text-xl text-gray-300">
            培养真正适合的人，留下极少数，劝返大多数
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Welcome */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b-2 border-black dark:border-white pb-2 inline-block">首先恭喜你！</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              经过层层滤网来到这里，在进入门内之前你先深入了解一下我们这里，认为自己各方面条件都满足的情况下再选择进入，<span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 font-bold">因为每个人只有一次进入的机会</span>。
            </p>
            <p>
              在这里，你不需要老板，你自己就是老板。事实上的任何地方，你都可以随心所欲，在阿尔卑斯山滑雪，夏威夷游泳或北海道发呆……金钱会源源不断地自动流入你的口袋。从你通过考核那一天起，你就可以遨游在世界的任何一个角落，旅行、生活或工作，哪怕是漫无目的的活着；既不需要为日常的琐事烦恼，也不需要看任何人的脸色行事，自由自在心无旁骛的同时，尽可能地把生命旅程延展……
            </p>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b-2 border-black dark:border-white pb-2 inline-block">关于我们</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              我们是一个专注于筛选和培养顶尖外汇交易员的培训组织，我们致力于用最短的时间从大量人群中筛选出少数适合做外汇交易的人才并进行培养并给予支持。
            </p>
            <p>
              简单来说，我们在招聘外汇交易员，但绝不是从事交易多年，有经验的交易员。因为优秀的交易员不会在人才市场上流通，只能亲自培养。所以换句话说，我们在亲自筛选和培养我们的交易员，并致力于将合格的交易员培养成基金经理。
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-black dark:border-white p-6">
              <p className="font-bold mb-3 text-gray-900 dark:text-white">我们将在 45天(30个工作日) 内判断新人是否是做外汇交易的可塑之才：</p>
              <ul className="space-y-2 text-sm">
                <li><strong>前20个工作日</strong>：包含5天的交易基本规则学习和15天的盈利练习</li>
                <li><strong>后10个工作日</strong>：连续的盈利考核测试</li>
                <li><strong>若不是</strong>，我们会如实告知，并劝诫其此生不要踏足二级市场</li>
                <li><strong>若是</strong>，我们会为其分配资金，以独立交易员的身份为起点，将其招募进我们的组织，或辅助引导其成长为基金经理组建私募基金</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Video Resources */}
        <section className="bg-gray-100 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">了解交易员职业</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">交易员职业是个自由职业，不受时间空间限制，推荐通过以下资料更进一步了解本职业：</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold">视频</span>
              <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                className="text-black dark:text-white hover:underline font-medium">
                【豆瓣8.7分】百万美金交易员
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold">视频</span>
              <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                className="text-black dark:text-white hover:underline font-medium">
                【豆瓣8.0分】交易员：转瞬百万
              </a>
            </div>
          </div>
        </section>

        {/* Your Profile */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b-2 border-black dark:border-white pb-2 inline-block">你的样子</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            <p>
              在外汇交易的世界里，有些人天生不适合。他们急于求成，却不知自己真正追求什么；他们只瞥一眼表象，便止步不前，无法洞察事物的深层本质；或者，他们压根就该选择那些"稳定"的岗位——当一天和尚，敲一天钟，过着可预测的日子。这不是贬低，而是现实：外汇交易如战场，需要冷静、洞察与韧性。如果你属于这一类，或许其他行业更能发挥你的长处。
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
            <h3 className="font-bold mb-3 text-gray-900 dark:text-white">关于收入、社保、底薪和薪资结构</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              任何盈利导向的企业，都不会做亏本买卖。即使高薪聘请一个一无所知的应届生，也源于政府补贴或对该人潜力的判断。在我们这个极简行业，所有价值都源于二级市场的买卖差价——简单、直接、残酷。在你证明盈利能力（通过考核）之前，我们不会投入一分钱。考核通过后，你的实际收入，绝不会超过你在"战场"（二级市场）上缴获的"战利品"。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white bg-black dark:bg-white text-white dark:text-black px-2 py-1 inline-block">基本条件</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mt-4">
                <li>大专学历以上，35岁以下</li>
                <li>认真、细心、耐心、心理健康</li>
                <li>连续30个工作日(约45天)，windows电脑</li>
                <li>独立的交易环境</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white bg-black dark:bg-white text-white dark:text-black px-2 py-1 inline-block">时间要求</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mt-4">
                <li>周一到周五，每天最低保证 13:30 - 21:30 在线</li>
                <li>北京时间20:00 团队长会议室复盘</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Training Plan */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b-2 border-black dark:border-white pb-2 inline-block">成长计划</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-black dark:border-white pl-6 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">第 1 - 5 个工作日：完成规则学习</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                尽快熟悉交易系统的基本规则
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>一阶段规则考核要求</strong>：15 个标准进场点不出错</li>
                <li><strong>重要</strong>：5 个工作日不能完成规则考核，酌情劝退处理</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-600 pl-6 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">第 6 - 20 个工作日：盈利练习</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                务必不要想法太多，找到适合自己的品种
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>第一周</strong>：多练习，找到适合自己的品种（先找4-6个观察，稳定到2个交易品种）</li>
                <li><strong>第二周</strong>：按照盈利考核标准进行盈利练习，不错单、不漏单、不亏损</li>
                <li><strong>第三周</strong>：务必不能犯低级错误，务必做到操作一致性</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-700 pl-6 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">第 21 - 30 个工作日：连续盈利考核测试</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                这是最终考核阶段，需要连续10个工作日保持稳定盈利
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>盈利考核要求</strong>：连续 10 个工作日，每天做到所选交易品种不错单、不漏单、不亏损</li>
                <li><strong>重要</strong>：30个工作日内不能完成连续 10 天盈利，劝退处理</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-800 dark:border-gray-400 pl-6 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">小额实盘 20 工作日</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                小额实盘仍旧只有一次机会，超出回撤要求即视为失败，请珍惜
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>小额实盘依旧保持盈利考核要求，1-3 品种，不错单，不漏单，不亏损</li>
                <li>认为自己盈利能力不稳定的，可以申请 1-4 周的小额仿真模拟盘固化</li>
                <li><strong>重要</strong>：小额实盘账户：日回撤不超过 20%，周总回撤不得超过 30%，超过劝退</li>
              </ul>
            </div>

            <div className="border-l-4 border-black dark:border-white pl-6 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">大额矩阵（职业交易员）</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                小额实盘 20 工作日固化无误，进入大额矩阵
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>拥有完全自由的工作时间，每天不限制交易量，保证每日不亏的底线即可</li>
                <li><strong>资金规模与仓位</strong>：随着交易能力的不断稳定，仓位大小逐步提升</li>
                <li>小额实盘：20 美金仓位，配资 100 美金</li>
                <li>大额实盘：依据小额实盘的表现进行设定</li>
                <li>仓位增长：随着盈利曲线的上升，逐步增加仓位规模，逐步增加分润比例</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trading Rules */}
        <section className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"><span className="bg-black text-white dark:bg-white dark:text-black px-3 py-1">交易铁律</span></h2>
          <p className="text-gray-800 dark:text-gray-200 mb-4">
            交易纪律就像法律法规，触碰一次就会被标上不信任的标签，一旦触碰，就再也无法进入矩阵团队，第二次触碰红线，直接劝退离开团队。交易就像做手术，务必严肃，容不得任何不遵守规则的人。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">交易规则红线：</h3>
              <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
                <li>硬止损线不能移动，位置务必设置正确</li>
                <li>只有标准和激进两种进场方式</li>
                <li>不能跨越红折线持仓</li>
                <li>止损和出场必须满足规则条件</li>
                <li>5倍以上利润才能使用止盈线</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">会议纪律红线：</h3>
              <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
                <li>学员之间不得加微信、电话等联系方式</li>
                <li>会议室内保持严肃，不得谈论除交易外其他话题</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Words */}
        <section className="bg-black text-white p-8 border-2 border-gray-800">
          <h2 className="text-2xl font-bold mb-4">写在最后</h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              培养真正适合的人，留下极少数，劝返大多数。
            </p>
            <p>
              我们这是外汇交易员军队训练营，在这里，我们将严格按照军事管理的方式将你训练成正规军（通过考核）。通过考核之后，我们将给你发放枪支弹药，让你去前线作战（实盘交易）并胜利凯旋（盈利而归）。
            </p>
            <p>
              所以，我们会非常认真训练你们，因为没有一个将军希望牺牲自己辛苦训练出来的战士（不能赚钱的交易员我们也不会将他送到前线去当韭菜）。
            </p>
            <p>
              通过考核后，我们就是合作共赢的关系。你可以选择独立作战，也可以选择和战友背靠背作战，所以我们不是公司员工隶属的关系，你是一个独立的创业者，独立的个体。
            </p>
            <p className="text-white font-bold">
              你在战场获得的战利品，至少 60% 属于你个人，随着你的能力提升，这个比例也会随之提高，至高可达 90% 以上。
            </p>
            <p>
              因为这是窄门，你难道没有听说过免费的也许会是比钱更"贵"的？第一，你下决定决心并且被选中，一旦开始职业交易训练，需要全身心投入。第二，真正能坚持下来的人虽然不会为金钱所累，但的确"任重道远"。第三，跟传统学科不同，不需要你付出数万美金的"学费"，毕竟这是一个钱生钱的行当。
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gray-100 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">准备好了吗？</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            如果你愿意给自己一次实现人生理想的机会，那么：
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/splan/psychology-test"
              className="px-8 py-3 bg-white dark:bg-gray-900 border-2 border-black dark:border-white text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              完成心理测评
            </a>
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
            >
              预约面试
            </button>
          </div>
        </section>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="外汇交易员面试"
      />
    </div>
  );
}
