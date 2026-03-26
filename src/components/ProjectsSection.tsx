"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "🚀 Online Friend Sphere Platform",
    description: "A full-stack social networking platform built with Spring Boot and MySQL that helps users connect based on shared interests.",
    bullets: [
      "Built 12+ REST APIs to manage user authentication, profiles, and friend requests",
      "Interest-based matching feature that improved suggestion accuracy by around 70% during testing",
      "Optimized database queries with indexing, reducing response time significantly"
    ],
    tech: ["Spring Boot", "Java", "MySQL", "REST API", "Git"],
    link: "https://phenomenal-profiterole-f3074b.netlify.app/",
    desktopSrc: "https://api.microlink.io/?url=https://phenomenal-profiterole-f3074b.netlify.app/&screenshot=true&meta=false&embed=screenshot.url",
    mobile1Src: "https://api.microlink.io/?url=https://phenomenal-profiterole-f3074b.netlify.app/&screenshot=true&meta=false&embed=screenshot.url",
    mobile2Src: "https://api.microlink.io/?url=https://phenomenal-profiterole-f3074b.netlify.app/&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    title: "🚀 Cloud Compass",
    description: "A responsive single-page educational website explaining cloud concepts in simple, easy-to-understand language, deployed on AWS EC2.",
    bullets: [
      "Designed with HTML and CSS using a mobile-first approach for smooth access across all devices",
      "Organized content into structured sections for better navigation and faster loading",
      "Deployed on AWS EC2 and managed version control with Git and GitHub"
    ],
    tech: ["HTML", "CSS", "AWS EC2", "Git", "GitHub"],
    link: "https://cloudcompass.bolt.host/",
    desktopSrc: "https://api.microlink.io/?url=https://cloudcompass.bolt.host/&screenshot=true&meta=false&embed=screenshot.url",
    mobile1Src: "https://api.microlink.io/?url=https://cloudcompass.bolt.host/&screenshot=true&meta=false&embed=screenshot.url",
    mobile2Src: "https://api.microlink.io/?url=https://cloudcompass.bolt.host/&screenshot=true&meta=false&embed=screenshot.url"
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      style={{ willChange: "transform, opacity, box-shadow" }}
      className="group relative w-full rounded-[16px] bg-[#111111] border border-[#1f1f1f] p-8 md:p-10 mb-12 transition-all duration-300 hover:scale-[1.02] transform-gpu hover:border-accent-emerald hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col lg:flex-row gap-12 overflow-hidden"
      data-cursor="project"
    >
      {/* LEFT: TEXT CONTENT */}
      <div className="flex-1 order-2 lg:order-1 flex flex-col">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
          {project.title}
        </h3>
        
        <p className="font-body text-[#aaaaaa] text-[16px] leading-[1.7] mb-6">
          {project.description}
        </p>

        <ul className="space-y-4 mb-8">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-4 font-body text-[#aaaaaa] text-[15px] leading-[1.6]">
              <span className="text-white mt-[2px] opacity-40 text-sm">✦</span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* TECH PILLS */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#aaaaaa] font-mono text-[11px] tracking-wide flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.3)]" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: STACKED IMAGES */}
      <div className="flex-1 order-1 lg:order-2 relative min-h-[300px] lg:min-h-[400px] w-full flex items-center justify-center">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer" 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          data-cursor="project"
        >
          {/* Desktop Screenshot (Background) */}
          <div className="absolute w-[90%] md:w-[80%] aspect-[16/10] rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl z-10 translate-x-4 -translate-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.desktopSrc} alt="Desktop View" className="w-full h-full object-cover" />
          </div>

          {/* Mobile Screenshot 1 (Foreground Right, slightly rotated) */}
          <div className="absolute w-[35%] aspect-[9/19] rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl z-30 right-[15%] top-[15%] -rotate-3 transition-transform duration-500 group-hover:rotate-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.mobile1Src} alt="Mobile View" className="w-full h-full object-cover" />
          </div>

          {/* Mobile Screenshot 2 (Foreground Left) */}
          <div className="absolute w-[35%] aspect-[9/19] rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl z-20 left-[15%] bottom-[10%] transition-transform duration-500 group-hover:-translate-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={project.mobile2Src} alt="Mobile View 2" className="w-full h-full object-cover" />
          </div>
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10">
      
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        style={{ willChange: "transform, opacity" }}
        className="mb-12"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          VENTURE
        </span>
        <h2 className="font-display font-[800] text-[clamp(40px,6vw,64px)] text-white leading-none">
          SHOWCASE
        </h2>
      </motion.div>

      {/* PROJECT DIRECTORY */}
      <div className="flex flex-col">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      {/* SEE MORE LINK */}
      <div className="mt-8 flex justify-start">
        <a 
          href="https://github.com/koushikRangaraju"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 font-mono text-[13px] text-white hover:text-accent-emerald transition-colors"
          data-cursor="hover"
        >
          See more projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

    </section>
  );
}
