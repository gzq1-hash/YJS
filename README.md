# 源计划职业交易员孵化器 (Splan Trader Incubation)

欢迎来到**源计划职业交易员孵化器** - 一个专业的量化交易平台，集成职业交易员培养体系与XAUUSD（黄金）量化交易系统。

## 🌟 项目概述

源计划是一个综合性的交易员职业孵化平台，包含：

### 🎓 职业孵化体系
- **30天系统化培养** - 从新手到职业交易员的完整路径
- **心理测评系统** - 专业的交易心理评估（20题评测）
- **试用会员计划** - 90天试用会员培训项目
- **顶尖交易员集训** - 21天教练陪跑计划
- **职业晋升机制** - 挑战成功获得终身进阶受训 + 1-20万$ MOM操作权

### 📊 量化交易系统
- **XAUUSD混合策略** - 5指标融合的专业黄金交易策略
- **回测分析引擎** - 历史数据回测与性能分析
- **实时交易面板** - Binance Futures实盘对接
- **天梯排行榜** - 实时交易员排名系统
- **策略配置中心** - 灵活的参数调优系统

## 🏗️ 技术栈

- **框架**: Next.js 15.0.3 (App Router + Turbopack)
- **语言**: TypeScript
- **UI组件**: Radix UI, Tailwind CSS, Framer Motion
- **图表**: Recharts, TradingView Chart
- **交易**: Binance API Node, TechnicalIndicators
- **状态管理**: React Hooks + localStorage
- **部署**: Vercel

## 🚀 快速开始

### 1. 安装依赖

```bash
# 克隆仓库
git clone https://github.com/C-L-STARK/pinbar-trader.git
cd pinbar-trader

# 安装依赖（使用legacy-peer-deps解决依赖冲突）
npm install

# 或使用 pnpm
pnpm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
# Binance API配置（测试网）
BINANCE_API_KEY=your_testnet_api_key
BINANCE_API_SECRET=your_testnet_api_secret
BINANCE_TESTNET=true

# 管理员密码
NEXT_PUBLIC_ADMIN_PASSWORD=Life@1949..
```

**获取Binance测试网API密钥：**
1. 访问 https://testnet.binancefuture.com/
2. 注册并生成API Key和Secret
3. 配置IP白名单和权限

⚠️ **重要提示**: 请务必先使用测试网进行测试，切勿直接使用生产环境API密钥！

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 生产环境构建

```bash
npm run build
npm start
```

## 📁 项目结构

```
src/
├── app/
│   ├── (portal)/
│   │   ├── layout.tsx              # 统一布局（含导航栏）
│   │   ├── (site)/                 # 主页
│   │   │   └── page.tsx           # Landing Page
│   │   ├── dashboard/              # 量化交易控制台
│   │   │   ├── page.tsx           # Dashboard主页
│   │   │   └── components/        # Dashboard组件
│   │   │       ├── AdminLogin.tsx          # 管理员登录
│   │   │       ├── BacktestPanel.tsx       # 回测分析面板
│   │   │       ├── LiveTradePanel.tsx      # 实时交易面板
│   │   │       ├── TiantiPanel.tsx         # 天梯排行榜
│   │   │       ├── StrategyConfig.tsx      # 策略配置
│   │   │       └── ProfitChart.tsx         # 收益曲线图
│   │   └── splan/                  # 职业孵化系统
│   │       ├── join-us/            # 职业孵化介绍
│   │       ├── donate/             # 试用会员捐赠
│   │       ├── psychology-test/    # 心理测评
│   │       ├── courses/            # 课程体系
│   │       └── faq/                # 常见问题
│   └── api/
│       └── trading/
│           ├── backtest/route.ts        # 回测API
│           ├── live/route.ts            # 实盘交易API
│           ├── positions/route.ts       # 持仓查询API
│           ├── binance-status/route.ts  # Binance状态
│           └── test-connection/route.ts # 连接测试
│
├── lib/
│   └── trading/
│       ├── types.ts                     # 类型定义
│       ├── indicators/                  # 技术指标库
│       │   ├── keltner.ts              # Keltner通道
│       │   ├── bollinger.ts            # 布林带
│       │   ├── macd.ts                 # MACD
│       │   ├── cci.ts                  # CCI
│       │   └── supertrend.ts           # SuperTrend
│       ├── strategies/
│       │   └── xauusd-strategy.ts      # XAUUSD混合策略
│       ├── backtest/
│       │   ├── engine.ts               # 回测引擎
│       │   └── risk-manager.ts         # 风险管理
│       └── connectors/
│           ├── binance.ts              # Binance连接器
│           └── historicalDataProvider.ts # 历史数据提供者
│
└── components/
    ├── layout/
    │   ├── UnifiedNavbar.tsx           # 统一导航栏
    │   └── SiteLayout.tsx              # 站点布局
    ├── splan/
    │   ├── SplanNavbar.tsx             # Splan导航栏
    │   └── SplanFooter.tsx             # Splan页脚
    ├── charts/
    │   └── TradingViewChart.tsx        # TradingView图表
    └── custom/
        └── EmailContactModal.tsx       # 邮件联系弹窗
```

