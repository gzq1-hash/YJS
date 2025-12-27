import type { Metadata } from "next";
import LocaleLink from "@/components/navigation/LocaleLink";

export const metadata: Metadata = {
  title: "元金石品牌一页 | AurumFoundry",
  description:
    "元金石品牌一页：交易育英，链动未来。了解使命愿景、核心价值观、目标受众及快速落地建议。",
};

type BrandPageProps = {
  params: Promise<{ locale: string }>;
};

const callsToAction = [
  { label: "课程申请", href: "/splan/join-us" },
  { label: "体验课", href: "/education" },
  { label: "加入矩阵", href: "/splan/donate" },
];

const logoGoals = [
  "传达“稳固基石 + 锻造淬炼 + 未来科技”三重意象。",
  "适配“元金石”与 “Yuan Jin Shi / YJS” 双语字样，覆盖网站、App、社群、印刷与动效。",
];

const logoCoreConcepts = [
  "金石印记，天圆地方：方形轮廓代表基石与纪律。",
  "抽象“元”字作为熔炉/基石结构，象征自我锻造。",
  "暗金环线以环绕或 ∞ 形态穿梭，呼应资金曲线与点石成金。",
  "整体风格融合古典权威与现代极简科技感。",
];

const logoElements = [
  "外形：稳重方形或圆角方块，强化“印章”“基石”印象。",
  "中心：解构“元”字，形成底部沉稳、顶部突破的熔炉造型。",
  "金线：以暗金/古铜色连续线条勾勒 ∞ 或 K 线波动，包裹主体。",
  "纹理（可选）：锤击纹、金属拉丝或石质纹理，增添淬炼质感。",
];

const palette = [
  { title: "主色", desc: "玄青 / 深灰（#0D1A1F 近似），传达沉稳专业。" },
  { title: "辅助金色", desc: "暗金 / 古铜（如 #B08B4F、#8C6B3B），避免刺眼亮金。" },
  { title: "中性色", desc: "米白 / 淡灰，用于背景与印刷。" },
];

const typography = [
  "中文偏好有衬线、具权威感的品牌字体（衍生宋体等）。",
  "英文建议现代无衬线（Inter / Helvetica / Montserrat）。",
  "Logo 中文为主，英文或缩写作为副标，并确保小尺寸清晰。",
];

const logoApplications = [
  "主 Logo：标志搭配中文名，可加英文字标或缩写。",
  "图标版：方形标志用于 App、社群头像、网站 Favicon。",
  "反白版：为深浅底色分别准备金线及深色版本。",
  "动效版（可选）：金线流动或锤击闪光的 2-4s 开场动画。",
];

const logoDeliverables = [
  "矢量源文件：AI / SVG / EPS（包含图层与可编辑字体）。",
  "栅格导出：PNG（512/256/128/64）及 ICO。",
  "单色 & 反白版：黑白、单色金线等适配不同材质。",
  "动效稿：LOGO 入场 MP4 / GIF。",
  "品牌手册：最小尺寸、留白、色值、字体、示例应用。",
];

const logoDos = [
  "保持方形基底的稳重感，金线需呈现“可控的流动节奏”。",
  "保障抽象“元”字结构在小尺寸下仍易识别。",
];

const logoDonts = [
  "避免使用刺眼反光的亮金色或复杂高亮材质。",
  "不要加入过多细碎细节，避免缩小时失真。",
];

