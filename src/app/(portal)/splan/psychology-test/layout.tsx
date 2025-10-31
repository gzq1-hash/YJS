import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "交易员心理测试 - 评估您的交易心理素质",
  description: "专业的交易员心理测试，全面评估您的交易心理素质。测试涵盖5大核心维度：风险承受能力、情绪控制能力、决策能力、纪律性、压力管理。20道专业题目，约5-8分钟完成，了解您是否适合成为职业交易员。",
  keywords: ["交易心理测试", "交易员评估", "心理素质测试", "风险承受能力", "情绪控制", "交易决策", "交易纪律测试"],
  openGraph: {
    title: "交易员心理测试 - 评估您的交易心理素质",
    description: "20道专业题目，5大核心维度，全面评估您的交易心理素质。了解您是否适合成为职业交易员。",
    url: "https://pinbar-trader.com/splan/psychology-test",
    type: "website",
  },
  alternates: {
    canonical: "https://pinbar-trader.com/splan/psychology-test",
  },
};

export default function PsychologyTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
