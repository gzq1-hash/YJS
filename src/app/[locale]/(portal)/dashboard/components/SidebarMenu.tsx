"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SidebarMenu({ activeTab, onTabChange }: SidebarMenuProps) {
  const { language } = useLanguage();

  const menuSections = [
    {
      title: language === 'zh' ? '后台管理' : 'Admin',
      items: [
        { id: 'livestream', label: language === 'zh' ? '实时直播管理' : 'Livestream Management', icon: '🎥' },
        { id: 'blog', label: language === 'zh' ? '博客文章管理' : 'Blog Management', icon: '📝' },
        { id: 'top-traders', label: language === 'zh' ? '交易员排行榜' : 'Top Traders', icon: '🏆' },
        { id: 'config', label: language === 'zh' ? '配置管理' : 'Configuration', icon: '🔧' },
      ],
    },
  ];

  return (
    <div className="w-64 border-r-2 border-white/10 h-screen overflow-y-auto bg-brand-bg">
      <div className="p-6">
        <h2 className="text-2xl font-black text-white mb-6">
          {language === 'zh' ? '元金石控制台' : 'AurumFoundry Dashboard'}
        </h2>

        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-brand-accent text-white font-bold'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
