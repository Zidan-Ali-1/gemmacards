"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useAuthModal } from "@/lib/AuthModalContext";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

export default function AuthModal() {
  const { isOpen, mode, close, setMode } = useAuthModal();
  const { login, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setAgeConfirmed(false);
      setError(null);
      setSubmitting(false);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setError(null);
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result =
      mode === "signin"
        ? await login(email, password)
        : await register(name, email, password, ageConfirmed);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-panel p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-zinc-500 hover:bg-panel-2 hover:text-zinc-200"
        >
          <X size={18} />
        </button>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2" />

        <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-panel-2 p-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              mode === "signin"
                ? "bg-gradient-to-r from-accent to-accent-2 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              mode === "signup"
                ? "bg-gradient-to-r from-accent to-accent-2 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Create account
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            setError("Google sign-in isn't configured for this preview yet.")
          }
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black hover:bg-zinc-200"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-muted">
          By continuing you confirm you are 18+ and accept the{" "}
          <a href="/terms" className="text-zinc-300 underline hover:text-white">
            Terms &amp; Conditions
          </a>{" "}
          and the{" "}
          <a href="/refund-policy" className="text-zinc-300 underline hover:text-white">
            Refund Policy
          </a>
          : packs are digital packs with randomized contents, non-refundable once
          opened; shipping fees are published and shown before payment.
        </p>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-bold tracking-widest text-muted">
            OR EMAIL
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (6+ characters)"
            className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
          />

          {mode === "signin" ? (
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-xs font-semibold text-accent-2 underline hover:text-accent">
                Forgot password?
              </a>
            </div>
          ) : (
            <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-bg accent-accent"
              />
              <span>
                I confirm I am <span className="font-bold text-zinc-200">18 or older</span> and
                I accept the{" "}
                <a href="/terms" className="text-accent-2 underline hover:text-accent">
                  Terms &amp; Conditions
                </a>{" "}
                and the{" "}
                <a href="/refund-policy" className="text-accent-2 underline hover:text-accent">
                  Refund Policy
                </a>
                . I understand that packs are{" "}
                <span className="font-bold text-zinc-200">
                  digital packs with randomized contents, non-refundable once opened
                </span>
                ; that physical cards are sourced on the market and shipped by
                gemma.cards at the{" "}
                <span className="font-bold text-zinc-200">
                  published shipping fees, shown before payment
                </span>
                ; and that the cost of shipping is not grounds for a refund.
              </span>
            </label>
          )}

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-xl bg-gradient-to-r from-accent to-accent-2 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60"
          >
            {submitting
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
