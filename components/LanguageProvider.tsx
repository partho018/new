'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    signIn: 'Sign In',
    createAccount: 'Create Account',
    mobileNumber: 'Mobile Number',
    enterMobile: 'Enter mobile number',
    password: 'Password',
    enterPassword: 'Enter password',
    forgotPassword: 'Forgot Password?',
    signInBtn: 'Sign In to Portal',
    orContinueWith: 'OR CONTINUE WITH',
    confirmPassword: 'Confirm Password',
    enterConfirmPassword: 'Confirm password',
    referralCode: 'Referral Code',
    enterReferralCode: 'Enter refer code',
    createAccountBtn: 'Create Account',
  },
  bn: {
    signIn: 'লগইন',
    createAccount: 'অ্যাকাউন্ট খুলুন',
    mobileNumber: 'মোবাইল নম্বর',
    enterMobile: 'মোবাইল নম্বর দিন',
    password: 'পাসওয়ার্ড',
    enterPassword: 'পাসওয়ার্ড দিন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    signInBtn: 'লগইন করুন',
    orContinueWith: 'অথবা অন্য মাধ্যমে',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    enterConfirmPassword: 'পাসওয়ার্ডটি আবার দিন',
    referralCode: 'রেফারেল কোড',
    enterReferralCode: 'রেফারেল কোড দিন',
    createAccountBtn: 'অ্যাকাউন্ট তৈরি করুন',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string) => translations[language][key] || key;

  React.useEffect(() => {
    if (language === 'bn') {
      document.body.style.fontFamily = 'var(--font-hind-siliguri), sans-serif';
    } else {
      document.body.style.fontFamily = ''; // reset to default
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div style={{ fontFamily: language === 'bn' ? 'var(--font-hind-siliguri), sans-serif' : 'inherit' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