export default async function BrandPage({ params }: BrandPageProps) {
  const { locale = "zh" } = await params;
  const isEnglish = locale === "en";

  if (isEnglish) {
    return (
      <div className="min-h-screen text-white">
        <section className="py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">Yuan Jin Shi Brand Page</h1>
            <p className="text-lg text-white/80">
              中文品牌一页暂未完成英文版，请切换到中文查看完整内容。
            </p>
            <LocaleLink
              href="/brand"
              locale="zh"
              className="rounded-full bg-black/60 px-6 py-3 text-sm font-semibold tracking-wide transition hover:bg-black/80"
            >
              切换至中文
            </LocaleLink>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-brand-bg">
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Yuan Jin Shi
          </div>
          <h1 className="text-4xl font-bold md:text-6xl">元金石：交易员的基石</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
            交易育英，链动未来。我们为志在职业化的交易者打造“铸剑谷”与“试金石”，提供从教育、策略到资金与生态的全周期孵化。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {callsToAction.map((cta) => (
              <LocaleLink
                key={cta.label}
                href={cta.href}
                className="rounded-full border border-white/30 bg-black/50 px-7 py-3 text-sm font-semibold tracking-wide transition hover:border-white/60 hover:bg-black/70"
              >
                {cta.label}
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold">品牌核心定位</h2>
            <ul className="space-y-3 text-white/80">
              <li>交易育英，链动未来</li>
              <li>职业交易员的“铸剑谷”与“试金石”</li>
              <li>从新手到职业、从现实到元宇宙的全周期孵化与生态支持</li>
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">使命 Mission</h3>
              <p className="leading-relaxed text-white/80">
                为真正热爱交易的人系统化锻造具备“稳健心性、深邃认知、顶尖技能”的职业交易员，提供教育、交易系统与去中心化协作网络，降低顶尖交易能力的获取门槛，帮助交易者实现职业自由与财富突破。
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">愿景 Vision</h3>
              <p className="leading-relaxed text-white/80">
                成为数字金融时代的交易员基石，构建连接现实金融与元宇宙的交易生态，让交易员在 Web3 世界中创造、管理并增值全球资产。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-10 shadow-lg">
            <h2 className="text-2xl font-semibold">核心价值观 Values</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                "系统致胜：可复制的成功来自强大的系统与方法论。",
                "协同进化：矩阵式协作，集体学习与策略互补。",
                "未来视野：前瞻性拥抱 AI、区块链、元宇宙等技术。",
                "价值共生：与交易员建立利益与成长共同体。",
                "元理为本：回归市场本源与第一性原理。",
                "精诚所至 / 百炼成金：以诚相待，以实战淬炼能力。",
              ].map((value) => (
                <div
                  key={value}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/80"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">品牌差异化 Positioning</h2>
            <ul className="space-y-3 text-white/80">
              <li>全周期孵化：教育 + 系统 + 资金 + 生态的闭环解决方案。</li>
              <li>交易员矩阵：策略共享、资金通道与社群互助，降低个体风险。</li>
              <li>元宇宙前瞻：布局数字资产、新型交易场景与赛事生态。</li>
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">品牌口号 Slogans</h3>
              <ul className="space-y-2 text-white/80">
                <li>主口号：元金石：交易员的基石</li>
                <li>副口号：从元石到金石，见证你的蜕变。</li>
                <li>传播语：探索交易元理，锻造职业金石。</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black/35 p-8 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">目标受众 Target Audiences</h3>
              <ul className="space-y-2 text-white/80">
                <li>核心：具备纪律与职业化意愿的潜力交易员。</li>
                <li>次级：关注数字资产与元宇宙的高净值人士。</li>
                <li>画像关键词：纪律、学习力、未来导向、技术亲和。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-10 shadow-lg">
            <h2 className="text-2xl font-semibold">触点与体验 Brand Touchpoints</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "线上教育平台",
                  desc: "结构化课程、可视化进阶路径、学习记录与实盘实验室。",
                },
                {
                  title: "交易系统界面",
                  desc: "极简高效、性能优先，提供 K 线、资金流可视化、策略回测与实盘监控。",
                },
                {
                  title: "交易员矩阵社群",
                  desc: "主题研讨、模拟赛、策略合成与资金协作机制。",
                },
                {
                  title: "营销物料",
                  desc: "案例驱动的内容营销、深度文章、直播与元宇宙交易大赛。",
                },
              ].map((touchpoint) => (
                <div key={touchpoint.title} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{touchpoint.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{touchpoint.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-10 shadow-lg">
            <h2 className="text-2xl font-semibold">传播策略 Go-to-Market</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "内容 Content",
                  desc: "打造“元金石交易之道”IP，覆盖文章、播客与案例解析。",
                },
                {
                  title: "社群 Community",
                  desc: "建立精准私域，定期主题活动与内部闭门赛。",
                },
                {
                  title: "口碑 Advocacy",
                  desc: "突出学员成果与导师实绩，形成“元金石出品”口碑标签。",
                },
                {
                  title: "事件 Events",
                  desc: "当元宇宙产品成熟，发起行业赛事与展会活动。",
                },
              ].map((strategy) => (
                <div key={strategy.title} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{strategy.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{strategy.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/15 bg-black/35 p-10 shadow-lg">
            <h2 className="text-2xl font-semibold">品牌语调 Tone of Voice</h2>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>专业但不冷漠、权威但不高高在上。</li>
              <li>直击本质，以数据与案例说话。</li>
              <li>鼓励实战与自我提升，强调纪律与系统。</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/15 bg-black/35 p-10 shadow-lg">
            <h2 className="text-2xl font-semibold">关键交付与指标</h2>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>12 个月内培养具备稳定盈利与风控能力的职业交易员。</li>
              <li>追踪社群活跃度、保留率与课程完成率。</li>
              <li>持续监测学员实盘表现与风险指标。</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/20 bg-black/45 p-10 shadow-xl">
            <div className="mb-6 flex flex-col gap-2 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Logo Designer Brief
              </span>
              <h2 className="text-3xl font-semibold">元金石 LOGO 设计说明</h2>
              <p className="text-base text-white/75">
                以“基石 × 淬炼 × 科技”三重意象为核心，确保标识在数字与实体场景中统一呈现。
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">目标 Goals</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {logoGoals.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">核心概念 Core Concepts</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {logoCoreConcepts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">元素细化 Elements</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {logoElements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">配色建议 Palette</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {palette.map((item) => (
                      <li key={item.title}>
                        <span className="font-semibold text-white">{item.title}：</span>
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">字体 Typography</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {typography.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">应用场景 Applications</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {logoApplications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">交付物 Deliverables</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                  {logoDeliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6">
                <div className="rounded-2xl border border-emerald-200/20 bg-emerald-500/10 p-6 text-sm leading-relaxed text-white/80">
                  <h3 className="text-lg font-semibold text-white">推荐做法 DOs</h3>
                  <ul className="mt-3 space-y-2">
                    {logoDos.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-200/20 bg-rose-500/10 p-6 text-sm leading-relaxed text-white/80">
                  <h3 className="text-lg font-semibold text-white">避免误区 DON'Ts</h3>
                  <ul className="mt-3 space-y-2">
                    {logoDonts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/15 bg-black/40 p-8 text-center text-sm leading-relaxed text-white/75">
              “打造一个既有东方印章与锻造意象的稳重标识，同时兼具现代科技感与动效表达，能在实盘交易、教学内容与元宇宙场景中自然流转。”
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-white/20 bg-black/50 p-10 text-center shadow-xl">
            <h2 className="text-2xl font-semibold">快速落地建议</h2>
            <ol className="mx-auto mt-6 max-w-3xl space-y-3 text-left text-white/80">
              <li>1. 设计并上线品牌主页：核心口号 + 课程申请 / 体验课 / 加入矩阵三大转化路径。</li>
              <li>2. 产出 3 个学员成功案例页与 1 个导师档案页，强化口碑。</li>
              <li>3. 制定社群运营日历，涵盖每月主题、模拟赛与导师 Q&A。</li>
              <li>4. 制作品牌视觉系统：LOGO、色彩、图标、字体与配图规范。</li>
            </ol>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {callsToAction.map((cta) => (
                <LocaleLink
                  key={cta.label}
                  href={cta.href}
                  className="rounded-full border border-white/30 bg-black/50 px-7 py-3 text-sm font-semibold tracking-wide transition hover:border-white/60 hover:bg-black/70"
                >
                  {cta.label}
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
