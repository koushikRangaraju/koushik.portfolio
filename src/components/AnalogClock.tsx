"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnalogClock({ size = 320 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const R = size / 2;
    
    // Scale canvas for retina/high-DPI screens
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    function draw() {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const ist = new Date(utc + 5.5 * 3600 * 1000);
        const hours = ist.getHours();
        const minutes = ist.getMinutes();
        const seconds = ist.getSeconds();
        const ms = ist.getMilliseconds();

        const smoothS = seconds + ms / 1000;
        const smoothM = minutes + smoothS / 60;
        const smoothH = (hours % 12) + smoothM / 60;

        const secDeg = smoothS * 6;
        const minDeg = smoothM * 6;
        const hourDeg = smoothH * 30;

        ctx!.clearRect(0, 0, size, size);
        const cx = R;
        const cy = R;

        // Background
        ctx!.fillStyle = "#080808";
        ctx!.beginPath();
        ctx!.arc(cx, cy, R - 1, 0, Math.PI * 2);
        ctx!.fill();

        // Rays/Rings
        ctx!.beginPath();
        ctx!.arc(cx, cy, R - 3, 0, Math.PI * 2);
        ctx!.strokeStyle = "rgba(255,255,255,0.06)";
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Ticks
        for (let i = 0; i < 60; i += 5) {
          const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const outerR = R - (size * 0.075);
          const innerR = outerR - (size * 0.03);
          ctx!.beginPath();
          ctx!.moveTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
          ctx!.lineTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
          ctx!.strokeStyle = "rgba(255,255,255,0.4)";
          ctx!.lineWidth = size * 0.006;
          ctx!.stroke();
        }

        const fontSize = Math.max(7, size * 0.03);
        ctx!.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        ctx!.fillStyle = "rgba(255,255,255,0.85)";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText("KOUSHIK RANGARAJU", cx, cy - (size * 0.08));

        const drawHand = (deg: number, length: number, width: number, color: string) => {
          const angle = (deg - 90) * (Math.PI / 180);
          ctx!.save();
          ctx!.translate(cx, cy);
          ctx!.rotate(angle);
          ctx!.beginPath();
          ctx!.moveTo(0, 0);
          ctx!.lineTo(length, 0);
          ctx!.strokeStyle = color;
          ctx!.lineWidth = width;
          ctx!.lineCap = "round";
          ctx!.stroke();
          ctx!.restore();
        };

        drawHand(hourDeg, R * 0.5, size * 0.0125, "#fff");
        drawHand(minDeg, R * 0.7, size * 0.0078, "rgba(255,255,255,0.8)");
        drawHand(secDeg, R * 0.8, size * 0.003, "#10b981");

        // Center pin
        ctx!.beginPath();
        ctx!.arc(cx, cy, size * 0.0125, 0, Math.PI * 2);
        ctx!.fillStyle = "white";
        ctx!.fill();

        animId = requestAnimationFrame(draw);
      }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10"
    >
      <div
        className="rounded-full overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(52,211,153,0.08), 0 20px 60px rgba(0,0,0,0.7)" }}
      >
        <canvas ref={canvasRef} className="block" />
      </div>
    </motion.div>
  );
}
