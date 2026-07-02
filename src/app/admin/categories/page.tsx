"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: true, href: "/admin/categories" },
  { name: "Users", active: false, href: "/admin/users" },
  { name: "Settings", active: false, href: "/admin/settings" },
];

export default function AdminCategoriesPage() {
  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Categories"
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
                Categories
              </h1>
              <p className="mt-1 text-sm text-white/55">
                Group prompts into clear, reusable workflows.
              </p>
            </div>
            <AdminUserActions />
          </div>

          <div className="surface rounded-xl p-6">
            <p className="text-sm text-white/62">
              Manage prompt categories here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
