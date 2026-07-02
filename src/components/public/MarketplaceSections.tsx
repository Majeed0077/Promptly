"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredCollections, heroChips } from "@/data/marketplace";
import PromptGrid from "@/components/PromptGrid";
import { PromptItem } from "@/components/PromptCard";
import PromptVisual from "./PromptVisual";
import PublicFooter from "./PublicFooter";

type MarketplaceSectionsProps = {
  highlightedPrompts: PromptItem[];
  isLoading: boolean;
  onCopy: (prompt: PromptItem) => void;
};

export default function MarketplaceSections({
  highlightedPrompts,
  isLoading,
  onCopy,
}: MarketplaceSectionsProps) {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <HighlightedPrompts
        prompts={highlightedPrompts}
        isLoading={isLoading}
        onCopy={onCopy}
      />
      <HowItWorks />
      <CTASection />
      <PublicFooter />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(215,180,106,0.18),transparent_30rem),radial-gradient(circle_at_86%_22%,rgba(215,180,106,0.1),transparent_25rem),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d7b46a]/35 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-18 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-[rgba(215,180,106,0.3)] bg-[rgba(215,180,106,0.11)] px-4 py-2 text-sm font-semibold text-[#d7b46a] shadow-[0_14px_46px_rgba(215,180,106,0.08)]">
            Prompt Library
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-[#f7f3ea] md:text-7xl xl:text-[86px]">
            Find proven prompts for real workflows.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#b8b0a3] md:text-lg">
            Copy ready-to-use prompts for freelancing, design, coding, content,
            business, and AI tools.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d7b46a] px-7 text-sm font-semibold text-[#14100a] shadow-[0_18px_42px_rgba(215,180,106,0.16)] transition hover:bg-[#edc979]"
            >
              Explore Collections
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-[#f7f3ea] transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              View all prompts
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {heroChips.map((chip) => (
              <Link
                key={chip}
                href={`/collections?category=${encodeURIComponent(chip)}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-[#d8d1c5] transition hover:border-[rgba(215,180,106,0.34)] hover:bg-white/[0.06] hover:text-[#f7f3ea]"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative min-h-[560px] lg:min-h-[620px]">
      <div className="absolute inset-8 rounded-full bg-[#d7b46a]/10 blur-3xl" />
      <div className="absolute right-2 top-6 w-[84%] rounded-[34px] border border-white/10 bg-[#1a1713] p-4 shadow-[0_36px_120px_rgba(0,0,0,0.45)]">
        <div className="rounded-[26px] border border-white/10 bg-[#0f0e0c] p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d7b46a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/24" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-[#a9a39a]">
              Curated
            </span>
          </div>
          <PromptVisual
            category="AI Image"
            title="Editorial AI Image Scene"
            compact
            elevated
          />
        </div>
        <div className="grid gap-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d7b46a]">
            Featured Prompt
          </p>
          <h3 className="max-w-sm text-2xl font-semibold tracking-[-0.045em] text-[#f7f3ea]">
            Cinematic image prompts with visual direction built in.
          </h3>
          <div className="flex gap-2">
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#a9a39a]">
              Lighting
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#a9a39a]">
              Composition
            </span>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-36 w-[58%] -rotate-5 rounded-[28px] border border-white/10 bg-[#15130f] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
        <div className="rounded-2xl border border-white/10 bg-[#0b0b0a] p-4">
          <p className="text-xs font-semibold text-[#d7b46a]">
            Upwork Proposal
          </p>
          <div className="mt-4 space-y-2">
            <div className="h-2.5 w-5/6 rounded-full bg-white/34" />
            <div className="h-2.5 w-2/3 rounded-full bg-white/16" />
            <div className="h-2.5 w-3/4 rounded-full bg-white/16" />
          </div>
          <div className="mt-5 rounded-full bg-[#d7b46a] px-4 py-2 text-center text-xs font-bold text-[#14100a]">
            Copy Prompt
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-12 w-[72%] rounded-[28px] border border-[rgba(215,180,106,0.24)] bg-[#211d17] p-5 shadow-[0_34px_110px_rgba(0,0,0,0.42)]">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d7b46a]">
              Prompt stack
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#f7f3ea]">
              1,200+ workflows
            </h3>
            <p className="mt-1 text-sm text-[#a9a39a]">
              Search, filter, copy, ship.
            </p>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[rgba(215,180,106,0.36)] bg-[#15130f] shadow-[0_16px_42px_rgba(0,0,0,0.28)]">
            <Image
              src="/icon.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="border-b border-white/10 bg-[#0b0b0a]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
              Featured Collections
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] md:text-6xl">
              Start from a workflow, not a blank page.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[#a9a39a]">
            Curated prompt packs for the work people repeat every week.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredCollections.map((collection, index) => (
            <Link
              key={collection.title}
              href={`/collections?category=${encodeURIComponent(collection.category)}`}
              className={`group overflow-hidden rounded-[30px] border border-white/10 bg-[#15130f] p-3 text-left shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition hover:-translate-y-1.5 hover:border-[rgba(215,180,106,0.34)] hover:bg-[#181510] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`grid gap-4 md:items-stretch ${
                  index === 0 ? "md:grid-cols-[1.16fr_0.84fr]" : ""
                }`}
              >
                <PromptVisual
                  category={collection.category}
                  title={collection.title}
                  compact
                  elevated
                />
                <div className="flex flex-col p-4 md:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
                    {collection.category}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#f7f3ea]">
                    {collection.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#a9a39a]">
                    {collection.description}
                  </p>
                  <span className="mt-auto pt-8 text-sm font-semibold text-[#d7b46a]">
                    View collection -&gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightedPrompts({
  prompts,
  isLoading,
  onCopy,
}: {
  prompts: PromptItem[];
  isLoading: boolean;
  onCopy: (prompt: PromptItem) => void;
}) {
  return (
    <section id="popular" className="border-y border-white/10 bg-[#0f0e0c]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
              Popular Prompts
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] md:text-6xl">
              A few proven prompts to start with.
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex w-fit rounded-full border border-[rgba(215,180,106,0.45)] bg-[#d7b46a] px-5 py-3 text-sm font-semibold text-[#14100a] transition hover:bg-[#edc979]"
          >
            View all prompts
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[26px] border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : (
          <PromptGrid prompts={prompts.slice(0, 6)} onCopy={onCopy} />
        )}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["01", "Pick a workflow", "Choose a category built around a real task."],
    ["02", "Copy the prompt", "Grab a polished prompt with one click."],
    [
      "03",
      "Paste and refine",
      "Use it in ChatGPT, Gemini, Claude, or your tool of choice.",
    ],
  ];

  return (
    <section className="border-y border-white/10 bg-[#0f0e0c]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold text-[#d7b46a]">How It Works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#f7f3ea] md:text-5xl">
            Useful prompts, without the prompt engineering ceremony.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-[22px] border border-white/10 bg-[#15130f] p-6"
            >
              <span className="text-sm font-semibold text-[#d7b46a]">
                {number}
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-[#f7f3ea]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#a9a39a]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div
        id="submit"
        className="relative overflow-hidden rounded-[32px] border border-[rgba(215,180,106,0.24)] bg-[#1a1713] p-8 shadow-2xl shadow-black/30 md:p-14"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(215,180,106,0.18),transparent_22rem)]" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold text-[#d7b46a]">Prompt vault</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] md:text-6xl">
            Build your personal prompt vault.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#b8b0a3]">
            Save, organize, and reuse your best prompts anytime.
          </p>
          <Link
            href="/signin"
            className="mt-8 inline-flex rounded-full bg-[#d7b46a] px-6 py-3 text-sm font-semibold text-[#14100a] transition hover:bg-[#edc979]"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}
