"use client";

import { motion } from "motion/react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay }}
      className="mb-12"
    >
      <h3 className="font-serif text-xl md:text-2xl text-dim-gold tracking-wider mb-4 gold-glow">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

interface ArticleLayoutProps {
  theMirror: string;
  theShadow: string;
  reflectionPrompts: string[];
}

export default function ArticleLayout({
  theMirror,
  theShadow,
  reflectionPrompts,
}: ArticleLayoutProps) {
  return (
    <div className="max-w-xl mx-auto lg:mx-0">
      <Section title="The Mirror" delay={0}>
        <p className="font-sans text-ivory/70 leading-loose text-sm md:text-base drop-cap">
          {theMirror}
        </p>
      </Section>

      <Section title="The Shadow" delay={0.1}>
        <p className="font-sans text-ivory/70 leading-loose text-sm md:text-base drop-cap">
          {theShadow}
        </p>
      </Section>

      <Section title="Reflections" delay={0.2}>
        <ul className="diamond-list">
          {reflectionPrompts.map((prompt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="font-sans text-ivory/60 leading-relaxed text-sm md:text-base italic"
            >
              {prompt}
            </motion.li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
