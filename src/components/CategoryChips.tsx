"use client";

import React from "react";

type CategoryChipsProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryChips({
  categories,
  activeCategory,
  onChange,
}: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            activeCategory === category
              ? "border-[rgba(216,181,109,0.45)] bg-[var(--accent-soft)] text-[var(--accent-strong)]"
              : "border-white/10 bg-white/[0.035] text-white/62 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
