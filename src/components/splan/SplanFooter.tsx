"use client";

import React from 'react';
import Link from 'next/link';

export default function SplanFooter() {
  return (
    <footer className="bg-black dark:bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-black text-white">FX</span>
              <span className="text-xl font-normal text-gray-400 ml-1">Killer</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              专注于外汇交易的职业交易员培训平台，用专业的方法筛选和培养真正适合外汇市场的交易人才。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">快速导航</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  外汇培训
                </Link>
              </li>
              <li>
                <Link href="/splan/courses" className="text-gray-400 hover:text-white transition-colors">
                  成长计划
                </Link>
              </li>
              <li>
                <Link href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  心理测评
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  交易系统
                </Link>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  百万美金交易员
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  交易员:转瞬百万
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>专注外汇交易培训</li>
              <li>培养职业外汇交易员</li>
              <li className="pt-2">
                <Link href="/splan/join-us"
                      className="inline-block px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors">
                  立即申请
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>2024-2025 © FX Killer · 专业外汇交易员培训平台 · fxkiller.com</p>
          <p className="mt-2 text-xs">
            ⚠️ 外汇交易有风险，投资需谨慎 · 本站内容仅供学习参考，不构成投资建议
          </p>
        </div>
      </div>
    </footer>
  );
}
