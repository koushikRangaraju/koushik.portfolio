"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Plus, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AntiGravityClock from "./AntiGravityClock";

const TABS = [
  {
    id: "motion",
    label: "Motion",
    title: "Micro-interactions",
    desc: "Subtle movement that confirms intent — never distracting.",
  },
  {
    id: "type",
    label: "Type",
    title: "Typography First",
    desc: "Clear hierarchy and intentional spacing for optimal readability.",
  },
  {
    id: "feedback",
    label: "Feedback",
    title: "Instant Response",
    desc: "Visual cues that bridge the gap between user action and system result.",
  },
  {
    id: "craft",
    label: "Craft",
    title: "Attention to Detail",
    desc: "Every pixel has a purpose. We build for longevity and delight.",
  },
];


export default function PhilosophySection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("koushikrangaraju2005@gmail.com");
  }, []);

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 mx-auto max-w-[1400px] relative z-10">
      <div className="flex flex-col xl:flex-row gap-8 items-stretch">

        {/* ─── LEFT: PHILOSOPHY + CLOCK ─── */}
        <div
          className="flex-[2] rounded-[32px] relative overflow-hidden flex flex-col px-10 pt-10 pb-0"
          style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", minHeight: "700px" }}
        >
          {/* TOP ROW */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#444]">
              <MousePointer2 size={12} />
              DETAIL-DRIVEN UI
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#444]">
              PHILOSOPHY <Plus size={11} />
            </div>
          </div>

          {/* HEADLINE */}
          <h2 className="font-display font-semibold text-[clamp(36px,4.5vw,64px)] text-white leading-[1.1] mb-6 tracking-tight">
            Interfaces
            <br />
            <em className="not-italic font-light text-[#666] font-serif">you can feel.</em>
          </h2>

          <p className="font-body text-[#777] text-[16px] max-w-[400px] leading-[1.7] mb-10">
            I strive to create digital experiences that feel organic and human,
            where every pixel has a purpose.
          </p>

          {/* TABS ROW */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300",
                  activeTab.id === tab.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-[#555] border-[#222] hover:border-[#444] hover:text-[#888]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mb-14"
            >
              <h4 className="text-white font-heading font-bold text-lg mb-1">
                {activeTab.title}
              </h4>
              <p className="text-[#666] font-body text-sm max-w-[280px] leading-relaxed">
                {activeTab.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CLOCK: fully visible on the right side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none scale-[0.6] xl:scale-75 origin-right">
            <AntiGravityClock />
          </div>
        </div>

        {/* ─── RIGHT: STATUS CARD + BRAND CARD ─── */}
        <div className="flex-1 flex flex-col gap-8 min-w-[300px]">

          {/* STATUS & CONTACT CARD */}
          <div
            className="flex-1 rounded-[32px] p-10 flex flex-col justify-between relative overflow-hidden"
            style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
          >
            {/* Spinning ring decoration */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 opacity-30 animate-spin" style={{ animationDuration: "12s" }} />

            <div>
              {/* Available badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1f14] border border-[#0d3320] text-[#10b981] font-mono text-[9px] uppercase tracking-widest w-fit mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Available for work
              </div>

              <h3 className="font-display font-bold text-[2.2rem] leading-[1.1] text-white tracking-tight mb-6">
                LET&apos;S BUILD
                <br />
                <em className="not-italic font-light text-[#666] font-serif">something</em>
                <br />
                that actually works.
              </h3>
            </div>

            <div className="space-y-5 pt-8 border-t border-white/[0.05]">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-4 w-full text-left group"
              >
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#555] group-hover:text-[#10b981] group-hover:border-[#10b981]/40 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-white font-serif italic text-xl group-hover:text-[#10b981] transition-colors">
                    koushikrangaraju@gmail.com
                  </p>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#444]">
                    TAP TO COPY EMAIL
                  </span>
                </div>
              </button>

              <a
                href="mailto:koushikrangaraju2005@gmail.com?subject=Inquiry%20from%20Portfolio"
                className="w-full py-4 bg-white text-black rounded-2xl font-display font-black text-[11px] uppercase tracking-[0.15em] hover:bg-[#10b981] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                CONNECT NOW <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* BRAND FOOTER CARD */}
          <div
            className="rounded-[32px] p-8 flex items-end justify-between"
            style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
          >
            <div>
              <h4 className="font-display font-black text-xl text-white tracking-tight">
                Cloud Computing{" "}
                <span className="font-light text-[#555] italic font-serif normal-case">
                  Student
                </span>
              </h4>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#444] mt-1">
                Koushik Rangaraju
              </p>
            </div>
            <p className="font-mono text-[8px] uppercase tracking-widest text-[#222]">
              &lt; Crafting Experiences /&gt;
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
