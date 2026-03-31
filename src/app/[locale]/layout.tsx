/** @format */

import type { Metadata } from "next";
import { Syne, Space_Mono, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/ui/custom-cursor";
import Particles from "@/components/animations/Particles";
import Lightning from "@/components/animations/Lightning";

// ── Fonts ──────────────────────────────────────────────
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio.vercel.app"),

  title: {
    default: "Mohamed Gamal — Full Stack Engineer | Building Scalable Web Apps",
    template: "%s | Mohamed Gamal",
  },

  description:
    "Full Stack Engineer based in Cairo, Egypt. I build fast, scalable, and production-ready web applications using Next.js, TypeScript, and Node.js. Available for freelance and remote opportunities.",

  keywords: [
    "Mohamed Gamal",
    "Full Stack Engineer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Node.js Developer",
    "Freelance Web Developer",
    "Remote Developer",
    "Cairo Egypt Developer",
    "SaaS Developer",
    "Web Application Developer",
    "Portfolio Website",
    "Software Engineer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],

  authors: [{ name: "Mohamed Gamal" }],
  creator: "Mohamed Gamal",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    type: "website",
    url: "https://your-portfolio.vercel.app",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    title: "Mohamed Gamal — Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web applications with modern technologies. Available for freelance and remote opportunities.",
    siteName: "Mohamed Gamal Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Gamal — Full Stack Engineer Portfolio",
      },
    ],
  },

  category: "technology",
};

// ── Layout ─────────────────────────────────────────────
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="scroll-smooth"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            const originalRemoveChild = Node.prototype.removeChild;
            Node.prototype.removeChild = function(child) {
              if (child.parentNode !== this) {
                return child; 
              }
              return originalRemoveChild.apply(this, arguments);
            };
            const originalInsertBefore = Node.prototype.insertBefore;
            Node.prototype.insertBefore = function(newNode, referenceNode) {
              if (referenceNode && referenceNode.parentNode !== this) {
                return newNode;
              }
              return originalInsertBefore.apply(this, arguments);
            };
          })();
        `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`
${syne.variable} ${spaceMono.variable} ${cairo.variable}
font-sans antialiased bg-indigo-50   dark:bg-[#020209] text-zinc-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200
transition-colors duration-300 relative
`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
            {/* ── Animation layer ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Light mode */}
              <div className="block dark:hidden w-full h-full">
                <Particles count={80} color="37,99,235" opacity={0.6} />
                <Lightning count={3} color="#fafafa" />
              </div>

              {/* Dark mode */}
              <div className="hidden dark:block w-full h-full">
                <Particles count={130} color="59,130,246" opacity={0.9} />
                <Lightning count={3} color="#3b82f6" />
              </div>

              {/* Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 dark:opacity-100" />

              {/* Light gradient */}
              <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/20" />
              {/* Dark blobs */}
              <div className="hidden dark:block absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-blue-700/10 blur-[160px] animate-pulse" />
              <div
                className="hidden dark:block absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-700/8 blur-[150px] animate-pulse"
                style={{ animationDelay: "2.5s" }}
              />
              <div className="block dark:hidden absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-400/6 blur-[130px] animate-pulse" />
              <div
                className="block dark:hidden absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-indigo-400/5 blur-[120px] animate-pulse"
                style={{ animationDelay: "2.5s" }}
              />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-500/70 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-[68px] relative">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
