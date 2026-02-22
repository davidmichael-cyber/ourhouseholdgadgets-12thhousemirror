"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import type { TarotCardData } from "@/lib/tarotData";

interface FlippableCardProps {
  onReveal: () => TarotCardData;
  className?: string;
}

export default function FlippableCard({ onReveal, className = "" }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<TarotCardData | null>(null);

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      const drawn = onReveal();
      setCard(drawn);
    }
    setIsFlipped((prev) => !prev);
  }, [isFlipped, onReveal]);

  const reset = useCallback(() => {
    setIsFlipped(false);
    setCard(null);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      {/* Card with 3D flip */}
      <div
        className="cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative w-56 md:w-72"
          style={{
            aspectRatio: "2 / 3",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Face (Card Back) */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden gold-border-glow"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 bg-obsidian" />
            {/* Decorative pattern for card back */}
            <div className="absolute inset-3 border border-dim-gold/30 rounded-md" />
            <div className="absolute inset-6 border border-dim-gold/15 rounded-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-dim-gold/60 text-4xl mb-2">✦</div>
                <p className="font-serif text-dim-gold/50 text-xs tracking-[0.3em] uppercase">
                  12th House
                </p>
              </div>
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] rounded-lg" />
          </div>

          {/* Back Face (Revealed Card) */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden gold-border-glow"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cabernet to-obsidian" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              {card && (
                <>
                  <p className="font-serif text-2xl md:text-3xl text-dim-gold gold-glow mb-3">
                    {card.name}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {card.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs text-ivory/50 border border-ivory/20 rounded-full px-2 py-0.5"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-ivory/70 text-xs md:text-sm leading-relaxed font-sans line-clamp-4">
                    {card.interpretations.theMirror}
                  </p>
                </>
              )}
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] rounded-lg" />
          </div>
        </motion.div>
      </div>

      {/* Instruction / Reset */}
      {!isFlipped ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-ivory/40 font-sans text-sm italic"
        >
          Click the card to draw
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          {card && (
            <div className="max-w-md text-center">
              <p className="font-serif text-lg text-dim-gold mb-2">{card.name}</p>
              <p className="text-ivory/60 font-sans text-sm leading-relaxed">
                {card.interpretations.theMirror}
              </p>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="font-sans text-sm text-dim-gold/70 border border-dim-gold/30 rounded-full px-6 py-2 hover:border-dim-gold/60 hover:text-dim-gold transition-colors"
          >
            Draw Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
