"use client";

import Image from "next/image";

interface TarotCardProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TarotCard({
  title,
  imageSrc,
  className = "",
  children,
}: TarotCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg gold-border-glow ${className}`}
      style={{ aspectRatio: "2 / 3" }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={title || "Tarot card"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-obsidian" />
      )}

      {/* Inner shadow for physical depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] rounded-lg pointer-events-none" />

      {/* Title overlay */}
      {title && !children && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-serif text-xl md:text-2xl tracking-widest text-dim-gold gold-glow text-center px-4">
            {title}
          </h2>
        </div>
      )}

      {children}
    </div>
  );
}
