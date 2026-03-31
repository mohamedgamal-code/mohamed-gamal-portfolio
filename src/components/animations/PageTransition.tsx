"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────
// PageTransition — حط حواليه أي page/section
// ─────────────────────────────────────────
interface PageTransitionProps {
  children:  React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
        exit={{    opacity: 0, y: -16, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────
// SectionReveal — لكل section بيظهر عند scroll
// ─────────────────────────────────────────
import { useRef } from "react";
import { useInView } from "framer-motion";

interface SectionRevealProps {
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
      animate={inView
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 50, filter: "blur(12px)" }
      }
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────
// ScaleIn — للـ cards والـ images
// ─────────────────────────────────────────
interface ScaleInProps {
  children:   React.ReactNode;
  delay?:     number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, className = "" }: ScaleInProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
      animate={inView
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : {}
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Default export
export default PageTransition;