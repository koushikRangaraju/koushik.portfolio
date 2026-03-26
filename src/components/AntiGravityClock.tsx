"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function AntiGravityClock() {
  const [mounted, setMounted] = useState(false);

  // Time angles
  const hourAngle = useMotionValue(0);
  const minuteAngle = useMotionValue(0);
  const secondAngle = useMotionValue(0);

  // Parallax handling
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for tilt
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimationFrame(() => {
    if (!mounted) return;
    const d = new Date();
    const ms = d.getMilliseconds();
    const s = d.getSeconds();
    const m = d.getMinutes();
    const h = d.getHours() % 12;

    const totalSeconds = s + ms / 1000;
    const totalMinutes = m + totalSeconds / 60;
    const totalHours = h + totalMinutes / 60;

    secondAngle.set(totalSeconds * 6);
    minuteAngle.set(totalMinutes * 6);
    hourAngle.set(totalHours * 30);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    // Limits inside -0.5 to 0.5
    mouseX.set((e.clientX - cx) / rect.width);
    mouseY.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative flex items-center justify-center w-full h-[500px] group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-white/5 blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
      </div>

      {/* FLOATING & PARALLAX WRAPPER */}
      <motion.div
        className="relative flex items-center justify-center pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* LEVITATION BOUNCE */}
        <motion.div
          animate={{ y: ["-12px", "12px", "-12px"] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ORBIT LINES BEHIND */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-white/10 opacity-30 animate-[spin_40s_linear_infinite]" style={{ transform: 'translateZ(-40px)', willChange: 'transform' }} />
          <div className="absolute w-[520px] h-[520px] rounded-full border border-white/[0.05] opacity-20 animate-[spin_60s_linear_infinite_reverse]" style={{ transform: 'translateZ(-60px)', willChange: 'transform' }} />

          {/* MAIN CLOCK BODY */}
          <div 
            className="relative w-[380px] h-[380px] rounded-full bg-black flex items-center justify-center 
                       border-[16px] border-[#161618]
                       shadow-[inset_0_20px_50px_rgba(0,0,0,0.8),inset_0_-20px_50px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.8)]"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* INNER FACE SHADING & GLASS REFLECTION */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black opacity-40 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
            
            {/* OCCASIONAL LIGHT SWEEP REFLECTION */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent 
                            animate-[pulse_10s_ease-in-out_infinite] mix-blend-overlay pointer-events-none" />

            {/* MINUTE & HOUR TICKS */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 60 }).map((_, i) => {
                  const isHour = i % 5 === 0;
                  const deg = i * 6;
                  return (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 -translate-x-1/2"
                      style={{
                        height: "100%",
                        transform: `rotate(${deg}deg)`,
                      }}
                    >
                      <div
                        className="mx-auto"
                        style={{
                          width: isHour ? "4px" : "1.5px",
                          height: isHour ? "16px" : "8px",
                          backgroundColor: isHour ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                          marginTop: isHour ? "12px" : "16px",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                  );
                })}

                {/* NUMERIC HOUR LABELS */}
                {Array.from({ length: 12 }).map((_, i) => {
                  if (i % 2 !== 0) return null; // Only show evens
                  const num = i === 0 ? 12 : i;
                  
                  const deg = i * 30; // 0=0deg(12), 2=60deg(2), 4=120deg(4)
                  const radius = 120; // Distance from center
                  const rad = ((deg - 90) * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <div
                      key={num}
                      className="absolute left-1/2 top-1/2 font-sans font-[300] text-xl text-white/50 tracking-wider"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      {num.toString().padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            )}

            {/* HANDS CONTAINER */}
            {mounted && (
              <div className="absolute inset-0" style={{ transform: 'translateZ(40px)' }}>
                {/* HOUR HAND */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[8px] h-[100px] rounded-full bg-gradient-to-t from-white/90 to-white/40 origin-bottom 
                             shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  style={{ y: "-100%", x: "-50%", rotate: hourAngle }}
                />

                {/* MINUTE HAND */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[4px] h-[140px] rounded-full bg-gradient-to-t from-white to-white/60 origin-bottom
                             shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  style={{ y: "-100%", x: "-50%", rotate: minuteAngle }}
                />

                {/* SECOND HAND */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[2px] h-[160px] rounded-full bg-[#e0e0e0] origin-[50%_75%]
                             shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ 
                    y: "-75%", // Pivot point slightly up from bottom of hand
                    x: "-50%", 
                    rotate: secondAngle 
                  }}
                />

                {/* CENTER PIVOT */}
                <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]">
                  <div className="absolute inset-[3px] rounded-full bg-black" />
                </div>
              </div>
            )}
            
            {/* NAME BRANDING INSIDE CLOCK (Bottom Arc Option) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            >
              <div className="font-sans font-bold text-[9px] uppercase tracking-[0.4em] text-white/40">
                KOUSHIK RANGARAJU
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
