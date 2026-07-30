'use client';

import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  color: string;
}

interface Coin {
  x: number;
  y: number;
  radius: number;
  speed: number;
  text: string;
  colors: {
    start: string;
    end: string;
    border: string;
    text: string;
  };
  alpha: number;
  drift: number;
  driftOffset: number;
}

const COIN_LABELS = ['BIG', 'SMALL', '5X', '3X', '7X', '2.5X', '4.5X'];

export default function TradingCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse Position
    const mouse = { x: -100, y: -100 };

    const sparkles: Sparkle[] = [];
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn 1-2 small subtle magic sparkles at mouse cursor
      for (let i = 0; i < 2; i++) {
        sparkles.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          speed: Math.random() * 0.8 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Create Stream of Floating Coins - 24 coins with unique HSL hues
    const numCoins = 24;
    const coins: Coin[] = Array.from({ length: numCoins }, (_, i) => {
      const radius = 22 + Math.random() * 14;
      const hue = Math.floor((i * 360) / numCoins);
      const colors = {
        start: `hsl(${hue}, 80%, 65%)`,
        end: `hsl(${hue}, 80%, 45%)`,
        border: `hsl(${hue}, 85%, 80%)`,
        text: `hsl(${hue}, 90%, 15%)`
      };
      const text = COIN_LABELS[i % COIN_LABELS.length];

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speed: 0.3 + Math.random() * 0.6,
        text,
        colors,
        alpha: 1.0,
        drift: 0.15 + Math.random() * 0.25,
        driftOffset: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.01;

      // 1. Draw Watermark Text "5XEARN"
      ctx.save();
      ctx.globalAlpha = 0.06; // Halka opacity
      ctx.fillStyle = '#10b981'; // Greenish tint
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const isMobile = width < 768;
      if (isMobile) {
        // Move to the top on mobile so it isn't hidden behind the AuthCard
        const watermarkSize = Math.max(width * 0.15, 60);
        ctx.font = `900 ${watermarkSize}px 'Inter', sans-serif`;
        ctx.fillText('5XEARN', width / 2, height * 0.15);
      } else {
        // Centered on desktop
        const watermarkSize = Math.min(width * 0.12, 160);
        ctx.font = `900 ${watermarkSize}px 'Inter', sans-serif`;
        ctx.fillText('5XEARN', width / 2, height / 2);
      }
      ctx.restore();

      // 1.5 Draw Faint Candlesticks to look like real trading chart
      ctx.globalAlpha = 0.25; 
      const candleWidth = 12;
      const spacing = 36;
      
      for (let x = spacing; x < width; x += spacing) {
         // Base position and volatility for this specific candle slot
         const baseY = height * 0.5 + Math.sin(x * 0.005) * 100 + Math.cos(x * 0.003) * 60;
         const volatility = 30 + Math.abs(Math.sin(x * 0.02)) * 60;
         
         // Add time to make them animate up and down in real-time like live market
         const timeOffset = x * 0.1;
         
         // Open and Close prices actively fluctuating
         const open = baseY + Math.sin(time * 1.2 + timeOffset) * volatility * 0.6;
         const close = baseY + Math.cos(time * 1.8 + timeOffset * 1.4) * volatility;
         
         const minPrice = Math.min(open, close);
         const maxPrice = Math.max(open, close);
         
         // High and Low wicks stretching dynamically
         const high = minPrice - 5 - Math.abs(Math.sin(time * 2.5 + timeOffset)) * 30;
         const low = maxPrice + 5 + Math.abs(Math.cos(time * 2.7 + timeOffset)) * 30;
         
         const isGreen = close < open; // Canvas Y goes down, so smaller Y means higher price
         
         ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444'; 
         ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
         
         const cX = x - candleWidth / 2;
         
         // Draw Wick
         ctx.beginPath();
         ctx.lineWidth = 2.5;
         ctx.moveTo(x, high);
         ctx.lineTo(x, low);
         ctx.stroke();
         
         // Draw Body
         ctx.fillRect(cX, minPrice, candleWidth, Math.max(maxPrice - minPrice, 4));
      }
      ctx.globalAlpha = 1.0;

      // 2. Draw Moving Coins Stream
      coins.forEach((c) => {
        c.y -= c.speed;
        c.x += Math.sin(time * 0.5 + c.driftOffset) * c.drift;

        // Reset if goes off-screen
        if (c.y + c.radius < 0) {
          c.x = Math.random() * width;
          c.y = height + c.radius + 20 + Math.random() * 40;
          c.radius = 24 + Math.random() * 12;
          c.speed = 0.35 + Math.random() * 0.45;
          // Keep original colors, label, and alpha to guarantee uniqueness
        }

        ctx.save();
        ctx.globalAlpha = c.alpha;

        // Draw shadow/outer glow
        ctx.shadowColor = c.colors.start;
        ctx.shadowBlur = 8;

        // Create gradient for coin body
        const grad = ctx.createLinearGradient(
          c.x - c.radius,
          c.y - c.radius,
          c.x + c.radius,
          c.y + c.radius
        );
        grad.addColorStop(0, c.colors.start);
        grad.addColorStop(1, c.colors.end);

        // Draw outer coin circle
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();

        // Remove shadow/glow for inner details
        ctx.shadowBlur = 0;

        // Draw inner border/rim
        ctx.strokeStyle = c.colors.border;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius * 0.82, 0, Math.PI * 2);
        ctx.stroke();

        // Draw centered text
        ctx.fillStyle = c.colors.text;
        const fontSize = Math.max(9, Math.floor(c.radius * 0.38));
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(c.text, c.x, c.y);

        ctx.restore();
      });

      ctx.globalAlpha = 1;

      // 3. Stock Line removed to keep focus on candlesticks

      // 4. Render Cute Tiny Sparkles at Cursor
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.y -= s.speed;
        s.alpha -= 0.03;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }} />
    </div>
  );
}
