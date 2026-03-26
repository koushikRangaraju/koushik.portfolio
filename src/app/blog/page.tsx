"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const POSTS = [
  {
    slug: "building-a-3d-portfolio-with-threejs",
    title: "Building a 3D Galaxy Portfolio with Three.js & Framer Motion",
    excerpt: "Discover the architectural decisions and technical implementation behind creating an immersive, high-performance WebGL portfolio experience.",
    date: "Aug 15, 2025",
    readTime: "8 min read",
    tag: "Frontend",
    gradient: "from-accent-emerald to-accent-blue"
  },
  {
    slug: "spring-boot-performance-optimization",
    title: "Optimizing Spring Boot MySQL Queries for Peak Performance",
    excerpt: "A deep dive into indexing strategies, N+1 query problems, and caching paradigms to reduce your API response times by 70%.",
    date: "Sep 22, 2025",
    readTime: "12 min read",
    tag: "Backend",
    gradient: "from-accent-purple to-accent-pink"
  },
  {
    slug: "my-journey-into-cloud-computing",
    title: "My Journey into Cloud Computing: From localhost to AWS",
    excerpt: "How I transitioned from local development to deploying scalable web applications on AWS EC2, S3, and leveraging proper CI/CD pipelines.",
    date: "Oct 05, 2025",
    readTime: "6 min read",
    tag: "Cloud",
    gradient: "from-accent-gold to-accent-emerald"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1200px] relative z-10 w-full flex flex-col items-center">
      
      {/* PAGE HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-16 text-center"
      >
        <span className="font-label text-accent-emerald tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          INSIGHTS & ARTICLES
        </span>
        <h1 
          className="font-heading font-bold text-[clamp(48px,8vw,96px)] leading-tight bg-clip-text text-transparent inline-block mb-6"
          style={{ backgroundImage: "linear-gradient(90deg, #10b981 0%, #8b5cf6 100%)" }}
        >
          My Blog
        </h1>
        <p className="font-body text-secondary text-lg max-w-2xl mx-auto">
          Writing about software engineering, cloud architecture, and the intersection of design and code.
        </p>
      </motion.div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {POSTS.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div 
                className="group w-full h-full p-8 rounded-2xl bg-surface-card border border-border/glass hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col relative overflow-hidden"
              >
                {/* Glowing top line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${post.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-center gap-4 text-xs font-mono text-[#9ca3af] uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h2 className="font-heading font-bold text-2xl text-white mb-4 leading-tight group-hover:text-accent-emerald transition-colors">
                  {post.title}
                </h2>
                
                <p className="font-body text-secondary text-[15px] leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-end mt-auto pt-6 border-t border-border/glass">
                  <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 group-hover:bg-accent-emerald group-hover:text-white transition-colors">
                    <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
