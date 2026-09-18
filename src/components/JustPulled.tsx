import Image from "next/image";
import DragScroll from "@/components/DragScroll";
import cardArt from "@/images/justpulled.png";

type Pull = {
  card: string;
  set?: string;
  badge: string;
  price: string;
  user: string;
  time: string;
  sealed?: boolean;
};

const pulls: Pull[] = [
  { card: "Espeon ex", badge: "270", price: "€247", user: "Nat***", time: "10m ago" },
  { card: "Virizion", badge: "120", price: "€54", user: "Igo***", time: "2h ago" },
  { card: "Tony Tony Chopper", set: "EB02", badge: "5000", price: "€3,086", user: "sealed", time: "", sealed: true },
  { card: "Mega Zygarde ex", badge: "370", price: "€65", user: "Pat***", time: "5h ago" },
  { card: "Mega Charizard ex", badge: "360", price: "€363", user: "Ric***", time: "5h ago" },
  { card: "Nico Robin", set: "EB03", badge: "8000", price: "€2,030", user: "sealed", time: "", sealed: true },
  { card: "Gardevoir ex", badge: "310", price: "€128", user: "Sam***", time: "20m ago" },
  { card: "Roronoa Zoro", set: "OP12", badge: "4200", price: "€1,955", user: "sealed", time: "", sealed: true },
  { card: "Lucario ex", badge: "280", price: "€96", user: "Lea***", time: "1h ago" },
  { card: "Mewtwo ex", badge: "220", price: "€312", user: "Tom***", time: "3h ago" },
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

      <DragScroll className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {pulls.map((pull, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-40">
            <div className="relative aspect-[5/7] overflow-hidden rounded-xl border border-border transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <Image
                src={cardArt}
                alt={pull.card}
                fill
                sizes="160px"
                className="object-cover"
              />

              {pull.sealed && (
                <span className="absolute left-2 top-2 rounded bg-gold px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-black">
                  Still sealed
                </span>
              )}
              <span className="absolute right-2 top-2 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/10">
                {pull.badge}
              </span>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="-rotate-12 text-2xl font-extrabold uppercase tracking-widest text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  Sample
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 pt-6">
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
      </DragScroll>
    </section>
  );
}
