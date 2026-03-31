/** @format */

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // ─── إحداثيات الماوس اللحظية ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = useMemo(
    () => ({ damping: 28, stiffness: 250, mass: 0.5 }),
    []
  );
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        mixBlendMode: "difference",
      }}
      animate={{
        scale: isHovered ? 2.5 : [1, 1.08, 1],

       
        borderColor: isHovered
          ? "rgb(59, 130, 246)"
          : "rgba(59, 130, 246, 0.6)",

       
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.05)",
      }}
      transition={{
        scale: isHovered
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" },

        borderColor: { duration: 0.2 },
        backgroundColor: { duration: 0.2 },
      }}
    />
  );
}
