"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import NavCard from "@/components/NavCard";

const RippleBackground = dynamic(
  () => import("@/components/RippleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden velvet-overlay">
      {/* Ripple canvas background */}
      <RippleBackground />

      {/* Static gradient fallback (behind canvas, visible during load) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-cabernet)_0%,_var(--color-obsidian)_70%)]" />

      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="z-10 text-center mb-16"
      >
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] uppercase text-dim-gold gold-glow mb-3">
          12th House Mirror
        </h1>
        <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-ivory/60 font-light">
          Tarot Kit &amp; Reflections
        </p>
      </motion.div>

      {/* Navigation Cards */}
      <div className="z-10 flex flex-col md:flex-row gap-8 md:gap-14 items-center justify-center">
        <NavCard title="Draw a Card" href="/draw" delay={0.2} featured />
        <NavCard title="Learn" href="/learn" delay={0.5} />
      </div>

      {/* Ethos Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="z-10 mt-20 text-center max-w-lg px-6"
      >
        <p className="font-sans text-sm md:text-base font-light italic text-ivory/50 leading-relaxed">
          Take a step into the unknown and allow your intuition to guide your
          exploration. Truth is reflecting back at those who choose to lift the
          veil.
        </p>
      </motion.div>
    </div>
  );
}
