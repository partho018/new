'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Lock, Eye, EyeOff, Sparkles, Tag } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import CountrySelector from './CountrySelector';
import { Country, DEFAULT_COUNTRY } from '@/lib/countries';

interface RegisterFormProps {
  onSuccess?: () => void;
  onShowComingSoon?: (title: string, message: string) => void;
}

export default function RegisterForm({ onSuccess, onShowComingSoon }: RegisterFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referCode, setReferCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowComingSoon) {
      onShowComingSoon(
        'Account Registration Coming Soon!',
        'Self-service workspace account registration is coming soon.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t('mobileNumber')}
        </label>
        <div className="relative flex items-center h-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-sm">
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

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t('password')}
        </label>
        <div className="relative group">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('enterPassword')}
            required
            className="w-full h-10 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t('confirmPassword')}
        </label>
        <div className="relative group">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('enterConfirmPassword')}
            required
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Refer Code */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t('referralCode')}
        </label>
        <div className="relative group">
          <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type="text"
            value={referCode}
            onChange={(e) => setReferCode(e.target.value)}
            placeholder={t('enterReferralCode')}
            required
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm uppercase tracking-wider font-medium"
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        type="submit"
        className="w-full h-11 mt-1 rounded-xl bg-[#34DA32] hover:bg-[#2ec42d] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#34DA32]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{t('createAccountBtn')}</span>
      </motion.button>
    </form>
  );
}
