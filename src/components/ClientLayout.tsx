"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import KonamiListener from "@/components/KonamiListener";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";

const CustomCursorHUD = dynamic(() => import("@/components/CustomCursorHUD"), { ssr: false });
const CinematicLoader = dynamic(() => import("@/components/CinematicLoader"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <CinematicLoader key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="contents"
        >
          <AmbientBackground />
          <KonamiListener />
          <CustomCursorHUD />
          <CommandPalette />
          <Navbar />
          <main className="min-h-screen relative z-10 w-full">
            {children}
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
