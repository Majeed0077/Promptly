"use client";

import React from "react";

export type PromptItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  promptText: string;
};

type PromptCardProps = {
  prompt: PromptItem;
  glowClass: string;
  onCopy: (prompt: PromptItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (prompt: PromptItem) => void;
};

export default function PromptCard({
  prompt,
  glowClass,
  onCopy,
  isFavorite,
  onToggleFavorite,
}: PromptCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--card-bg)] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(10,14,30,0.6),0_0_24px_rgba(120,160,255,0.25)] ${glowClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{prompt.title}</h3>
            <p className="mt-1 text-sm text-white/70">{prompt.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={() => onToggleFavorite(prompt)}
            aria-pressed={isFavorite}
            className={`rounded-full border p-2 transition ${
              isFavorite
                ? "border-sky-400/40 bg-sky-500/20 text-sky-200 shadow-[0_0_12px_rgba(120,160,255,0.45)]"
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
            }`}
            aria-label="Save prompt"
          >
            <BookmarkIcon className="h-4 w-4" filled={isFavorite} />
          </button>
          <button
            onClick={() => onCopy(prompt)}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_16px_rgba(120,160,255,0.55)] transition hover:brightness-110 hover:shadow-[0_0_22px_rgba(120,160,255,0.8)]"
          >
            <CopyIcon className="h-4 w-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function BookmarkIcon({
  className,
  filled,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
