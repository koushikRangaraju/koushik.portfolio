"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Koushik has an incredible eye for detail. The platforms he builds aren't just functional, they are an absolute joy to use. He truly understands the intersection of design and engineering.",
    author: "siddhartha",
    role: "cloud computing student",
    avatar: "S",
  },
  {
    id: 2,
    quote: "Working with Koushik was seamless. He took our complex backend requirements and translated them into a lightning-fast, intuitive frontend experience that our users love.",
    author: "srinivas",
    role: "devops intern",
    avatar: "S",
  },
  {
    id: 3,
    quote: "A rare breed of developer who cares just as much about the pixel-perfection of the UI as the scalability of the database architecture. Highly recommended.",
    author: "ravi",
    role: "full stack devoper",
    avatar: "R",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10">
      
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          WHAT OTHERS SAY
        </span>
        <h2 className="font-display font-[800] text-[clamp(40px,6vw,64px)] text-white leading-none">
          The Voices Behind
        </h2>
      </motion.div>

      {/* TESTIMONIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            style={{ willChange: "transform, opacity" }}
            className="group relative p-8 rounded-[16px] bg-[#111111] border border-[#1f1f1f] hover:border-[#10b981] transition-all duration-300 h-full flex flex-col justify-between"
          >
            {/* Quote Mark */}
            <div className="absolute top-6 left-6 text-6xl text-[rgba(255,255,255,0.05)] font-serif leading-none select-none pointer-events-none group-hover:text-[rgba(16,185,129,0.1)] transition-colors duration-500">
              ❝
            </div>

            <div className="relative z-10 space-y-8 h-full flex flex-col justify-between mt-6">
              <p className="text-[#888888] leading-[1.7] font-body text-[15px]">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center font-display font-bold text-white text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-body font-[600] text-[13px]">
                    {testimonial.author}
                  </h4>
                  <p className="text-[#888888] text-[10px] font-mono uppercase tracking-widest mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
