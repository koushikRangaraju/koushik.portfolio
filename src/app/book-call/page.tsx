"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  MapPin, 
  CheckCircle, 
  Copy, 
  ArrowLeft,
  Calendar,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- SIMPLE TOAST ---
function Toast({ message, visible }: { message: string, visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-[1000] bg-accent-emerald text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] font-label uppercase tracking-widest text-xs flex items-center gap-2"
        >
          <CheckCircle size={14} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- FORM INPUT COMPONENT (FLOATING LABEL) ---
function FloatingInput({ label, name, type = "text", required = true, isTextArea = false }: any) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full mb-6">
      <label
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none font-body text-secondary",
          isActive ? "-top-2.5 text-xs bg-[#0a0a0a] px-2 text-accent-emerald" : "top-4 text-base"
        )}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-[#111111] border rounded-xl px-4 py-4 min-h-[150px] outline-none text-white font-body transition-all duration-300 resize-none",
            focused ? "border-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-white/5"
          )}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-[#111111] border rounded-xl px-4 py-4 h-14 outline-none text-white font-body transition-all duration-300",
            focused ? "border-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-white/5"
          )}
        />
      )}
    </div>
  );
}

export default function BookCallPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [toastMsg, setToastMsg] = useState("");

  const handleCopy = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const CONTACT_INFO = [
    { icon: <Mail size={18} />, label: "Email", value: "koushikrangaraju@gmail.com", action: () => handleCopy("koushikrangaraju@gmail.com", "Email Copied!") },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "in/rangaraju-koushik", action: () => window.open("https://www.linkedin.com/in/rangaraju-koushik-92434b28b/", "_blank") },
    { icon: <Phone size={18} />, label: "Phone", value: "+91-9848706282", action: () => handleCopy("+91-9848706282", "Phone Copied!") },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6">
      <Toast message={toastMsg} visible={!!toastMsg} />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* BACK BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full mb-12"
        >
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-secondary hover:text-white transition-colors font-body text-sm"
            data-cursor="hover"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start w-full">
          
          {/* LEFT COLUMN: HERO & INFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-[11px] font-mono uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              Open for collaboration
            </div>
            
            <h1 className="font-heading font-bold text-[clamp(40px,5vw,64px)] leading-[1.1] mb-6">
              Let&apos;s build something <span className="text-secondary italic font-normal text-opacity-50">extraordinary</span>.
            </h1>
            
            <p className="font-body text-[#888888] text-lg leading-relaxed mb-12 max-w-lg">
              Whether you have a specific project in mind or just want to explore possibilities, I&apos;m always excited to connect and brainstorm.
            </p>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onClick={info.action}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-[#111111] border border-white/5 hover:border-accent-emerald/30 hover:bg-accent-emerald/[0.02] transition-all cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:text-accent-emerald transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#555] font-mono group-hover:text-accent-emerald/70 transition-colors">
                      {info.label}
                    </p>
                    <p className="text-sm font-body text-white/80 group-hover:text-white transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: BOOKING FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Cinematic Form Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-blue opacity-10 blur-2xl rounded-[2rem]" />
            
            <div className="relative bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-[2rem] shadow-2xl">
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-accent-emerald/10 flex items-center justify-center text-accent-emerald mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3">Meeting Request Sent!</h3>
                  <p className="text-secondary font-body mb-8">
                    I&apos;ve received your request and will reach out shortly to coordinate a time.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="px-8 py-3 rounded-full bg-white text-black font-body font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 flex items-center justify-center text-accent-emerald">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading font-bold">Schedule a session</h2>
                      <p className="text-xs text-secondary">Typically replies within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2">
                    <FloatingInput label="Your Name" name="name" />
                    <FloatingInput label="Email Address" name="email" type="email" />
                    <FloatingInput label="What's on your mind?" name="message" isTextArea={true} />
                    
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={cn(
                        "w-full py-4 mt-4 rounded-xl font-body font-bold text-sm tracking-wide transition-all duration-500 overflow-hidden relative",
                        formStatus === "submitting" 
                          ? "bg-secondary/20 cursor-not-allowed" 
                          : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      )}
                      data-cursor="hover"
                    >
                      <span className="relative z-10">
                        {formStatus === "submitting" ? "Processing..." : "Submit Request"}
                      </span>
                    </button>
                    
                    <p className="text-[10px] text-center text-secondary/60 mt-4 leading-relaxed font-body">
                      By submitting, you agree to being contacted via email<br />
                      regarding your inquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
