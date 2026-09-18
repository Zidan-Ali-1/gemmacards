"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

type Slide = {
  eyebrow: string;
  eyebrowColor: string;
  title: React.ReactNode;
  copy: string;
  cta: string;
  glow: string;
  badge?: string;
};

const AUTOPLAY_MS = 5000;

const slides: Slide[] = [
  {
    eyebrow: "POKÉMON · 30 YEARS",
    eyebrowColor: "text-gold border-gold/30 bg-gold/10",
    title: (
      <>
        30th Celebration <span className="text-gold">is here</span>
      </>
    ),
    copy: "Five cards a pack, every one of them holo. Mew ex, Mewtwo ex, Pikachu ex and Gengar ex Special Art Rares are in there. Thirty years of Pokémon, opened live.",
    cta: "Rip the 30th Celebration",
    glow: "from-amber-500/20 via-transparent to-transparent",
  },
  {
    eyebrow: "FIRST TOP-UP ONLY",
    eyebrowColor: "text-accent-2 border-accent-2/30 bg-accent-2/10",
    title: <>Welcome Pack · +40%</>,
    copy: "3,500 coins worth €34.99, yours for €24.99. Once per account.",
    cta: "Claim the bonus",
    glow: "from-violet-500/25 via-transparent to-transparent",
    badge: "+40%",
  },
  {
    eyebrow: "REFER & EARN",
    eyebrowColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    title: (
      <>
        Invite a friend, earn <span className="text-accent">30%</span>
      </>
    ),
    copy: "Of every top-up they make, credited to you in coins. Your personal link, ready to share. Fair use terms apply.",
    cta: "Get my link",
    glow: "from-violet-500/20 via-transparent to-transparent",
  },
  {
    eyebrow: "ONE PIECE · NEW",
    eyebrowColor: "text-sky-400 border-sky-400/30 bg-sky-400/10",
    title: (
      <>
        The World&apos;s Strongest <span className="text-sky-400">is live</span>
      </>
    ),
    copy: "12 cards a pack from the newest One Piece Card Game set. Chase Nico Robin and Tony Tony Chopper Special Art Rares.",
    cta: "Rip One Piece packs",
    glow: "from-sky-500/20 via-transparent to-transparent",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActive((a) => (a + 1) % slides.length);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  const goTo = (i: number) => setActive(i);

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-border bg-panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${slide.glow} transition-colors duration-500`}
      />

      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        {slide.badge && (
          <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
            {slide.badge}
          </span>
        )}
        <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/10 backdrop-blur">
          <span className="flex items-center gap-0.5 rounded bg-emerald-600 px-1 py-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={9} className="fill-white text-white" />
            ))}
          </span>
          Rated 4.8
        </span>
      </div>

      <div
        key={active}
        className="relative flex animate-[fade-in_0.4s_ease] flex-col items-start gap-6 px-6 py-12 sm:px-10 sm:py-16 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-xl">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${slide.eyebrowColor}`}
          >
            {slide.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {slide.copy}
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:bg-zinc-200"
          >
            {slide.cta}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="relative hidden h-56 w-56 shrink-0 md:block lg:h-64 lg:w-64">
          <div className="absolute left-4 top-6 h-48 w-32 -rotate-6 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl ring-1 ring-white/10" />
          <div className="absolute left-16 top-0 h-52 w-36 rounded-xl bg-gradient-to-br from-accent/60 to-accent-2/60 shadow-2xl ring-1 ring-white/10" />
          <div className="absolute left-28 top-8 h-48 w-32 rotate-6 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl ring-1 ring-white/10" />
        </div>
      </div>

      <div className="relative flex justify-center gap-1.5 pb-5">
        {slides.map((_, i) =>
          i === active ? (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1} of ${slides.length}, playing`}
              onClick={() => goTo(i)}
              className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/20"
            >
              <span
                key={active}
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{
                  animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </button>
          ) : (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 w-1.5 rounded-full bg-zinc-600 transition-colors hover:bg-zinc-500"
            />
          )
        )}
      </div>
    </section>
  );
}
