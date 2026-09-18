import { ArrowRight, Gem } from "lucide-react";

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

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {packs.map((pack) => (
          <div key={pack.name} className="w-36 shrink-0 sm:w-40">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} opacity-90 transition-transform group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/25" />
              {pack.isNew && (
                <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-extrabold text-black">
                  NEW
                </span>
              )}
              <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white/80">
                {pack.game === "pokemon" ? "Pokémon" : "One Piece"}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-extrabold leading-tight text-white drop-shadow">
                  {pack.name}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
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
      </div>
    </section>
  );
}
