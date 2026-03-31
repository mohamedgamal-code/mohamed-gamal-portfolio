/** @format */

"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { EXPERIENCES, TYPE_STYLES } from "@/components/constants/experience";

export default function Experience() {
  const t = useTranslations("Experience");
 const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 bg-zinc-50/50 dark:bg-transparent overflow-hidden"
    >
      {/* ── خلفية احترافية (Dot Grid Pattern) ── موحد */}
      <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.1] [background-image:radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* ── النص العملاق في الخلفية ── موحد */}
      <div className="absolute top-20 left-0 w-full pointer-events-none opacity-[0.02] dark:opacity-[0.03] z-0 flex justify-center">
        <h2 className="text-[22vw] font-black uppercase italic text-zinc-900 dark:text-white leading-none">
          {t("label")}
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ── Header السكشن ── موحد */}
        <SectionReveal>
          <div className="flex flex-col mb-24 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-blue-600 dark:text-blue-500 font-mono text-xs font-bold tracking-[6px] uppercase">
                04 / {t("label")}
              </span>
              <div className="h-[1px] w-20 bg-blue-600/30" />
            </div>
            
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
                {t("subtitle")}
              </span>
            </h2>
            {/* الخط السفلي السميك */}
            <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mt-4 rounded-full opacity-80" />
          
          </div>
        </SectionReveal>

        {/* ── Timeline ── */}
        <div className="relative" ref={containerRef}>
          {/* الخط الرأسي للتايم لاين - مع Glow أزرق */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-zinc-200 dark:bg-zinc-800 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          <StaggerContainer
            stagger={0.2}
            className="flex flex-col gap-16 md:gap-32"
          >
            {EXPERIENCES.map((exp, i) => {
              const itemT = (key: string) => t(`items.${exp.id}.${key}`);
              const tasks = t.raw(`items.${exp.id}.tasks`) as string[];
              const isEven = i % 2 === 0;

              return (
                <StaggerItem key={exp.id}>
                  <div className={`relative flex flex-col md:flex-row gap-8 items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    
                    {/* نقطة التايم لاين */}
                    <div className="absolute left-[11px] top-6 md:left-1/2 md:-translate-x-1/2 z-20">
                      <div className={`w-4 h-4 rounded-full border-4 bg-white dark:bg-zinc-950 ${exp.current ? "border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "border-zinc-400 dark:border-zinc-600"}`}>
                        {exp.current && (
                          <span className="absolute -inset-2 rounded-full bg-blue-500 animate-ping opacity-20" />
                        )}
                      </div>
                    </div>

                    {/* مدة العمل (Desktop) */}
                    <div className={`hidden md:flex w-[50%] pt-5 ${isEven ? "justify-end pr-20 text-right" : "justify-start pl-20 text-left"}`}>
                      <div className="flex flex-col gap-2">
                        {/* ✅ تعديل اللون للأزرق */}
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-mono text-sm uppercase tracking-widest italic justify-end">
                          <Calendar size={14} className="text-blue-600 dark:text-blue-500" />
                          {itemT("duration")}
                        </div>
                      </div>
                    </div>

                    {/* كارت التجربة - بنفس ستايل Skills */}
                    <div className={`w-full md:w-[50%] ${isEven ? "md:pl-10" : "md:pr-10"} pl-10 md:pl-0`}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative p-8 md:p-10 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-[2rem] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(59,130,246,0.1)] overflow-hidden"
                      >
                        {/* Glow تأثير الضوء عند الوقوف على الكارت */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-all duration-700" />

                        <div className="relative z-10 flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            {/* الـ Role باللون الأزرق ليتماشى مع الـ Labels في الـ Skills */}
                            <h3 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-500 uppercase tracking-tighter italic leading-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                              {itemT("role")}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-zinc-800 dark:text-white font-mono text-sm font-bold uppercase tracking-widest opacity-80">
                              <Briefcase size={14} className="text-blue-500" />
                              {itemT("company")}
                              <Badge variant="outline" className={`ml-2 text-[9px] border-blue-500/20 text-blue-600 ${TYPE_STYLES[exp.type]}`}>
                                {exp.type}
                              </Badge>
                            </div>

                            {/* ✅ التاريخ للأجهزة المحمولة أيضاً بالأزرق */}
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-mono text-[10px] uppercase tracking-widest italic md:hidden">
                              <Calendar size={12} />
                              {itemT("duration")}
                            </div>
                          </div>

                          <Separator className="bg-zinc-100 dark:bg-zinc-800/50" />

                          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed italic border-l-2 border-blue-600/20 pl-4">
                            {itemT("description")}
                          </p>

                          <ul className="space-y-3">
                            {tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                                {task}
                              </li>
                            ))}
                          </ul>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                            {exp.tech.map((techItem, index) => (
                              <motion.span
                                key={techItem}
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{
                                  scale: 1.1,
                                  y: -3,
                                  transition: { duration: 0.2 },
                                }}
                                className={cn(
                                  "px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg border cursor-default transition-all duration-200 shadow-sm",
                                  "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400",
                                  "text-[11px] sm:text-[12px] font-mono font-medium",
                                  "hover:border-blue-500/50",
                                  "hover:bg-blue-500/10 dark:hover:bg-blue-500/20",
                                  "hover:text-blue-700 dark:hover:text-blue-300",
                                  "hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                )}
                              >
                                {techItem}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* الخط السفلي المتحرك */}
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 w-0 group-hover:w-full transition-all duration-500" />
                      </motion.div>
                    </div>

                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}