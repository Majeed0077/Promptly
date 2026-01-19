"use client";

import React from "react";
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

const summaryCards = [
  {
    label: "Total Prompts",
    value: "128",
    glow: "shadow-[0_0_30px_rgba(94,141,255,0.35)] border-t-2 border-t-[var(--glow-blue)]",
  },
  {
    label: "Categories",
    value: "12",
    glow: "shadow-[0_0_30px_rgba(161,106,255,0.35)] border-t-2 border-t-[var(--glow-purple)]",
  },
  {
    label: "Last Updated",
    value: "2 hours ago",
    glow: "shadow-[0_0_30px_rgba(112,255,204,0.3)] border-t-2 border-t-[var(--glow-green)]",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Dashboard"
        footerProfile={
          <Link
            href="/admin"
            className="block w-full rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur transition hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/30 to-white/10"></div>
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-white/60">Administrator</p>
              </div>
            </div>
          </Link>
        }
        footerAction={
          <Link
            href="/admin/prompts"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.55)] transition hover:brightness-110"
          >
            <span className="text-lg">+</span>
            New Prompt
          </Link>
        }
      />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <AdminUserActions />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--card-bg)] p-5 backdrop-blur-xl ${card.glow}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition hover:opacity-100" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
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
