"use client";

import { useEffect, useState } from "react";

export function FloatingTelegramButton() {
  const [telegramUrl, setTelegramUrl] = useState("https://t.me/nexabot_support"); // Default

  useEffect(() => {
    // Fetch settings from our API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.telegramUrl) {
          setTelegramUrl(data.telegramUrl);
        }
      })
      .catch((err) => console.error("Failed to fetch telegram URL", err));
  }, []);

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group pointer-events-auto"
      title="Join us on Telegram"
    >
      {/* Outer pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[#229ED9] opacity-40 animate-ping" />
      {/* Button */}
      <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#229ED9] shadow-xl shadow-[#229ED9]/50 hover:scale-110 transition-transform duration-200">
        {/* Telegram SVG icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </span>
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">
        Join Telegram Support
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
      </span>
    </a>
  );
}
