import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FAC017',
          hover: '#e5af12',
          light: '#fbd14b',
        },
        accent: {
          DEFAULT: '#34DA32',
          hover: '#2ec42d',
          glow: '#5ce35a',
        },
        brand: {
          bg: '#F8FAFC',
          darkBg: '#090D16',
          card: '#FFFFFF',
          cardDark: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(37, 99, 235, 0.5)',
        'glow-accent': '0 0 25px -5px rgba(59, 130, 246, 0.6)',
        'glass-light': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'glass-dark': '0 20px 50px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
