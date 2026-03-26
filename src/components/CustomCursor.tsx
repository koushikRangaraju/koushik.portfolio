"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { Eye } from "lucide-react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "project">("default");
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Very snappy spring config for that "1200dpi" feel
  const springConfig = { stiffness: 800, damping: 35, mass: 0.2 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on mobile or touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectEl = target.closest?.("[data-cursor='project']");
      if (projectEl) {
        setCursorType("project");
        return;
      }

      // Check for interactive elements
      const isInteractive = !!target.closest?.(
        "a, button, [data-cursor='hover'], input, textarea, select"
      );
      if (isInteractive) {
        setCursorType("hover");
        return;
      }

      setCursorType("default");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const isHovering = cursorType === "hover";
  const isProject = cursorType === "project";

  const dotColor = "#10b981"; // Emerald accent
  const ringColor = resolvedTheme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";

  let size = 8;
  let bg = dotColor;
  let border = "none";

  if (isHovering) {
    size = 32;
    bg = "transparent";
    border = `1px solid ${ringColor}`;
  } else if (isProject) {
    size = 100;
    bg = "rgba(10,10,10,0.95)"; // Dark background for the project button
    border = "1px solid rgba(255,255,255,0.1)";
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[99999] top-0 left-0"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor: bg,
          border: border,
        }}
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {isProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center absolute inset-0"
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
            >
              <path
                id="textPath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="transparent"
              />
              <text className="text-[10px] font-mono tracking-[0.25em] font-bold fill-white">
                <textPath href="#textPath" startOffset="0%">
                  VISIT PROJECT • VISIT PROJECT • 
                </textPath>
              </text>
            </motion.svg>
            <Eye size={28} className="text-white relative z-10" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
