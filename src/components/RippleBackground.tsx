"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Custom Canvas-based water ripple effect.
 * Renders at low resolution for performance, scaled up with CSS for a soft, organic feel.
 * Creates a viscous, dark-water distortion responding to mouse movement.
 */

const GRID = 128;
const DAMPING = 0.965;

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufA = useRef(new Float32Array(GRID * GRID));
  const bufB = useRef(new Float32Array(GRID * GRID));
  const frameRef = useRef(0);
  const lastDrop = useRef(0);

  const drop = useCallback((nx: number, ny: number) => {
    const cx = Math.floor(nx * GRID);
    const cy = Math.floor(ny * GRID);
    const r = 3;
    const buf = bufA.current;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const px = cx + dx;
        const py = cy + dy;
        if (px > 0 && px < GRID - 1 && py > 0 && py < GRID - 1) {
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d <= r) buf[py * GRID + px] += 180 * (1 - d / r);
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = GRID;
    canvas.height = GRID;

    // Pre-render the base gradient into an ImageData
    const baseData = ctx.createImageData(GRID, GRID);
    const bd = baseData.data;
    const half = GRID / 2;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const dx = (x - half) / half;
        const dy = (y - half) / half;
        const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
        const t = dist;
        const i = (y * GRID + x) * 4;
        bd[i] = Math.round(59 * (1 - t) + 10 * t);
        bd[i + 1] = Math.round(9 * (1 - t) + 10 * t);
        bd[i + 2] = Math.round(24 * (1 - t) + 10 * t);
        bd[i + 3] = 255;
      }
    }

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastDrop.current < 60) return;
      lastDrop.current = now;
      drop(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);

    const render = () => {
      const a = bufA.current;
      const b = bufB.current;
      const next = new Float32Array(GRID * GRID);

      for (let y = 1; y < GRID - 1; y++) {
        for (let x = 1; x < GRID - 1; x++) {
          const i = y * GRID + x;
          next[i] =
            ((a[i - 1] + a[i + 1] + a[i - GRID] + a[i + GRID]) / 2 - b[i]) *
            DAMPING;
        }
      }

      // Swap
      bufB.current = a;
      bufA.current = next;

      // Draw
      const img = ctx.createImageData(GRID, GRID);
      const d = img.data;
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const i = y * GRID + x;
          const disp = next[i];

          // Offset sample coordinates
          const sx = Math.max(0, Math.min(GRID - 1, Math.round(x + disp * 0.015)));
          const sy = Math.max(0, Math.min(GRID - 1, Math.round(y + disp * 0.015)));
          const si = (sy * GRID + sx) * 4;
          const di = i * 4;

          const hl = disp * 0.06;
          d[di] = Math.max(0, Math.min(255, bd[si] + hl));
          d[di + 1] = Math.max(0, Math.min(255, bd[si + 1] + hl * 0.4));
          d[di + 2] = Math.max(0, Math.min(255, bd[si + 2] + hl * 0.25));
          d[di + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [drop]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        imageRendering: "auto",
        pointerEvents: "auto",
      }}
    />
  );
}
