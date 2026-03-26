"use client";

import { motion } from "framer-motion";
import { 
  Monitor, Laptop, Mouse, Keyboard, 
  Code2, Terminal, Shield, AppWindow, 
  Cpu, Layers, Cloud, Globe, 
  Layout, Database, PenTool, Coffee
} from "lucide-react";

const CATEGORIES = [
  {
    title: "Hardware",
    icon: Cpu,
    items: [
      { name: "HP Pavilion 15", description: "Personal dev machine for daily tasks", icon: Laptop },
      { name: "LG UltraGear 24\"", description: "Primary monitor for coding and multitasking", icon: Monitor },
      { name: "Logitech G304", description: "Wireless gaming mouse for precision", icon: Mouse },
      { name: "Cosmic Byte CB-GK-16", description: "Mechanical keyboard (Blue Switches)", icon: Keyboard },
    ]
  },
  {
    title: "Development Suite",
    icon: Code2,
    items: [
      { name: "VS Code", description: "Primary editor with a minimal dark theme", icon: Terminal },
      { name: "IntelliJ IDEA", description: "Main IDE for Spring Boot and Java work", icon: Layers },
      { name: "Postman", description: "API testing and documentation", icon: Globe },
      { name: "Docker Desktop", description: "Containerization for local development", icon: Shield },
    ]
  },
  {
    title: "Tools & Apps",
    icon: AppWindow,
    items: [
      { name: "Notion", description: "Project management and documentation", icon: PenTool },
      { name: "Git & GitHub", description: "Version control and building in public", icon: Database },
      { name: "AWS Console", description: "Managing cloud infrastructure and deployments", icon: Cloud },
      { name: "Chrome DevTools", description: "Essential for debugging frontend layouts", icon: Layout },
    ]
  }
];

export default function UsesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10 w-full">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          EQUIPMENT & SOFTWARE
        </span>
        <h1 className="font-display font-[900] text-[clamp(48px,8vw,96px)] leading-none text-white mb-6">
          What I Use.
        </h1>
        <p className="font-body text-[#aaaaaa] text-[18px] max-w-2xl leading-[1.6]">
          A curated list of the hardware, software, and professional tools that power my daily development workflow and creative process.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="space-y-24">
        {CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#1f1f1f]">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-accent-emerald">
                <category.icon size={20} />
              </div>
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                {category.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {category.items.map((item, itemIdx) => (
                <div 
                  key={item.name}
                  className="group p-6 rounded-[16px] bg-[#0d0d0d] border border-[#1a1a1a] hover:border-accent-emerald/50 transition-all duration-300"
                  data-cursor="hover"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888888] group-hover:text-white group-hover:border-accent-emerald/30 transition-all duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-body font-[600] text-white mb-1 group-hover:text-accent-emerald transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#888888] font-body leading-relaxed max-w-[260px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-10 rounded-[24px] bg-[#111111] border border-[#1f1f1f] text-center"
      >
        <Coffee className="mx-auto text-accent-emerald mb-6" size={32} />
        <p className="font-body text-[#aaaaaa] max-w-lg mx-auto leading-relaxed">
          I&apos;m constantly exploring new tools and workflows to improve my efficiency. If you have questions about my setup, feel free to reach out.
        </p>
      </motion.div>

    </div>
  );
}

