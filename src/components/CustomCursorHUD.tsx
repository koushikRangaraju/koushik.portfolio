"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Eye } from "lucide-react";

export default function CustomCursorHUD() {
  const [isMobile, setIsMobile] = useState(true);
  const ringRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth ring lag
  const springConfig = { stiffness: 800, damping: 35, mass: 0.2 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isProject = !!target.closest("[data-cursor='project']");
      const isHover = !!target.closest("a, button, [data-cursor='hover'], input, textarea, select");

      // Pure DOM operations - ZERO React re-renders = Max FPS
      if (ringRef.current) {
        if (isHover && !isProject) {
          ringRef.current.style.width = "40px";
          ringRef.current.style.height = "40px";
          ringRef.current.style.opacity = "1";
        } else {
          ringRef.current.style.width = "0px";
          ringRef.current.style.height = "0px";
          ringRef.current.style.opacity = "0";
        }
      }

      if (projectRef.current) {
        if (isProject) {
          projectRef.current.style.opacity = "1";
          projectRef.current.style.transform = "scale(1)";
        } else {
          projectRef.current.style.opacity = "0";
          projectRef.current.style.transform = "scale(0)";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Interactive Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-accent-emerald overflow-hidden"
        style={{
          width: 0,
          height: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: 0,
          backgroundColor: "transparent",
          willChange: "transform, width, height, opacity",
          transition: "width 0.25s ease-out, height 0.25s ease-out, opacity 0.2s"
        }}
      />

      {/* Project Expansion */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 120,
          height: 120,
        }}
      >
        <div
          ref={projectRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(10,10,10,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            opacity: 0,
            transform: "scale(0)",
            transition: "all 0.2s ease-out",
            willChange: "transform, opacity"
          }}
        >
          <div className="w-full h-full flex items-center justify-center absolute inset-0">
            {/* Pure CSS Spin = Max FPS GPU Acceleration */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
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
            </svg>
            <Eye size={28} className="text-white relative z-10" />
          </div>
        </div>
      </motion.div>
    </>
  );
}
