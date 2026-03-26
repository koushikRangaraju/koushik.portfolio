"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, CheckCircle, Copy } from "lucide-react";
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
          isActive ? "-top-2.5 text-xs bg-[#0b0f19] px-2 text-accent-emerald" : "top-4 text-base"
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
            "w-full bg-surface-card border rounded-xl px-4 py-4 min-h-[150px] outline-none text-white font-body transition-all duration-300 resize-none",
            focused ? "border-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-border/glass"
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
            "w-full bg-surface-card border rounded-xl px-4 py-4 h-14 outline-none text-white font-body transition-all duration-300",
            focused ? "border-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-border/glass"
          )}
        />
      )}
    </div>
  );
}

export default function ContactSection() {
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
    
    // Using Formspree endpoint format (user can replace with real ID later)
    const formUrl = "https://formspree.io/f/placeholder"; 
    
    // Simulate API call since we don't have real endpoint yet
    setTimeout(() => {
      setFormStatus("success");
      // Could reset form here
    }, 1500);
  };

  const CONTACT_INFO = [
    { icon: <Mail size={18} />, label: "Email", value: "koushikrangaraju@gmail.com", hover: "hover:border-accent-emerald hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:text-accent-emerald", action: () => handleCopy("koushikrangaraju@gmail.com", "Email Copied!") },
    { icon: <Phone size={18} />, label: "Phone", value: "+91-9848706282", hover: "hover:border-accent-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:text-accent-cyan", action: () => handleCopy("+91-9848706282", "Phone Copied!") },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/koushikRangaraju", hover: "hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:text-white", action: () => window.open("https://github.com/koushikRangaraju", "_blank") },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/rangaraju-koushik-92434b28b", hover: "hover:border-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,185,0.3)] hover:text-[#0077b5]", action: () => window.open("https://www.linkedin.com/in/rangaraju-koushik-92434b28b/", "_blank") },
    { icon: <MapPin size={18} />, label: "Location", value: "Hyderabad, India", hover: "hover:border-accent-gold hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:text-accent-gold", action: null },
  ];

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1400px] relative z-10">
      <Toast message={toastMsg} visible={!!toastMsg} />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="font-label text-accent-emerald tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          LET&apos;S CONNECT
        </span>
        <h2 className="font-heading font-bold text-[clamp(36px,5vw,72px)] leading-tight text-white inline-block">
          Get In Touch
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT: FORM */}
        <motion.div 
          className="flex-1 w-full max-w-xl mx-auto lg:mx-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {formStatus === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-surface border border-accent-emerald/30 rounded-2xl text-center"
            >
              <CheckCircle size={64} className="text-accent-emerald mb-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
              <h3 className="font-heading text-2xl font-bold text-white mb-2">Message sent!</h3>
              <p className="font-body text-secondary">I&apos;ll get back to you soon 🚀</p>
              <button 
                onClick={() => setFormStatus("idle")}
                className="mt-8 text-accent-emerald font-label text-xs uppercase tracking-widest hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full relative">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-emerald/5 to-transparent rounded-2xl pointer-events-none -z-10 blur-3xl opacity-50" />
              
              <FloatingInput label="Full Name" name="name" />
              <FloatingInput label="Email Address" name="email" type="email" />
              <FloatingInput label="Message" name="message" isTextArea={true} />
              
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={cn(
                  "w-full py-4 rounded-full font-label tracking-widest uppercase text-sm text-white transition-all duration-300 flex items-center justify-center gap-3",
                  formStatus === "submitting" ? "bg-secondary cursor-not-allowed" : "bg-gradient-to-r from-accent-emerald to-accent-blue hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
                )}
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* RIGHT: INFO CARDS */}
        <motion.div 
          className="flex-1 flex flex-col gap-4 justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CONTACT_INFO.map((info, idx) => (
            <div
              key={idx}
              onClick={info.action || undefined}
              className={cn(
                "w-full p-4 rounded-xl bg-surface-card border border-border/glass flex items-center gap-4 transition-all duration-300",
                info.hover,
                info.action ? "cursor-pointer" : ""
              )}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                {info.icon}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-label text-[10px] uppercase tracking-widest text-[#9ca3af] mb-1">
                  {info.label}
                </p>
                <p className="font-body text-white font-medium truncate text-sm md:text-base">
                  {info.value}
                </p>
              </div>
              {info.label === "Email" || info.label === "Phone" ? (
                <Copy size={16} className="text-secondary opacity-50 ml-auto mr-2" />
              ) : null}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
