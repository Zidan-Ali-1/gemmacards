import type { Metadata } from "next";
import PacksGrid from "@/components/PacksGrid";

export const metadata: Metadata = {
  title: "Rip packs — GemmaCards",
  description: "Pick a Pokémon or One Piece pack and rip it live.",
};

export default function PacksPage() {
  return (
    <div className="w-full max-w-7xl px-8 py-12 sm:px-12 lg:px-16">
      <span className="text-xs font-extrabold tracking-widest text-accent">
        RIP PACKS
      </span>
      <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        Pick your pack.
      </h1>

      <div className="mt-10">
        <PacksGrid />
      </div>
    </div>
  );
}
