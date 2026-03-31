/** @format */

"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";

import {
  Mail,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SiGithub, SiWhatsapp, SiUpwork } from "react-icons/si";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    project: "",
  });
  const [status, setStatus] = useState<Status>("idle");
 const handleContactClick = (e: React.MouseEvent, info: any) => {
  
  if (info.label === t("info.email")) {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = info.href;
    } else {
      window.open(info.gmailHref, '_blank');
    }
    return;
  }

};
  const SOCIAL = [
    {
      icon: SiGithub,
      label: "GitHub",
      href: "https://github.com/Mohamed-Gamal-code",
      color: "#ffffff",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamed-gamal-code/",
      color: "#0077b5",
    },
    {
      icon: SiUpwork,
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~0194a7d28b23a1525f",
      color: "#14a800",
    },
  ];

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: t("info.email"),
      value: "mohamed.gamalcode@gmail.com",
      href: "mailto:mohamed.gamalcode@gmail.com",
      gmailHref:
        "https://mail.google.com/mail/?view=cm&fs=1&to=mohamed.gamalcode@gmail.com",
      color: "#ea4335",
    },
    {
      icon: SiWhatsapp,
      label: t("info.whatsapp"),
      value: "+20 1159497813",
      href: "https://wa.me/201159497813",
      color: "#25d366",
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: t("info.locationValue"),
      href: null,
      color: "#4285f4",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", project: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-32 bg-transparent overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-500/5 blur-[80px] md:blur-[130px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-16 md:mb-24 lg:mb-8">
            <div className="flex flex-col gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px] md:text-[12px] tracking-[4px] uppercase ml-1">
                {t("badge")}
              </span>
              <h2 className="flex flex-col font-black uppercase italic tracking-tight leading-[0.92] text-[clamp(2.6rem,7vw,4.5rem)]">
                <span className="text-zinc-900 dark:text-white opacity-90">
                  {t("title")}
                </span>

                <span
                  className="text-blue-600 dark:text-blue-500"
                  style={{
                    filter: "drop-shadow(0 0 14px rgba(59,130,246,0.25))",
                    WebkitTextStroke: "0.5px rgba(59,130,246,0.15)",
                  }}
                >
                  {t("connect")}
                </span>
              </h2>
              <div className="w-16 h-[3px] bg-blue-600 dark:bg-blue-500 mt-5 rounded-full opacity-80" />
            </div>
            <Separator className="hidden md:block flex-1 bg-zinc-200 dark:bg-zinc-800/60 mb-4" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* الجانب الأيسر - معلومات التواصل */}
          <StaggerContainer className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
            <StaggerItem className="flex flex-col gap-5">
              <h3 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-500 uppercase italic tracking-tighter leading-[1.1]">
                {t.rich("leftColumn.heading", {
                  b: (chunks) => (
                    <span className="text-zinc-900 dark:text-white underline decoration-blue-500/30">
                      {chunks}
                    </span>
                  ),
                  blue: (chunks) => (
                    <span className="text-blue-700 dark:text-blue-400 font-black">
                      {chunks}
                    </span>
                  ),
                })}
              </h3>

              <p className="text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed text-sm md:text-base max-w-[440px]">
                {t.rich("leftColumn.subheading", {
                  b: (chunks) => (
                    <span className="font-bold text-zinc-900 dark:text-white underline decoration-zinc-500/20">
                      {chunks}
                    </span>
                  ),
                  blue: (chunks) => (
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500">
                <span className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
                <p className="text-[11px] md:text-xs font-mono uppercase tracking-widest italic opacity-80">
                  {t("leftColumn.response")}
                </p>
              </div>
            </StaggerItem>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map(
                ({ icon: Icon, label, value, href, color, gmailHref }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 group"
                  >
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-[var(--brand-color)] transition-all shrink-0"
                      style={{ ["--brand-color" as any]: color }}
                    >
                      <Icon
                        className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:!text-[var(--brand-color)] transition-colors"
                        style={{ ["--brand-color" as any]: color }}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-[2px] text-zinc-500">
                        {label}
                      </span>
                      <a
                        href={href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) =>
                          handleContactClick(e, { label, href, gmailHref , color})
                        }
                        className="text-zinc-900 dark:text-white font-bold text-sm md:text-base hover:text-blue-600 transition-colors truncate"
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  initial={{ color: "#ffffff", borderColor: "transparent" }}
                  whileHover={{
                    y: -4,
                    color: color,
                    borderColor: color,
                    boxShadow: `0 10px 20px -10px ${color}80`,
                  }}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border border-zinc-800 bg-zinc-900/90 text-white text-xs md:text-sm font-bold shadow-lg transition-all"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{label}</span>
                </motion.a>
              ))}
            </div>
          </StaggerContainer>

          {/* الجانب الأيمن - الـ Form */}
          <SectionReveal className="lg:col-span-7 relative group w-full">
            <form
              onSubmit={handleSubmit}
              className="relative p-6 md:p-10 rounded-[24px] md:rounded-[30px] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm z-10"
            >
              <div className="flex flex-col gap-5 md:gap-7">
                <div className="flex flex-col gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-500 uppercase italic tracking-tighter leading-tight">
                    {t("form.heading")}
                  </h3>
                  <p className="text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-[400px]">
                    {t("form.subheading")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t("form.placeholderName")}
                    className="h-11 md:h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
                  />
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder={t("form.placeholderEmail")}
                    className="h-11 md:h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
                  />
                </div>

                <div className="relative">
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className="w-full h-11 md:h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">{t("form.placeholderProject")}</option>
                    <option value="landing">
                      {t("form.projects.landing")}
                    </option>
                    <option value="website">
                      {t("form.projects.website")}
                    </option>
                    <option value="ecommerce">
                      {t("form.projects.ecommerce")}
                    </option>
                    <option value="webapp">{t("form.projects.webapp")}</option>
                    <option value="other">{t("form.projects.other")}</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50">
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-current" />
                  </div>
                </div>

                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder={t("form.placeholderMessage")}
                  rows={5}
                  className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl resize-none text-sm md:text-base"
                />

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 md:h-14 font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : status === "success" ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> {t("form.success")}
                    </div>
                  ) : status === "error" ? (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> {t("form.error")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> {t("form.submit")}
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