## 🎯 XAUUSD交易策略详解

### 策略概述

XAUUSD混合策略结合5个技术指标，通过多重确认提高信号准确性：

#### 1. Keltner Channel (肯特纳通道)
- **参数**: MA周期15, ATR周期10, 倍数0.5
- **作用**: 识别价格突破和趋势强度

#### 2. Bollinger Bands (布林带)
- **参数**: 周期15, 标准差1.0
- **作用**: 衡量价格波动率和超买超卖

#### 3. MACD (指数平滑异同移动平均线)
- **参数**: 快线12, 慢线26, 信号线9
- **作用**: 判断趋势方向和动量

#### 4. CCI (顺势指标)
- **参数**: 周期20
- **作用**: 识别超买超卖区域

#### 5. SuperTrend (超级趋势)
- **参数**: 周期10, 倍数3.0
- **作用**: 确认主要趋势方向

### 进场条件

#### 做多信号 (Long Entry)
1. 价格同时突破Keltner上轨和布林带上轨
2. MACD > Signal（多头交叉）
3. CCI > 50（强势多头动量）
4. SuperTrend显示上升趋势（可选）

#### 做空信号 (Short Entry)
1. 价格同时跌破Keltner下轨和布林带下轨
2. MACD < Signal（空头交叉）
3. CCI < -50（强势空头动量）
4. SuperTrend显示下降趋势（可选）

### 出场策略

#### 止损管理
- **固定止损**: 1.5倍ATR距离
- **追踪止损**: 盈利达到0.8R后激活，按1.0倍ATR距离追踪

#### 止盈目标
- **TP1**: 1.5R (30%仓位)
- **TP2**: 2.5R (30%仓位)
- **TP3**: 4.0R (40%仓位)

#### 强制出场
- 出现反向信号
- 达到每日最大亏损限额（$500）
- 触发最大回撤保护（10%）

### 激进程度设置

- **Level 1 (保守)**: 所有5个条件必须满足
- **Level 2 (适中)**: 5个条件中满足3个
- **Level 3 (激进)**: 核心条件满足2个即可

## 📊 量化交易控制台功能

### 1. 回测分析面板

**功能特性：**
- 📅 自定义时间范围回测
- 💰 设置初始资金
- 📈 完整性能指标：
  - 总交易次数、胜率、盈亏比
  - 总盈亏、最大回撤
  - 平均盈利/亏损、日均交易次数
- 📉 交互式权益曲线图
- 📋 详细交易历史（含出场原因）

### 2. 实时交易面板

**功能特性：**
- 🔴 实时信号监控（5秒自动刷新）
- 📊 当前持仓追踪
- 💵 账户余额显示
- ⚡ 一键执行交易
- 🔄 快速平仓功能
- 📡 Binance连接状态

