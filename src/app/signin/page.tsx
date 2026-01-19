"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "Invalid email or password.");
        return;
      }

      if (remember) {
        localStorage.setItem("promptly_remember", "true");
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${inter.className} app-shell min-h-screen`}>
      <main className="flex min-h-screen items-center justify-center px-6 py-12 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(90,120,255,0.25)] backdrop-blur-xl">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-white/70">Access the admin panel</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            aria-busy={isLoading}
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full rounded-xl border bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${
                  error
                    ? "border-rose-400/60 shadow-[0_0_16px_rgba(244,63,94,0.35)]"
                    : "border-white/10"
                }`}
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full rounded-xl border bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${
                  error
                    ? "border-rose-400/60 shadow-[0_0_16px_rgba(244,63,94,0.35)]"
                    : "border-white/10"
                }`}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              {error && (
                <p className="text-xs text-rose-300" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-sky-400 focus:ring-2 focus:ring-sky-500/50"
                />
                Remember me
              </label>
              <Link
                href="/"
                className="text-xs font-semibold text-white/70 hover:text-white"
              >
                Back to Library
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading && <Spinner className="h-4 w-4" />}
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
