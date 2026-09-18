"use client";

import { Menu, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-bg/80 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-1.5 text-zinc-300 hover:bg-panel-2 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2" />
          <span className="text-lg font-extrabold tracking-tight">
            Gemma<span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Cards</span>
          </span>
        </a>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-full border border-border bg-panel px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-600 sm:flex"
        >
          <span>🇬🇧</span>
          EN
        </button>
        <div className="flex items-center">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold ring-2 ring-bg">
            0
          </span>
          <button
            type="button"
            aria-label="Add"
            className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white ring-2 ring-bg hover:bg-accent/90"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:brightness-110"
        >
          Sign in
        </button>
      </div>
    </header>
  );
}
