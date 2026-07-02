"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Library", href: "/collections" },
  { label: "Collections", href: "/collections" },
  { label: "Categories", href: "/collections#filters" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/#blog" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0a]/86 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="flex h-[82px] w-full items-center justify-between px-5 md:px-10 xl:px-16 2xl:px-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Promptiny"
            width={228}
            height={60}
            priority
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-[#b7afa4] transition hover:text-[#f7f3ea]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/collections"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[15px] font-medium text-[#d8d1c5] transition hover:border-white/18 hover:bg-white/[0.065] hover:text-white"
          >
            Search
          </a>
          <Link
            href="/signin"
            className="rounded-full px-4 py-2.5 text-[15px] font-medium text-[#b7afa4] transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/#submit"
            className="rounded-full border border-[rgba(215,180,106,0.55)] bg-[#d7b46a] px-5 py-2.5 text-[15px] font-semibold text-[#14100a] shadow-[0_14px_34px_rgba(215,180,106,0.16)] transition hover:bg-[#edc979]"
          >
            Submit Prompt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#d8d1c5] hover:bg-white/[0.04]"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/signin"
              className="rounded-xl px-3 py-2 text-sm font-medium text-[#d8d1c5] hover:bg-white/[0.04]"
            >
              Sign in
            </Link>
            <Link
              href="/#submit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#d7b46a] px-3 py-2 text-center text-sm font-semibold text-[#14100a]"
            >
              Submit Prompt
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
