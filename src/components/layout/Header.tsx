"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <Link
        href="/"
        className="font-serif text-dim-gold text-sm md:text-base tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
      >
        12th House Mirror
      </Link>
      <nav className="flex gap-6 font-sans text-sm">
        <Link
          href="/draw"
          className="text-ivory/50 hover:text-dim-gold transition-colors"
        >
          Draw
        </Link>
        <Link
          href="/learn"
          className="text-ivory/50 hover:text-dim-gold transition-colors"
        >
          Learn
        </Link>
      </nav>
    </motion.header>
  );
}
