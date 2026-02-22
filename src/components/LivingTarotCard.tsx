"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

interface LivingTarotCardProps {
  bgLayer?: string;
  midLayer?: string;
  fgLayer?: string;
  title?: string;
  className?: string;
}

export default function LivingTarotCard({
  bgLayer,
  midLayer,
  fgLayer,
  title,
  className = "",
}: LivingTarotCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      className={`cursor-pointer ${className}`}
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-56 md:w-64 rounded-lg overflow-hidden gold-border-glow"
        whileHover="hover"
      >
        <div style={{ aspectRatio: "2 / 3" }}>
          {/* Background layer - translateZ(0) */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(0px)" }}
          >
            {bgLayer ? (
              <img src={bgLayer} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-cabernet/60 to-obsidian" />
            )}
          </div>

          {/* Mid layer - translateZ(30px) */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(30px)" }}
          >
            {midLayer ? (
              <img src={midLayer} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-32 border border-dim-gold/40 rotate-45" />
              </div>
            )}
          </div>

          {/* Foreground layer - translateZ(70px) with glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(70px)" }}
            variants={{
              hover: {
                filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))",
              },
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {fgLayer ? (
              <img src={fgLayer} alt="" className="w-3/4 h-3/4 object-contain" />
            ) : (
              <motion.div
                className="text-dim-gold text-5xl"
                variants={{
                  hover: {
                    scale: 1.1,
                    filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))",
                  },
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 5px rgba(212, 175, 55, 0.2))",
                    "drop-shadow(0 0 10px rgba(212, 175, 55, 0.35))",
                    "drop-shadow(0 0 5px rgba(212, 175, 55, 0.2))",
                  ],
                }}
                transition={{
                  filter: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                ✦
              </motion.div>
            )}
          </motion.div>

          {/* Title overlay */}
          {title && (
            <div
              className="absolute bottom-0 left-0 right-0 p-4 text-center"
              style={{ transform: "translateZ(50px)" }}
            >
              <p className="font-serif text-lg text-dim-gold tracking-wider gold-glow">
                {title}
              </p>
            </div>
          )}

          {/* Inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] rounded-lg pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
