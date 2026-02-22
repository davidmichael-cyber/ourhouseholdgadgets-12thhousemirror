"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface HiddenSymbolProps {
  icon: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  interpretationText: string;
}

export default function HiddenSymbol({
  icon,
  x,
  y,
  interpretationText,
}: HiddenSymbolProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      animate={{
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        opacity: 1,
        scale: 1.3,
        filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 0.6))",
      }}
    >
      <span className="text-dim-gold text-2xl md:text-3xl select-none">
        {icon}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 rounded-md bg-obsidian/95 border border-dim-gold/30 text-center"
        >
          <p className="font-sans text-xs text-ivory/70 leading-relaxed">
            {interpretationText}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-obsidian/95 border-r border-b border-dim-gold/30 rotate-45 -mt-1" />
        </motion.div>
      )}
    </motion.div>
  );
}
