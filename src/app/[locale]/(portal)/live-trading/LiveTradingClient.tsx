'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { parseVideoUrl, getPlatformName, type VideoEmbed } from '@/lib/videoEmbedParser';

interface MatrixMember {
  id: number;
  name: string;
  isLive: boolean;
  youtubeId: string | null;
  specialty: string;
  lastLive: string | null;
  liveUrl?: string; // Full URL for multi-platform support
}

interface LiveTradingClientProps {
  members: MatrixMember[];
}

export default function LiveTradingClient({ members }: LiveTradingClientProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // Get unique platforms being used
  const activePlatforms = new Set<string>();
  members.forEach((member) => {
    if (member.isLive && member.liveUrl) {
      const parsed = parseVideoUrl(member.liveUrl);
      if (parsed) {
        activePlatforms.add(getPlatformName(parsed.platform));
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section - Matching news page style */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
              {isZh ? '矩阵成员实盘' : 'Matrix Members Live Trading'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '实盘直播' : 'Live Trading'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '观看汇刃矩阵成员的实时交易，学习专业交易决策'
              : 'Watch our matrix members trade live and learn professional decision-making'}
          </p>
        </div>
      </div>

      {/* Platform Notice */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-medium text-sm">
              {isZh ? '直播平台：' : 'Streaming via: '}
              {activePlatforms.size > 0
                ? Array.from(activePlatforms).join(', ')
                : (isZh ? 'YouTube, 哔哩哔哩等' : 'YouTube, Bilibili, etc.')}
            </span>
          </div>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
            // Parse video URL for multi-platform support
            const videoEmbed = member.liveUrl ? parseVideoUrl(member.liveUrl) : null;
            const isLive = member.isLive && videoEmbed;

            return (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-lg"
              >
                {isLive && videoEmbed ? (
                  // Live Video Stream (Multi-platform)
                  <div className="relative">
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </div>

                    {/* Platform Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {getPlatformName(videoEmbed.platform)}
                    </div>

                    {/* Video Iframe */}
                    <div className="aspect-video bg-black">
                      {videoEmbed.platform === 'youtube' ? (
                        <iframe
                          src={videoEmbed.embedUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : videoEmbed.platform === 'bilibili' ? (
                        <iframe
                          src={videoEmbed.embedUrl}
                          className="w-full h-full"
                          allowFullScreen
                          style={{ border: 0 }}
                        />
                      ) : (
                        // Generic iframe for other platforms
                        <iframe
                          src={videoEmbed.embedUrl}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <h3 className="font-bold text-lg text-black dark:text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {member.specialty}
                      </p>
                      {member.lastLive && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {member.lastLive}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                // Offline Placeholder
                <div className="p-6">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 inline-block">
                        {isZh ? '离线' : 'Offline'}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {member.specialty}
                    </p>
                    {member.lastLive && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {isZh ? '上次直播' : 'Last Live'}: {member.lastLive}
                      </p>
                    )}
                  </div>
                </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            {isZh
              ? '矩阵成员每周进行多场实盘直播，展示真实的交易过程'
              : 'Matrix members conduct multiple live trading sessions weekly, showcasing real trading processes'}
          </p>
        </div>
      </div>
    </div>
  );
}
