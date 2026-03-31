/** @format */
"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Layers, Rocket, Coffee } from "lucide-react";
import Link from "next/link";
import {
  StaggerContainer,
  StaggerItem,
  SectionReveal,
} from "@/components/animations";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("About");
  const stats = useMemo(
    () => [
      { value: "2+", label: t("stats.years"), icon: Rocket },
      { value: "20+", label: t("stats.projects"), icon: Layers },
      { value: "12+", label: t("stats.techs"), icon: Code2 },
      { value: "∞", label: t("stats.coffee"), icon: Coffee },
    ],
    [t]
  );

  const highlights = useMemo(
    () => [
      t("highlights.0"),
      t("highlights.1"),
      t("highlights.2"),
      t("highlights.3"),
    ],
    [t]
  );

  const tags = useMemo(
    () => [t("tags.0"), t("tags.1"), t("tags.2"), t("tags.3")],
    [t]
  );

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 lg:py-20 overflow-hidden bg-white dark:bg-zinc-950/50"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-[-60px] sm:left-[-120px] w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-blue-500/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none -translate-y-1/2"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 mb-10 sm:mb-16 lg:mb-2">
            <div className="flex flex-col gap-2">
              <span className="text-blue-500 font-mono text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase">
                {t("sectionLabel")}
              </span>
         
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
                {t("title")}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400">
                  {t("titleAccent")}
                </span>
              </h2>
              <div className="w-16 sm:w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mt-4 sm:mt-6 rounded-full opacity-80" />
            </div>
            <Separator className="hidden md:block flex-1 bg-zinc-200 dark:bg-zinc-800/60 mt-auto mb-2" />
          </div>
        </SectionReveal>

        {/* 3. شبكة المحتوى المتجاوبة (Responsive Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
          <StaggerContainer
            stagger={0.1}
            delayChildren={0.1}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <StaggerItem>
              <div className="flex flex-col gap-4 sm:gap-5">
           
                <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-[17px] md:text-[19px] leading-[1.8] sm:leading-[1.9]">
                  {t("bio.intro")}{" "}
                  <span className="font-semibold italic border-b border-blue-500/40 pb-[2px]">
                    <span className="text-zinc-900 dark:text-white">
                      Mohamed{" "}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      Gamal
                    </span>
                  </span>
                  ,{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold italic">
                    {t("bio.title")}
                  </span>{" "}
                  <span className="text-zinc-900 dark:text-white font-medium">
                    {t("bio.description")}
                  </span>
                </p>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-[15.5px] md:text-[16.5px] leading-[1.8] sm:leading-[1.9]">
                  {t("bio.stack1")}{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold italic tracking-tight">
                    React, Next.js, TypeScript, Tailwind CSS
                  </span>{" "}
                  {t("bio.stack2")}{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold italic tracking-tight">
                    Node.js, APIs, Cloud Databases
                  </span>{" "}
                  {t("bio.stack3")}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-6 pt-2">
                {highlights.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      <span className="absolute w-full h-full rounded-full bg-blue-400 opacity-0 group-hover:animate-ping group-hover:opacity-40" />
                    </div>
                   
                    <span className="text-zinc-600 dark:text-zinc-400 text-[13px] sm:text-[14px] font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 italic tracking-wide">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 sm:px-4 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[11px] sm:text-[12px] font-mono font-bold hover:border-blue-500/50 hover:bg-blue-500/10 transition-all shadow-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <Button
                asChild
               
                className="group relative w-full sm:w-auto overflow-hidden rounded-xl px-8 py-6 font-bold text-xs uppercase tracking-[2px] text-white transition-all shadow-[0_10px_20px_-10px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_25px_-10px_rgba(59,130,246,0.5)] active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                }}
              >
                <Link href="#projects" className="flex items-center justify-center gap-2">
                  {t("cta")}{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </StaggerItem>
          </StaggerContainer>

          {/* النصف الأيمن: الإحصائيات (Stats) وكارت الحالة الحالية */}
          <StaggerContainer
            stagger={0.08}
            delayChildren={0.2}
            className="flex flex-col gap-6"
          >
            {/* التعديل: تدرج المسافات بين كروت الإحصائيات */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {stats.map(({ value, label, icon: Icon }) => (
                <StaggerItem key={label}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    
                    className="group p-4 sm:p-6 lg:p-8 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] sm:rounded-3xl hover:border-blue-500/30 transition-all duration-500"
                  >
                    {/* التعديل: تصغير الأيقونة في الموبايل */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-blue-600 dark:text-blue-400">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="mt-4 sm:mt-5">
                      {/* التعديل: تدرج حجم رقم الإحصائية */}
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white mb-1">
                        {value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500 group-hover:text-blue-500 transition-colors">
                        {label}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>

            <StaggerItem>
              {/* التعديل: تقليل البادينج في كارت Currently للموبايل */}
              <div className="p-5 sm:p-6 rounded-[1.5rem] sm:rounded-3xl border border-blue-500/10 bg-blue-500/[0.02] dark:bg-blue-500/[0.05] backdrop-blur-md relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-emerald-500/50 group-hover:bg-emerald-500 transition-all" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-emerald-600 dark:text-emerald-400">
                    {t("currently.label")}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {t("currently.text1")}{" "}
                  <span className="font-bold text-zinc-900 dark:text-white border-b border-blue-500/30">
                    {t("currently.text2")}
                  </span>{" "}
                  {t("currently.text3")}{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {t("currently.text4")}
                  </span>
                  .
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}