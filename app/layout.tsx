import type { Metadata } from 'next';
import { Inter, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ClientTracker } from '@/components/analytics/ClientTracker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '5xearn | Modern Trading & Earning Platform',
  description: 'Next-generation smart trading and earning platform.',
  keywords: ['Trading', '5xearn', 'Earnings', 'Crypto', 'Financial Platform'],
  icons: {
    icon: '/5xEarn.webp',
    shortcut: '/5xEarn.webp',
    apple: '/5xEarn.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#090D16] dark:via-[#0F172A] dark:to-[#090D16] text-slate-900 dark:text-slate-100 antialiased selection:bg-primary selection:text-white"
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
