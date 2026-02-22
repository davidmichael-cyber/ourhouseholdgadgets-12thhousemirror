export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-dim-gold/40 rotate-45 animate-pulse" />
        <p className="font-sans text-xs text-ivory/30 tracking-[0.2em]">
          Loading...
        </p>
      </div>
    </div>
  );
}
