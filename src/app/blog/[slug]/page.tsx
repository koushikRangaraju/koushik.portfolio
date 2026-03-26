"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Mock data mapping based on the slug route
  const postData = {
    title: params.slug === "building-a-3d-portfolio-with-threejs" 
      ? "Building a 3D Galaxy Portfolio with Three.js & Framer Motion" :
      params.slug === "spring-boot-performance-optimization"
      ? "Optimizing Spring Boot MySQL Queries for Peak Performance" :
      params.slug === "my-journey-into-cloud-computing"
      ? "My Journey into Cloud Computing: From localhost to AWS" :
      "Untitled Draft - Work In Progress",
    date: "August 15, 2025",
    readTime: "8 min read",
    tag: "Software Engineering",
    content: `
      <p>Building high-performance web applications requires more than just clean code—it requires a deep understanding of the underlying architecture. Whether it's the rendering cycle of a 3D galaxy in Three.js or the query execution plan in a MySQL database, every millisecond counts toward the final user experience.</p>
      
      <h2>The Architectural Decisions</h2>
      <p>When I first started modernizing my portfolio, the primary goal was to create an immersive experience that didn't compromise on speed. This led to the adoption of a "Dark Mode Native" design system, leveraging Framer Motion for hardware-accelerated transitions and Three.js for immersive WebGL backgrounds.</p>
      
      <blockquote>
        "Great software architecture is often invisible; it simply works so well that the user never needs to think about the complexity behind the scenes."
      </blockquote>

      <p>One of the biggest challenges was ensuring that the 3D elements didn't block the main thread. By utilizing React's concurrent rendering features and optimizing asset loading, I was able to achieve a "snappy" feel that remains consistent across both mobile and desktop devices.</p>

      <h2>Handling Performance Bottlenecks</h2>
      <p>Performance optimization is an iterative process. Through rigorous profiling and testing, I identified several bottlenecks in my initial implementation, ranging from redundant re-renders to expensive matrix calculations in the star-field animation.</p>
      <ul>
        <li>Implemented React.memo across static GLTF loaders to prevent re-renders on state change.</li>
        <li>Offloaded heavy matrix calculations to WebWorkers using Comlink to keep the UI thread responsive.</li>
        <li>Utilized InstancedMesh extensively for generating thousands of stars, drastically reducing draw calls.</li>
      </ul>

      <p>This journey has been a testament to the power of modern web tools. By combining the right frameworks with a performance-first mindset, we can build experiences that are as beautiful as they are fast. I look forward to sharing more technical deep-dives into cloud infrastructure and full-stack integration in future posts.</p>
    `
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[1000px] relative z-10 flex flex-col">
      
      {/* BACK BUTTON */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-secondary hover:text-white transition-colors mb-12 group leading-none"
        >
          <div className="w-8 h-8 rounded-full border border-border/glass flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Articles
        </Link>
      </motion.div>

      {/* ARTICLE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 text-xs font-mono text-secondary uppercase tracking-widest mb-6 border-b border-border/glass pb-6">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-accent-emerald" /> {postData.date}</span>
          <span className="w-1 h-1 rounded-full bg-border/glass" />
          <span className="flex items-center gap-2"><Clock size={14} className="text-accent-blue" /> {postData.readTime}</span>
          <span className="w-1 h-1 rounded-full bg-border/glass" />
          <span className="text-accent-gold">{postData.tag}</span>
        </div>

        <h1 className="font-heading font-black text-[clamp(32px,5vw,64px)] leading-[1.1] text-white mb-8 tracking-tight">
          {postData.title}
        </h1>

        <div className="flex items-center gap-4 border-y border-border/glass py-6">
          <div className="w-12 h-12 rounded-full border border-border/glass bg-surface/50 overflow-hidden flex items-center justify-center font-display font-black text-white text-xl bg-accent-emerald">
            KR
          </div>
          <div>
            <p className="font-heading font-bold text-white leading-tight">Koushik Rangaraju</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mt-1">Author</p>
          </div>
          
          <button className="ml-auto w-10 h-10 rounded-full border border-border/glass flex items-center justify-center text-secondary hover:text-white hover:border-white/40 transition-colors group">
            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* ARTICLE BODY */}
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="prose prose-invert prose-lg max-w-none font-body text-secondary leading-relaxed
        
        prose-headings:font-heading prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
        prose-h2:text-[clamp(24px,3vw,36px)] prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border/glass prose-h2:pb-4
        prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
        
        prose-p:text-[17px] prose-p:mb-8
        
        prose-a:text-accent-emerald prose-a:no-underline hover:prose-a:underline
        
        prose-blockquote:border-l-4 prose-blockquote:border-accent-purple prose-blockquote:bg-surface/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:font-heading prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-white/90 prose-blockquote:my-10
        
        prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
        prose-li:relative prose-li:pl-8 prose-li:mb-4 prose-li:text-[17px]
        prose-li:before:content-['✦'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-accent-cyan prose-li:before:text-lg
        
        prose-strong:text-white prose-strong:font-bold
        "
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />

    </div>
  );
}
