"use client";

import { useCallback, useEffect, useState } from "react";
import { Sun, CalendarDays, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useAuthModal } from "@/lib/AuthModalContext";

type RewardStatus = { ready: boolean; min: number; max: number; nextResetAt: string };
type StatusResponse = { daily: RewardStatus; weekly: RewardStatus };
type RewardType = "daily" | "weekly";

function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days > 0 ? `${days}d ${time}` : time;
}

export default function RewardsSection() {
  const { user, updateUser } = useAuth();
  const { open: openAuth } = useAuthModal();
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [claiming, setClaiming] = useState<RewardType | null>(null);
  const [message, setMessage] = useState<{ type: RewardType; text: string; ok: boolean } | null>(
    null
  );

  const loadStatus = useCallback(() => {
    if (!user) {
      setStatus(null);
      return;
    }
    fetch("/api/rewards/status")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStatus(data);
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const claim = async (type: RewardType) => {
    if (!user) {
      openAuth("signin");
      return;
    }
    setClaiming(type);
    setMessage(null);
    const res = await fetch("/api/rewards/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    const data = await res.json();
    setClaiming(null);

    if (!res.ok) {
      setMessage({ type, text: data.error || "Something went wrong.", ok: false });
      return;
    }

    updateUser(data.user);
    setMessage({ type, text: `+${data.reward} coins claimed!`, ok: true });
    setStatus((prev) =>
      prev
        ? { ...prev, [type]: { ...prev[type], ready: false, nextResetAt: data.nextResetAt } }
        : prev
    );
  };

  const cards: {
    type: RewardType;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    buttonLabel: string;
  }[] = [
    {
      type: "daily",
      icon: <Sun size={18} />,
      title: "Daily",
      subtitle: "Resets every night",
      buttonLabel: "Claim daily",
    },
    {
      type: "weekly",
      icon: <CalendarDays size={18} />,
      title: "Weekly",
      subtitle: "Resets every Monday",
      buttonLabel: "Claim weekly",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const s = status?.[card.type];
          const ready = user ? (s?.ready ?? false) : false;
          const avg = s ? Math.round((s.min + s.max) / 2) : null;
          const cardMessage = message?.type === card.type ? message : null;

          return (
            <div
              key={card.type}
              className="rounded-2xl border border-border bg-panel p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-300">{card.icon}</span>
                  <div>
                    <p className="text-lg font-extrabold">{card.title}</p>
                    <p className="text-sm text-muted">{card.subtitle}</p>
                  </div>
                </div>
                {user && s && (
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-wide ${
                      ready
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-border bg-panel-2 text-muted"
                    }`}
                  >
                    {ready ? "READY" : "CLAIMED"}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                Any amount from{" "}
                <span className="font-bold text-white">
                  {s ? s.min : card.type === "daily" ? 10 : 50} to{" "}
                  {s ? s.max : card.type === "daily" ? 50 : 150} coins
                </span>
                , each one as likely as the next.{" "}
                {avg !== null && `That averages ${avg}.`}
              </p>

              <button
                type="button"
                disabled={claiming === card.type || (user !== null && !!s && !ready)}
                onClick={() => claim(card.type)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3 text-sm font-extrabold text-black hover:bg-white disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
              >
                {claiming === card.type && <Loader2 size={15} className="animate-spin" />}
                {!user ? "Sign in to claim" : card.buttonLabel}
              </button>

              <p
                className={`mt-3 text-center text-xs ${
                  cardMessage ? (cardMessage.ok ? "text-emerald-400" : "text-red-400") : "text-muted"
                }`}
              >
                {cardMessage
                  ? cardMessage.text
                  : user && s
                    ? `Expires in ${formatCountdown(new Date(s.nextResetAt).getTime() - now)}`
                    : "Sign in to see your countdown"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-panel p-5">
        <p className="text-sm leading-relaxed text-sky-300/80">
          One claim per account, per period. The daily resets at midnight Italian
          time, the weekly on Monday — the counters above are those resets, on your
          clock. Nothing carries over: a period you skip is simply gone. Rewards
          need a verified email, and coins are platform credit, not cash.
        </p>
      </div>
    </section>
  );
}
