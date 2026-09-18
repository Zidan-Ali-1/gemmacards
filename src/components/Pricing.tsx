import { Gem } from "lucide-react";

const chips = [
  "100 💎 = €1",
  "500 💎 = €5.00 = 1 pack",
  "All card values shown in €",
];

export default function Pricing() {
  return (
    <section className="relative mt-14 border-t border-border pt-14 text-center">
      <span className="text-xs font-extrabold tracking-widest text-accent-2">
        COINS &amp; PRICING
      </span>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
        Start free. <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Rip for $5.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        No subscription, no minimum. Coins are what you rip with — 100 coins = €1, one
        pack = 500 coins. Sign up and 1,000{" "}
        <Gem size={14} className="inline -translate-y-0.5 text-accent-2" /> are already
        yours: 2 packs, no card needed.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-panel px-3 py-1.5 text-xs font-semibold text-zinc-300"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
