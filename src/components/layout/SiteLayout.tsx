"use client";

import React, { useState } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import SplanFooter from '@/components/splan/SplanFooter';

const navItems = [
  {
    name: "职业孵化",
    link: "/splan/join-us",
  },
  {
    name: "成长计划",
    link: "/splan/courses",
  },
  {
    name: "常见问题",
    link: "/splan/faq",
  },
  {
    name: "心理测评",
    link: "/splan/psychology-test",
  },
  {
    name: "量化系统",
    link: "/dashboard",
  },
];

interface SiteLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function SiteLayout({ children, showFooter = true }: SiteLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-20">
        {children}
      </div>

      {/* Footer */}
      {showFooter && <SplanFooter />}
    </div>
  );
}
