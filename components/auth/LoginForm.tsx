'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Facebook, Phone } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import CountrySelector from './CountrySelector';
import { Country, DEFAULT_COUNTRY } from '@/lib/countries';

interface LoginFormProps {
  onSuccess?: () => void;
  onShowComingSoon?: (title: string, message: string) => void;
}

export default function LoginForm({ onSuccess, onShowComingSoon }: LoginFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowComingSoon) {
      onShowComingSoon(
        'Portal Login Coming Soon!',
        'Portal authentication is currently in preview mode. Full system login will be available soon.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mobile Number Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {t('mobileNumber')}
        </label>
        <div className="relative flex items-center h-11 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-sm">
          {/* Country Flag & Dial Code Selector */}
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
          {/* Phone Icon & Input */}
          <div className="relative flex-1 h-full flex items-center">
            <Phone className="absolute left-3 w-4 h-4 text-slate-400 transition-colors pointer-events-none" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('enterMobile')}
              required
              className="w-full h-full pl-9 pr-4 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('password')}
          </label>
          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault();
              if (onShowComingSoon) {
                onShowComingSoon(
                  'Password Reset Coming Soon!',
                  'Self-service password recovery is currently under development.'
                );
              }
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all"
          >
            {t('forgotPassword')}
          </a>
        </div>
        <div className="relative group">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('enterPassword')}
            required
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Primary Submit Button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        type="submit"
        className="w-full h-12 mt-2 rounded-xl bg-[#34DA32] hover:bg-[#2ec42d] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#34DA32]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{t('signInBtn')}</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Divider */}
      <div className="relative py-2 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-[10px]">
          <span className="px-2.5 bg-white/90 dark:bg-slate-900/90 text-slate-400 font-bold tracking-widest uppercase">
            {t('orContinueWith')}
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => {
            if (onShowComingSoon) onShowComingSoon('Google SSO', 'Coming soon');
          }}
          className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => {
            if (onShowComingSoon) onShowComingSoon('Facebook SSO', 'Coming soon');
          }}
          className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all text-[#1877F2]"
        >
          <Facebook className="w-5 h-5 fill-current" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => {
            if (onShowComingSoon) onShowComingSoon('Github SSO', 'Coming soon');
          }}
          className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all text-slate-900 dark:text-white"
        >
          <Github className="w-5 h-5 fill-current" />
        </motion.button>
      </div>
    </form>
  );
}
