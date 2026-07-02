"use client";

import PromptVisual from "@/components/public/PromptVisual";

export type PromptItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  promptText: string;
  imageUrl?: string;
};

type PromptCardProps = {
  prompt: PromptItem;
  compact?: boolean;
  onCopy: (prompt: PromptItem) => void;
};

export default function PromptCard({
  prompt,
  compact = false,
  onCopy,
}: PromptCardProps) {
  return (
    <article
      className={`group flex h-full overflow-hidden rounded-[26px] border border-white/10 bg-[#15130f] shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(215,180,106,0.38)] hover:bg-[#181510] hover:shadow-[0_30px_90px_rgba(0,0,0,0.34)] ${compact ? "md:grid md:grid-cols-[280px_1fr]" : "flex-col"}`}
    >
      <div className="overflow-hidden p-3.5 pb-0 md:pb-0">
        <div className="transition duration-500 group-hover:scale-[1.025]">
          {prompt.imageUrl ? (
            <div
              className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-[#1a1713] ${compact ? "h-48" : "aspect-[1.22/1]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prompt.imageUrl}
                alt={`${prompt.title} thumbnail`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(11,11,10,0.3)_100%)]" />
            </div>
          ) : (
            <PromptVisual
              category={prompt.category}
              title={prompt.title}
              compact={compact}
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="mb-4 inline-flex w-fit rounded-full border border-[rgba(215,180,106,0.28)] bg-[rgba(215,180,106,0.1)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d7b46a]">
          {prompt.category}
        </div>
        <h3 className="text-[22px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#f7f3ea]">
          {prompt.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-[#a9a39a]">
          {prompt.description}
        </p>

        <div className="mt-auto pt-7">
          <button
            type="button"
            onClick={() => onCopy(prompt)}
            className="flex w-full items-center justify-center rounded-full border border-[rgba(215,180,106,0.52)] bg-[#d7b46a] px-4 py-3.5 text-sm font-semibold text-[#14100a] shadow-[0_14px_34px_rgba(215,180,106,0.12)] transition hover:bg-[#edc979]"
          >
            Copy Prompt
          </button>
        </div>
      </div>
    </article>
  );
}
