import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fxkiller.com'
  const lastModified = new Date()
  const languages = ['zh', 'en']

  // 定义所有静态路由
  const routes = [
    // 首页
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },

    // 核心功能页面
    { path: '/dashboard', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/history', priority: 0.85, changeFrequency: 'weekly' as const },

    // 工具页面
    { path: '/tools/position-calculator', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/tools/pip-calculator', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/tools/risk-reward-calculator', priority: 0.9, changeFrequency: 'weekly' as const },

    // 培训计划页面
    { path: '/splan/join-us', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/splan/courses', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/splan/psychology-test', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/splan/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/splan/donate', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/splan/blog', priority: 0.8, changeFrequency: 'weekly' as const },

    // 博客
    { path: '/blog', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/blog/articles', priority: 0.8, changeFrequency: 'daily' as const },

    // 教育内容 - Education Section
    { path: '/education', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/education/forex-basics', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/education/trading-psychology', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/education/risk-management', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/education/position-sizing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/stop-loss-strategies', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/risk-reward', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/leverage-and-margin', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/market-participants', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/trading-sessions-guide', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/currency-pairs-guide', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/broker-selection-guide', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/spreads-and-commissions', priority: 0.75, changeFrequency: 'monthly' as const },

    // 技术分析
    { path: '/education/candlestick-patterns', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/support-resistance', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/price-action', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/trend-following', priority: 0.8, changeFrequency: 'monthly' as const },

    // 技术指标
    { path: '/education/ema-moving-averages', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/macd-indicator', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/rsi-indicator', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/bollinger-bands', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/education/keltner-channels', priority: 0.7, changeFrequency: 'monthly' as const },

    // 交易策略
    { path: '/education/day-trading', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/swing-trading', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/scalping', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/education/breakout-trading', priority: 0.75, changeFrequency: 'monthly' as const },

    // 其他页面
    { path: '/partners/brokers', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/thank-you', priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  // 为每个路由生成中英文两个版本
  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach(route => {
    languages.forEach(lang => {
      const url = route.path === ''
        ? `${baseUrl}/${lang}`
        : `${baseUrl}/${lang}${route.path}`

      sitemap.push({
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            zh: route.path === '' ? `${baseUrl}/zh` : `${baseUrl}/zh${route.path}`,
            en: route.path === '' ? `${baseUrl}/en` : `${baseUrl}/en${route.path}`,
          },
        },
      })
    })
  })

  // 添加根域名（重定向到默认语言）
  sitemap.unshift({
    url: baseUrl,
    lastModified,
    changeFrequency: 'daily',
    priority: 1.0,
  })

  return sitemap
}
