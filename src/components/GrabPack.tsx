import Image from "next/image";
import { ArrowRight, Gem } from "lucide-react";
import DragScroll from "@/components/DragScroll";
import packArt from "@/images/dri.webp";
import sampleCard from "@/images/pokemon.png";

type Pack = {
  name: string;
  game: "pokemon" | "onepiece";
  coins: number;
  topCard: string;
  isNew?: boolean;
  gradient: string;
};

const packs: Pack[] = [
  {
    name: "30th Celebration",
    game: "pokemon",
    coins: 1000,
    topCard: "€231",
    isNew: true,
    gradient: "from-amber-400 via-yellow-500 to-orange-600",
  },
  {
    name: "The World's Strongest",
    game: "onepiece",
    coins: 500,
    topCard: "€16,415",
    isNew: true,
    gradient: "from-red-500 via-rose-600 to-pink-700",
  },
  {
    name: "Pitch Black",
    game: "pokemon",
    coins: 500,
    topCard: "€345",
    gradient: "from-zinc-700 via-zinc-800 to-black",
  },
  {
    name: "The Time of Battle",
    game: "pokemon",
    coins: 500,
    topCard: "€1,442",
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
  },
  {
    name: "Chaos Rising",
    game: "onepiece",
    coins: 500,
    topCard: "€261",
    gradient: "from-fuchsia-500 via-purple-600 to-violet-800",
  },
  {
    name: "Adventure on Kamaishi",
    game: "onepiece",
    coins: 500,
    topCard: "€520",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
  },
  {
    name: "Twilight Masquerade",
    game: "pokemon",
    coins: 500,
    topCard: "€412",
    gradient: "from-violet-500 via-purple-600 to-indigo-800",
  },
  {
    name: "Obsidian Flames",
    game: "pokemon",
    coins: 500,
    topCard: "€289",
    gradient: "from-orange-500 via-red-600 to-rose-800",
  },
  {
    name: "Wings of the Captain",
    game: "onepiece",
    coins: 500,
    topCard: "€520",
    gradient: "from-cyan-500 via-blue-600 to-blue-800",
  },
  {
    name: "Two Legends",
    game: "onepiece",
    coins: 500,
    topCard: "€1,890",
    gradient: "from-yellow-400 via-amber-600 to-red-700",
  },
];

export default function GrabPack() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-5 w-1 rounded-full bg-accent" />
          Grab a pack
        </h2>
        <a
          href="/expansions"
          className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-2"
        >
          All 42 expansions
          <ArrowRight size={14} />
        </a>
      </div>

      <DragScroll className="-mx-4 flex gap-4 overflow-x-auto px-4 pt-10 pb-2 sm:mx-0 sm:px-0">
        {packs.map((pack) => (
          <div key={pack.name} className="w-36 shrink-0 sm:w-40">
            <div className="group relative aspect-[5/9]">
              <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[80%] w-[62%] -translate-x-1/2 translate-y-3 scale-90 rotate-0 overflow-hidden rounded-md border border-white/20 opacity-0 shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-10 group-hover:rotate-[-12deg] group-hover:scale-100 group-hover:opacity-100">
                <Image
                  src={sampleCard}
                  alt="Sample card"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <span className="-rotate-12 rounded bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
                    Sample
                  </span>
                </div>
              </div>

              <div className="relative z-10 h-full w-full overflow-hidden rounded-md">
                <Image
                  src={packArt}
                  alt={pack.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {pack.isNew && (
                  <span className="absolute left-1 top-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-extrabold text-black">
                    NEW
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm font-extrabold leading-tight text-white">
              {pack.name}
            </p>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-semibold text-accent-2">
                <Gem size={12} />
                {pack.coins.toLocaleString()}
              </span>
              <span className="text-muted">
                top card <span className="font-semibold text-zinc-200">{pack.topCard}</span>
              </span>
            </div>
          </div>
        ))}
      </DragScroll>
    </section>
  );
}
