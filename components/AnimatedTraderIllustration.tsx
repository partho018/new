'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTraderIllustration() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[260px] sm:h-[310px] mx-auto flex items-center justify-center">
      {/* Removed background glow to allow canvas candlesticks to show clearly */}

      {/* Realistic Detailed 3D Vector Trader SVG */}
      <svg
        viewBox="0 0 450 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl z-10"
      >
        <defs>
          {/* Gradients for Realism */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbe3d2" />
            <stop offset="100%" stopColor="#f3c5a5" />
          </linearGradient>

          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b2314" />
            <stop offset="100%" stopColor="#1a0d06" />
          </linearGradient>

          <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="pcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floating Trading Monitor Windows in Background */}
        <motion.g
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Floating Chart 1 */}
          <rect x="40" y="50" width="100" height="75" rx="10" fill="#ffffff" fillOpacity="0.9" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M50 100 L70 80 L85 92 L105 70 L125 78" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <circle cx="125" cy="78" r="4" fill="#10b981" />
          <path d="M50 100 L70 80 L85 92 L105 70 L125 78 L125 110 L50 110 Z" fill="url(#chartGrad)" />

          {/* Floating Chart 2 */}
          <rect x="310" y="45" width="105" height="80" rx="10" fill="#ffffff" fillOpacity="0.9" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="325" y="70" width="10" height="35" rx="2" fill="#10b981" />
          <rect x="342" y="80" width="10" height="25" rx="2" fill="#ef4444" />
          <rect x="359" y="62" width="10" height="43" rx="2" fill="#10b981" />
          <rect x="376" y="75" width="10" height="30" rx="2" fill="#10b981" />
        </motion.g>

        {/* Floating Profit Notification Badge */}
        <motion.g
          animate={{ y: [-7, 7, -7], rotate: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="300" y="145" width="100" height="32" rx="16" fill="#10b981" filter="url(#glowEffect)" />
          <text x="350" y="166" fill="#ffffff" fontSize="12" fontStyle="bold" fontWeight="800" textAnchor="middle">
            🚀 +$12,480
          </text>
        </motion.g>

        {/* Ergonomic Office Chair */}
        <path d="M175 160 Q225 130 275 160 L280 280 L170 280 Z" fill="#1e293b" />
        <rect x="210" y="270" width="30" height="60" rx="4" fill="#475569" />

        {/* REALISTIC MAN CHARACTER (Sitting & Working on PC) */}
        <g id="ManTrader">
          {/* Body / Suit Jacket */}
          <path d="M165 210 Q225 190 285 210 L295 310 L155 310 Z" fill="url(#suitGrad)" />
          {/* White Shirt Collar */}
          <polygon points="210,205 240,205 245,235 225,245 205,235" fill="url(#shirtGrad)" />
          {/* Blue Tie */}
          <polygon points="220,210 230,210 232,260 225,268 218,260" fill="#2563eb" />

          {/* Neck */}
          <rect x="215" y="180" width="20" height="30" rx="6" fill="url(#skinGrad)" />

          {/* Head & Face Structure */}
          <motion.g
            animate={{ y: [-1.5, 1.5, -1.5], rotate: [-1, 1, -1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ears */}
            <circle cx="196" cy="155" r="7" fill="url(#skinGrad)" />
            <circle cx="254" cy="155" r="7" fill="url(#skinGrad)" />

            {/* Face Shape */}
            <path d="M198 140 C198 115, 252 115, 252 140 C252 170, 238 185, 225 185 C212 185, 198 170, 198 140 Z" fill="url(#skinGrad)" />

            {/* Stylish Hair */}
            <path d="M194 135 C194 110, 210 95, 225 95 C245 95, 258 108, 258 130 C252 115, 235 110, 225 115 C215 110, 200 120, 194 135 Z" fill="url(#hairGrad)" />

            {/* Eyebrows */}
            <path d="M208 140 Q215 136 220 140" stroke="#3b2314" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M230 140 Q235 136 242 140" stroke="#3b2314" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Eyes focused on PC */}
            <circle cx="214" cy="147" r="3" fill="#1e293b" />
            <circle cx="236" cy="147" r="3" fill="#1e293b" />

            {/* Nose */}
            <path d="M225 146 L222 157 L227 158" stroke="#e2a882" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Confident Smile */}
            <path d="M217 168 Q225 174 233 168" stroke="#b96d43" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Smart Glasses */}
            <rect x="205" y="141" width="16" height="11" rx="3" stroke="#0f172a" strokeWidth="2" fill="#38bdf8" fillOpacity="0.25" />
            <rect x="229" y="141" width="16" height="11" rx="3" stroke="#0f172a" strokeWidth="2" fill="#38bdf8" fillOpacity="0.25" />
            <line x1="221" y1="146" x2="229" y2="146" stroke="#0f172a" strokeWidth="2" />
          </motion.g>
        </g>

        {/* REALISTIC DESKTOP PC & KEYBOARD SETTING */}
        {/* Desk Surface */}
        <rect x="60" y="275" width="330" height="12" rx="6" fill="#cbd5e1" />
        <rect x="50" y="285" width="350" height="15" fill="#94a3b8" />

        {/* PC Monitor Stand */}
        <path d="M210 265 L240 265 L235 275 L215 275 Z" fill="#64748b" />
        <rect x="200" y="275" width="50" height="4" rx="2" fill="#475569" />

        {/* Monitor Screen Frame */}
        <rect x="135" y="165" width="180" height="100" rx="8" fill="url(#pcGrad)" stroke="#475569" strokeWidth="3" />
        {/* Screen Display (Live Trading Dashboard on PC) */}
        <rect x="141" y="171" width="168" height="88" rx="4" fill="url(#screenGrad)" />
        {/* 5xEarn Brand Icon on PC Screen */}
        <image href="/5xEarn.webp" x="148" y="177" width="16" height="16" />
        {/* Green Line Graph on PC Screen */}
        <path d="M148 235 L170 220 L185 227 L210 195 L235 210 L265 185 L295 200" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="295" cy="200" r="4" fill="#34d399" filter="url(#glowEffect)" />

        {/* BIGGER & PROMINENT KEYBOARD ON DESK */}
        <rect x="145" y="268" width="160" height="15" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        {/* Keyboard Key Rows */}
        <rect x="150" y="271" width="150" height="9" rx="2" fill="#334155" />

        {/* LEFT HAND & SEPARATE ANIMATED TYPING FINGERS */}
        <g id="LeftHandGroup">
          <path d="M115 282 Q150 274 172 273" stroke="url(#suitGrad)" strokeWidth="13" strokeLinecap="round" />
          <circle cx="174" cy="273" r="6" fill="url(#skinGrad)" />
          {/* Finger 1 */}
          <motion.rect
            x="178"
            y="270"
            width="3"
            height="6"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [0, -4, 0, -2, 0] }}
            transition={{ duration: 0.18, repeat: Infinity, ease: 'linear' }}
          />
          {/* Finger 2 */}
          <motion.rect
            x="183"
            y="271"
            width="3"
            height="5"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [-3, 0, -4, 0, -2] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Finger 3 */}
          <motion.rect
            x="188"
            y="270"
            width="3"
            height="6"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [-1, -5, 0, -3, 0] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
          />
        </g>

        {/* RIGHT HAND & SEPARATE ANIMATED TYPING FINGERS */}
        <g id="RightHandGroup">
          <path d="M335 282 Q300 274 278 273" stroke="url(#suitGrad)" strokeWidth="13" strokeLinecap="round" />
          <circle cx="276" cy="273" r="6" fill="url(#skinGrad)" />
          {/* Finger 1 */}
          <motion.rect
            x="272"
            y="270"
            width="3"
            height="6"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [-4, 0, -2, 0, -5] }}
            transition={{ duration: 0.19, repeat: Infinity, ease: 'linear' }}
          />
          {/* Finger 2 */}
          <motion.rect
            x="267"
            y="271"
            width="3"
            height="5"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [0, -3, 0, -4, 0] }}
            transition={{ duration: 0.21, repeat: Infinity, ease: 'linear' }}
          />
          {/* Finger 3 */}
          <motion.rect
            x="262"
            y="270"
            width="3"
            height="6"
            rx="1.5"
            fill="url(#skinGrad)"
            animate={{ y: [-2, 0, -5, 0, -3] }}
            transition={{ duration: 0.23, repeat: Infinity, ease: 'linear' }}
          />
        </g>

        {/* Highly Visible Animated Keypress Spark Lights */}
        <motion.circle
          cx="183"
          cy="274"
          r="3.5"
          fill="#38bdf8"
          animate={{ scale: [0.5, 1.6, 0.5], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        <motion.circle
          cx="270"
          cy="274"
          r="3.5"
          fill="#38bdf8"
          animate={{ scale: [1.6, 0.5, 1.6], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.17, repeat: Infinity }}
        />

        {/* Ergonomic PC Mouse on Right Side */}
        <rect x="315" y="271" width="14" height="10" rx="4" fill="#1e293b" />
      </svg>
    </div>
  );
}
