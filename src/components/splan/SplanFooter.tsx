"use client";

import React from 'react';
import LocaleLink from '@/components/navigation/LocaleLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShineLinkButton } from '@/components/custom/ShineButton';
import EmailContactModal from '@/components/custom/EmailContactModal';
import BrandName from '@/components/custom/BrandName';

export default function SplanFooter() {
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = React.useState(false);

  return (
    <footer className="relative py-12 overflow-hidden bg-card border-t border-border shadow-2xl">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4 text-2xl font-semibold text-primary">
              <BrandName />
            </div>
            <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
              {t('footer.about')}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* Telegram */}
              <button
                onClick={() => setActiveModal('telegram')}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => setActiveModal('x')}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>

              {/* YouTube */}
              <button
                onClick={() => setActiveModal('youtube')}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>

              {/* WeChat */}
              <button
                onClick={() => setActiveModal('wechat')}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="WeChat: Kunweilianghua"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.025-1.31-.452-3.79-4.214-6.876-8.768-6.876zm-2.924 5.232a.72.72 0 0 1 .717-.72.72.72 0 0 1 .718.72.72.72 0 0 1-.717-.72zm5.674 0a.72.72 0 0 1 .717-.72.72.72 0 0 1 .717.72.72.72 0 0 1-.717.72.72.72 0 0 1-.717-.72zm7.735 4.55c0-3.564-3.51-6.446-7.835-6.446-4.325 0-7.835 2.882-7.835 6.446 0 1.948 1.03 3.703 2.646 4.895a.52.52 0 0 1 .188.586l-.344 1.304a.488.488 0 0 0-.042.188c0 .144.115.26.255.26a.289.289 0 0 0 .148-.047l1.677-.982a.762.762 0 0 1 .632-.086c.784.19 1.61.295 2.475.295 4.325 0 7.835-2.882 7.835-6.446zm-9.606-1.31a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633zm3.81 0a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633z"/>
                </svg>
              </button>

              {/* Email */}
              <button
                onClick={() => setShowEmailModal(true)}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links - Navigation */}
          <div>
            <h4 className="font-bold mb-4 text-primary">{language === 'zh' ? '快速链接' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/splan/join-us" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.training')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/education" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'zh' ? '教育' : 'Education'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'zh' ? '新闻' : 'News'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/market-analysis" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'zh' ? '行情' : 'Market'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/psychology-test" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.psychology')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.dashboard')}
                </LocaleLink>
              </li>

              <li>
                <LocaleLink href="/splan/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.faq')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.membership')}
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-bold mb-4 text-primary">{language === 'zh' ? '其他资源' : 'Resources'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
                </LocaleLink>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors">
                  {t('video.doc1.title')}
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors">
                  {t('video.doc2.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Partners - Brokers */}
          <div>
            <h4 className="font-bold mb-4 text-primary">{t('footer.partners.brokers')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://i.ecmarkets.com/api/client/pm/2/99R9C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  EC Markets
                </a>
              </li>
              <li>
                <a
                  href="https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  TickMill
                </a>
              </li>
              <li>
                <a
                  href="https://www.maxweb.red/join?ref=YYSTARK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Binance
                </a>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6 text-primary">{t('footer.partners.propfirms')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FTMO
                </a>
              </li>
              <li>
                <a
                  href="https://fundednext.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FundedNext
                </a>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6 text-primary">{t('footer.partners.platforms')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://metaapi.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  MetaAPI
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader4.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  MetaTrader 4/5
                </a>
              </li>
              <li>
                <a
                  href="https://metacopier.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  MetaCopier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>2024-2025 {t('footer.copyright')}</p>
          <p className="mt-2 text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>



      {/* Social Media Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-background p-8 border-2 border-border max-w-sm w-full mx-4 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {activeModal === 'wechat' && (language === 'zh' ? '微信联系方式' : 'WeChat Contact')}
                {activeModal === 'telegram' && 'Telegram'}
                {activeModal === 'x' && 'X (Twitter)'}
                {activeModal === 'youtube' && 'YouTube'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <div className={`border-2 p-6 mb-4 rounded-lg ${
                activeModal === 'wechat' ? 'bg-green-500/10 border-green-500' :
                activeModal === 'telegram' ? 'bg-blue-500/10 border-blue-500' :
                activeModal === 'youtube' ? 'bg-red-500/10 border-red-500' :
                'bg-gray-500/10 border-gray-500'
              }`}>
                <p className="text-sm text-muted-foreground mb-2">
                  {activeModal === 'wechat' && (language === 'zh' ? '微信号' : 'WeChat ID')}
                  {activeModal === 'telegram' && (language === 'zh' ? 'Telegram 用户名' : 'Telegram Username')}
                  {activeModal === 'x' && (language === 'zh' ? 'X 账号' : 'X Handle')}
                  {activeModal === 'youtube' && (language === 'zh' ? 'YouTube 频道' : 'YouTube Channel')}
                </p>
                <p className="text-2xl font-bold text-foreground mb-4 break-all">
                  {activeModal === 'wechat' && 'Kunweilianghua'}
                  {activeModal === 'telegram' && '@missgold679'}
                  {activeModal === 'x' && '@missgold999'}
                  {activeModal === 'youtube' && '@missgold99'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeModal === 'wechat' && (language === 'zh' ? '复制微信号，在微信中添加好友' : 'Copy WeChat ID and add as friend in WeChat')}
                  {activeModal === 'telegram' && (language === 'zh' ? '复制用户名，在 Telegram 中搜索' : 'Copy username and search in Telegram')}
                  {activeModal === 'x' && (language === 'zh' ? '复制账号，在 X 中搜索' : 'Copy handle and search in X')}
                  {activeModal === 'youtube' && (language === 'zh' ? '复制频道名，在 YouTube 中搜索' : 'Copy channel name and search in YouTube')}
                </p>
              </div>

              <button
                onClick={() => {
                  const textToCopy = 
                    activeModal === 'wechat' ? 'Kunweilianghua' :
                    activeModal === 'telegram' ? '@missgold679' :
                    activeModal === 'x' ? '@missgold999' :
                    activeModal === 'youtube' ? '@missgold99' : '';
                  
                  navigator.clipboard.writeText(textToCopy);
                  alert(language === 'zh' ? '已复制！' : 'Copied!');
                }}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors rounded-md"
              >
                {language === 'zh' ? '复制' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title={language === 'zh' ? '职业交易员面试预约' : 'Professional Trader Interview'}
      />
    </footer>
  );
}
