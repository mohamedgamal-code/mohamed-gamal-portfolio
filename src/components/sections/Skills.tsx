/** @format */

"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import * as SiIcons from "react-icons/si";
import { Separator } from "@/components/ui/separator";
import { SectionReveal } from "@/components/animations";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SKILLS, SKILL_CATEGORIES } from "@/components/constants/Skills";

export default function Skills() {
  const t = useTranslations("Skills");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // لمنع مشاكل الـ Hydration في Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // إحداثيات الماوس لتأثير الـ 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // حساب زوايا الدوران بناءً على حركة الماوس
  const rotateX = useTransform(smoothMouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!isMounted) return null;

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 bg-zinc-50/50 dark:bg-transparent overflow-hidden lg:py-16"
    >
      {/* نمط الخلفية (Background Pattern) */}
      <div className="absolute inset-0 z-0 opacity-[0.1] dark:opacity-[0.05] [background-image:radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* مقدمة القسم */}
        <SectionReveal>
          <div className="flex flex-col mb-12 sm:mb-16">
            <span className="text-blue-600 dark:text-blue-500 font-mono text-[10px] tracking-[4px] uppercase mb-2">
              02 / {t("sectionLabel")}
            </span>
            <h2 className="flex flex-col font-black uppercase italic tracking-tighter leading-[0.8] text-4xl sm:text-7xl md:text-8xl">
              <span className="text-zinc-900 dark:text-white opacity-95">
                {t("title")}
              </span>
              <span
                className="text-blue-600 dark:text-blue-500 mt-[-0.05em]"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(59,130,246,0.35))",
                  WebkitTextStroke: "1px rgba(59,130,246,0.1)",
                }}
              >
                {t("titleAccent")}
              </span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mt-6 rounded-full opacity-90" />
          </div>
        </SectionReveal>

        {/* حاوية المهارات التفاعلية (3D Container) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="space-y-16 lg:space-y-20"
          >
            {SKILL_CATEGORIES.map((category) => {
              const categorySkills = SKILLS.filter(
                (s) => s.category === category.key
              );

              return (
                <div
                  key={category.key}
                  className="grid grid-cols-1 lg:grid-cols-[200px,1fr] xl:grid-cols-[250px,1fr] gap-8 sm:gap-12 items-start"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* معلومات التصنيف */}
                  <div
                    className="space-y-3"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-500 uppercase italic tracking-tighter">
                      {t(`categories.${category.key}.label`)}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[10px] leading-relaxed uppercase tracking-wider border-l-2 border-blue-600/30 pl-4 italic">
                      {t(`categories.${category.key}.description`)}
                    </p>
                  </div>

                  {/* شبكة المهارات المتجاوبة (Responsive Skills Grid) */}
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {categorySkills.map((skill) => {
                      const Icon = (SiIcons as any)[skill.icon];

                      return (
                        <motion.div
                          key={skill.name}
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                          variants={{
                            rest: { y: 0, scale: 1 },
                            hover: {
                              y: -6,
                              scale: 1.015,
                              transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                              },
                            },
                          }}
                          className={cn(
                            "group relative aspect-square flex flex-col items-center justify-center p-6 sm:p-8",
                            "bg-black/[0.03] dark:bg-white/[0.05] backdrop-blur-xl border border-zinc-200 dark:border-white/10",
                            "rounded-[2.5rem] transition-all duration-500 cursor-default overflow-hidden",
                            "hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]"
                          )}
                        >
                          {/* تأثير الإضاءة عند التمرير */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.1] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* الأيقونة */}
                          <div className="relative z-10 mb-5 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                            {Icon && (
                              <Icon className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            )}
                          </div>

                          {/* اسم المهارة */}
                          <span className="relative z-10 text-[10px] sm:text-[12px] font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white uppercase tracking-[0.15em] text-center leading-tight transition-colors duration-300">
                            {skill.name}
                          </span>

                          {/* تأثير لمعة الزجاج (Glass Shine) */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 dark:via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out" />

                          {/* مؤشر تفاعلي سفلي */}
                          <div className="absolute bottom-6 w-4 h-[2px] bg-zinc-200 dark:bg-white/10 group-hover:bg-blue-500 group-hover:w-10 transition-all duration-400 rounded-full" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* تذييل القسم */}
        <div className="mt-24 sm:mt-32 text-center space-y-6">
          <Separator className="max-w-[200px] mx-auto bg-zinc-200 dark:bg-zinc-800" />
          <p className="font-mono text-[9px] uppercase tracking-[10px] sm:tracking-[15px] text-zinc-400 dark:text-zinc-500 opacity-60">
            {t("bottomText")}
          </p>
        </div>
      </div>
    </section>
  );
}
