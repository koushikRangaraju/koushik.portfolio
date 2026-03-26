"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Number Counter Utility Component
function AnimatedCounter({ from, to, duration, symbol = "" }: { from: number, to: number, duration: number, symbol?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}{symbol}</span>;
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10">
      
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-label text-accent-gold tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          WINS
        </span>
        <h2 
          className="font-heading font-bold text-[clamp(28px,4vw,56px)] leading-tight bg-clip-text text-transparent inline-block"
          style={{ backgroundImage: "linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)" }}
        >
          Milestones Unlocked
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* ACHIEVEMENT 1: Hackathon */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex-1 group"
        >
          <div className="w-full h-full rounded-2xl bg-surface-card border border-border/glass overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]">
            <div className="h-1 w-full bg-accent-gold" />
            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6 text-accent-gold">
                <span className="text-4xl text-shadow-glow">🏆</span>
                <h3 className="font-heading font-bold text-2xl text-white">Hack With Vertos Hackathon</h3>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] mb-4 flex justify-between">
                <span>Echo LPU</span>
                <span>February 2024</span>
              </div>
              <p className="font-body text-secondary text-[16px] leading-relaxed mb-8 flex-1">
                Contributed to a comprehensive hospital management system prototype. Our team successfully analyzed the problem statement and built a working solution model, clearing <strong className="text-white"><AnimatedCounter from={0} to={2} duration={1.5} /></strong> competitive rounds.
              </p>
              
              <div className="mt-auto flex items-center gap-3 border-t border-border/glass pt-6">
                <span className="font-number text-5xl text-accent-gold/80">
                  <AnimatedCounter from={0} to={2} duration={1.5} />
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary block max-w-[80px]">
                  Rounds Cleared
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACHIEVEMENT 2: HackerRank */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 group"
        >
          <div className="w-full h-full rounded-2xl bg-surface-card border border-border/glass overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
            <div className="h-1 w-full bg-accent-pink" />
            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6 text-accent-pink">
                <span className="text-4xl text-shadow-glow">⭐</span>
                <h3 className="font-heading font-bold text-2xl text-white">HackerRank Rating</h3>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] mb-4 flex justify-between">
                <span>Python Programming</span>
                <span>January 2024</span>
              </div>
              <p className="font-body text-secondary text-[16px] leading-relaxed mb-8 flex-1">
                Earned a <strong className="text-white"><AnimatedCounter from={0} to={4} duration={1.5} />-Star</strong> Python rating by consistently solving algorithmic challenges, resulting in over <strong className="text-white"><AnimatedCounter from={0} to={50} duration={2} symbol="+" /></strong> problems mapped and executed flawlessly.
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t border-border/glass pt-6 gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-number text-5xl text-accent-pink/80">
                    <AnimatedCounter from={0} to={4} duration={1.5} />
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary block max-w-[80px]">
                    Star Rating
                  </span>
                </div>
                <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                  <span className="font-number text-4xl text-white/80">
                    <AnimatedCounter from={0} to={50} duration={2} symbol="+" />
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary block max-w-[80px]">
                    Problems Solved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
