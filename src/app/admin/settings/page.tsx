"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: false, href: "/admin/users" },
  { name: "Settings", active: true, href: "/admin/settings" },
];

export default function AdminSettingsPage() {
  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Settings"
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.55)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <span className="text-lg">+</span>
            New Prompt
          </Link>
        }
      />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <AdminUserActions />
          </div>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">General</h3>
              <p className="text-sm text-white/60">
                Configure the core appearance and defaults for your app.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">App Name</p>
                  <p className="text-xs text-white/50">Shown in navigation.</p>
                </div>
                <input
                  type="text"
                  defaultValue="Promptly"
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">App Logo</p>
                  <p className="text-xs text-white/50">Upload a brand mark.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-white/10 shadow-[0_0_12px_rgba(120,160,255,0.2)]"></div>
                  <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                    <input type="file" className="hidden" />
                    Upload
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Theme</p>
                  <p className="text-xs text-white/50">Initial UI mode.</p>
                </div>
                <select className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right">
                  <option>dark</option>
                  <option>light</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Language</p>
                  <p className="text-xs text-white/50">Locale for labels.</p>
                </div>
                <select className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right">
                  <option>en</option>
                  <option>ur</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Prompt Settings</h3>
              <p className="text-sm text-white/60">
                Control default prompt behavior and permissions.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Prompt Status</p>
                  <p className="text-xs text-white/50">Applied on creation.</p>
                </div>
                <select className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right">
                  <option>draft</option>
                  <option>published</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Allow Public Prompts</p>
                  <p className="text-xs text-white/50">Public visibility toggle.</p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Allow Copy</p>
                  <p className="text-xs text-white/50">Enable copy button.</p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Max Prompt Length</p>
                  <p className="text-xs text-white/50">Characters allowed.</p>
                </div>
                <input
                  type="number"
                  defaultValue={2000}
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Prompt Approval Required</p>
                  <p className="text-xs text-white/50">Manual review before publish.</p>
                </div>
                <Toggle />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Categories & Tags</h3>
              <p className="text-sm text-white/60">
                Choose how prompts are classified and organized.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Enable Categories</p>
                  <p className="text-xs text-white/50">Use category grouping.</p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Enable Tags</p>
                  <p className="text-xs text-white/50">Tag-based filtering.</p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Max Tags Per Prompt</p>
                  <p className="text-xs text-white/50">Limit tag count.</p>
                </div>
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Security</h3>
              <p className="text-sm text-white/60">
                Manage session controls and account protection.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Session Expiry</p>
                  <p className="text-xs text-white/50">Auto logout timing.</p>
                </div>
                <select className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right">
                  <option>24h</option>
                  <option>7d</option>
                  <option>30d</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Login Attempt Limit</p>
                  <p className="text-xs text-white/50">Lock after retries.</p>
                </div>
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <details className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-white/80">
                  Change Admin Password
                </summary>
                <div className="mt-4 space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                </div>
              </details>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Force Logout All Sessions</p>
                  <p className="text-xs text-white/50">Invalidate all active logins.</p>
                </div>
                <button className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.3)] transition hover:-translate-y-0.5 hover:bg-rose-500/20">
                  Force Logout
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:-translate-y-0.5 hover:brightness-110">
                Save changes
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Billing</h3>
              <p className="text-sm text-white/60">
                Review your plan and usage limits.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Current Plan</p>
                  <p className="text-xs text-white/50">Billing status.</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  Free
                </span>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Prompt Limit / Month</p>
                  <p className="text-xs text-white/50">Usage cap.</p>
                </div>
                <input
                  type="number"
                  defaultValue={500}
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Show Upgrade Button</p>
                  <p className="text-xs text-white/50">Display CTA in UI.</p>
                </div>
                <Toggle defaultChecked />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">System</h3>
              <p className="text-sm text-white/60">
                Administrative tools for system management.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Maintenance Mode</p>
                  <p className="text-xs text-white/50">Restrict user access.</p>
                </div>
                <Toggle />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Debug Mode</p>
                  <p className="text-xs text-white/50">Enable verbose logs.</p>
                </div>
                <Toggle />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Export Prompts</p>
                  <p className="text-xs text-white/50">Download all prompts.</p>
                </div>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                  Export
                </button>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Import Prompts</p>
                  <p className="text-xs text-white/50">Upload prompt CSV.</p>
                </div>
                <div className="flex w-full max-w-sm items-center gap-2 md:justify-end">
                  <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                    <input type="file" className="hidden" />
                    Choose file
                  </label>
                  <button className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_14px_rgba(120,160,255,0.45)] transition hover:-translate-y-0.5 hover:brightness-110">
                    Import
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:-translate-y-0.5 hover:brightness-110">
              Save All Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="h-6 w-11 rounded-full border border-white/10 bg-white/10 transition peer-checked:border-sky-400/40 peer-checked:bg-sky-500/30 peer-checked:shadow-[0_0_12px_rgba(96,165,250,0.45)]"></span>
      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/60 transition peer-checked:translate-x-5 peer-checked:bg-white peer-checked:shadow-[0_0_10px_rgba(96,165,250,0.6)]"></span>
    </label>
  );
}
