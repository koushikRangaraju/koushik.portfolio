"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// --- ICONS (react-icons mapping) ---
import { 
  SiC, SiCplusplus, SiPython, 
  SiHtml5, SiCss, SiSpringboot, SiPostman, 
  SiMysql, SiDocker, SiGit, SiGithub 
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FaAws } from "react-icons/fa";

const ROW_1 = [
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Java", icon: DiJava, color: "#5382a1" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
];

const ROW_2 = [
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "AWS", icon: FaAws, color: "#232F3E" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
];

// --- STATIC MARQUEE COMPONENT ---
function Marquee({ items, reverse = false }: { items: typeof ROW_1, reverse?: boolean }) {
  const renderItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap flex w-full flex-nowrap py-2 mask-edges-skills">
      <motion.div 
        className="flex gap-4 items-center flex-nowrap shrink-0"
        style={{ willChange: "transform" }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {renderItems.map((item, idx) => (
          <div 
            key={`${item.name}-${idx}`} 
            className="flex flex-col items-center justify-center gap-3 group px-4 cursor-pointer"
            data-cursor="hover"
          >
            <div className="w-16 h-16 rounded-[12px] bg-[#111111] border border-[#1f1f1f] flex items-center justify-center transition-all duration-250 hover:scale-110 hover:brightness-125 z-10">
              <item.icon size={28} className="text-[#888888] group-hover:text-white transition-colors" />
            </div>
            <span className="font-mono text-[11px] text-[#888888] group-hover:text-white transition-colors tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// --- MAIN SECTION ---
export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const attributes = "Problem-Solving ★ Adaptable ★ Communication ★ Time Management ★ Team Player ★ Fast Learner ★ Detail-Oriented ★ Cloud Student ★ DSA Practitioner ★ ";

  useEffect(() => {
    if (!wheelRef.current) return;

    // Create a continuous rotation animation
    const rotation = gsap.to(wheelRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let resetTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dtScroll = Math.max(1, now - lastScrollTime);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
      
      // Calculate scroll speed (boost factor)
      const scrollVelocity = Math.min((dy / dtScroll) * 12, 35);
      const targetTimeScale = 1 + scrollVelocity; 
      
      // Smoothly animate the timeScale (speed multiplier) using GSAP
      gsap.to(rotation, {
        timeScale: targetTimeScale,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });
      
      clearTimeout(resetTimer);
      // Decay back to normal speed smoothly
      resetTimer = setTimeout(() => { 
        gsap.to(rotation, {
          timeScale: 1,
          duration: 0.8,
          ease: "power2.inOut",
          overwrite: true
        });
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      rotation.kill();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <section ref={containerRef} id="skills" className="w-full pt-20 pb-24 relative z-10 overflow-hidden flex flex-col items-center">
      
      {/* BACKGROUND ROTATING WHEEL - HARDWARE ACCELERATED */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] opacity-[0.3] pointer-events-none z-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div ref={wheelRef} className="w-full h-full" style={{ willChange: "transform" }}>
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-[#3b82f6] overflow-visible"
            fill="none"
            stroke="url(#magic-gradient)"
            strokeWidth="1.5"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            <defs>
              <linearGradient id="magic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {Array.from({ length: 16 }).map((_, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx="90"
                ry="25"
                transform={`rotate(${(i * 360) / 16} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="15" className="fill-[#111]" />
            <circle cx="100" cy="100" r="5" className="fill-[#888]" />
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        style={{ willChange: "transform, opacity" }}
        className="relative z-10 px-6 mx-auto text-center mb-16"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          MY SKILLSET
        </span>
        <h2 className="font-display font-[800] text-[clamp(40px,6vw,64px)] text-white leading-none">
          The Magic Behind
        </h2>
      </motion.div>

      {/* DUAL MARQUEES */}
      <div className="relative z-10 w-full flex flex-col gap-8 mb-20 max-w-[1400px] mx-auto">
        <Marquee items={ROW_1} />
        <Marquee items={ROW_2} reverse={true} />
      </div>

      {/* BOTTOM TICKER (parthh.in exact spec) */}
      <div className="w-full relative z-10 border-y border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-md py-3 overflow-hidden flex whitespace-nowrap group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap shrink-0 group-hover:[animation-play-state:paused] cursor-pointer"
          style={{ willChange: "transform" }}
        >
          <span className="font-mono text-[11px] text-[#888888] tracking-widest uppercase px-4">
            {attributes} {attributes} {attributes} {attributes}
          </span>
        </motion.div>
      </div>

      {/* Edge Masking via global style injected via component style is generally fine but let's use a class if it causes issues */}
      <style>{`
        .mask-edges-skills {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

    </section>
  );
}
