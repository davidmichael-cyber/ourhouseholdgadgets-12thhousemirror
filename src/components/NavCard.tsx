"use client";

import Link from "next/link";
import { motion } from "motion/react";
import TarotCard from "./TarotCard";

interface NavCardProps {
  title: string;
  href: string;
  delay?: number;
  featured?: boolean;
}

export default function NavCard({
  title,
  href,
  delay = 0,
  featured = false,
}: NavCardProps) {
  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1, delay },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 1,
          },
        }}
        whileHover={{
          scale: 1.05,
          y: -12,
          transition: { duration: 0.3 },
        }}
        className={
          featured
            ? "w-52 md:w-64 cursor-pointer"
            : "w-44 md:w-52 cursor-pointer"
        }
      >
        <TarotCard title={title} />
      </motion.div>
    </Link>
  );
}
