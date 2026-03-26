"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const KOUSHIK_PATHS = [
  // K
  "M 20 20 L 20 80 M 20 50 L 55 20 M 20 50 L 55 80",
  // O
  "M 75 50 C 75 25, 115 25, 115 50 C 115 75, 75 75, 75 50",
  // U
  "M 135 25 L 135 65 C 135 85, 175 85, 175 65 L 175 25",
  // S
  "M 230 25 C 195 25, 195 48, 212 50 C 230 52, 230 75, 195 75",
  // H
  "M 250 20 L 250 80 M 250 50 L 290 50 M 290 20 L 290 80",
  // I
  "M 325 20 L 325 80",
  // K
  "M 360 20 L 360 80 M 360 50 L 395 20 M 360 50 L 395 80",
];

const PARTICLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: 15 + Math.random() * 15,
  delay: i * 0.2,
}));

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Write (0.3 - 2.0s) -> handled by framer motion variants
    // Stage 2: Progress Bar (2.3 - 3.0s)
    const start = 2300;
    const duration = 700;
    const interval = 10;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setTimeout(() => {
      const pInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(pInterval);
            setTimeout(onComplete, 400); // Wait for final fade
            return 100;
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);
    }, start);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [`${p.y}vh`, `${p.y - 10}vh`],
              x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 5}vw`]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay 
            }}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* NAME WRITING SVG */}
        <svg
          viewBox="0 0 420 100"
          className="w-[300px] md:w-[500px] h-auto overflow-visible mb-12"
          style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }}
        >
          {KOUSHIK_PATHS.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              stroke="white"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: 1
              }}
              transition={{
                duration: 1.5,
                delay: 0.3 + i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
          
          {/* FINAL PULSE EFFECT */}
          <motion.rect
            width="420"
            height="100"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="pointer-events-none"
          />
        </svg>

        {/* LOADING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.4 }}
          className="w-[200px] md:w-[300px] flex flex-col gap-3"
        >
          <div className="flex justify-between items-end font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <div className="flex gap-2">
              <span className={progress > 20 ? "text-white/80" : ""}>•</span>
              <span className={progress > 50 ? "text-white/80" : ""}>•</span>
              <span className={progress > 80 ? "text-white/80" : ""}>•</span>
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white/80"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
