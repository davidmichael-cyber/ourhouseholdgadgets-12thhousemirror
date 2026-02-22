"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import FlippableCard from "@/components/FlippableCard";
import { getRandomCard } from "@/lib/utils";

export default function DrawPage() {
  const handleReveal = useCallback(() => {
    return getRandomCard();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden velvet-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-cabernet)_0%,_var(--color-obsidian)_70%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center mb-10"
      >
        <h1 className="font-serif text-2xl md:text-4xl tracking-[0.15em] text-dim-gold gold-glow">
          Draw a Card
        </h1>
        <p className="font-sans text-sm text-ivory/40 mt-2">
          Let your intuition guide you
        </p>
      </motion.div>

      {/* Flippable Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="z-10"
      >
        <FlippableCard onReveal={handleReveal} />
      </motion.div>
    </div>
  );
}
