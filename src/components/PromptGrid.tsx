"use client";

import React from "react";
import PromptCard, { PromptItem } from "./PromptCard";

type PromptGridProps = {
  prompts: PromptItem[];
  onCopy: (prompt: PromptItem) => void;
};

const glowVariants = [
  "border-t-2 border-t-[var(--glow-blue)] shadow-[0_0_30px_rgba(94,141,255,0.35)]",
  "border-t-2 border-t-[var(--glow-purple)] shadow-[0_0_30px_rgba(161,106,255,0.35)]",
  "border-t-2 border-t-[var(--glow-green)] shadow-[0_0_30px_rgba(112,255,204,0.3)]",
];

export default function PromptGrid({ prompts, onCopy }: PromptGridProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
      {prompts.map((prompt, index) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          glowClass={glowVariants[index % glowVariants.length]}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}