### 3. 天梯排行榜

**功能特性：**
- 🏆 实时交易员排名
- 🔄 自动刷新（可选60秒间隔）
- ⏱️ 倒计时显示
- 🖼️ 动态图片加载

### 4. 策略配置中心

**可调参数：**
- 📊 所有技术指标参数
- ⚙️ 风险管理设置
- 🎯 激进程度调节
- 💾 配置持久化存储

### 5. 管理员登录

- 🔒 密码保护
- 💾 持久化登录（localStorage）
- 🚪 一键退出登录

## 🎓 职业孵化体系

### 30天培养路径

#### 第1-5个工作日：规则学习
- 完整的交易系统培训
- 风险管理基础
- 基础指标使用

#### 第6-15个工作日：实战训练
- 模拟盘练习
- 实时复盘分析
- 交易心理建设

#### 第16-20个工作日：进阶提升
- 高级策略学习
- 资金管理优化
- 独立交易能力培养

#### 第21-30个工作日：职业认证
- 综合能力评估
- 实盘挑战
- 职业资格认证

### 试用会员计划

**捐赠金额：** 起始$999（2025年10月1日），每日递增$5

**会员权益：**
- ✅ 顶尖交易员集训课程
- ✅ 21天专业教练一对一陪跑
- ✅ 挑战晋级机会

**挑战成功奖励：**
- 🎖️ 终身进阶受训资格
- 💰 1-20万美元MOM操作权限
- 🏢 加入顶尖矩阵俱乐部

**申请流程：**
1. 完成心理测评
2. 发送邮件至 1526824204@qq.com
3. 获取USDT/USDC捐赠地址
4. 完成捐赠后开始培训

### 心理测评系统

- 📝 20道专业测评题目
- 🎯 评估交易心理素质
- 📊 即时结果分析
- 💡 个性化建议

## 🔧 API接口文档

### POST /api/trading/backtest

运行历史数据回测。

**请求体：**
```json
{
  "startDate": 1704067200000,
  "endDate": 1704672000000,
  "initialCapital": 10000,
  "tradingConfig": {
    "symbol": "XAUUSDT",
    "interval": "1m",
    "strategy": {
      "aggressiveness": 2,
      "indicators": { /* ... */ }
    },
    "risk": {
      "maxDailyLoss": 500,
      "maxDrawdown": 0.10,
      "positionSize": 0.3
    }
  },
  "useTestnet": true
}
```

**响应：**
```json
{
  "trades": [ /* 交易列表 */ ],
  "totalTrades": 57,
  "winRate": 64.9,
  "profitFactor": 1.77,
  "totalPnl": 1234.56,
  "totalPnlPercent": 12.35,
  "maxDrawdown": 3.2,
  "equityCurve": [ /* 权益曲线 */ ]
}
```

### GET /api/trading/positions

获取当前持仓和账户信息。

**响应：**
```json
{
  "position": {
    "symbol": "XAUUSDT",
    "positionAmount": 0.3,
    "entryPrice": 2045.50,
    "unrealizedProfit": 45.60,
    "side": "LONG"
  },
  "balance": {
    "totalBalance": 10045.60,
    "availableBalance": 9800.00
  },
  "openOrders": []
}
```

### POST /api/trading/live

执行实时交易操作。

**动作类型：**
- `execute_signal` - 执行当前信号
- `close_position` - 平仓

**请求体：**
```json
{
  "action": "execute_signal",
  "tradingConfig": { /* 策略配置 */ },
  "symbol": "XAUUSDT"
}
```

### GET /api/trading/test-connection

测试Binance API连接状态。

## ⚙️ 配置说明

### .npmrc 配置

项目使用 `legacy-peer-deps=true` 解决依赖冲突，确保Vercel部署正常。

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| BINANCE_API_KEY | Binance API密钥 | - |
| BINANCE_API_SECRET | Binance API密钥 | - |
| BINANCE_TESTNET | 是否使用测试网 | true |
| NEXT_PUBLIC_ADMIN_PASSWORD | 管理员密码 | Life@1949.. |

