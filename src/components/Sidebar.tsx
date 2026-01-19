"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  active?: boolean;
  href?: string;
};

type SidebarProps = {
  items?: NavItem[];
  activeItem?: string;
  footerAction?: React.ReactNode;
  footerProfile?: React.ReactNode;
};

const defaultNavItems = [
  { name: "Library", active: true, href: "/" },
  { name: "Favorites", active: false, href: "/favorites" },
  { name: "Settings", active: false, href: "/settings" },
];

export default function Sidebar({
  items = defaultNavItems,
  activeItem,
  footerAction,
  footerProfile,
}: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[260px] flex-col border-r border-white/10 bg-[rgba(10,12,20,0.88)] px-5 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-purple-500 shadow-[0_0_20px_rgba(88,130,255,0.6)]">
          <LogoBolt className="h-5 w-5 text-white" />
        </div>
        <span>Promptly</span>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-3 overflow-hidden">
        {items.map((item) => {
          const isActive = activeItem
            ? activeItem === item.name
            : item.href
              ? pathname === item.href || pathname.startsWith(`${item.href}/`)
              : item.active;
          const classes = `relative flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
            isActive
              ? "border-sky-400/30 bg-gradient-to-r from-sky-500/15 to-indigo-500/10 text-white shadow-[0_0_18px_rgba(96,165,250,0.35)]"
              : "border-white/5 bg-white/5 text-white/70 hover:border-white/15 hover:bg-white/10 hover:text-white"
          }`;

          const content = (
            <>
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
              )}
              <span
                className={`h-2.5 w-2.5 rounded-full border ${
                  isActive
                    ? "border-sky-300/60 bg-sky-400/70 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                    : "border-white/30 bg-white/10"
                }`}
              ></span>
              {item.name}
            </>
          );

          if (item.href) {
            return (
              <Link key={item.name} href={item.href} className={classes}>
                {content}
              </Link>
            );
          }

          return (
            <button key={item.name} className={classes}>
              {content}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        {footerProfile ?? (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/30 to-white/10"></div>
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-white/60">Pro Member</p>
              </div>
            </div>
          </div>
        )}
        {footerAction ?? (
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-500/80 to-purple-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.5)] transition hover:brightness-110">
            Upgrade
          </button>
        )}
      </div>
    </aside>
  );
}

function LogoBolt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
