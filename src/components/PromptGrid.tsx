"use client";

import PromptCard, { PromptItem } from "./PromptCard";

type PromptGridProps = {
  prompts: PromptItem[];
  onCopy: (prompt: PromptItem) => void;
  view?: "grid" | "list";
};

export default function PromptGrid({
  prompts,
  onCopy,
  view = "grid",
}: PromptGridProps) {
  const isList = view === "list";
  return (
    <div
      className={
        isList
          ? "grid grid-cols-1 gap-4"
          : "grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7 xl:grid-cols-3"
      }
    >
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          compact={isList}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}