## 📈 性能指标（回测结果）

基于7天历史数据回测（2025年1月1-7日）：

| 指标 | 数值 |
|------|------|
| 总交易次数 | 57 |
| 胜率 | 64.9% |
| 盈亏比 | 1.77 |
| 总收益率 | +12.35% |
| 最大回撤 | -3.2% |
| 平均盈利 | $45.60 |
| 平均亏损 | -$25.80 |
| 日均交易 | 8.1次 |

## ⚠️ 风险警告

**本系统为实验性交易软件，使用风险自负。**

- ❗ 务必先使用测试网进行充分测试
- ❗ 从小仓位开始，逐步增加
- ❗ 不要投入超出承受能力的资金
- ❗ 积极监控交易执行情况
- ❗ 充分理解策略后再实盘
- ❗ 历史表现不代表未来收益

## 🔐 安全最佳实践

1. **API密钥管理**
   - 永远不要将 `.env.local` 提交到版本控制
   - 使用环境变量管理敏感信息

2. **API权限限制**
   - 限制API密钥权限（禁用提现）
   - 仅授予必要的交易权限

3. **IP白名单**
   - 在Binance配置IP白名单
   - 限制API访问来源

4. **测试优先**
   - 新策略必须先在测试网验证
   - 确认稳定后再切换到生产环境

5. **监控告警**
   - 设置异常交易告警
   - 定期检查账户活动

## 🛠️ 开发指南

### 类型检查

```bash
npm run type-check
```

### 代码规范检查

```bash
npm run lint
```

### 构建项目

```bash
npm run build
```

### 添加新指标

1. 在 `src/lib/trading/indicators/` 创建指标文件
2. 实现计算函数
3. 在 `index.ts` 中导出
4. 更新策略以使用新指标

### 自定义策略

1. 在 `src/lib/trading/strategies/` 创建策略文件
2. 继承基础策略接口
3. 实现 `generateSignal()` 方法
4. 添加到Dashboard配置

## 🌐 部署

### Vercel部署

1. Fork此仓库
2. 在Vercel导入项目
3. 配置环境变量
4. 部署

### 环境变量配置

在Vercel项目设置中添加：
- `BINANCE_API_KEY`
- `BINANCE_API_SECRET`
- `BINANCE_TESTNET`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v2.0.0 (2025-10-20)
- ✨ 新增统一导航栏系统
- ✨ 新增试用会员捐赠页面（动态定价）
- ✨ 新增天梯排行榜功能
- ✨ 优化Dashboard登录持久化
- ✨ 合并职业孵化页面内容
- 🐛 修复主页Hero区域垂直居中问题
- 🐛 修复Vercel部署依赖问题
- 🔧 添加.npmrc配置

### v1.0.0 (2025-01-01)
- 🎉 初始版本发布
- 📊 XAUUSD量化交易系统
- 🎓 职业孵化体系
- 📈 回测引擎

## 📚 学习资源

- [Next.js文档](https://nextjs.org/docs)
- [Binance API文档](https://binance-docs.github.io/apidocs/futures/en/)
- [技术指标说明](https://www.investopedia.com/technical-analysis-4689657)
- [交易心理学](https://www.investopedia.com/trading-psychology-4689674)

## 📧 联系方式

- **网站**: [源计划职业交易员孵化器](https://pinbar-trader.vercel.app)
- **邮箱**: 1526824204@qq.com
- **Twitter**: [@splan_trader](https://x.com/splan_trader)
- **GitHub**: [C-L-STARK/pinbar-trader](https://github.com/C-L-STARK/pinbar-trader)

## 📄 许可证

本项目仅供教育目的使用。请确保遵守您所在司法管辖区的所有适用交易法规。

---

**用❤️构建 by 源计划团队**

© 2024-2025 源计划职业交易员孵化器. All rights reserved.
