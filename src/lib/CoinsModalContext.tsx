"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type CoinsModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CoinsModalContext = createContext<CoinsModalContextValue | null>(null);

export function CoinsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <CoinsModalContext.Provider value={value}>{children}</CoinsModalContext.Provider>;
}

export function useCoinsModal() {
  const ctx = useContext(CoinsModalContext);
  if (!ctx) throw new Error("useCoinsModal must be used within CoinsModalProvider");
  return ctx;
}
