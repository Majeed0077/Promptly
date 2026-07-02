"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type SessionState = {
  status: "loading" | "authenticated" | "unauthenticated";
  email?: string;
};

export default function AuthActions() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<SessionState>({
    status: "loading",
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadSession = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      try {
        const response = await fetch("/api/auth/session", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("unauthenticated");
        }
        const data = await response.json();
        if (!isMounted) return;
        setSession({ status: "authenticated", email: data.email });
      } catch {
        if (!isMounted) return;
        setSession({ status: "unauthenticated" });
      } finally {
        clearTimeout(timeoutId);
      }
    };
    loadSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.push("/signin");
      setIsLoggingOut(false);
    }
  };

  if (session.status === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
        Loading...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <Link
        href="/signin"
        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/72 transition hover:border-white/20 hover:text-white"
      >
        Sign in
      </Link>
    );
  }

  const initial = session.email?.[0]?.toUpperCase() ?? "A";
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] font-semibold text-white/80">
          {initial}
        </div>
        <span className="text-xs font-semibold text-white/80">Admin</span>
      </div>
      {isAdminPath ? (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/18 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <Link
          href="/admin"
          className="rounded-lg border border-[rgba(216,181,109,0.32)] bg-[var(--accent-soft)] px-3 py-2 text-xs font-semibold text-[var(--accent-strong)] transition hover:bg-[rgba(216,181,109,0.18)]"
        >
          Admin
        </Link>
      )}
    </div>
  );
}
