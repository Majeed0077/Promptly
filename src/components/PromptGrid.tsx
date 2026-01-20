"use client";

import React from "react";
import PromptCard, { PromptItem } from "./PromptCard";

type PromptGridProps = {
  prompts: PromptItem[];
  onCopy: (prompt: PromptItem) => void;
  favoriteIds: string[];
  onToggleFavorite: (prompt: PromptItem) => void;
  view?: "grid" | "list";
};

const glowVariants = [
  "border-t-2 border-t-[var(--glow-blue)] shadow-[0_0_30px_rgba(94,141,255,0.35)]",
  "border-t-2 border-t-[var(--glow-purple)] shadow-[0_0_30px_rgba(161,106,255,0.35)]",
  "border-t-2 border-t-[var(--glow-green)] shadow-[0_0_30px_rgba(112,255,204,0.3)]",
];

export default function PromptGrid({
  prompts,
  onCopy,
  favoriteIds,
  onToggleFavorite,
  view = "grid",
}: PromptGridProps) {
  const isList = view === "list";
  return (
    <div
      className={
        isList
          ? "grid grid-cols-1 gap-4"
          : "grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3"
      }
    >
      {prompts.map((prompt, index) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          glowClass={
            isList ? "border border-white/10 shadow-none" : glowVariants[index % glowVariants.length]
          }
          onCopy={onCopy}
          isFavorite={favoriteIds.includes(prompt.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
