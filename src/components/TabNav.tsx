"use client";

import { motion } from "motion/react";

interface TabNavProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex gap-8 justify-center mb-12">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onTabChange(i)}
          className="relative font-serif text-lg md:text-xl tracking-widest uppercase pb-3 transition-colors"
          style={{
            color: activeTab === i ? "#d4af37" : "rgba(245, 240, 232, 0.4)",
          }}
        >
          {tab}
          {activeTab === i && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-px bg-dim-gold"
              style={{
                boxShadow: "0 0 8px rgba(212, 175, 55, 0.4)",
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
