"use client";

import { useEffect, useState } from "react";
// @ts-ignore
import confetti from "canvas-confetti";

// Standard Konami Code sequence:
// ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiListener() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Append key to sequence, keep only the last N keys (where N is konami code length)
      setInputSequence((prev) => {
        const newSeq = [...prev, e.key];
        if (newSeq.length > KONAMI_CODE.length) {
          newSeq.shift();
        }
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Check if the current sequence matches the Konami code
    const isMatch = inputSequence.length === KONAMI_CODE.length &&
      inputSequence.every((key, index) => key.toLowerCase() === KONAMI_CODE[index].toLowerCase());

    if (isMatch) {
      triggerEasterEgg();
      // Reset sequence so it can be triggered again
      setInputSequence([]);
    }
  }, [inputSequence]);

  const triggerEasterEgg = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#10b981", "#8b5cf6", "#3b82f6", "#ec4899", "#f59e0b"]
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#10b981", "#8b5cf6", "#3b82f6", "#ec4899", "#f59e0b"]
      });
    }, 250);
  };

  return null; // This component doesn't render anything visible
}
