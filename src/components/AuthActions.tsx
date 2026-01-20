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
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/50">
        Loading...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <Link
        href="/signin"
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-[0_0_10px_rgba(120,160,255,0.25)] transition hover:border-white/30 hover:text-white"
      >
        Sign in
      </Link>
    );
  }

  const initial = session.email?.[0]?.toUpperCase() ?? "A";
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/30 to-white/10 text-[10px] font-semibold text-white/80">
          {initial}
        </div>
        <span className="text-xs font-semibold text-white/80">Admin</span>
      </div>
      {isAdminPath ? (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-100 shadow-[0_0_10px_rgba(244,63,94,0.25)] transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <Link
          href="/admin"
          className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-100 shadow-[0_0_10px_rgba(120,160,255,0.3)] transition hover:bg-sky-500/20"
        >
          Admin
        </Link>
      )}
    </div>
  );
}
