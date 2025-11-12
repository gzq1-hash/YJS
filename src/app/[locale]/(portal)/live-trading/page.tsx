import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import LiveTradingClient from './LiveTradingClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '实盘直播丨汇刃丨职业交易员培训、外汇交易员培训',
    'Live Trading丨FX Killer丨Professional Trader Training, Forex Trader Training',
    '观看汇刃矩阵成员的实盘交易直播，学习真实的交易决策过程。6位职业交易员同步直播，展示专业的交易技巧和风险管理策略。',
    'Watch FX Killer matrix members\' live trading sessions and learn real trading decision-making processes. 6 professional traders streaming simultaneously, demonstrating expert trading skills and risk management strategies.',
    '实盘直播, 外汇直播, 交易直播, 职业交易员培训, 外汇交易员培训, 日内交易员培训',
    'live trading, forex live, trading stream, professional trader training, forex trader training, day trader training',
    lang,
    {
      url: '/live-trading',
      type: 'website',
      section: 'Live Trading',
      author: 'FX Killer Team',
    }
  );
}

export default function LiveTradingPage() {
  // Get matrix members from environment variable
  // Format: 姓名|交易类型|上次直播时间|youtube直播链接;姓名2|交易类型|上次直播时间|youtube直播链接
  const matrixMembersEnv = process.env.NEXT_PUBLIC_MATRIX_MEMBERS || '';

  // Default 6 placeholders with names
  const defaultMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      isLive: true,
      youtubeId: 'T5x1oKyze7E', // Default live stream URL
      specialty: '趋势交易 / Trend Trading',
      lastLive: null,
    },
    {
      id: 2,
      name: 'Sarah Wang',
      isLive: false,
      youtubeId: null,
      specialty: '剥头皮交易 / Scalping',
      lastLive: '2025-11-10 14:30',
    },
    {
      id: 3,
      name: 'Michael Zhang',
      isLive: false,
      youtubeId: null,
      specialty: '波段交易 / Swing Trading',
      lastLive: '2025-11-09 09:15',
    },
    {
      id: 4,
      name: 'Emily Liu',
      isLive: false,
      youtubeId: null,
      specialty: '日内交易 / Day Trading',
      lastLive: '2025-11-08 16:45',
    },
    {
      id: 5,
      name: 'David Lin',
      isLive: false,
      youtubeId: null,
      specialty: '突破交易 / Breakout Trading',
      lastLive: '2025-11-07 11:20',
    },
    {
      id: 6,
      name: 'Jessica Wu',
      isLive: false,
      youtubeId: null,
      specialty: '新闻交易 / News Trading',
      lastLive: '2025-11-06 08:00',
    },
  ];

  // Parse environment variable and merge with defaults by name
  const envMembersMap = new Map<string, any>();

  if (matrixMembersEnv) {
    matrixMembersEnv
      .split(';')
      .filter(m => m.trim())
      .forEach((member) => {
        const [name, specialty, lastLive, youtubeLink] = member.split('|').map(s => s.trim());

        if (name) {
          // Extract YouTube ID from link
          let youtubeId = null;
          if (youtubeLink) {
            const match = youtubeLink.match(/(?:youtube\.com\/live\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
            youtubeId = match ? match[1] : null;
          }

          envMembersMap.set(name, {
            name,
            isLive: !!youtubeId,
            youtubeId,
            specialty: specialty || 'Trading',
            lastLive: youtubeId ? null : (lastLive || null),
          });
        }
      });
  }

  // Merge: if config has same name, use config value to replace placeholder
  const matrixMembers = defaultMembers.map((defaultMember) => {
    const envMember = envMembersMap.get(defaultMember.name);
    if (envMember) {
      // Replace placeholder with config
      return {
        id: defaultMember.id,
        ...envMember,
      };
    }
    return defaultMember;
  });

  return <LiveTradingClient members={matrixMembers} />;
}
