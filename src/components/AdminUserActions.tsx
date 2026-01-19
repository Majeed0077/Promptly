"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type AdminUserActionsProps = {
  name?: string;
};

export default function AdminUserActions({ name = "John Doe" }: AdminUserActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.push("/signin");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 shadow-[0_0_14px_rgba(120,160,255,0.18)]">
        <div className="h-7 w-7 rounded-full border border-white/10 bg-gradient-to-br from-white/30 to-white/10"></div>
        <span className="text-xs font-semibold text-white/80">{name}</span>
      </div>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.3)] transition hover:bg-rose-500/20 hover:shadow-[0_0_18px_rgba(244,63,94,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
