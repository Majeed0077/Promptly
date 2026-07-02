"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";

const adminNavItems = [
  { name: "Dashboard", active: true, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: false, href: "/admin/users" },
  { name: "Settings", active: false, href: "/admin/settings" },
];

type PromptSummary = {
  total: number;
  categories: number;
  lastUpdated: string;
};

type PromptRecord = {
  category?: unknown;
  updatedAt?: string | number | Date;
  createdAt?: string | number | Date;
};

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<PromptSummary>({
    total: 0,
    categories: 0,
    lastUpdated: "-",
  });

  useEffect(() => {
    let isMounted = true;
    const loadSummary = async () => {
      try {
        const response = await fetch("/api/prompts");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        if (!isMounted) return;
        const prompts = (data.prompts as PromptRecord[]) ?? [];
        const total = prompts.length;
        const categories = new Set(
          prompts.map((prompt) => String(prompt.category ?? "").trim())
        ).size;
        const lastUpdated = getLastUpdatedLabel(prompts);
        setSummary({ total, categories, lastUpdated });
      } catch {
        if (!isMounted) return;
        setSummary({ total: 0, categories: 0, lastUpdated: "-" });
      }
    };
    loadSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Prompts",
        value: String(summary.total),
        tone: "border-[rgba(216,181,109,0.24)]",
      },
      {
        label: "Categories",
        value: String(summary.categories),
        tone: "border-white/10",
      },
      {
        label: "Last Updated",
        value: summary.lastUpdated,
        tone: "border-white/10",
      },
    ],
    [summary]
  );

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Dashboard"
        footerProfile={
          <Link
            href="/admin"
            className="block w-full rounded-xl border border-white/10 bg-white/[0.045] p-3 transition hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold text-white/72">
                M
              </div>
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-white/55">promptiny.online</p>
              </div>
            </div>
          </Link>
        }
        footerAction={
          <Link
            href="/admin/prompts"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[rgba(216,181,109,0.38)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[rgba(216,181,109,0.18)]"
          >
            <span className="text-lg">+</span>
            New Prompt
          </Link>
        }
      />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.02em]">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-white/55">
                Keep your prompt library tidy and ready to use.
              </p>
            </div>
            <AdminUserActions />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`surface relative overflow-hidden rounded-xl p-5 ${card.tone}`}
              >
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/46">
                    {card.label}
                  </p>
                  <p className="text-2xl font-semibold text-white">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function getLastUpdatedLabel(prompts: PromptRecord[]) {
  if (!prompts.length) return "-";
  const timestamps = prompts
    .map((prompt) => new Date(prompt.updatedAt ?? prompt.createdAt ?? 0).getTime())
    .filter((value) => Number.isFinite(value));
  if (!timestamps.length) return "-";
  const latest = Math.max(...timestamps);
  const diffMs = Date.now() - latest;
  if (diffMs < 60_000) return "Just now";
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
