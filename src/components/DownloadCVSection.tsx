"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

export default function DownloadCVSection() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ willChange: "transform, opacity, scale" }}
        className="relative group p-10 md:p-16 w-full rounded-3xl bg-gradient-to-tr from-[#0a0a0a] to-[#111111] border border-[#1f1f1f] shadow-2xl overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-accent-emerald/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-emerald/50 to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-accent-emerald shadow-lg mb-2 group-hover:scale-110 transition-transform duration-500">
            <FileText size={32} />
          </div>
          
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
            Ready to dive deeper?
          </h2>
          
          <p className="font-body text-[#aaaaaa] text-lg max-w-xl mx-auto mb-4">
            Get a comprehensive look at my experience, skills, and qualifications. Download my full CV directly here.
          </p>

          <a
            href="https://drive.google.com/drive/u/1/folders/1SH_R3b_A9vOqvLxUvcquRCbgy_zA70Yz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white text-black font-body font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:text-accent-emerald"
            data-cursor="hover"
          >
            <Download size={20} />
            <span>Download CV</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
