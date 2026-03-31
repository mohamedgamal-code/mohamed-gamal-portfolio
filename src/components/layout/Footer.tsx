/** @format */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Mail, Linkedin, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";
import { SiGithub, SiWhatsapp, SiUpwork } from "react-icons/si";
import Logo from "./Logo";

// ─── CONFIGURATION & DATA ────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Mohamed-Gamal-code",
    icon: SiGithub,
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-gamal-code/",
    icon: Linkedin,
    color: "#0077b5",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~0194a7d28b23a1525f",
    icon: SiUpwork,
    color: "#14a800",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/201159497813", 
    icon: SiWhatsapp,
    color: "#25d366",
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  const EMAIL_ADDR = "mohamed.gamalcode@gmail.com";
  const MAILTO_URL = `mailto:${EMAIL_ADDR}`;
  const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDR}`;

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = MAILTO_URL;
    } else {
      window.open(GMAIL_URL, "_blank");
    }
  };
  const MENU_ITEMS = [
    { label: t("menu.home"), href: "#home" },
    { label: t("menu.about"), href: "#about" },
    { label: t("menu.experience"), href: "#experience" },
    { label: t("menu.projects"), href: "#projects" },
    { label: t("menu.skills"), href: "#skills" },
    { label: t("menu.contact"), href: "#contact" },
  ];

  return (
    <footer className="relative bg-transparent pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-6 items-center lg:items-start w-full">
              <Link
                href={`/${locale}#home`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}`);
                }}
                className="flex items-center group transition-all duration-500 w-fit mx-auto lg:mx-0 lg:-ms-4"
              >
                <Logo locale={locale} />
              </Link>

              <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-[14px] md:text-[15px] font-medium px-4 lg:px-0 text-start">
                {t("description")}
              </p>

              <p className="text-[12px] sm:text-[13px] md:text-[14px] text-zinc-500 dark:text-zinc-400 italic font-bold tracking-wide uppercase px-4 lg:px-0">
                {t("cta")}{" "}
                <Link
                  href="#contact"
                  className="relative text-blue-600 dark:text-blue-500 font-black hover:text-cyan-500 transition-colors duration-300 group/link"
                >
                  {t("talk")}
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full lg:w-auto">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300 text-blue-600 dark:text-blue-400 group"
                  style={{ ["--brand-hover" as any]: social.color }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 transition-colors group-hover:!text-[var(--brand-hover)]" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 text-center sm:text-left">
            <div className="flex flex-col gap-6 items-center sm:items-start order-2 sm:order-1">
              <h4 className="text-[11px] font-black uppercase tracking-[4px] text-blue-600 dark:text-blue-500 italic flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600/30 dark:bg-blue-500/30" />
                {t("menuTitle")}
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3 sm:gap-y-4 gap-x-4 px-4 sm:px-0 w-full sm:w-auto">
                {MENU_ITEMS.map((item) => (
                  <li key={item.label} className="flex justify-center sm:justify-start">
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault();
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="group relative inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-black italic text-[13px] md:text-base"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1 text-blue-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 md:col-span-2 items-center sm:items-start order-1 sm:order-2">
              <h4 className="text-[11px] font-black uppercase tracking-[4px] text-blue-600 dark:text-blue-500 italic flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600/30 dark:bg-blue-500/30" />
                {t("contactTitle")}
              </h4>
              <div className="flex flex-col gap-5 w-full items-center sm:items-start px-2 sm:px-0">
                <a
                  href={MAILTO_URL}
                  onClick={handleEmailClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-3 md:gap-4 group w-fit hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 sm:p-0 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-blue-600 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-zinc-900 dark:text-zinc-100 font-black group-hover:text-blue-600 transition-colors italic truncate text-[13px] sm:text-sm md:text-base">
                    {EMAIL_ADDR}
                  </span>
                </a>

                <div className="flex flex-row items-center gap-3 md:gap-4 w-fit p-2 sm:p-0">
                  <div className="w-10 h-10 rounded-lg bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-zinc-900 dark:text-zinc-100 font-black italic text-[13px] sm:text-sm md:text-base">
                    {t("location")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800/60" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 sm:mt-10 gap-4 sm:gap-6">
          <p className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest text-center order-2 md:order-1">
            {t("rights", { year: currentYear })}
          </p>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 order-1 md:order-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[1px]">
              {t("status")}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-blue-600 shadow-xl"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}