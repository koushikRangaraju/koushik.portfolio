"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ChevronDown, Github, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Blogs", path: "/blog" },
];

const MORE_LINKS = [
  { name: "Links", path: "/links" },
  { name: "Uses", path: "/uses" },
  { name: "Guestbook", path: "/guestbook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-[rgba(255,255,255,0.06)]",
        scrolled
          ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-[16px] py-3"
          : "bg-[rgba(10,10,10,0.8)] backdrop-blur-[16px] py-4"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: LOGO & BADGE */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3" data-cursor="hover">
            {/* Circular Logo */}
            <div className="w-8 h-8 rounded-full bg-white text-black dark:bg-white dark:text-black flex items-center justify-center font-display font-bold text-xs">
              KR
            </div>
            {/* Emerald Gemstone */}
            <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
          </Link>
          
          {/* Static Badge */}
          <div className="hidden md:flex items-center h-6 ml-2">
            <div className="font-mono text-[11px] tracking-wider uppercase text-secondary">
              Cloud Student & Full Stack Dev
            </div>
          </div>
        </div>

        {/* CENTER: DESKTOP LINKS */}
        <nav className="hidden lg:flex items-center gap-1 bg-[rgba(255,255,255,0.02)] border border-border/glass rounded-full px-2 py-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "relative px-4 py-2 text-[13px] transition-colors rounded-full font-body font-[500]",
                  isActive ? "text-white bg-[rgba(255,255,255,0.1)]" : "text-secondary hover:text-white"
                )}
                data-cursor="hover"
              >
                {link.name}
                {isActive && (
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-emerald" />
                )}
              </Link>
            );
          })}
          
          {/* MORE DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-[13px] text-secondary hover:text-white transition-colors rounded-full font-body font-[500]" data-cursor="hover">
              More <ChevronDown size={14} className={cn("transition-transform", dropdownOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 p-2 rounded-2xl bg-[#111111] border border-border/glass shadow-2xl z-50"
                >
                  {MORE_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="block px-4 py-2.5 text-[13px] text-secondary hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-xl transition-colors font-body"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* RIGHT: ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3 mr-2 border-r border-[rgba(255,255,255,0.1)] pr-5">
            <a
              href="https://github.com/koushikRangaraju"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover:text-white transition-colors"
              data-cursor="hover"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/rangaraju-koushik-92434b28b/"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover:text-[#0077b5] transition-colors"
              data-cursor="hover"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <Link
            href="/book-call"
            className="px-5 py-2.5 rounded-full bg-white text-black font-body font-[600] text-[13px] hover:scale-[1.02] active:scale-95 transition-all"
            data-cursor="hover"
          >
            Book a Call
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-display font-bold text-xs">
                KR
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 border border-border/glass rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {[...NAV_LINKS, ...MORE_LINKS].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-[500] text-secondary hover:text-white transition-colors block pb-4 border-b border-border/glass"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-8"
            >
              <Link
                href="/book-call"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center rounded-2xl bg-white text-black font-body font-[600] tracking-wide block"
              >
                Book a Call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
