"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import TabNav from "@/components/TabNav";
import { majorArcana, minorArcana } from "@/lib/tarotData";

const loreItems = [
  {
    title: "The 12th House",
    description: "Understanding the house of the subconscious, hidden depths, and self-undoing.",
    href: "#",
  },
  {
    title: "Reading Tarot",
    description: "How to approach the cards as mirrors, not fortune-tellers.",
    href: "#",
  },
  {
    title: "The Spreads",
    description: "Layouts for self-reflection, from single-card pulls to deep dives.",
    href: "#",
  },
];

const suits = ["Cups", "Wands", "Swords", "Pentacles"] as const;

function LoreCard({
  title,
  description,
  href,
  delay,
}: {
  title: string;
  description: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link href={href} className="block group">
        <div className="relative overflow-hidden rounded-lg p-8 md:p-10 gold-border-glow bg-gradient-to-br from-cabernet/40 to-obsidian transition-all duration-500 group-hover:from-cabernet/60">
          <h3 className="font-serif text-xl md:text-2xl text-dim-gold gold-glow mb-3 tracking-wide">
            {title}
          </h3>
          <p className="font-sans text-sm text-ivory/50 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function DeckSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Major Arcana */}
      <Link href="/learn/major-arcana" className="block group">
        <div className="relative overflow-hidden rounded-lg p-10 gold-border-glow bg-gradient-to-br from-cabernet/40 to-obsidian transition-all duration-500 group-hover:from-cabernet/60">
          <h3 className="font-serif text-2xl text-dim-gold gold-glow mb-2 tracking-wide">
            Major Arcana
          </h3>
          <p className="font-sans text-sm text-ivory/50">
            {majorArcana.length} cards — The soul&apos;s journey through the great archetypes.
          </p>
        </div>
      </Link>

      {/* The Suits */}
      <div className="grid grid-cols-2 gap-4">
        {suits.map((suit) => {
          const count = minorArcana.filter((c) => c.suit === suit).length;
          return (
            <Link key={suit} href={`/learn/${suit.toLowerCase()}`} className="block group">
              <div className="relative overflow-hidden rounded-lg p-6 gold-border-glow bg-gradient-to-br from-cabernet/30 to-obsidian transition-all duration-500 group-hover:from-cabernet/50">
                <h4 className="font-serif text-lg text-dim-gold tracking-wide mb-1">
                  {suit}
                </h4>
                <p className="font-sans text-xs text-ivory/40">
                  {count > 0 ? `${count} cards` : "Coming soon"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative min-h-screen overflow-hidden velvet-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-cabernet)_0%,_var(--color-obsidian)_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 pt-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.15em] text-dim-gold gold-glow mb-4">
            World of 12th House Tarot
          </h1>
          <p className="font-sans text-ivory/50 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Explore the wisdom encoded in each card, learn the art of reflective
            reading, and discover the hidden language of the 12th house.
          </p>
        </motion.div>

        {/* Tabs */}
        <TabNav
          tabs={["The Lore", "The Deck"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 0 ? (
            <motion.div
              key="lore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {loreItems.map((item, i) => (
                <LoreCard key={item.title} {...item} delay={i * 0.15} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DeckSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
