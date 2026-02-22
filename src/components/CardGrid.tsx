"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { TarotCardData } from "@/lib/tarotData";

interface CardGridProps {
  cards: TarotCardData[];
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Link href={`/learn/card/${card.id}`} className="block group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-lg gold-border-glow bg-obsidian transition-all duration-500"
              style={{ aspectRatio: "2 / 3" }}
            >
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <p className="font-serif text-base md:text-lg text-dim-gold tracking-wider mb-2 group-hover:gold-glow transition-all">
                  {card.name}
                </p>
                <p className="font-sans text-xs text-ivory/40 italic">
                  {card.keywords.slice(0, 2).join(" · ")}
                </p>
                {card.suit && (
                  <p className="font-sans text-xs text-cabernet mt-2 uppercase tracking-widest">
                    {card.suit}
                  </p>
                )}
              </div>

              {/* Inner shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-lg pointer-events-none" />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
