/** @format */
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/components/constants/projects";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// 1. مكون عرض المشروع الفردي (Project Row Component)
const ProjectRow = ({ project, index }: { project: any; index: number }) => {
  const t = useTranslations("Projects");
  const isEven = index % 2 === 0;

  return (
    <div className="relative min-h-fit flex items-center justify-center py-8 sm:py-12 lg:py-8 border-b border-zinc-200/50 dark:border-zinc-900/50 last:border-0">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-10 lg:gap-24 w-full`}
      >
        {/* حاوية الصورة - ثابتة في الديسكتوب ومتجاوبة في الموبايل */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 aspect-video group overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900 shadow-sm"
        >
          <Image
            src={project.image}
            alt={t(`items.${project.id}.title`)}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>

        {/* قسم المحتوى النصي - تعديل أحجام النصوص للموبايل فقط */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col gap-5 lg:gap-6"
        >
          {/* رقم المشروع */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-blue-600 dark:text-blue-500 text-xs sm:text-sm font-bold">
                0{index + 1}
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>

          {/* تفاصيل المشروع */}
          <div className="flex flex-col gap-3">
            <div className="w-8 h-[2px] bg-blue-500/40 rounded-full" />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              <span
                className="text-blue-600 dark:text-blue-400"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(59,130,246,0.12))",
                }}
              >
                {t(`items.${project.id}.title`)}
              </span>
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-[14px] sm:text-[15.5px] lg:text-[16.5px] leading-[1.75] max-w-md lg:max-w-lg tracking-[0.2px]">
              {t(`items.${project.id}.description`)}
            </p>
          </div>

          {/* التقنيات - Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags &&
              project.tags.map((tag: string, i: number) => (
                <motion.span
                  key={tag}
                  className={cn(
                    "px-2 py-1 rounded-md border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider font-mono",
                    "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400"
                  )}
                >
                  {tag}
                </motion.span>
              ))}
          </div>

          {/* أزرار التفاعل - ضبط الـ padding والتوزيع للموبايل */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mt-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 text-white rounded-full transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40"
            >
              <span className="font-bold uppercase text-[10px] lg:text-[11px] tracking-wider">
                {t("buttons.viewProject")}
              </span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 px-6 lg:px-7 py-[11px] lg:py-[14px] border border-zinc-300 dark:border-zinc-800 rounded-full transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <SiGithub
                size={18}
                className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
              />
              <span className="font-bold uppercase text-[10px] lg:text-[11px] tracking-wider text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {t("buttons.viewCode")}
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// 2. المكون الرئيسي لقسم المشاريع
export default function HorizontalProjects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="relative pb-20 px-4 sm:px-6 lg:px-0">
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-[30%] left-0 w-full flex justify-center opacity-[0.04] dark:opacity-[0.03] overflow-hidden">
          <h2 className="text-[20vw] font-black uppercase leading-none text-zinc-500 italic tracking-tighter whitespace-nowrap">
            {t("section.bgText")}
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-8 relative z-10">
        <div className="mb-10 pt-10 lg:mb-0 lg:pt-2">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-[10px] lg:text-xs tracking-[6px] lg:tracking-[10px] uppercase block mb-4">
            {t("section.subtitle")}
          </span>
          <div className="flex flex-col">
            <h2 className="flex flex-col font-black uppercase italic tracking-tighter leading-[0.8] text-4xl sm:text-7xl md:text-8xl">
              <span className="text-zinc-900 dark:text-white opacity-95">
                {t("section.title")}
              </span>
              <span
                className="text-blue-600 dark:text-blue-500 mt-[-0.05em]"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(59,130,246,0.35))",
                  WebkitTextStroke: "1px rgba(59,130,246,0.1)",
                }}
              >
                {t("section.titleAccent")}
              </span>
            </h2>
            <div className="w-16 lg:w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mt-4 rounded-full opacity-80" />
          </div>
        </div>

        {/* عرض المشاريع */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* زر استكشاف المزيد */}
        <div className="mt-20 lg:mt-32 text-center flex justify-center items-center">
          <motion.a
            href="https://github.com/mohamedgamal-code"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-6 px-10 py-4 rounded-full border border-blue-600/30 dark:border-blue-500/20 bg-transparent transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-sm font-black uppercase tracking-[4px] text-blue-600/80 dark:text-blue-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {t("section.exploreMore")}
            </span>
            <div className="relative">
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="text-blue-600/60 dark:text-blue-500/60 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1.5"
              />
            </div>
            <div className="absolute -inset-[1px] rounded-full border border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-500" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
