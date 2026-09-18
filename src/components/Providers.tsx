"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { AuthModalProvider } from "@/lib/AuthModalContext";
import { CoinsModalProvider } from "@/lib/CoinsModalContext";
import AuthModal from "@/components/AuthModal";
import CoinsModal from "@/components/CoinsModal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <CoinsModalProvider>
          {children}
          <AuthModal />
          <CoinsModal />
        </CoinsModalProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
