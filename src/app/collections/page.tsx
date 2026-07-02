"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import PromptGrid from "@/components/PromptGrid";
import { PromptItem } from "@/components/PromptCard";
import { marketplaceFilters } from "@/data/marketplace";
import {
  ApiPrompt,
  getPromptMeta,
  getPromptPopularity,
  mapApiPrompts,
  mergeWithCuratedPrompts,
} from "@/lib/publicPrompts";

const workflowOptions = [
  "All",
  "Proposal Writing",
  "Job Breakdown",
  "Content Creation",
  "Design Audit",
  "Code Review",
  "Strategy",
  "Planning",
];

const toolOptions = [
  "All",
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Canva",
  "General AI",
];

const useCaseOptions = [
  "All",
  "Freelancing",
  "Design",
  "Engineering",
  "Creator Growth",
  "Visual Creation",
  "Business Planning",
  "Content Marketing",
  "Marketing",
];

const sortOptions = ["Popular", "Newest", "Most copied", "A-Z"];

type FilterState = {
  category: string;
  workflow: string;
  tool: string;
  useCase: string;
  sort: string;
};

const defaultFilters: FilterState = {
  category: "All",
  workflow: "All",
  tool: "All",
  useCase: "All",
  sort: "Popular",
};

export default function CollectionsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get("category");
    if (category) {
      setFilters((current) => ({ ...current, category }));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const promptRes = await fetch("/api/prompts");
        if (!promptRes.ok) throw new Error("Failed");
        const promptData = await promptRes.json();
        if (!isMounted) return;
        const mapped = mapApiPrompts(promptData.prompts as ApiPrompt[]);
        setPrompts(mergeWithCuratedPrompts(mapped));
      } catch {
        if (isMounted) {
          setPrompts(mergeWithCuratedPrompts([]));
          setToast("Using curated sample prompts");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = prompts.filter((prompt) => {
      const meta = getPromptMeta(prompt);
      const searchable = [
        prompt.title,
        prompt.description,
        prompt.category,
        ...prompt.tags,
        meta.workflow,
        meta.tool,
        meta.useCase,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        filters.category === "All" ||
        prompt.category === filters.category ||
        prompt.tags.includes(filters.category);
      const matchesWorkflow =
        filters.workflow === "All" || meta.workflow === filters.workflow;
      const matchesTool = filters.tool === "All" || meta.tool === filters.tool;
      const matchesUseCase =
        filters.useCase === "All" || meta.useCase === filters.useCase;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesWorkflow &&
        matchesTool &&
        matchesUseCase
      );
    });

    return filtered.sort((a, b) => {
      if (filters.sort === "A-Z") return a.title.localeCompare(b.title);
      if (filters.sort === "Newest") return b.id.localeCompare(a.id);
      if (filters.sort === "Most copied") {
        return getPromptPopularity(b) + b.title.length - (getPromptPopularity(a) + a.title.length);
      }
      return getPromptPopularity(b) - getPromptPopularity(a);
    });
  }, [filters, prompts, query]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(defaultFilters);
  };

  const handleCopy = async (prompt: PromptItem) => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setToast("Prompt copied");
    } catch {
      setToast("Copy failed");
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0a] text-[#f7f3ea]">
      <PublicHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(215,180,106,0.14),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_46%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
              Collections
            </p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-[#f7f3ea] md:text-7xl">
                  Browse prompt collections.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8b0a3] md:text-lg">
                  Find ready-to-use prompts by workflow, category, and use case.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[#15130f]/94 p-2.5 shadow-[0_28px_100px_rgba(0,0,0,0.3)]">
                <label className="flex min-h-16 items-center gap-3 rounded-[20px] bg-white/[0.045] px-5 ring-1 ring-white/5">
                  <SearchIcon className="h-5 w-5 shrink-0 text-[#d7b46a]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search prompts, workflows, tools..."
                    className="w-full bg-transparent text-sm text-[#f7f3ea] outline-none placeholder:text-[#777067] md:text-base"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section
          id="filters"
          className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((value) => !value)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-[#f7f3ea]"
            >
              Filters
            </button>
            <span className="text-sm text-[#a9a39a]">
              {filteredPrompts.length} prompt
              {filteredPrompts.length === 1 ? "" : "s"}
            </span>
          </div>

          {mobileFiltersOpen && (
            <div className="mb-6 rounded-[24px] border border-white/10 bg-[#15130f] p-4 lg:hidden">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            <aside className="sticky top-[106px] hidden rounded-[26px] border border-white/10 bg-[#15130f] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] lg:block">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
                    Prompt Library
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#f7f3ea] md:text-5xl">
                    {filters.category === "All"
                      ? "All prompts"
                      : `${filters.category} prompts`}
                  </h2>
                </div>
                <p className="hidden text-sm text-[#a9a39a] lg:block">
                  {filteredPrompts.length} prompt
                  {filteredPrompts.length === 1 ? "" : "s"} found
                </p>
              </div>

              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-[420px] animate-pulse rounded-[26px] border border-white/10 bg-white/[0.04]"
                    />
                  ))}
                </div>
              ) : filteredPrompts.length ? (
                <PromptGrid prompts={filteredPrompts} onCopy={handleCopy} />
              ) : (
                <div className="rounded-[26px] border border-white/10 bg-[#15130f] p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#f7f3ea]">
                    No prompts found.
                  </h3>
                  <p className="mt-3 text-sm text-[#a9a39a]">
                    Try changing your filters or search term.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-full border border-[rgba(215,180,106,0.45)] bg-[#d7b46a] px-5 py-3 text-sm font-semibold text-[#14100a] transition hover:bg-[#edc979]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />

      {toast && (
        <div className="fixed bottom-6 right-5 z-50 rounded-full border border-white/10 bg-[#1a1713] px-5 py-3 text-sm font-semibold text-[#f7f3ea] shadow-2xl shadow-black/30">
          {toast}
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  filters,
  updateFilter,
  clearFilters,
}: {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: string) => void;
  clearFilters: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#f7f3ea]">
          Filters
        </h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-semibold text-[#d7b46a] hover:text-[#edc979]"
        >
          Clear
        </button>
      </div>
      <FilterGroup
        label="Category"
        value={filters.category}
        options={marketplaceFilters}
        onChange={(value) => updateFilter("category", value)}
      />
      <FilterGroup
        label="Workflow"
        value={filters.workflow}
        options={workflowOptions}
        onChange={(value) => updateFilter("workflow", value)}
      />
      <FilterGroup
        label="Tool"
        value={filters.tool}
        options={toolOptions}
        onChange={(value) => updateFilter("tool", value)}
      />
      <FilterGroup
        label="Use Case"
        value={filters.useCase}
        options={useCaseOptions}
        onChange={(value) => updateFilter("useCase", value)}
      />
      <FilterGroup
        label="Sort"
        value={filters.sort}
        options={sortOptions}
        onChange={(value) => updateFilter("sort", value)}
      />
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#777067]">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 lg:grid">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3 py-2 text-left text-xs font-semibold transition lg:w-full lg:rounded-xl lg:px-3.5 ${
                active
                  ? "border-[rgba(215,180,106,0.55)] bg-[#d7b46a] text-[#14100a]"
                  : "border-white/10 bg-white/[0.035] text-[#a9a39a] hover:border-white/18 hover:text-white"
              }`}
            >
              {option}
            </button>
          );
        })}
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
