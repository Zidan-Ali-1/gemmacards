"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  coins: number;
  createdAt: string;
};

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
    ageConfirmed: boolean
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateUser: (user: PublicUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function parseError(res: Response) {
  const body = await res.json().catch(() => null);
  return body?.error || "Something went wrong. Please try again.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      return { ok: false, error: await parseError(res) };
    }
    const data = await res.json();
    setUser(data.user);
    return { ok: true };
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      ageConfirmed: boolean
    ): Promise<AuthResult> => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, ageConfirmed }),
      });
      if (!res.ok) {
        return { ok: false, error: await parseError(res) };
      }
      const data = await res.json();
      setUser(data.user);
      return { ok: true };
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser: setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
