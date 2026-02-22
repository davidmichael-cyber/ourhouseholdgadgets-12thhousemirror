import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-6">
      <div className="w-12 h-12 border border-dim-gold/30 rotate-45" />
      <p className="font-serif text-2xl text-dim-gold gold-glow">
        Lost in the void
      </p>
      <p className="font-sans text-sm text-ivory/40">
        This page does not exist in the mirror.
      </p>
      <Link
        href="/"
        className="font-sans text-sm text-dim-gold/60 border border-dim-gold/30 rounded-full px-6 py-2 hover:border-dim-gold/60 hover:text-dim-gold transition-colors"
      >
        Return home
      </Link>
    </div>
  );
}
