/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

interface LightningProps {
  count?: number; 
  color?: string; 
  className?: string;
}

export default function Lightning({
  color = "#00ffff",
  count = 3, 
  className = "",
}: LightningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 1. تحديد العدد الفعلي بناءً على الـ Mode
  // هنا لو Dark Mode هيخلي العدد 1 (أو القيمة اللي تحبها)، ولو Light Mode هياخد الـ count الأصلي
  const effectiveCount = isDarkMode ? Math.max(1, Math.floor(count / 2)) : count;

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    
    type Link = {
      x1: number; y1: number;
      x2: number; y2: number;
      life: number;
      speed: number;
    };

    let links: Link[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const getRGB = (hex: string) => {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
      const g = parseInt(cleanHex.slice(2, 4), 16) || 255;
      const b = parseInt(cleanHex.slice(4, 6), 16) || 255;
      return `${r}, ${g}, ${b}`;
    };

    const createLink = () => {
      links.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        life: 0,
        speed: 0.01 + Math.random() * 0.015,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. استخدام الـ effectiveCount هنا بدل الـ count الأصلي
      if (Math.random() > 0.98 && links.length < effectiveCount) {
        createLink();
      }

      links.forEach((link, index) => {
        link.life += link.speed;
        const alpha = Math.sin(link.life * Math.PI);

        if (link.life >= 1) {
          links.splice(index, 1);
          return;
        }

        const rgb = getRGB(color);

        ctx.beginPath();
        ctx.lineWidth = isDarkMode ? 0.8 : 2.2; 
        
        const finalAlpha = isDarkMode ? alpha * 0.5 : alpha * 1.0;
        ctx.strokeStyle = `rgba(${rgb}, ${finalAlpha})`;
        
        if (isDarkMode && alpha > 0.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${rgb}, 1)`;
        }

        ctx.moveTo(link.x1, link.y1);
        ctx.lineTo(link.x2, link.y2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = `rgba(${rgb}, ${isDarkMode ? alpha : 1})`;
        const nodeSize = isDarkMode ? 1.5 : 3.5; 
        
        ctx.beginPath();
        ctx.arc(link.x1, link.y1, nodeSize, 0, Math.PI * 2);
        ctx.arc(link.x2, link.y2, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, isDarkMode, effectiveCount]); // تحديث الـ dependency لـ effectiveCount

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
}