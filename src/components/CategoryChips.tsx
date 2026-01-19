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
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
            activeCategory === category
              ? "border-white/30 bg-white/20 text-white shadow-[0_0_12px_rgba(120,160,255,0.45)]"
              : "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
