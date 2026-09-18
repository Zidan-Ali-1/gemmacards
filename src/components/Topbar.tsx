"use client";

import { useState } from "react";
import { Menu, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useAuthModal } from "@/lib/AuthModalContext";
import { useCoinsModal } from "@/lib/CoinsModalContext";

export default function Topbar() {
  const { user, loading, logout } = useAuth();
  const { open } = useAuthModal();
  const { open: openCoins } = useCoinsModal();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <span className="flex h-7 items-center rounded-full bg-gradient-to-br from-accent to-accent-2 px-2.5 text-xs font-bold ring-2 ring-bg">
            {user ? user.coins.toLocaleString() : 0}
          </span>
          <button
            type="button"
            aria-label="Add coins"
            onClick={openCoins}
            className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white ring-2 ring-bg hover:bg-accent/90"
          >
            <Plus size={14} />
          </button>
        </div>

        {loading ? (
          <div className="h-9 w-9 animate-pulse rounded-full bg-panel-2" />
        ) : user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-border bg-panel shadow-xl">
                  <div className="border-b border-border px-3.5 py-3">
                    <p className="truncate text-sm font-semibold text-zinc-100">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm text-zinc-300 hover:bg-panel-2"
                  >
                    <LogOut size={15} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => open("signin")}
            className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:brightness-110"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
