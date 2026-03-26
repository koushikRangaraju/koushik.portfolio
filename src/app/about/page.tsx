"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, MapPin, Building2 } from "lucide-react";
import Image from "next/image";

const EXPERIENCE = [
  {
    id: 1,
    date: "JAN 2024 - PRESENT",
    company: "GeeksforGeeks Student Chapter",
    role: "Core Member",
    location: "Jalandhar, India",
    type: "Hybrid",
    achievements: [
      "Built resilient university portals integrating Next.js for SSR, ensuring seamless user experience for over 10,000 active students.",
      "Optimized database queries in MySQL to handle high-traffic registration periods.",
      "Mentored junior members on full-stack development practices."
    ],
    tech: ["Next.js", "Java", "MySQL", "TailwindCSS"],
  },
  {
    id: 2,
    date: "JUN 2023 - DEC 2023",
    company: "OASYS Cybernetics",
    role: "Full Stack Intern",
    location: "Hyderabad, India",
    type: "On-site",
    achievements: [
      "Assisted in migrating legacy code to modern React components, reducing technical debt.",
      "Developed internal dashboard REST APIs using Spring Boot, increasing data retrieval speed.",
      "Collaborated with QA to implement robust unit testing.",
    ],
    tech: ["React", "Spring Boot", "REST APIs", "Java"],
  },
  {
    id: 3,
    date: "OCT 2022 - NOV 2022",
    company: "FofX Academy",
    role: "Java Developer Intern",
    location: "Virtual",
    type: "Remote",
    achievements: [
      "Built backend microservices using Java and Spring framework.",
      "Automated testing workflows which reduced deployment time by 15%.",
    ],
    tech: ["Java", "Spring", "JUnit"],
  }
];

export default function AboutPage() {
  const [heatmap, setHeatmap] = useState<{ op: string, active: boolean }[][]>([]);

  useEffect(() => {
    const opacities = ['opacity-20', 'opacity-40', 'opacity-70', 'opacity-100'];
    const newData = Array.from({ length: 14 }).map(() => 
      Array.from({ length: 6 }).map(() => ({
        op: opacities[Math.floor(Math.random() * opacities.length)],
        active: Math.random() > 0.4
      }))
    );
    setHeatmap(newData);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-32">

      
      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-[#1f1f1f]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform, opacity" }}
          className="space-y-6"
        >
          <h1 className="text-[clamp(64px,10vw,120px)] font-display font-[900] tracking-tighter text-white leading-none">
            About Me.
          </h1>
          <p className="text-[clamp(18px,3vw,24px)] text-[#aaaaaa] font-body max-w-3xl leading-[1.6]">
            I&apos;m a Cloud Computing Student & Full Stack Developer from Hyderabad, India, dedicated to bridging the gap between design and robust engineering.
          </p>
        </motion.div>
      </section>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-20 pt-20">
        
        {/* Left Column: Timeline */}
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 mb-14"
          >
            <span className="text-accent-emerald text-[11px] font-mono tracking-[0.2em] uppercase font-bold">
              EXPERIENCE
            </span>
            <h2 className="text-4xl font-display font-[800] tracking-tight text-white">
              Where I&apos;ve Been
            </h2>
          </motion.div>

          <div className="relative border-l border-[#2a2a2a] ml-3 md:ml-4 space-y-16">
            {EXPERIENCE.map((exp, idx) => (
               <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{ willChange: "transform, opacity" }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent-emerald ring-4 ring-[#0a0a0a]" />

                <div className="space-y-5 group">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#666666] uppercase">
                      {exp.date}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-[700] tracking-tight group-hover:text-accent-emerald transition-colors duration-300 text-white">
                      {exp.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#888888] font-body">
                      <span className="font-medium text-white">{exp.role}</span>
                      <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#333333]" />
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#111111] border border-[#2a2a2a] text-[11px] uppercase tracking-wider text-[#aaaaaa]">
                        <Building2 size={12} />
                        <span>{exp.type}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-[#888888] font-body text-[15px] leading-[1.7] flex items-start gap-3">
                        <span className="text-[rgba(255,255,255,0.2)] mt-1.5 text-[10px]">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tech.map((tech) => (
                       <span key={tech} className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[10px] uppercase font-mono tracking-widest text-[#888888]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Profile & Extras */}
        <div className="lg:w-1/3 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 sticky top-32"
          >
            {/* Profile Picture Frame */}
            <div className="w-full aspect-square rounded-[24px] bg-[#111111] border border-[#1f1f1f] overflow-hidden relative group">
              <Image 
                src="/images/avatar.jpg" 
                alt="Koushik Rangaraju" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-8 rounded-[20px] bg-[#111111] border border-[#1f1f1f] space-y-5">
              <div className="flex items-center gap-3 text-white font-display font-[600]">
                <Github size={20} />
                <h3>GitHub Activity</h3>
              </div>
              <p className="text-[14px] text-[#888888] font-body leading-[1.6]">
                I actively contribute to open source and push code daily. Building in public is a core part of my engineering philosophy.
              </p>
              
              {/* Activity Heatmap Grid */}
              <div className="pt-4 space-y-3">
                <div className="flex gap-1.5 justify-between">
                  {heatmap.length > 0 ? heatmap.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1.5">
                       {col.map((cell, rowIdx) => (
                          <div 
                            key={`${colIdx}-${rowIdx}`} 
                            className={`w-[14px] h-[14px] rounded-[3px] ${cell.active ? `bg-accent-emerald ${cell.op}` : 'bg-[#1a1a1a] border border-[#2a2a2a]'}`}
                          />
                        ))}
                    </div>
                  )) : (
                    // Fallback static grid while hydrating
                    Array.from({ length: 14 }).map((_, colGrp) => (
                      <div key={colGrp} className="flex flex-col gap-1.5">
                         {Array.from({ length: 6 }).map((_, row) => (
                            <div 
                              key={`${colGrp}-${row}`} 
                              className={`w-[14px] h-[14px] rounded-[3px] bg-[#1a1a1a] border border-[#2a2a2a]`}
                            />
                          ))}
                      </div>
                    ))
                  )}
                </div>
                <div className="flex justify-between text-[10px] text-[#555555] font-mono tracking-widest uppercase mt-4">
                  <span>Less</span>
                  <span>More</span>
                </div>
              </div>

              <a 
                href="https://github.com/koushikRangaraju" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-4 text-[13px] text-accent-emerald hover:text-white font-mono uppercase tracking-widest transition-colors"
                data-cursor="hover"
              >
                View full profile →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
