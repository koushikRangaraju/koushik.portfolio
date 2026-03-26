"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounterBig({ from, to, duration, symbol = "" }: { from: number, to: number, duration: number, symbol?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
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

const STATS = [
  { label: "Projects Built", value: 2, symbol: "+", color: "text-accent-emerald", gradient: "from-accent-emerald/20 to-transparent", borderColor: "rgba(16,185,129,0.3)", hoverShadow: "rgba(16,185,129,0.4)" },
  { label: "REST APIs Created", value: 12, symbol: "+", color: "text-accent-cyan", gradient: "from-accent-cyan/20 to-transparent", borderColor: "rgba(6,182,212,0.3)", hoverShadow: "rgba(6,182,212,0.4)" },
  { label: "Coding Problems Solved", value: 100, symbol: "+", color: "text-accent-gold", gradient: "from-accent-gold/20 to-transparent", borderColor: "rgba(245,158,11,0.3)", hoverShadow: "rgba(245,158,11,0.4)" },
  { label: "Certifications Earned", value: 3, symbol: "", color: "text-accent-pink", gradient: "from-accent-pink/20 to-transparent", borderColor: "rgba(236,72,153,0.3)", hoverShadow: "rgba(236,72,153,0.4)" },
];

export default function MilestonesSection() {
  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 mx-auto max-w-[1400px] relative z-10 border-t border-b border-border/glass my-16 bg-surface">
      
      <div className="mb-16 text-center">
        <span className="font-label text-accent-purple tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          BY THE NUMBERS
        </span>
        <h2 className="font-heading font-bold text-[clamp(28px,4vw,56px)] leading-tight text-white">
          Milestones
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-105 bg-gradient-to-t ${stat.gradient}`}
            style={{ border: `1px solid ${stat.borderColor}` }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 40px ${stat.hoverShadow}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 transparent`; }}
          >
            <div 
              className={`font-number leading-none tracking-tight mb-4 ${stat.color} filter drop-shadow-[0_0_12px_currentColor]`}
              style={{ fontSize: "clamp(64px, 8vw, 120px)" }}
            >
              <AnimatedCounterBig from={0} to={stat.value} duration={2} symbol={stat.symbol} />
            </div>
            <p className="font-body text-[#9ca3af] text-sm md:text-[15px] font-medium text-center uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
