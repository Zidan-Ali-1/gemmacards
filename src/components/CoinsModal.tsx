"use client";

import { useEffect, useState } from "react";
import { X, Gem, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useCoinsModal } from "@/lib/CoinsModalContext";
import { useAuthModal } from "@/lib/AuthModalContext";

type CoinPackage = {
  coins: number;
  price: string;
  originalPrice?: string;
  badge?: string;
  highlight?: boolean;
  sub: string;
  note?: string;
  packsToRip: number;
};

const packages: CoinPackage[] = [
  {
    coins: 1000,
    price: "€4.99",
    originalPrice: "€9.99",
    badge: "-50%",
    sub: "2 packs · €10.00",
    note: "First purchase only",
    packsToRip: 2,
  },
  {
    coins: 1000,
    price: "€9.99",
    sub: "2 packs · €10.00",
    packsToRip: 2,
  },
  {
    coins: 3500,
    price: "€24.99",
    originalPrice: "€34.99",
    badge: "+40%",
    highlight: true,
    sub: "7 packs · €35.00",
    note: "First purchase only",
    packsToRip: 7,
  },
  {
    coins: 2500,
    price: "€24.99",
    badge: "POPULAR",
    sub: "5 packs · €25.00",
    packsToRip: 5,
  },
  {
    coins: 5250,
    price: "€49.99",
    badge: "BEST VALUE",
    highlight: true,
    sub: "10 packs · €52.50",
    note: "+5% coins per €",
    packsToRip: 10,
  },
  {
    coins: 11000,
    price: "€99.99",
    badge: "+10%",
    sub: "22 packs · €110.00",
    packsToRip: 22,
  },
  {
    coins: 23000,
    price: "€199.99",
    badge: "+15%",
    sub: "46 packs · €230.00",
    packsToRip: 46,
  },
  {
    coins: 60000,
    price: "€499.99",
    badge: "+20%",
    sub: "120 packs · €600.00",
    packsToRip: 120,
  },
];

export default function CoinsModal() {
  const { isOpen, close } = useCoinsModal();
  const { user } = useAuth();
  const { open: openAuth } = useAuthModal();
  const [selected, setSelected] = useState(2);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setSelected(2);
  }, [isOpen]);

  if (!isOpen) return null;

  const pkg = packages[selected];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-panel p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Add Gemma coins</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full p-1.5 text-zinc-500 hover:bg-panel-2 hover:text-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {packages.map((p, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                className={`relative overflow-hidden rounded-xl border bg-panel-2 p-4 text-left transition-colors ${
                  isSelected
                    ? "border-accent ring-2 ring-accent"
                    : p.highlight
                      ? "border-accent/60"
                      : "border-border hover:border-zinc-600"
                }`}
              >
                {p.badge && (
                  <span
                    className={`absolute left-0 top-0 rounded-br-lg px-2 py-1 text-[10px] font-extrabold tracking-wide ${
                      p.highlight
                        ? "bg-gradient-to-r from-accent to-accent-2 text-white"
                        : "bg-panel text-zinc-300"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="mt-5 flex items-center gap-1.5 text-lg font-extrabold">
                  <Gem size={16} className="text-accent-2" />
                  {p.coins.toLocaleString()}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm">
                  {p.originalPrice && (
                    <span className="text-muted line-through">{p.originalPrice}</span>
                  )}
                  <span className="font-bold text-zinc-100">{p.price}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{p.sub}</p>
                {p.note && (
                  <p className="mt-1 text-xs font-semibold text-accent-2">{p.note}</p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-border bg-bg">
            {user ? (
              <>
                <Loader2 size={28} className="animate-spin text-accent" />
                <p className="text-sm text-muted">Opening the secure payment form…</p>
              </>
            ) : (
              <>
                <p className="text-sm text-muted">Sign in to top up your balance.</p>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    openAuth("signin");
                  }}
                  className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-bold text-white hover:brightness-110"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-panel-2 p-5">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Coins</span>
                <span className="flex items-center gap-1 font-bold">
                  <Gem size={13} className="text-accent-2" />
                  {pkg.coins.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted">Packs to rip</span>
                <span className="font-bold">{pkg.packsToRip}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-extrabold">Total</span>
                <span className="text-lg font-extrabold">{pkg.price}</span>
              </div>
              <p className="text-xs text-muted">Credited instantly</p>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                <Lock size={12} />
                Payments handled by <span className="font-extrabold text-white">Stripe</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["VISA", "MC", "AMEX", "Pay", "GPay"].map((m) => (
                  <span
                    key={m}
                    className="rounded border border-border bg-bg px-2 py-1 text-[10px] font-bold text-zinc-400"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted">
                Your card details are entered on Stripe and never reach our servers.
                All traffic is encrypted (TLS).
              </p>
            </div>
          </div>
        </div>

        {!user && (
          <p className="mt-4 text-sm font-semibold text-red-400">Sign in first.</p>
        )}
      </div>
    </div>
  );
}
