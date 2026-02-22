"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-6">
      <p className="font-serif text-2xl text-dim-gold gold-glow">
        Something went dark...
      </p>
      <button
        onClick={reset}
        className="font-sans text-sm text-ivory/40 border border-dim-gold/30 rounded-full px-6 py-2 hover:border-dim-gold/60 hover:text-dim-gold transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
