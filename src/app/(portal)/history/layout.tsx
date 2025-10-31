import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "交易历史与分析 - 全面的交易绩效数据",
  description: "查看完整的交易历史记录和绩效分析。包含交易统计、盈亏曲线、最佳/最差交易、连胜/连败记录、时间分析等全方位的交易数据分析，帮助您优化交易策略。",
  keywords: ["交易历史", "交易分析", "绩效统计", "盈亏曲线", "交易记录", "策略优化", "交易数据"],
  openGraph: {
    title: "交易历史与分析 - 全面的交易绩效数据",
    description: "全面的交易历史记录和绩效分析，助力交易策略优化。",
    url: "https://pinbar-trader.com/history",
    type: "website",
  },
  alternates: {
    canonical: "https://pinbar-trader.com/history",
  },
  robots: {
    index: false, // History 页面不需要被搜索引擎索引
    follow: false,
  },
};

export default function HistoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
