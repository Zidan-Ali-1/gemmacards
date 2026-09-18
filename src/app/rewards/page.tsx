import type { Metadata } from "next";
import RewardsSection from "@/components/RewardsSection";

export const metadata: Metadata = {
  title: "Rewards — GemmaCards",
  description: "Claim free daily and weekly Gemma coins.",
};

export default function RewardsPage() {
  return (
    <div className="w-full max-w-7xl px-8 py-12 sm:px-12 lg:px-16">
      <span className="text-xs font-extrabold tracking-widest text-emerald-400">
        REWARDS
      </span>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Coins on the house, daily and weekly.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Two claims, two timers. The amount is drawn by our server the moment you
        tap — and every value in the range comes up as often as any other.
      </p>

      <div className="mt-10">
        <RewardsSection />
      </div>
    </div>
  );
}
