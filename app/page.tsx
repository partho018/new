'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import AuthCard from '@/components/auth/AuthCard';
import { LanguageProvider } from '@/components/LanguageProvider';
import { FloatingUpdateInfo } from '@/components/auth/FloatingUpdateInfo';
import { FloatingTelegramButton } from '@/components/FloatingTelegramButton';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class PageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Page Client Exception caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <LanguageProvider>
          <main className="fixed inset-0 h-screen h-[100dvh] w-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f5f7fb] dark:from-[#090D16] dark:via-[#0D1424] dark:to-[#080B12] flex items-center justify-center p-4 z-10">
            <div className="w-full max-w-[420px] flex items-center justify-center">
              <AuthCard />
            </div>
            <FloatingUpdateInfo />
          </main>
        </LanguageProvider>
      );
    }
    return this.props.children;
  }
}

import TradingCanvasBackground from '@/components/TradingCanvasBackground';

import AnimatedTraderIllustration from '@/components/AnimatedTraderIllustration';

export default function Home() {
  return (
    <PageErrorBoundary>
      <LanguageProvider>
        <main className="fixed inset-0 h-screen h-[100dvh] w-screen overflow-y-auto bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f5f7fb] dark:from-[#090D16] dark:via-[#0D1424] dark:to-[#080B12]">
          {/* Dynamic Trading Candlestick & Wave Canvas Background */}
          <TradingCanvasBackground />

          {/* FOREGROUND LAYOUT WITH ANIMATED TRADER ILLUSTRATION */}
          <div className="relative min-h-full w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 p-4 sm:p-6 lg:p-10 z-10 my-auto pt-24 pb-8">
            {/* Login / Register Auth Card - Shown FIRST on mobile */}
            <div className="w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-center pointer-events-auto shrink-0 order-1 lg:order-2">
              <AuthCard />
            </div>

            {/* Animated Trader Character Illustration - Shown BELOW form on mobile */}
            <div className="pointer-events-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] shrink-0 order-2 lg:order-1">
              <AnimatedTraderIllustration />
            </div>
          </div>
          
          <FloatingUpdateInfo />

          {/* ✅ Floating Telegram Button - Bottom Right */}
          <FloatingTelegramButton />
        </main>
      </LanguageProvider>
    </PageErrorBoundary>
  );
}

