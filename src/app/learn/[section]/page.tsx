"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { notFound } from "next/navigation";
import CardGrid from "@/components/CardGrid";
import { majorArcana, minorArcana, getCardsBySuit } from "@/lib/tarotData";
import type { TarotCardData } from "@/lib/tarotData";

const sections: Record<
  string,
  { title: string; subtitle: string; getCards: () => TarotCardData[] }
> = {
  "major-arcana": {
    title: "Major Arcana",
    subtitle: "The soul's journey through the great archetypes",
    getCards: () => majorArcana,
  },
  cups: {
    title: "Cups",
    subtitle: "The suit of emotion, intuition, and the heart",
    getCards: () => getCardsBySuit("Cups"),
  },
  wands: {
    title: "Wands",
    subtitle: "The suit of passion, creativity, and will",
    getCards: () => getCardsBySuit("Wands"),
  },
  swords: {
    title: "Swords",
    subtitle: "The suit of thought, conflict, and truth",
    getCards: () => getCardsBySuit("Swords"),
  },
  pentacles: {
    title: "Pentacles",
    subtitle: "The suit of material, body, and craft",
    getCards: () => getCardsBySuit("Pentacles"),
  },
};

export default function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);
  const sectionData = sections[section];

  if (!sectionData) {
    notFound();
  }

  const cards = sectionData.getCards();

  return (
    <div className="relative min-h-screen overflow-hidden velvet-overlay">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-cabernet)_0%,_var(--color-obsidian)_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 pt-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/learn"
            className="font-sans text-sm text-ivory/40 hover:text-dim-gold transition-colors"
          >
            ← Back to Learn
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.1em] text-dim-gold gold-glow mb-3">
            {sectionData.title}
          </h1>
          <p className="font-sans text-ivory/50 text-sm md:text-base">
            {sectionData.subtitle}
          </p>
        </motion.div>

        {/* Card grid */}
        {cards.length > 0 ? (
          <CardGrid cards={cards} />
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-ivory/40 font-sans text-sm italic"
          >
            Cards coming soon...
          </motion.p>
        )}
      </div>
    </div>
  );
}
