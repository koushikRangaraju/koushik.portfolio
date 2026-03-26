"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, User, FileText, Mail, Github, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { id: "home", label: "Go to Home", icon: <User size={16} />, type: "Navigation", path: "/" },
  { id: "work", label: "View Projects", icon: <Folder size={16} />, type: "Navigation", path: "/work" },
  { id: "blog", label: "Read Blog", icon: <FileText size={16} />, type: "Navigation", path: "/blog" },
  { id: "cv", label: "Download CV", icon: <FileText size={16} />, type: "Action", action: "cv" },
  { id: "email", label: "Copy Email Address", icon: <Mail size={16} />, type: "Action", action: "email" },
  { id: "github", label: "Open GitHub", icon: <Github size={16} />, type: "Action", action: "github" },
  { id: "linkedin", label: "Open LinkedIn", icon: <Linkedin size={16} />, type: "Action", action: "linkedin" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredActions = ACTIONS.filter((action) =>
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  const handleExecute = (action: typeof ACTIONS[0]) => {
    setIsOpen(false);
    if (action.path) {
      router.push(action.path);
    } else if (action.action === "cv") {
      window.open("https://drive.google.com/drive/u/1/folders/1SH_R3b_A9vOqvLxUvcquRCbgy_zA70Yz", "_blank");
    } else if (action.action === "email") {
      navigator.clipboard.writeText("koushikrangaraju@gmail.com");
      // Could trigger a toast here
    } else if (action.action === "github") {
      window.open("https://github.com/koushikRangaraju", "_blank");
    } else if (action.action === "linkedin") {
      window.open("https://www.linkedin.com/in/rangaraju-koushik-92434b28b/", "_blank");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
      e.preventDefault();
      handleExecute(filteredActions[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-xl bg-surface-card border border-border/glass rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-4"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-border/glass">
              <Search size={20} className="text-secondary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent py-5 text-lg text-white placeholder-secondary/50 outline-none font-body"
              />
              <div className="flex items-center gap-1 font-mono text-[10px] text-secondary uppercase bg-surface px-2 py-1 rounded">
                <span>ESC</span>
              </div>
            </div>

            {/* Action List */}
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
              {filteredActions.length === 0 ? (
                <div className="p-6 text-center text-secondary font-body">No commands found.</div>
              ) : (
                filteredActions.map((action, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleExecute(action)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-body text-left",
                        isSelected
                          ? "bg-gradient-to-r from-accent-emerald/20 to-accent-purple/20 text-white"
                          : "text-secondary hover:bg-surface/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", isSelected ? "bg-accent-emerald/20 text-accent-emerald" : "bg-surface text-secondary")}>
                          {action.icon}
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">
                        {action.type}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 border-t border-border/glass flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-secondary/50">
              <span>Use arrows to navigate</span>
              <span className="flex-1 text-right">Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
