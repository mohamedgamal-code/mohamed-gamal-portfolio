/** @format */
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  blur = true,
  once = true,
  className = "",
  as = "div",
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  const dirMap = {
    up: { y: 36 },
    down: { y: -36 },
    left: { x: 36 },
    right: { x: -36 },
    none: {},
  };

  const hidden = {
    opacity: 0,
    filter: blur ? "blur(10px)" : "blur(0px)",
    ...dirMap[direction],
  };

  const show = {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  const MotionTag = motion[as as "div"] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={hidden}
      animate={inView ? show : hidden}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delayChildren = 0.2,
  once = true,
  className = "",
}: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  className?: string;
}

export function StaggerItem({
  children,
  direction = "up",
  blur = true,
  className = "",
}: StaggerItemProps) {
  const dirMap = {
    up: { y: 36 },
    down: { y: -36 },
    left: { x: 36 },
    right: { x: -36 },
    none: {},
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          filter: blur ? "blur(10px)" : "blur(0px)",
          ...dirMap[direction],
        },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


export default FadeIn;
