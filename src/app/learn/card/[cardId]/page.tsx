"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { getCardById } from "@/lib/utils";
import LivingTarotCard from "@/components/LivingTarotCard";
import HiddenSymbol from "@/components/HiddenSymbol";
import ArticleLayout from "@/components/ArticleLayout";

// Map card archetypes to hidden symbols for the landscape
const symbolSets: Record<
  string,
  { icon: string; x: number; y: number; text: string }[]
> = {
  default: [
    { icon: "◈", x: 20, y: 30, text: "Look deeper within" },
    { icon: "☽", x: 75, y: 25, text: "The subconscious speaks in symbols" },
    { icon: "✧", x: 50, y: 70, text: "Trust what surfaces" },
  ],
};

export default function CardDetailPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = use(params);
  const card = getCardById(cardId);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian">
        <div className="text-center">
          <p className="font-serif text-2xl text-dim-gold mb-4">
            Card Not Found
          </p>
          <Link
            href="/learn"
            className="font-sans text-sm text-ivory/40 hover:text-dim-gold transition-colors"
          >
            ← Return to Learn
          </Link>
        </div>
      </div>
    );
  }

  const symbols = symbolSets[card.id] || symbolSets.default;

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Mobile: stacked layout | Desktop: 50/50 split */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Visual Realm */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto lg:fixed lg:inset-y-0 lg:left-0">
          {/* Landscape background */}
          <div className="absolute inset-0 bg-gradient-to-b from-cabernet/50 via-cabernet/20 to-obsidian" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--color-obsidian)_100%)]" />

          {/* Hidden symbols */}
          {symbols.map((sym, i) => (
            <HiddenSymbol
              key={i}
              icon={sym.icon}
              x={sym.x}
              y={sym.y}
              interpretationText={sym.text}
            />
          ))}

          {/* Living card centered in the visual realm */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <LivingTarotCard
                bgLayer={card.layers?.bg}
                midLayer={card.layers?.mid}
                fgLayer={card.layers?.fg}
                title={card.name}
              />
            </motion.div>
          </div>
        </div>

        {/* Text Realm */}
        <div className="relative w-full lg:w-1/2 lg:ml-auto">
          {/* Gradient blend on mobile (between image and text) */}
          <div className="lg:hidden h-16 bg-gradient-to-b from-transparent to-obsidian -mt-16 relative z-10" />

          <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 lg:py-20">
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

            {/* Card header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <p className="font-sans text-xs text-ivory/30 uppercase tracking-[0.3em] mb-2">
                {card.arcana} Arcana{card.suit ? ` · ${card.suit}` : ""}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-dim-gold gold-glow tracking-wide mb-4">
                {card.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="font-sans text-xs text-ivory/40 border border-ivory/15 rounded-full px-3 py-1"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Article content */}
            <ArticleLayout
              theMirror={card.interpretations.theMirror}
              theShadow={card.interpretations.theShadow}
              reflectionPrompts={card.interpretations.reflectionPrompts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
