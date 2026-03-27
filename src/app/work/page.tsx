"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Project Data
const PROJECTS = [
  {
    title: "Online Friend Sphere Platform",
    subtitle: "Full Stack · Social Networking",
    category: ["All", "Full Stack", "Backend"],
    description: "A full-stack social networking platform built with Spring Boot and MySQL that helps users connect based on shared interests.",
    tech: ["Spring Boot", "MySQL", "REST API"],
    link: "https://phenomenal-profiterole-f3074b.netlify.app/",
  },
  {
    title: "Cloud Compass",
    subtitle: "Cloud · Educational",
    category: ["All", "Cloud", "Frontend"],
    description: "A responsive educational single-page website explaining cloud computing concepts in simple, easy-to-understand language.",
    tech: ["HTML", "CSS", "AWS EC2"],
    link: "https://cloudcompassrk.vercel.app/",
  },
];

const FILTERS = ["All", "Full Stack", "Cloud", "Backend", "Frontend"];

function ProjectCardSmall({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="w-full h-full rounded-[16px] bg-[#111111] border border-[#1f1f1f] hover:border-[#10b981] overflow-hidden flex flex-col transition-all duration-300">
        {/* IMAGE AREA */}
        <div className="w-full aspect-[16/10] relative group/img overflow-hidden border-b border-[#1f1f1f]">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block w-full h-full"
            data-cursor="hover" 
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover/img:opacity-100 bg-gradient-to-tr from-white/0 via-[rgba(255,255,255,0.05)] to-white/0 translate-x-[-100%] group-hover/img:translate-x-[100%] transition-all duration-1000 ease-out pointer-events-none" />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`https://api.microlink.io/?url=${project.link}&screenshot=true&meta=false&embed=screenshot.url`}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              loading="lazy"
            />
          </a>
        </div>

        {/* TEXT CONTENT */}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3 inline-block text-accent-emerald">
            {project.subtitle}
          </span>
          <h3 className="font-display font-[700] text-2xl text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-[#888888] text-[15px] leading-[1.6] mb-8 flex-1">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#1f1f1f]">
            <div className="flex gap-2">
              {project.tech.slice(0, 2).map(t => (
                <span key={t} className="px-2.5 py-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded font-mono text-[10px] uppercase text-[#aaaaaa]">
                  {t}
                </span>
              ))}
              {project.tech.length > 2 && (
                <span className="px-2.5 py-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded font-mono text-[10px] uppercase text-[#aaaaaa]">
                  +{project.tech.length - 2}
                </span>
              )}
            </div>
            
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#aaaaaa] hover:bg-white hover:text-black hover:border-white transition-colors"
              data-cursor="hover"
            >
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(p => p.category.includes(activeFilter));

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10 w-full">
      
      {/* PAGE HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-16 text-center"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          PORTFOLIO ARCHIVE
        </span>
        <h1 className="font-display font-[900] text-[clamp(48px,8vw,96px)] leading-none text-white mb-6">
          My Work
        </h1>
        <p className="font-body text-[#aaaaaa] text-[18px] max-w-2xl mx-auto leading-[1.6]">
          A collection of projects showcasing my expertise in full-stack development, cloud architecture, and creating impactful web solutions.
        </p>
      </motion.div>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-16"
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                isActive ? "text-[#0a0a0a]" : "text-[#888888] hover:text-white border border-[#1f1f1f] bg-[#111111]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-white z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </motion.div>

      {/* GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <ProjectCardSmall key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MORE COMING SOON */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-24 text-center pb-12"
      >
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#555555] flex justify-center items-center gap-2">
          More coming soon
          <span className="flex gap-1.5 ml-2">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#555555]"></motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 rounded-full bg-[#555555]"></motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#555555]"></motion.span>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
