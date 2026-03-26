"use client";

import { motion } from "framer-motion";
import { 
  Github, Linkedin, Twitter, 
  ExternalLink, Mail, MessageSquare, 
  Globe, Briefcase, User
} from "lucide-react";

const LINKS = [
  {
    category: "Social",
    items: [
      { name: "GitHub", url: "https://github.com/koushikRangaraju", icon: Github, color: "#ffffff" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/rangaraju-koushik-92434b28b/", icon: Linkedin, color: "#0077b5" },
      { name: "Twitter / X", url: "https://twitter.com/", icon: Twitter, color: "#1DA1F2" },
    ]
  },
  {
    category: "Professional",
    items: [
      { name: "Portfolio", url: "/", icon: User, color: "#10b981" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/", icon: Globe, color: "#2f8d46" },
      { name: "Resume", url: "/resume.pdf", icon: Briefcase, color: "#f59e0b" },
    ]
  },
  {
    category: "Contact",
    items: [
      { name: "Email", url: "mailto:koushik.rangaraju@example.com", icon: Mail, color: "#ef4444" },
      { name: "Guestbook", url: "/guestbook", icon: MessageSquare, color: "#8b5cf6" },
    ]
  }
];

export default function LinksPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 mx-auto max-w-[700px] relative z-10 w-full flex flex-col items-center">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full bg-[#111111] border border-[#1f1f1f] mb-6 overflow-hidden relative group">
          <img 
            src="/images/avatar.jpg" 
            alt="Koushik Rangaraju" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-white -z-10">KR</div>
        </div>
        <h1 className="text-3xl font-display font-[800] text-white mb-2">@koushikRangaraju</h1>
        <p className="text-[#888888] font-body text-sm max-w-[320px]">
          Cloud Computing Student & Full Stack Developer. Building impactful products.
        </p>
      </motion.div>

      {/* LINKS LIST */}
      <div className="w-full space-y-12">
        {LINKS.map((category, catIdx) => (
          <div key={category.category} className="space-y-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#555555] ml-4">
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <motion.a 
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (catIdx * 0.2) + (itemIdx * 0.1) }}
                  className="group relative flex items-center justify-between p-5 rounded-[16px] bg-[#111111] border border-[#1f1f1f] hover:border-white/20 transition-all duration-300"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#888888] group-hover:text-white transition-colors">
                      <item.icon size={18} />
                    </div>
                    <span className="font-body font-[600] text-white">
                      {item.name}
                    </span>
                  </div>
                  <ExternalLink size={16} className="text-[#444444] group-hover:text-white transition-colors" />
                  
                  {/* Subtle Glow on Hover */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500" 
                  />
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 pt-8 border-t border-[#1f1f1f] w-full text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#555555]">
          koushikrangaraju.xyz • 2025
        </p>
      </motion.div>

    </div>
  );
}

