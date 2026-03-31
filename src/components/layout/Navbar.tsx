/** @format */
"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Monitor,
  Globe,
  Menu,
  Terminal,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const NAV_LINKS = useMemo(
    () => [
      { key: "home", href: `/${locale}#home` },
      { key: "about", href: `/${locale}#about` },
      { key: "skills", href: `/${locale}#skills` },
      { key: "projects", href: `/${locale}#projects` },
      { key: "experience", href: `/${locale}#experience` },
      { key: "contact", href: `/${locale}#contact` },
    ],
    [locale]
  );

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 24);

    const currentScroll = scrollY + 150;

    for (const { key } of NAV_LINKS) {
      const el = document.getElementById(key);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (currentScroll >= top && currentScroll < top + height) {
          setActive(key);
          break;
        }
      }
    }
  }, [NAV_LINKS]);

  useEffect(() => {
    if (active) {
      window.history.replaceState(null, "", `/${locale}#${active}`);
    }
  }, [active, locale]);

  useEffect(() => {
    setMounted(true);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  if (!mounted) return <header className="h-[68px] bg-transparent" />;
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* ── Logo ── */}
        <Link
          href={`/${locale}#home`}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", `/${locale}#home`);
            setActive("home");
          }}
          className="flex items-center group transition-all duration-500 shrink-0"
        >
          <Logo locale={locale} />
        </Link>

        {/* ── Navigation Links - التعديل الأساسي هنا (lg:flex بدل md:flex) ── */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.05] p-1 rounded-2xl backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(link.key);
                if (el) {
                  const offsetTop = el.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
                setActive(link.key);
                window.history.pushState(null, "", `#${link.key}`);
              }}
              className={cn(
                "relative px-2.5 py-2 transition-all duration-500 ease-out group flex items-center justify-center",
                "text-[12.5px] font-bold font-sans whitespace-nowrap",
                locale === "en"
                  ? "italic uppercase tracking-tight"
                  : "italic-none tracking-normal font-medium",
                active === link.key
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
            >
              {active === link.key && (
                <motion.span
                  layoutId="nav-pill"
                  className={cn(
                    "absolute inset-0 rounded-xl -z-10",
                    "bg-gradient-to-tr from-blue-500/[0.12] to-cyan-400/[0.05]",
                    "border border-blue-500/20 shadow-[0_2px_10px_rgba(59,130,246,0.1)]"
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <span
                className={cn(
                  "relative z-10 transition-all duration-300 inline-block",
                  locale === "en"
                    ? "group-hover:-translate-y-0.5 group-hover:skew-x-[-4deg]"
                    : "group-hover:-translate-y-0.5",
                  active === link.key &&
                    "drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                )}
              >
                {t(link.key)}
              </span>
              <span
                className={cn(
                  "absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-blue-500/60 rounded-full transition-all duration-300",
                  "group-hover:w-3",
                  active === link.key &&
                    "w-4 bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-1 shrink-0 border-l border-zinc-200/50 dark:border-zinc-800/50 ml-1.5 lg:ml-2 pl-1.5 lg:pl-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative w-8 h-8 rounded-xl text-zinc-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all duration-300 group"
              >
                <Globe className="w-[17px] h-[17px] transition-transform duration-500 group-hover:rotate-[20deg]" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-white dark:border-zinc-950 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-40 p-1.5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              {[
                { code: "en", label: "English", flag: "🇺🇸" },
                { code: "ar", label: "العربية", flag: "🇪🇬" },
              ].map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() =>
                    router.replace(pathname, { locale: lang.code })
                  }
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
                    locale === lang.code
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base group-hover:scale-125 transition-transform duration-300">
                      {lang.flag}
                    </span>
                    <span className="text-[12px] font-bold italic font-mono uppercase tracking-wide">
                      {lang.label}
                    </span>
                  </div>
                  {locale === lang.code && (
                    <div className="w-1 h-3 bg-blue-500 rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative w-8 h-8 rounded-xl text-zinc-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all duration-300 group"
              >
                <ThemeIcon className="w-[17px] h-[17px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg]" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-44 p-1.5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              {[
                { value: "light", label: "Light Mode", Icon: Sun },
                { code: "dark", value: "dark", label: "Dark Mode", Icon: Moon },
                { value: "system", label: "System", Icon: Monitor },
              ].map(({ value, label, Icon }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
                    theme === value
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                      theme === value && "text-blue-500"
                    )}
                  />
                  <span className="text-[12px] font-bold italic font-mono uppercase tracking-wide">
                    {label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hire Me Button - يظهر فقط على الشاشات الكبيرة lg وما فوق */}
          <Button
            asChild
            size="sm"
            className={cn(
              "relative hidden lg:flex items-center gap-2 px-5 h-10 transition-all duration-500 group overflow-visible",
              "text-[11px] font-[1000] italic uppercase tracking-[1.5px] font-sans",
              "bg-blue-600 text-white border-0 rounded-full",
              "shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
              "hover:scale-[1.03] active:scale-95 active:duration-75"
            )}
          >
            <Link href={`/${locale}#contact`}>
              <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <Terminal
                    className="w-3.5 h-3.5 transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    strokeWidth={3}
                  />
                  <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                </div>
                <span className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] tracking-[2px]">
                  {t("hireMe")}
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full" />
            </Link>
          </Button>

          {/* Mobile Menu Button - التعديل التاني هنا (lg:hidden بدل md:hidden) */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* ── Sheet (Mobile Menu) ── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-[280px] sm:w-[300px] p-0 bg-white dark:bg-zinc-950 flex flex-col border-l border-zinc-200 dark:border-zinc-800"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-900">
            <Link
              href={`/${locale}#home`}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false); 
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", `/${locale}#home`);
                setActive("home");
              }}
              className="flex items-center group active:scale-95 transition-transform"
            >
              <Logo locale={locale} />
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto relative">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(link.key);
                      if (el) {
                        const offsetTop = el.offsetTop - 80;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: "smooth",
                        });
                      }
                      setActive(link.key);
                      window.history.pushState(
                        null,
                        "",
                        `/${locale}#${link.key}`
                      );
                    }, 100);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[1.5px] transition-all duration-300 group",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-zinc-400 hover:text-blue-600"
                  )}
                >
                  {t(link.key)}
                  {isActive && (
                    <ArrowRight className="w-4 h-4 opacity-100 animate-in fade-in slide-in-from-left-2" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 mt-auto">
            <Button
              asChild
              className={cn(
                "relative flex items-center justify-center gap-3 px-8 h-12 transition-all duration-500 group overflow-visible w-full",
                "text-[12px] font-[1000] italic uppercase tracking-[2.5px] font-sans",
                "bg-blue-600 text-white border-0 rounded-full",
                "shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]",
                "hover:scale-[1.02] active:scale-95 active:duration-75"
              )}
            >
              <Link
                href={`/${locale}#contact`}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center"
              >
                <div className="relative z-10 flex items-center gap-2.5">
                  <Terminal className="w-4 h-4" strokeWidth={3} />
                  <span className="tracking-[3px]">{t("hireMe")}</span>
                </div>
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}