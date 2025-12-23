"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  emailSubject?: string;
}

export default function EmailContactModal({ isOpen, onClose, title, emailSubject: customEmailSubject }: EmailContactModalProps) {
  const { t } = useLanguage();
  const emailAddress = "haiyan679679@gmail.com";

  const displayTitle = title || t('joinus.modal.title');
  const emailSubject = customEmailSubject || t('email.subject');

  const handleSendEmail = () => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    alert(t('email.copied'));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-brand-bg max-w-md w-full p-6 border border-white/10"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{displayTitle}</h2>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-white/70">
              {t('email.description')}
            </p>

            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50 mb-2">{t('email.address.label')}</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-brand-accent font-mono text-sm flex-1">
                  {emailAddress}
                </code>
                <button
                  onClick={handleCopyEmail}
                  className="text-white hover:text-brand-accent text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  {t('email.copy')}
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50 mb-2">{t('email.subject.label')}</p>
              <code className="text-white font-mono text-sm">
                {emailSubject}
              </code>
            </div>

            <div className="bg-brand-accent/10 border border-brand-accent/20 p-4">
              <p className="text-sm text-white/80">
                <strong className="text-brand-accent">{t('email.tip')}</strong>{t('email.tip.text')}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSendEmail}
                className="flex-1 px-6 py-3 bg-brand-accent text-white font-semibold hover:bg-brand-accent/80 transition-all"
              >
                {t('email.send')}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {t('email.close')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
