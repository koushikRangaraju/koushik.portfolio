"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

export default function TrainingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt calculations
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    
    // Max tilt ±5 degrees for single wide card
    x.set(-mouseY * 5);
    y.set(mouseX * 5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section id="training" className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10">
      
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-label text-accent-cyan tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          HANDS-ON TRAINING
        </span>
        <h2 
          className="font-heading font-bold text-[clamp(28px,4vw,64px)] leading-tight text-white mb-4"
        >
          Real Experience
        </h2>
      </motion.div>

      {/* SINGLE LARGE FEATURE CARD (3D TILT) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full relative"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ transform }}
          className="w-full rounded-2xl bg-[rgba(255,255,255,0.02)] border border-border/glass backdrop-blur-xl relative overflow-hidden transition-[box-shadow] duration-500 will-change-transform"
        >
          {/* Glowing Left Border Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-emerald to-accent-cyan shadow-[2px_0_15px_rgba(16,185,129,0.5)] z-10" />
          
          <div className="p-8 md:p-12 relative z-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border/glass pb-8">
              <div>
                <h3 className="font-heading font-bold text-[clamp(24px,3vw,36px)] text-white mb-2 leading-tight">
                  DSA Summer Bootcamp
                </h3>
                <p className="font-label text-sm uppercase tracking-widest text-[#9ca3af]">
                  Lovely Professional University
                </p>
              </div>
              
              <div className="bg-surface border border-white/10 px-4 py-2 rounded-lg font-mono text-sm text-accent-cyan shrink-0">
                Jun 2025 – Jul 2025
              </div>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start font-body text-[16px] text-white/80 leading-relaxed">
                <span className="text-xl mt-[-4px] text-accent-emerald shrink-0">✦</span>
                <p>
                  Completed focused training on Data Structures & Algorithms — <span className="text-white font-medium">stacks, queues, recursion</span>, and dynamic programming concepts.
                </p>
              </li>
              <li className="flex gap-4 items-start font-body text-[16px] text-white/80 leading-relaxed">
                <span className="text-xl mt-[-4px] text-accent-emerald shrink-0">✦</span>
                <p>
                  Built practical C++ programs including bracket validator and expression evaluation system using <span className="text-white font-medium">Standard Template Library (STL)</span>.
                </p>
              </li>
              <li className="flex gap-4 items-start font-body text-[16px] text-white/80 leading-relaxed">
                <span className="text-xl mt-[-4px] text-accent-emerald shrink-0">✦</span>
                <p>
                  Solved <span className="text-accent-cyan font-bold inline-block border-b border-accent-cyan/40">100+ coding problems</span> to strengthen logical thinking and time complexity analysis capabilities.
                </p>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      
    </section>
  );
}
