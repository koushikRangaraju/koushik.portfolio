import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center pt-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto animate-pulse">
      {/* Skeleton Hero */}
      <div className="w-full flex flex-col items-center mb-16">
        <div className="h-4 w-32 bg-white/5 rounded-full mb-6" />
        <div className="h-20 w-3/4 md:w-1/2 bg-white/5 rounded-2xl mb-8" />
        <div className="h-6 w-2/3 md:w-1/3 bg-white/5 rounded-full" />
      </div>

      {/* Skeleton Content Grid/Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 w-full rounded-2xl bg-white/5 border border-white/10" />
        ))}
      </div>

      {/* Subtle Glowing Center */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-emerald/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
