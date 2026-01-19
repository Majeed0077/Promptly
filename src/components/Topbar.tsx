"use client";

import React from "react";
import CategoryChips from "./CategoryChips";
import AuthActions from "./AuthActions";

type TopbarProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showChips?: boolean;
  rightSlot?: React.ReactNode;
};

export default function Topbar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  showChips = true,
  rightSlot,
}: TopbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
          <SearchIcon className="h-4 w-4 text-white/60" />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search prompts..."
            className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-start gap-3 lg:justify-end">
        {showChips && (
          <CategoryChips
            categories={categories}
            activeCategory={activeCategory}
            onChange={onCategoryChange}
          />
        )}
        {rightSlot ?? <AuthActions />}
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
