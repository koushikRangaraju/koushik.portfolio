"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EDUCATION = [
  {
    id: "uni",
    school: "Lovely Professional University",
    location: "Jalandhar, Punjab",
    degree: "B.Tech — Computer Science and Engineering",
    duration: "Aug 2023 – Present",
    score: "CGPA: 6.8",
    color: "#10b981", // Emerald
    bgGlow: "rgba(16,185,129,0.15)",
    icon: "🎓",
    extra: "Studying Cloud Computing, Data Structures, Java, and Web Technologies. Active in coding clubs and hackathons."
  },
  {
    id: "inter",
    school: "SR Junior College",
    location: "Hyderabad, Telangana",
    degree: "Intermediate — MPC (Math, Physics, Chemistry)",
    duration: "Jun 2021 – Mar 2023",
    score: "Percentage: 92%",
    color: "#3b82f6", // Cosmic Blue
    bgGlow: "rgba(59,130,246,0.15)",
    icon: "📚",
    extra: "Scored 92% with strong foundation in Mathematics and Sciences."
  },
  {
    id: "school",
    school: "Mount Litera Zee School",
    location: "Hyderabad, Telangana",
    degree: "Matriculation (10th Grade)",
    duration: "Mar 2020 – Apr 2021",
    score: "Percentage: 86%",
    color: "#f59e0b", // Gold
    bgGlow: "rgba(245,158,11,0.15)",
    icon: "🏫",
    extra: "Completed schooling with 86% — built strong fundamentals in science and logical thinking."
  }
];

export default function EducationSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="education" className="w-full py-32 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10">
      
      {/* SECTION HEADERS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        style={{ willChange: "transform, opacity" }}
        className="mb-20 text-center md:text-left"
      >
        <span className="font-label text-accent-gold tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          ACADEMIC JOURNEY
        </span>
        <h2 
          className="font-heading font-bold text-[clamp(36px,5vw,72px)] leading-tight bg-clip-text text-transparent inline-block"
          style={{ backgroundImage: "linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)" }}
        >
          Where I Learned
        </h2>
      </motion.div>

      <div className="relative pl-6 md:pl-12">
        {/* GLOWING VERTICAL LINE (GRADIENT) */}
        <div 
          className="absolute left-[3px] md:left-[27px] top-4 bottom-0 w-[2px] rounded-full sm:w-[3px]"
          style={{ backgroundImage: "linear-gradient(to bottom, #10b981, #8b5cf6, #f59e0b)" }}
        />

        <div className="flex flex-col gap-16">
          {EDUCATION.map((edu, idx) => {
            const isHovered = hoveredId === edu.id;

            return (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group perspective-1000 w-full md:w-3/4"
                onMouseEnter={() => setHoveredId(edu.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* GLOWING ORB */}
                <div 
                  className={cn(
                    "absolute -left-9 md:-left-[2.75rem] top-6 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-[#020408] shadow-[0_0_15px_currentColor] transition-transform duration-300",
                    isHovered ? "scale-150" : "scale-100"
                  )}
                  style={{ backgroundColor: edu.color, color: edu.color }}
                />

                {/* TIMELINE CARD (3D POPUP) */}
                <motion.div
                  className="w-full relative bg-surface-card border border-border/glass rounded-2xl p-6 md:p-8 cursor-pointer select-none"
                  animate={{
                    scale: isHovered ? 1.04 : 1,
                    z: isHovered ? 20 : 0,
                    rotateX: isHovered ? -2 : 0,
                    boxShadow: isHovered ? `0 0 30px ${edu.bgGlow}, inset 0 0 10px ${edu.bgGlow}` : "0 0 0 transparent",
                    borderColor: isHovered ? edu.color : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  data-cursor="hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-heading font-bold text-2xl text-white flex items-center gap-3">
                      <span className="text-3xl drop-shadow-md">{edu.icon}</span> {edu.school}
                    </h3>
                    <span className="font-mono text-sm uppercase tracking-widest text-[#9ca3af]">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="font-body text-secondary text-lg mb-2">
                    {edu.degree}
                  </div>
                  
                  <div className="font-body flex items-center gap-4 text-sm mt-4">
                    <span className="px-3 py-1 bg-surface border border-border/glass rounded-md text-white">
                      📍 {edu.location}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-md font-bold tracking-wide text-white border"
                      style={{ backgroundColor: edu.bgGlow, borderColor: `${edu.color}40` }}
                    >
                      {edu.score}
                    </span>
                  </div>

                  {/* POP-UP EXTRA DETAIL PANEL */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-1/2 -right-4 md:-right-8 translate-x-full -translate-y-1/2 w-64 p-4 rounded-xl bg-[rgba(10,10,12,0.95)] backdrop-blur-xl border border-white/10 shadow-2xl hidden lg:block z-50 pointer-events-none"
                        style={{ borderLeftColor: edu.color, borderLeftWidth: "4px" }}
                      >
                        <p className="font-body text-sm text-white/90 leading-relaxed">
                          {edu.extra}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
                
                {/* Mobile version of the extra detail (slides down since no room on right) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden mt-4 overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-surface-card border border-border/glass text-sm text-secondary font-body">
                        {edu.extra}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
