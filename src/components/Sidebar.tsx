"use client";

import React from "react";
import Image from "next/image";
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
    <aside className="fixed left-0 top-0 hidden h-screen w-[260px] flex-col border-r border-white/10 bg-[rgba(16,16,14,0.9)] px-5 py-6 backdrop-blur-xl lg:flex">
      <Link href="/admin" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Promptiny"
          width={188}
          height={50}
          priority
          className="h-auto w-[188px] object-contain"
        />
      </Link>

      <nav className="mt-10 flex flex-1 flex-col gap-2 overflow-hidden">
        {items.map((item) => {
          const isActive = activeItem
            ? activeItem === item.name
            : item.href
              ? pathname === item.href || pathname.startsWith(`${item.href}/`)
              : item.active;
          const classes = `relative flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
            isActive
              ? "border-[rgba(216,181,109,0.28)] bg-[rgba(216,181,109,0.12)] text-white"
              : "border-transparent text-white/62 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
          }`;

          const content = (
            <>
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
              )}
              <span
                className={`h-2 w-2 rounded-full border ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]"
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
          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold text-white/70">
                M
              </div>
              <div>
                <p className="text-sm font-semibold">Majeed</p>
                <p className="text-xs text-white/55">Personal workspace</p>
              </div>
            </div>
          </div>
        )}
        {footerAction ?? (
          <button className="w-full rounded-lg border border-[rgba(216,181,109,0.38)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[rgba(216,181,109,0.18)]">
            Workspace settings
          </button>
        )}
      </div>
    </aside>
  );
}
