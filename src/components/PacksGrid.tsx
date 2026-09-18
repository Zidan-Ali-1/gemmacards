"use client";

import { useState } from "react";
import Image from "next/image";
import { Gem } from "lucide-react";
import pokemonArt from "@/images/pokemon.png";

type Game = "pokemon" | "onepiece";

type Pack = {
  name: string;
  game: Game;
  category: string;
  price: string;
  coins: number;
  gradient: string;
};

const packs: Pack[] = [
  {
    name: "30th Celebration",
    game: "pokemon",
    category: "Pokémon TCG",
    price: "€231.00",
    coins: 1000,
    gradient: "from-amber-400 via-yellow-500 to-orange-600",
  },
  {
    name: "Pitch Black",
    game: "pokemon",
    category: "Pokémon TCG",
    price: "€345.34",
    coins: 500,
    gradient: "from-zinc-700 via-zinc-800 to-black",
  },
  {
    name: "Chaos Rising",
    game: "pokemon",
    category: "Pokémon TCG",
    price: "€261.38",
    coins: 500,
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
  },
  {
    name: "Perfect Order",
    game: "pokemon",
    category: "Pokémon TCG",
    price: "€145.24",
    coins: 500,
    gradient: "from-lime-400 via-emerald-600 to-green-800",
  },
  {
    name: "The World's Strongest",
    game: "onepiece",
    category: "One Piece TCG",
    price: "€16,415.00",
    coins: 500,
    gradient: "from-red-500 via-rose-600 to-pink-700",
  },
  {
    name: "Wings of the Captain",
    game: "onepiece",
    category: "One Piece TCG",
    price: "€520.00",
    coins: 500,
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
  },
  {
    name: "Twin Champions",
    game: "onepiece",
    category: "One Piece TCG",
    price: "€389.50",
    coins: 500,
    gradient: "from-fuchsia-500 via-purple-600 to-violet-800",
  },
  {
    name: "Emperors of the New World",
    game: "onepiece",
    category: "One Piece TCG",
    price: "€1,204.00",
    coins: 500,
    gradient: "from-yellow-400 via-amber-600 to-red-700",
  },
];

const filters: { label: string; value: "all" | Game }[] = [
  { label: "All", value: "all" },
  { label: "Pokémon", value: "pokemon" },
  { label: "One Piece", value: "onepiece" },
];

export default function PacksGrid() {
  const [filter, setFilter] = useState<"all" | Game>("all");

  const visible = packs.filter((p) => filter === "all" || p.game === filter);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-5 w-1 rounded-full bg-accent" />
          Rip a pack
        </h2>
        <span className="text-sm font-semibold text-muted">
          {packs.length} expansions
        </span>
      </div>

      <div className="mb-8 inline-flex items-center gap-1 rounded-full border border-border bg-panel p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.value
                ? "bg-white text-black"
                : "text-zinc-400 hover:text-zinc-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((pack) => (
          <div key={pack.name} className="flex flex-col">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <Image
                src={pokemonArt}
                alt={pack.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
              <span className="absolute left-3 top-3 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white/90">
                6+
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-base font-extrabold leading-tight text-white drop-shadow">
                  {pack.name}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-muted">
              {pack.category}
            </p>
            <p className="mt-0.5 text-lg font-extrabold">{pack.name}</p>
            <p className="mt-1 text-xs text-muted">
              Top set card <span className="font-bold text-zinc-200">{pack.price}</span>
            </p>

            <button
              type="button"
              className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2.5 text-sm font-bold text-white hover:brightness-110"
            >
              Rip pack
              <span className="flex items-center gap-0.5 text-xs font-semibold opacity-90">
                · <Gem size={12} /> {pack.coins.toLocaleString()}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
