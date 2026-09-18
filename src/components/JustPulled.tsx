type Pull = {
  card: string;
  set?: string;
  hp?: string;
  price: string;
  user: string;
  time: string;
  sealed?: boolean;
  gradient: string;
};

const pulls: Pull[] = [
  { card: "Espeon ex", hp: "270", price: "€247", user: "Nat***", time: "10m ago", gradient: "from-fuchsia-400 to-purple-700" },
  { card: "Virizion", hp: "120", price: "€54", user: "Igo***", time: "2h ago", gradient: "from-emerald-400 to-teal-700" },
  { card: "Tony Tony Chopper", set: "EB02", price: "€3,086", user: "sealed", time: "", sealed: true, gradient: "from-rose-500 to-red-800" },
  { card: "Mega Zygarde ex", hp: "370", price: "€65", user: "Pat***", time: "5h ago", gradient: "from-lime-400 to-green-700" },
  { card: "Mega Charizard ex", hp: "360", price: "€363", user: "Ric***", time: "5h ago", gradient: "from-amber-400 to-orange-700" },
  { card: "Nico Robin", set: "EB03", price: "€2,030", user: "sealed", time: "", sealed: true, gradient: "from-indigo-400 to-blue-800" },
];

export default function JustPulled() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-5 w-1 rounded-full bg-emerald-500" />
          Just pulled
        </h2>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          live from the ledger
        </span>
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {pulls.map((pull, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-40">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border">
              <div className={`absolute inset-0 bg-gradient-to-br ${pull.gradient}`} />
              <div className="absolute inset-0 bg-black/20" />
              {pull.hp && (
                <span className="absolute right-2 top-2 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {pull.hp}
                </span>
              )}
              {pull.sealed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rotate-[-12deg] rounded border-2 border-white/70 px-3 py-1 text-xs font-extrabold tracking-widest text-white/90">
                    STILL SEALED
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="truncate text-xs font-extrabold leading-tight text-white drop-shadow">
                  {pull.card}
                </p>
                {pull.set && <p className="text-[10px] text-white/70">{pull.set}</p>}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-100">{pull.price}</span>
              <span className="text-muted">{pull.time || pull.user}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
