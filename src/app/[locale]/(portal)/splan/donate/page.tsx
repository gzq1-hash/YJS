"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();

  // 计算捐赠金额：从2025年10月1日开始，每天增加$5
  useEffect(() => {
    const startDate = new Date('2025-10-01T00:00:00');
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentAmount = 999 + (daysPassed * 5);
    setDonationAmount(Math.max(999, currentAmount)); // 最低999
  }, []);

  // Fetch wallet address from Config table
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        // Default fallback address
        const DEFAULT_ADDRESS = 'TKEHNuGWHLkvzZTxTrr247aUDShWmxcfmR';
        
        // Try dynamic route first
        let response = await fetch('/api/config/COFFEE');
        if (!response.ok) {
          // log status and body to help debugging
          let bodyText = '';
          try {
            bodyText = await response.text();
          } catch (e) {
            bodyText = String(e);
          }
          console.warn('Config API (dynamic) returned', response.status, bodyText);

          // Fallback to query-style endpoint
          response = await fetch('/api/config?key_name=COFFEE');
        }

        if (response.ok) {
          const data = await response.json();
          // support both { key_content } and direct value
          // if API returned the config as an array (list endpoint), handle that
          if (Array.isArray(data) && data.length > 0) {
            setWalletAddress(data[0].key_content || DEFAULT_ADDRESS);
          } else if (data && typeof data === 'object') {
            setWalletAddress(data.key_content || DEFAULT_ADDRESS);
          } else if (typeof data === 'string') {
            setWalletAddress(data || DEFAULT_ADDRESS);
          } else {
            setWalletAddress(DEFAULT_ADDRESS);
          }
        } else {
          console.warn('Failed to fetch wallet address after fallback. HTTP status:', response.status);
          setWalletAddress(DEFAULT_ADDRESS);
        }
      } catch (error) {
        console.warn('Error fetching wallet address:', error);
        setWalletAddress('TKEHNuGWHLkvzZTxTrr247aUDShWmxcfmR');
      } finally {
        setLoadingAddress(false);
      }
    };

    fetchWalletAddress();
  }, []);

  // Copy wallet address to clipboard
  const handleCopy = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      {/* Hero Section - 增强版 */}
      <div className="relative overflow-hidden bg-brand-bg border-b border-white/10">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold tracking-wider text-brand-accent">{t('donate.hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              {t('donate.hero.title1')}<br />
              <span className="text-4xl md:text-5xl font-normal text-white/70">{t('donate.hero.title2')}</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('donate.hero.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:border-brand-accent/50 transition-colors">
                <span className="font-bold text-brand-accent">{t('donate.hero.stat1.value')}</span> {t('donate.hero.stat1')}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:border-brand-accent/50 transition-colors">
                <span className="font-bold text-brand-accent">{t('donate.hero.stat2.value')}</span> {t('donate.hero.stat2')}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:border-brand-accent/50 transition-colors">
                <span className="font-bold text-brand-accent">{t('donate.hero.stat3.value')}</span> {t('donate.hero.stat3')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* Donation Amount Card - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* 背景光效 */}
          <div className="absolute inset-0 bg-brand-accent/5 blur-3xl"></div>

          <div className="relative bg-white/5 backdrop-blur-sm p-12 border border-white/10 hover:border-brand-accent/50 transition-all shadow-2xl">
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                <p className="text-sm font-semibold text-white">{t('donate.amount.badge')}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-3 mb-3">
                  <span className="text-7xl md:text-8xl font-black text-brand-accent">
                    ${donationAmount}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-white/10 text-white text-sm font-bold">USDT</span>
                  <span className="text-white/60">/</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-sm font-bold">USDC</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent/10 border border-brand-accent/20 backdrop-blur-sm">
                <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-brand-accent font-bold text-sm">{t('donate.amount.warning')}</span>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 border border-white/10 hover:border-brand-accent/30 transition-colors">
                  <p className="text-xs text-white/60 mb-1">{t('donate.amount.start')}</p>
                  <p className="text-2xl font-bold text-white">$999</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 border border-white/10 hover:border-brand-accent/30 transition-colors">
                  <p className="text-xs text-white/60 mb-1">{t('donate.amount.daily')}</p>
                  <p className="text-2xl font-bold text-brand-accent">+$5</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 border border-white/10 hover:border-brand-accent/30 transition-colors">
                  <p className="text-xs text-white/60 mb-1">{t('donate.amount.payment')}</p>
                  <p className="text-sm font-bold text-white">{t('donate.amount.crypto')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wallet Address Section - 新增 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <div className="relative bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-brand-accent/50 transition-all shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === 'zh' ? '捐赠地址' : 'Donation Address'}
              </h3>
              <p className="text-sm text-white/60">
                {language === 'zh' ? 'USDT / USDC 钱包地址' : 'USDT / USDC Wallet Address'}
              </p>
            </div>

            {loadingAddress ? (
              <div className="flex items-center justify-center py-6">
                <svg className="animate-spin w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : walletAddress ? (
              <div className="bg-black/40 p-6 border border-white/10 group hover:border-brand-accent/30 transition-colors relative">
                <p className="font-mono text-sm md:text-base text-brand-accent break-all text-center">
                  {walletAddress}
                </p>
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 text-white/40 hover:text-white transition-colors rounded"
                  title={t('donate.wallet.copy')}
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-white/40">
                {language === 'zh' ? '暂无捐赠地址' : 'No donation address available'}
              </div>
            )}
            
            <div className="mt-6 flex justify-center gap-4 text-xs text-white/40">
               <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>TRC20</span>
               <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>ERC20</span>
               <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>BEP20</span>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-white/20"></div>
              <h2 className="text-4xl font-black text-white">{t('donate.benefits.title')}</h2>
              <div className="h-px w-12 bg-white/20"></div>
            </div>
            <p className="text-lg text-white/60">
              {t('donate.benefits.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-brand-accent/50 transition-all hover:shadow-2xl hover:shadow-brand-accent/10"
            >
              <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-brand-accent font-black">A</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('donate.benefits.a.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('donate.benefits.a.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-brand-accent/50 transition-all hover:shadow-2xl hover:shadow-brand-accent/10"
            >
              <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-brand-accent font-black">B</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('donate.benefits.b.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('donate.benefits.b.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="group bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-brand-accent/50 transition-all hover:shadow-2xl hover:shadow-brand-accent/10"
            >
              <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-brand-accent font-black">C</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('donate.benefits.c.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('donate.benefits.c.desc')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Challenge Success Reward - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-white/20"></div>
              <h2 className="text-4xl font-black text-white">{t('donate.rewards.title')}</h2>
              <div className="h-px w-12 bg-white/20"></div>
            </div>
            <p className="text-lg text-white/60">
              {t('donate.rewards.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-accent/5 blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-sm p-10 border border-white/10 hover:border-brand-accent/50 transition-all hover:shadow-2xl">
                <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6">
                  <span className="text-4xl text-brand-accent font-black">A</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('donate.rewards.a.title')}
                </h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  {t('donate.rewards.a.desc')}
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-brand-accent/5 blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-sm p-10 border border-white/10 hover:border-brand-accent/50 transition-all hover:shadow-2xl">
                <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6">
                  <span className="text-4xl text-brand-accent font-black">B</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('donate.rewards.b.title')}
                </h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  {t('donate.rewards.b.desc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How to Donate Section - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-white/20"></div>
              <h2 className="text-4xl font-black text-white">{t('donate.how.title')}</h2>
              <div className="h-px w-12 bg-white/20"></div>
            </div>
            <p className="text-lg text-white/60">
              {t('donate.how.desc')}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              {t('donate.how.flow.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  num: "1",
                  title: t('donate.how.step1.title'),
                  desc: t('donate.how.step1.desc')
                },
                {
                  num: "2",
                  title: t('donate.how.step2.title'),
                  desc: t('donate.how.step2.desc')
                },
                {
                  num: "3",
                  title: t('donate.how.step3.title'),
                  desc: t('donate.how.step3.desc')
                },
                {
                  num: "4",
                  title: t('donate.how.step4.title'),
                  desc: t('donate.how.step4.desc')
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-black/40 p-6 border border-white/10 hover:border-brand-accent/30 transition-colors">
                  <div className="w-14 h-14 bg-brand-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-bg font-black text-2xl">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <LocaleLink
                href="/splan/psychology-test"
                className="px-10 py-5 bg-brand-accent text-brand-bg font-bold text-lg hover:bg-white transition-all text-center hover:shadow-lg hover:shadow-brand-accent/20"
              >
                {t('donate.how.cta.test')}
              </LocaleLink>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-10 py-5 bg-transparent text-white font-bold text-lg border border-white/20 hover:bg-white/10 hover:border-white transition-all text-center hover:shadow-lg animate-shake"
              >
                {t('donate.how.cta.email')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Important Notice - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-brand-accent/5 blur-2xl"></div>

          <div className="relative bg-black/60 backdrop-blur-md p-10 border border-brand-accent/30">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-brand-accent flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-bg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">
                {t('donate.notice.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                t('donate.notice.1'),
                t('donate.notice.2'),
                t('donate.notice.3'),
                t('donate.notice.4')
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 p-4 border border-white/10 hover:border-brand-accent/30 transition-colors">
                  <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={t('donate.modal.title')}
      />
    </div>
  );
}
