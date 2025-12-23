"use client";

import React, { useState } from 'react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function JoinUsPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleApply = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero - 增强版 */}
      <div className="relative bg-brand-bg text-white border-b border-white/10 overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center z-10">
          <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-brand-accent">{t('joinus.hero.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="font-black">{t('joinus.hero.title1')}</span>
            <br />
            <span className="text-3xl md:text-4xl font-normal text-white/60">{t('joinus.hero.title2')}</span>
          </h1>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('joinus.hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-accent/50 transition-colors">
              <span className="text-brand-accent font-bold">{t('joinus.hero.stat1.value')}</span> {t('joinus.hero.stat1')}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-accent/50 transition-colors">
              <span className="text-brand-accent font-bold">{t('joinus.hero.stat2.value')}</span> {t('joinus.hero.stat2')}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-accent/50 transition-colors">
              <span className="text-brand-accent font-bold">{t('joinus.hero.stat3.value')}</span> {t('joinus.hero.stat3')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* Welcome */}
        <section className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.welcome.title')}</h2>
          </div>
          <div className="space-y-6 text-lg text-white/70 leading-relaxed">
            <div className="bg-white/5 p-8 border-l-4 border-brand-accent">
              <p className="mb-4 text-white">
                {t('joinus.welcome.intro')}
              </p>
              <div className="inline-block bg-brand-accent text-white px-6 py-3 font-bold text-xl">
                {t('joinus.welcome.warning')}
              </div>
            </div>
            <p className="pl-8 border-l-2 border-white/10">
              {t('joinus.welcome.desc')}
            </p>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.about.title')}</h2>
          </div>
          <div className="space-y-6 text-lg text-white/70 leading-relaxed">
            <p className="pl-8 border-l-2 border-white/10">
              {t('joinus.about.desc1')}
            </p>
            <p className="pl-8 border-l-2 border-white/10">
              {t('joinus.about.desc2')}
            </p>
            <div className="bg-white/5 text-white p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-brand-accent">{t('joinus.about.timeline')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <div className="bg-white/5 p-4 border border-white/10 hover:border-brand-accent/50 transition-colors">
                  <p className="font-bold mb-2 text-white">{t('joinus.about.phase1.title')}</p>
                  <p className="text-sm opacity-70">{t('joinus.about.phase1.desc')}</p>
                </div>
                <div className="bg-white/5 p-4 border border-white/10 hover:border-brand-accent/50 transition-colors">
                  <p className="font-bold mb-2 text-white">{t('joinus.about.phase2.title')}</p>
                  <p className="text-sm opacity-70">{t('joinus.about.phase2.desc')}</p>
                </div>
                <div className="bg-white/5 p-4 border border-white/10 hover:border-brand-accent/50 transition-colors">
                  <p className="font-bold mb-2 text-white">{t('joinus.about.notfit.title')}</p>
                  <p className="text-sm opacity-70">{t('joinus.about.notfit.desc')}</p>
                </div>
                <div className="bg-white/5 p-4 border border-white/10 hover:border-brand-accent/50 transition-colors">
                  <p className="font-bold mb-2 text-white">{t('joinus.about.fit.title')}</p>
                  <p className="text-sm opacity-70">{t('joinus.about.fit.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Resources */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.videos.title')}</h2>
          </div>
          <p className="text-lg text-white/70 mb-8 pl-8 border-l-2 border-white/10">
            {t('joinus.videos.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
               className="group relative bg-white/5 p-8 border border-white/10 hover:border-brand-accent/50 transition-all">
              <div className="text-5xl mb-4"></div>
              <div className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-bold mb-3">
                {t('joinus.videos.doc1.rating')}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{t('video.doc1.title')}</h3>
              <p className="text-sm text-white/60">
                {t('joinus.videos.doc1.desc')}
              </p>
              <div className="mt-4 text-brand-accent font-semibold group-hover:underline">
                {t('joinus.videos.doc1.cta')}
              </div>
            </a>
            <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
               className="group relative bg-white/5 p-8 border border-white/10 hover:border-brand-accent/50 transition-all">
              <div className="text-5xl mb-4"></div>
              <div className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-bold mb-3">
                {t('joinus.videos.doc2.rating')}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{t('video.doc2.title')}</h3>
              <p className="text-sm text-white/60">
                {t('joinus.videos.doc2.desc')}
              </p>
              <div className="mt-4 text-brand-accent font-semibold group-hover:underline">
                {t('joinus.videos.doc2.cta')}
              </div>
            </a>
          </div>
        </section>

        {/* Your Profile */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.profile.title')}</h2>
          </div>
          <div className="space-y-8">
            <div className="bg-white/5 p-8 border-l-4 border-white/20">
              <p className="text-lg text-white/70 leading-relaxed">
                {t('joinus.profile.unsuited')}
              </p>
            </div>

            <div className="bg-brand-accent/10 text-white p-8 border border-brand-accent/20">
              <h3 className="text-2xl font-bold mb-4 text-brand-accent">{t('joinus.profile.income.title')}</h3>
              <p className="text-base leading-relaxed opacity-90">
                {t('joinus.profile.income.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-accent flex items-center justify-center text-2xl text-white">
                    
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('joinus.profile.basic.title')}</h3>
                </div>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.basic.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.basic.2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.basic.3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.basic.4')}
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-accent flex items-center justify-center text-2xl text-white">
                    
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('joinus.profile.time.title')}</h3>
                </div>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.time.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-accent font-bold">•</span>
                    {t('joinus.profile.time.2')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Training Plan */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.plan.title')}</h2>
          </div>
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="group relative bg-white/5 border border-white/10 p-8 hover:border-brand-accent/50 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-brand-accent border border-brand-accent flex items-center justify-center">
                <span className="text-white font-black text-xl">1</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-white/10 text-brand-accent text-sm font-bold mb-4">
                  {t('joinus.plan.phase1.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t('joinus.plan.phase1.title')}</h3>
                <p className="text-white/70 mb-4">
                  {t('joinus.plan.phase1.desc')}
                </p>
                <div className="bg-white/5 p-4 border-l-2 border-brand-accent/50">
                  <ul className="text-sm text-white/60 space-y-2">
                    <li><strong>{t('joinus.plan.phase1.req')}</strong></li>
                    <li><strong>{t('joinus.plan.phase1.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="group relative bg-white/5 border border-white/10 p-8 hover:border-brand-accent/50 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-brand-accent border border-brand-accent flex items-center justify-center">
                <span className="text-white font-black text-xl">2</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-white/10 text-brand-accent text-sm font-bold mb-4">
                  {t('joinus.plan.phase2.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t('joinus.plan.phase2.title')}</h3>
                <p className="text-white/70 mb-4">
                  {t('joinus.plan.phase2.desc')}
                </p>
                <div className="bg-white/5 p-4 border-l-2 border-brand-accent/50">
                  <ul className="text-sm text-white/60 space-y-2">
                    <li><strong>{t('joinus.plan.phase2.week1')}</strong></li>
                    <li><strong>{t('joinus.plan.phase2.week2')}</strong></li>
                    <li><strong>{t('joinus.plan.phase2.week3')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="group relative bg-white/5 border border-white/10 p-8 hover:border-brand-accent/50 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-brand-accent border border-brand-accent flex items-center justify-center">
                <span className="text-white font-black text-xl">3</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-white/10 text-brand-accent text-sm font-bold mb-4">
                  {t('joinus.plan.phase3.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t('joinus.plan.phase3.title')}</h3>
                <p className="text-white/70 mb-4">
                  {t('joinus.plan.phase3.desc')}
                </p>
                <div className="bg-white/5 p-4 border-l-2 border-brand-accent/50">
                  <ul className="text-sm text-white/60 space-y-2">
                    <li><strong>{t('joinus.plan.phase3.req')}</strong></li>
                    <li><strong>{t('joinus.plan.phase3.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="group relative bg-white/5 border border-white/10 p-8 hover:border-brand-accent/50 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-brand-accent border border-brand-accent flex items-center justify-center">
                <span className="text-white font-black text-xl">4</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-white/10 text-brand-accent text-sm font-bold mb-4">
                  {t('joinus.plan.phase4.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t('joinus.plan.phase4.title')}</h3>
                <p className="text-white/70 mb-4">
                  {t('joinus.plan.phase4.desc')}
                </p>
                <div className="bg-white/5 p-4 border-l-2 border-brand-accent/50">
                  <ul className="text-sm text-white/60 space-y-2">
                    <li>{t('joinus.plan.phase4.1')}</li>
                    <li>{t('joinus.plan.phase4.2')}</li>
                    <li><strong>{t('joinus.plan.phase4.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 5 */}
            <div className="group relative bg-brand-accent/10 text-white border border-brand-accent/20 p-8 hover:shadow-xl transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-brand-accent border border-brand-accent flex items-center justify-center">
                <span className="text-white font-black text-xl">★</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-brand-accent text-white text-sm font-bold mb-4">
                  {t('joinus.plan.phase5.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-brand-accent">{t('joinus.plan.phase5.title')}</h3>
                <p className="mb-4 opacity-90">
                  {t('joinus.plan.phase5.desc')}
                </p>
                <div className="bg-white/5 p-4 border-l-2 border-brand-accent/50">
                  <ul className="text-sm space-y-2 opacity-90">
                    <li>{t('joinus.plan.phase5.1')}</li>
                    <li>{t('joinus.plan.phase5.2')}</li>
                    <li>{t('joinus.plan.phase5.3')}</li>
                    <li>{t('joinus.plan.phase5.4')}</li>
                    <li>{t('joinus.plan.phase5.5')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Rules */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-brand-accent"></div>
            <h2 className="text-4xl font-black text-white">{t('joinus.rules.title')}</h2>
          </div>
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t('joinus.rules.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 border-l-4 border-brand-accent">
                <h3 className="text-xl font-bold mb-4 text-white">{t('joinus.rules.trading.title')}</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.trading.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.trading.2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.trading.3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.trading.4')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.trading.5')}
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 border-l-4 border-brand-accent">
                <h3 className="text-xl font-bold mb-4 text-white">{t('joinus.rules.meeting.title')}</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.meeting.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold"></span>
                    {t('joinus.rules.meeting.2')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final Words */}
        <section className="bg-brand-bg text-white p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('joinus.final.title')}</h2>
            <div className="space-y-6 text-base leading-relaxed max-w-3xl mx-auto">
              <p className="text-center text-xl font-semibold text-brand-accent">
                {t('joinus.final.motto')}
              </p>
              <p className="text-white/70">
                {t('joinus.final.p1')}
              </p>
              <p className="text-white/70">
                {t('joinus.final.p2')}
              </p>
              <p className="text-white/70">
                {t('joinus.final.p3')}
              </p>
              <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10">
                <p className="text-white font-bold text-lg text-center">
                  {t('joinus.final.highlight')}
                </p>
              </div>
              <p className="text-white/50 text-sm">
                {t('joinus.final.p4')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white/5 p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-4 text-white">{t('joinus.cta.title')}</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            {t('joinus.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <LocaleLink
              href="/splan/psychology-test"
              className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all hover:shadow-lg"
            >
              {t('joinus.cta.psychology')}
            </LocaleLink>
            <ShineButton
              onClick={handleApply}
              className="px-10 py-4 bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent/80 transition-all hover:shadow-lg animate-shake"
            >
              {t('joinus.cta.interview')}
            </ShineButton>
          </div>
        </section>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
