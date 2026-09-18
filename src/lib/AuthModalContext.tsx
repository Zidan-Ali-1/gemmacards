"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AuthModalMode = "signin" | "signup";

type AuthModalContextValue = {
  isOpen: boolean;
  mode: AuthModalMode;
  open: (mode?: AuthModalMode) => void;
  close: () => void;
  setMode: (mode: AuthModalMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("signin");

  const value = useMemo(
    () => ({
      isOpen,
      mode,
      open: (nextMode: AuthModalMode = "signin") => {
        setMode(nextMode);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
      setMode,
    }),
    [isOpen, mode]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
