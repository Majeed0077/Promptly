"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import MarketplaceSections from "@/components/public/MarketplaceSections";
import { curatedPrompts } from "@/data/marketplace";
import { PromptItem } from "@/components/PromptCard";
import {
  ApiPrompt,
  mapApiPrompts,
  mergeWithCuratedPrompts,
} from "@/lib/publicPrompts";

export default function Home() {
  const [prompts, setPrompts] = useState<PromptItem[]>(curatedPrompts);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const promptRes = await fetch("/api/prompts");
        if (!promptRes.ok) return;
        const promptData = await promptRes.json();
        if (!isMounted) return;
        const mapped = mapApiPrompts(promptData.prompts as ApiPrompt[]);
        setPrompts(mergeWithCuratedPrompts(mapped));
      } catch {
        if (isMounted) setToast("Using curated sample prompts");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const highlightedPrompts = useMemo(() => {
    return prompts.slice(0, 6);
  }, [prompts]);

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
        <MarketplaceSections
          highlightedPrompts={highlightedPrompts}
          isLoading={isLoading}
          onCopy={handleCopy}
        />
      </main>

      {toast && (
        <div className="fixed bottom-6 right-5 z-50 rounded-full border border-white/10 bg-[#1a1713] px-5 py-3 text-sm font-semibold text-[#f7f3ea] shadow-2xl shadow-black/30">
          {toast}
        </div>
      )}
    </div>
  );
}
