import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto animate-pulse">
      {/* Skeleton Hero Container */}
      <div className="w-full h-40 bg-white/5 rounded-3xl mb-20 border border-white/5" />
      
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Skeleton Left Column (Timeline) */}
        <div className="lg:w-2/3 space-y-12">
          <div className="h-8 w-48 bg-white/5 rounded-lg mb-8" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-8 items-start">
              <div className="w-2 h-2 rounded-full bg-white/10 mt-4" />
              <div className="flex-1 h-48 bg-white/5 rounded-2xl border border-white/5" />
            </div>
          ))}
        </div>

        {/* Skeleton Right Column (Profile Card) */}
        <div className="lg:w-1/3">
          <div className="w-full aspect-square rounded-3xl bg-white/5 border border-white/5 mb-12" />
          <div className="h-64 w-full rounded-2xl bg-white/5 border border-white/5" />
        </div>
      </div>

      {/* Subtle Glowing Effect */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-accent-purple/5 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
}
