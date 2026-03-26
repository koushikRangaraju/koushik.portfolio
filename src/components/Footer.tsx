"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-[rgba(2,4,8,0.95)] border-t border-border/glass overflow-hidden mt-32">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-8 z-50 hover-glow group"
          >
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-accent-emerald text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform"
              data-cursor="hover"
              aria-label="Back to top"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-between">
          
          {/* LEFT: Branding */}
          <div className="flex items-start gap-4 flex-col lg:flex-row">
            <div 
              className="w-12 h-12 bg-accent-emerald text-white flex shrink-0 items-center justify-center font-display font-black text-2xl"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              KR
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Koushik Rangaraju
              </h3>
              <p className="text-[#888888] font-body text-[15px] leading-relaxed max-w-sm relative z-10 group-hover:text-white transition-colors duration-500">
                Cloud Computing Student &<br /> Full Stack Developer
              </p>
            </div>
          </div>

          {/* CENTER: Navigation */}
          <div className="flex flex-col gap-4 text-center items-start md:items-center">
            <h4 className="text-white font-label text-sm uppercase tracking-widest mb-2">Explore</h4>
            <div className="flex flex-wrap md:flex-col gap-4">
              {["Home", "About", "Work", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-secondary hover:text-white transition-colors font-body text-sm"
                  data-cursor="hover"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Social */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <h4 className="text-white font-label text-sm uppercase tracking-widest mb-2">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/koushikRangaraju"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border/glass flex items-center justify-center text-secondary hover:text-white hover:border-white hover:bg-white/5 transition-all group"
                data-cursor="hover"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/rangaraju-koushik-92434b28b/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border/glass flex items-center justify-center text-secondary hover:text-white hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all group"
                data-cursor="hover"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-border/glass flex flex-col md:flex-row items-center justify-between text-secondary text-xs font-body font-medium">
          <p>© 2025 Koushik Rangaraju.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Built with <span className="text-white bg-white/10 px-2 py-0.5 rounded ml-1 mr-1">Next.js</span> & <span className="text-white bg-white/10 px-2 py-0.5 rounded ml-1">Three.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
