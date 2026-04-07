/** @format */
"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Download, ArrowUpRight, Linkedin, Zap } from "lucide-react";
import { SiGithub, SiGmail, SiUpwork } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/animations";
const handleEmailClick = (
  e: React.MouseEvent,
  label: string,
  href: string,
  gmailHref?: string
) => {
  if (label !== "Email") return;

  e.preventDefault();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = href;
  } else if (gmailHref) {
    window.open(gmailHref, "_blank");
  }
};
// بيانات روابط السوشيال ميديا
const SOCIAL = [
  {
    icon: SiGithub,
    href: "https://github.com/mohamedgamal-code",
    label: "GitHub",
    color: "#333",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohamed-gamal-code/",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: SiUpwork,
    href: "https://www.upwork.com/freelancers/~0194a7d28b23a1525f",
    label: "Upwork",
    color: "#14a800",
  },
  {
    icon: SiGmail,
    href: "mailto:mohamed.gamalcode@gmail.com",
    gmailHref:
      "https://mail.google.com/mail/?view=cm&fs=1&to=mohamed.gamalcode@gmail.com",
    label: "Email",
    color: "#ea4335",
  },
];

// التقنيات المستخدمة (Tech Stack)
const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Prisma",
];

// هوك (Hook) مخصص لعمل تأثير الكتابة (Typewriter effect)
function useTyping(words: string[], spd = 70, pause = 1500) {
  const [txt, setTxt] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const cur = words[idx];
    const time = del ? spd / 2 : spd;

    const t = setTimeout(() => {
      if (!del) {
        // حالة الكتابة
        setTxt(cur.slice(0, txt.length + 1));
        if (txt.length === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        // حالة المسح
        setTxt(cur.slice(0, txt.length - 1));
        if (txt.length === 0) {
          setDel(false);
          setIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, time);

    return () => clearTimeout(t);
  }, [txt, del, idx, words, spd, pause]);

  return txt;
}

export default function Hero() {
  const t = useTranslations("Hero");

  // تجهيز العناوين اللي هتتكتب وتتمسح
  const TITLES = useMemo(
    () => [
      t("titles.0"),
      t("titles.1"),
      t("titles.2"),
      t("titles.3"),
      t("titles.4"),
    ],
    [t]
  );

  const typed = useTyping(TITLES, 100, 3000);
  const ref = useRef(null);
  // بنشغل الأنيميشن مرة واحدة لما العنصر يظهر في الشاشة
  const inView = useInView(ref, { once: true });

  // إعدادات حركة الماوس للـ Background Gradient
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const gX = useSpring(mX, { stiffness: 55, damping: 18 });
  const gY = useSpring(mY, { stiffness: 55, damping: 18 });

  // تحديث إحداثيات الماوس
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mX.set(e.clientX - r.left);
    mY.set(e.clientY - r.top);
  };

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center overflow-hidden cursor-default py-12 lg:py-12"
    >
      {/* ════ خلفية تأثير الماوس ════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block" // خفيناها في
        style={{
          background: `radial-gradient(700px circle at ${gX}px ${gY}px, rgba(59,130,246,0.06), rgba(59,130,246,0) 45%)`,
        }}
      />

      {/* ════ تأثيرات الإضاءة في الخلفية ════ */}
      <div className="absolute -top-40 -left-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-700/10 blur-[120px] md:blur-[160px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-indigo-500/4 dark:bg-indigo-700/8 blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none" />

      {/* ════ المحتوى الرئيسي ════ */}
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ════ الجزء الأيسر: النصوص والأزرار ════ */}
          <StaggerContainer
            stagger={0.1}
            delayChildren={0.2}
            className="flex flex-col gap-6 sm:gap-8"
          >
            {/* الشارة (Badge) ومكان التواجد */}
            <StaggerItem>
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border w-fit"
                  style={{
                    borderColor: "rgba(59,130,246,0.4)",
                    background: "rgba(59,130,246,0.08)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"
                    style={{ boxShadow: "0 0 6px #3b82f6" }}
                  />
                  <span className="text-blue-600 dark:text-blue-400 text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase whitespace-nowrap">
                    {t("badge")}
                  </span>
                </div>
                <div className="h-px w-8 sm:w-10 bg-gradient-to-r from-blue-500/50 to-transparent hidden sm:block" />
                <span className="text-zinc-400 dark:text-zinc-500 text-[10px] sm:text-[11px] font-mono tracking-[2px] sm:tracking-[3px]">
                  {t("location")}
                </span>
              </div>
            </StaggerItem>

            {/* الترحيب */}
            <StaggerItem>
              <span className="text-zinc-400 dark:text-zinc-500 text-[12px] font-mono tracking-[4px] sm:tracking-[5px] uppercase">
                {t("greeting")}
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="font-black tracking-tighter leading-[0.9] uppercase">
                <span className="block text-[clamp(2.2rem,7vw,6.5rem)] text-zinc-900 dark:text-white">
                  Mohamed
                </span>
                <span
                  className="block text-[clamp(2.2rem,7vw,6.5rem)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 40%,#60a5fa 70%,#93c5fd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(59,130,246,0.4))",
                  }}
                >
                  Gamal
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block w-3 h-3 md:w-4 md:h-4 xl:w-5 xl:h-5 rounded-full ml-2 sm:ml-3 mb-1 sm:mb-2 align-bottom"
                    style={{
                      background: "#3b82f6",
                      boxShadow:
                        "0 0 20px rgba(59,130,246,1), 0 0 40px rgba(59,130,246,0.5)",
                    }}
                  />
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center gap-2 sm:gap-3 h-8 sm:h-9 overflow-hidden">
                <Zap
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 fill-blue-600 dark:fill-blue-500 text-blue-600 dark:text-blue-500"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(59,130,246,0.6))",
                  }}
                />
                <span className="text-[13px] sm:text-[15px] md:text-[16px] font-mono font-bold tracking-[1.5px] sm:tracking-[2.5px] uppercase text-blue-700 dark:text-blue-400 truncate">
                  {typed}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="inline-block w-[2px] h-[14px] sm:h-[16px] ml-1 align-middle rounded-sm bg-blue-600 dark:bg-blue-400"
                    style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
                  />
                </span>
              </div>
            </StaggerItem>
            {/* ════قسم الوصف ي (Description Section) ════ */}
            <StaggerItem>
              <div className="flex flex-col gap-8 pt-2 max-w-[560px] relative">
                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-[60px] text-blue-500/5 dark:text-blue-500/10 font-serif pointer-events-none select-none">
                    “
                  </span>

                  {/* Description */}
                  <p className="text-zinc-800 dark:text-zinc-300 text-[15.8px] sm:text-[17.8px] leading-[1.85] font-medium italic tracking-[0.005em]">
                    {t.rich("description", {
                      strong: (chunks) => (
                        <strong className="text-zinc-950 dark:text-white font-semibold underline decoration-blue-500/25 decoration-[1.5px] underline-offset-[3px]">
                          {chunks}
                        </strong>
                      ),

                      blue: (chunks) => (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold italic">
                          {chunks}
                        </span>
                      ),

                      u: (chunks) => (
                        <span className="border-b border-blue-500/25 pb-[1px]">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </div>

                {/* 2. الوصف الفرعي - المصمم كـ "Mission Statement" */}
                <div className="group/sub relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-blue-500"
                      initial={{ y: "-100%" }}
                      whileInView={{ y: "0%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p
                    className="text-blue-600 dark:text-blue-400 text-[13.5px] sm:text-[14.5px] font-semibold italic tracking-[0.05em] leading-relaxed opacity-95 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      textShadow: "0 0 6px rgba(59,130,246,0.2)",
                    }}
                  >
                    {t("descriptionSub")}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <div className="w-8 h-[2px] bg-blue-500/40 rounded-full" />
                    <div className="w-2 h-[2px] bg-blue-500/20 rounded-full" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* التقنيات (Stack) */}
            <StaggerItem>
              <div className="flex flex-wrap gap-2 pt-2">
                {STACK.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[11px] sm:text-[12px] font-mono font-medium cursor-default hover:border-blue-500/50 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </StaggerItem>

            {/* الأزرار (CTAs) */}
            <StaggerItem>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden rounded-none px-6 sm:px-8 h-12 sm:h-14 uppercase tracking-[2px] font-black text-[11px] text-white border-0"
                    style={{
                      background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                      boxShadow:
                        "4px 4px 0 #1e3a8a, 0 0 20px rgba(59,130,246,0.3)",
                    }}
                  >
                    <Link href="#projects">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t("cta.projects")}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-none border-zinc-300 dark:border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/5 h-12 sm:h-14 px-6 sm:px-8 uppercase tracking-[2px] text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                  >
                    <a href="/cv.pdf" download className="flex justify-center">
                      <Download className="mr-2 w-4 h-4" />
                      {t("cta.cv")}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </StaggerItem>

            {/* أيقونات السوشيال ميديا */}
            <StaggerItem>
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                {SOCIAL.map(({ icon: Icon, href, label, color, gmailHref }) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) => handleEmailClick(e, label, href, gmailHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, y: -4, rotate: 5, color }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-sm transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-500/5"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ════ الجزء الأيمن: الصورة (Avatar) ════ */}
          <ScaleIn
            delay={0.3}
            className="flex justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative group">
              {/* حلقة بتلف حوالين الصورة */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  scale: 1.22,
                  border: "1px dashed rgba(59,130,246,0.25)",
                }}
              />
              {[
                "-top-4 -left-4 sm:-top-5 sm:-left-5 border-t-2 border-l-2",
                "-top-4 -right-4 sm:-top-5 sm:-right-5 border-t-2 border-r-2",
                "-bottom-4 -left-4 sm:-bottom-5 sm:-left-5 border-b-2 border-l-2",
                "-bottom-4 -right-4 sm:-bottom-5 sm:-right-5 border-b-2 border-r-2",
              ].map((cls, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`absolute w-6 h-6 sm:w-8 sm:h-8 ${cls} pointer-events-none`}
                  style={{
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 10px rgba(59,130,246,0.4)",
                  }}
                />
              ))}

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="relative w-[260px] h-[330px] sm:w-[280px] sm:h-[360px] md:w-[340px] md:h-[440px] bg-zinc-100 dark:bg-[#080812] overflow-hidden"
                  style={{
                    border: "1px solid rgba(59,130,246,0.3)",
                    boxShadow:
                      "0 0 40px rgba(59,130,246,0.15), inset 0 0 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <Image
                    src="/avatar.png"
                    alt="Mohamed Gamal"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 340px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#020209]/90 via-transparent to-transparent" />
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-blue-400/40 pointer-events-none"
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1.5,
                    }}
                  />

                  <div
                    className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-2 sm:p-3"
                    style={{
                      background: "rgba(2,2,9,0.85)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p
                      className="text-sky-400 text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-center"
                      dir="ltr"
                    >
                      {t("nameTag")}
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* كود المبرمج (يظهر فقط في الشاشات الأكبر من الموبايل) */}
              <motion.div
                className="absolute -right-4 md:-right-10 top-10 px-3 py-2 rounded-sm cursor-default hidden md:block"
                style={{
                  background: "rgba(2,2,9,0.95)",
                  border: "1px solid rgba(59,130,246,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p className="text-[11px] font-mono whitespace-nowrap">
                  <span style={{ color: "#60a5fa" }}>const </span>
                  <span className="text-white">developer</span>
                  <span className="text-zinc-500"> = </span>
                  <span style={{ color: "#4ade80" }}>
                    &quot;Mohamed Gamal&quot;
                  </span>
                </p>
              </motion.div>
            </div>
          </ScaleIn>
        </div>
      </div>

      {/* خط سفلي للزينة */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />
    </section>
  );
}
