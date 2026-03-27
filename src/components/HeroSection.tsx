"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVars: any = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  const gpuProps = {
    style: { willChange: "transform, opacity" },
    className: "transform-gpu"
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 mx-auto max-w-[1400px]">
      
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-20"
      >
        {/* LEFT TEXT BLOCK */}
        <div className="flex-1 flex flex-col items-start w-full">
          <motion.h1 
            variants={itemVars}
            {...gpuProps}
            className="font-display font-[900] text-white leading-[1] tracking-tight m-0 p-0 transform-gpu"
            style={{ fontSize: "clamp(80px, 12vw, 160px)", willChange: "transform, opacity" }}
          >
            KOUSHIK
          </motion.h1>

          <motion.p 
            variants={itemVars}
            {...gpuProps}
            className="mt-6 text-[clamp(24px,4vw,40px)] leading-[1.2] text-[#aaaaaa] font-body max-w-3xl transform-gpu"
          >
            <span className="font-[300]">I design and build products that </span>
            <span className="text-white font-[500]">deliver real impact.</span>
          </motion.p>

          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-3 mt-8">
            <div className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[11px] uppercase tracking-[0.2em] font-mono text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
              BASED IN HYDERABAD, INDIA
            </div>
            <div className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[11px] uppercase tracking-[0.2em] font-mono text-secondary">
              CLOUD STUDENT & FULL STACK DEV
            </div>
          </motion.div>

          <motion.div variants={itemVars} className="mt-10 flex items-center gap-6">
            <a
              href="https://drive.google.com/drive/u/1/folders/1SH_R3b_A9vOqvLxUvcquRCbgy_zA70Yz"
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-body font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-y-1 transition-transform"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <p className="text-secondary font-body font-[300] italic text-lg hidden sm:block">
              Crafting modern experiences
            </p>
          </motion.div>
        </div>

        {/* RIGHT PHOTO BLOCK */}
        <motion.div
          variants={itemVars}
          {...gpuProps}
          className="relative shrink-0 pr-8 md:pr-0 transform-gpu"
        >
          <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border border-white/10 ring-1 ring-white/5 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0 bg-surface-card" />
            <Image 
              src="/images/avatar.jpg" 
              alt="Koushik Rangaraju" 
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 420px"
              onError={(e) => {
                // Fallback if image not yet uploaded
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback initials if image fails */}
            <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-6xl text-secondary -z-10">
              KR
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
