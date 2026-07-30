'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50" />;
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-slate-300/60 dark:hover:bg-slate-700/60 transition-colors border border-slate-300/40 dark:border-slate-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </motion.div>
    </motion.button>
  );
}
