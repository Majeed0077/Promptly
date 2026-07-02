"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type AdminUserActionsProps = {
  name?: string;
};

export default function AdminUserActions({ name = "Majeed" }: AdminUserActionsProps) {
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
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] font-semibold text-white/72">
          M
        </div>
        <span className="text-xs font-semibold text-white/80">{name}</span>
      </div>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/18 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
