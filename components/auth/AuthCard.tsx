'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ThemeToggle } from '../theme/ThemeToggle';


// ----------------------------------------------------
// Glassmorphic Coming Soon Modal Popup Component
// ----------------------------------------------------
function ComingSoonModal({
  isOpen,
  onClose,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-sm p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-800 shadow-2xl text-center space-y-4 overflow-hidden backdrop-blur-xl"
          >
            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated Glow Background */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

            {/* Animated "COMING SOON" Badge - replaces icon */}
            <div className="relative mx-auto w-fit mb-1">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-pink-500 to-amber-500 blur-md opacity-60 animate-pulse" />
              {/* Inner badge */}
              <div className="relative px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-xl">
                <span className="text-white text-xs font-black tracking-[0.25em] uppercase">
                  🚀 Coming Soon
                </span>
              </div>
              {/* Orbiting dot 1 */}
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              {/* Orbiting dot 2 */}
              <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              {/* Orbiting dot 3 */}
              <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            </div>

            {/* Title & Body */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {title || 'Coming Soon!'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {message || 'This feature is currently under active development. Stay tuned for our official release!'}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white text-xs font-semibold shadow-md hover:shadow-glow-primary transition-all"
            >
              Got it!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: '',
  });


  const { language, toggleLanguage, t } = useLanguage();

  const handleShowComingSoon = (title: string, message: string) => {
    setModalState({ isOpen: true, title, message });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };



  return (
    <>
      {/* Centered Glassmorphic Modal Popup */}
      <ComingSoonModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
      />



      <div className="relative w-full max-w-[360px] sm:max-w-[400px] rounded-3xl bg-white/75 dark:bg-slate-900/80 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/80 dark:border-slate-800/90 backdrop-blur-2xl overflow-hidden">
        {/* Modern Dynamic Gradient Backdrop Lights */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Section */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center h-10 px-3.5 rounded-xl bg-[#34DA32] hover:bg-[#2ec42d] text-slate-950 font-extrabold text-sm tracking-widest shadow-lg shadow-[#34DA32]/30 overflow-hidden group gap-2 transition-colors">
              <img src="/5xEarn.webp" alt="5xEarn Icon" className="w-6 h-6 object-contain rounded-md" />
              <span className="relative z-10 drop-shadow-sm">5XEARN</span>
              <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
            </div>
          </div>

          {/* Controls: Language + Theme Toggle */}
          <div className="flex items-center gap-2">

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all text-xs font-bold border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
              title={language === 'en' ? 'Switch to Bengali' : 'Switch to English'}
            >
              {language === 'en' ? '🇧🇩 BN' : '🇺🇸 EN'}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="relative p-1 mb-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('login')}
            className={`relative flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 outline-none ${
              activeTab === 'login'
                ? 'text-blue-600 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {activeTab === 'login' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/70 dark:border-slate-700/80"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 tracking-wide">{t('signIn')}</span>
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`relative flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 outline-none ${
              activeTab === 'register'
                ? 'text-blue-600 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {activeTab === 'register' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/70 dark:border-slate-700/80"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 tracking-wide">{t('createAccount')}</span>
          </button>
        </div>

        {/* Form Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.div
              key="login-tab"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
            >
              <LoginForm onShowComingSoon={handleShowComingSoon} />
            </motion.div>
          ) : (
            <motion.div
              key="register-tab"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
            >
              <RegisterForm
                onSuccess={() => setActiveTab('login')}
                onShowComingSoon={handleShowComingSoon}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
