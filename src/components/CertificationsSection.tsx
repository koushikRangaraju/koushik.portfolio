"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, Megaphone, ArrowUpRight } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Cloud Computing Intern",
    issuer: "Infosys Springboard",
    date: "July 2025",
    gradient: "from-accent-blue to-accent-cyan",
    icon: <Cloud size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />,
    link: "https://drive.google.com/file/d/1B2I-2fm66c8vzGAqkYfp0jkbDK3Y4_4g/view?usp=sharing",
  },
  {
    title: "Code-A-Haunt",
    issuer: "Lovely Professional University",
    date: "September 2025",
    gradient: "from-accent-purple to-accent-pink",
    icon: <Code2 size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />,
    link: "https://drive.google.com/file/d/11TEsTu0AXx7Q3QdqMyIzHBNj7kPMp9A8/view?usp=sharing",
  },
  {
    title: "Master of Facebook Ads",
    issuer: "Udemy",
    date: "October 2023",
    gradient: "from-accent-gold to-red-500",
    icon: <Megaphone size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />,
    link: "https://drive.google.com/file/d/1vVhgUMkjClp2rlBGMvzTKXdsbGNsw39H/view?usp=sharing",
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1400px] relative z-10">
      
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="font-label text-accent-pink tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          CERTIFIED
        </span>
        <h2 
          className="font-heading font-bold text-[clamp(36px,5vw,72px)] leading-tight bg-clip-text text-transparent inline-block"
          style={{ backgroundImage: "linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)" }}
        >
          Earned Badges
        </h2>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative h-[380px] w-full rounded-2xl cursor-pointer"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* INNER ROTATING WRAPPER */}
            <div className="relative w-full h-full transition-transform duration-[0.6s] ease-in-out transform-style-3d group-hover:[transform:rotateY(180deg)]">
              
              {/* FRONT SIDE */}
              <div 
                className={`absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br ${cert.gradient} flex flex-col items-center justify-center p-8 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/20`}
              >
                <div className="mb-6">{cert.icon}</div>
                <h3 className="font-heading font-bold text-2xl text-white text-center leading-tight">
                  {cert.title}
                </h3>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 font-label text-xs uppercase tracking-widest text-white/90">
                  Hover to view
                </div>
              </div>

              {/* BACK SIDE */}
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-full h-full backface-hidden rounded-2xl bg-surface-card border border-border/glass flex flex-col p-8 [transform:rotateY(180deg)] shadow-xl cursor-pointer group/back"
              >
                <div className="flex-1 flex flex-col justify-center text-center gap-4 pointer-events-none">
                  <div className="font-mono text-[60px] leading-none mb-2 select-none opacity-20">
                    📜
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white leading-tight">
                    {cert.title}
                  </h3>
                  <div className="w-[40px] h-[2px] bg-white/20 mx-auto rounded-full" />
                  <p className="font-label text-[13px] uppercase tracking-widest text-accent-pink">
                    {cert.issuer}
                  </p>
                  <p className="font-mono text-sm text-secondary">
                    Issued: {cert.date}
                  </p>
                </div>
                
                <div className="mt-auto pt-6 w-full flex justify-center border-t border-border/glass pointer-events-none">
                  <div 
                    className="inline-flex items-center gap-2 font-body text-sm text-white/80 group-hover/back:text-white transition-colors"
                  >
                    Download Certificate <ArrowUpRight size={16} />
                  </div>
                </div>
              </a>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Global CSS required for 3D flip since Tailwind arbitrary variants can get messy */}
      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
      
    </section>
  );
}
