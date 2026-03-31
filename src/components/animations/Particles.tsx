/** @format */
"use client";
import { useEffect, useRef, useState } from "react";

interface ParticlesProps {
  count?: number; 
  color?: string; 
  mouseAttract?: boolean;
  opacity?: number; 
  className?: string;
}

export default function Particles({
  count = 100, 
  color = "59,130,246",
  mouseAttract = true,
  opacity = 1,
  className = "",
}: ParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      if (mouseAttract) mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const processColor = (input: string) => {
      if (input.startsWith("#")) {
        const r = parseInt(input.slice(1, 3), 16);
        const g = parseInt(input.slice(3, 5), 16);
        const b = parseInt(input.slice(5, 7), 16);
        return `${r},${g},${b}`;
      }
      return input;
    };

    const activeRGB = processColor(color);

    type P = {
      x: number; y: number;
      vx: number; vy: number;
      baseSize: number;
      z: number;
      alpha: number;
      pulse: number; ps: number;
    };

    const particles: P[] = Array.from({ length: count }, () => {
      const z = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (0.05 + (1 - z) * 0.15), 
        vy: (Math.random() - 0.5) * (0.05 + (1 - z) * 0.15),
        baseSize: z * 1.2 + 0.2, 
        z,
        alpha: z * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.008 + 0.002,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const mdx = mouse.current.x - p.x;
        const mdy = mouse.current.y - p.y;
        const mdst = Math.hypot(mdx, mdy);
        const nearMouse = mouseAttract && mdst < 180;

        if (nearMouse) {
          const force = (180 - mdst) / 180;
          p.x += mdx * (force * 0.012); 
          p.y += mdy * (force * 0.012);
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          
          if (dist < 100) { // تقليل مسافة الربط لتقليل الزحمة
            const activeSynapse = nearMouse || (mouseAttract && Math.hypot(mouse.current.x - q.x, mouse.current.y - q.y) < 180);
            
            const baseAlpha = (1 - dist / 100) * (isDarkMode ? 0.05 : 0.1);
            const lineAlpha = (p.z + q.z) / 2 * baseAlpha;

            ctx.beginPath();
            ctx.strokeStyle = activeSynapse 
              ? `rgba(${activeRGB}, ${isDarkMode ? 0.3 : 0.5})` 
              : `rgba(${activeRGB}, ${lineAlpha})`;
            ctx.lineWidth = isDarkMode ? 0.4 : 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        p.pulse += p.ps;
        const currentRadius = Math.max(0.1, p.baseSize + Math.sin(p.pulse) * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        
        if (nearMouse) {
          ctx.fillStyle = `rgba(${activeRGB}, ${isDarkMode ? 0.7 : 0.9})`;
          if (isDarkMode) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${activeRGB}, 0.6)`;
          }
        } else {
          ctx.fillStyle = `rgba(${activeRGB}, ${isDarkMode ? p.alpha : p.alpha + 0.25})`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [count, color, mouseAttract, isDarkMode]);

  return (
    <canvas
      ref={ref}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
}