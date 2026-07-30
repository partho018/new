'use client';

import React, { useState } from 'react';
import { UpdateInfoModal } from './UpdateInfoModal';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';

export function FloatingUpdateInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 15, 
          delay: 0.4 
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-blue-50/95 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-all text-sm font-bold border border-blue-200/80 dark:border-blue-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md whitespace-nowrap"
        >
          {/* Subtle pulsing glow behind the button to catch eye */}
          <span className="absolute inset-0 rounded-xl bg-blue-400/30 dark:bg-blue-500/30 animate-ping opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
          
          {/* Notification Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-400"></span>
          </span>
          
          <span className="relative z-10">
            {language === 'bn' ? 'ইনকাম ইনফো' : 'Income Info'}
          </span>
        </button>
      </motion.div>
      
      <UpdateInfoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
