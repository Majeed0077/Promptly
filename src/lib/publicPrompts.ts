import type { PromptItem } from "@/components/PromptCard";
import { curatedPrompts } from "@/data/marketplace";

export type ApiPrompt = Omit<PromptItem, "id"> & {
  id?: string;
  _id?: string;
};

export type PromptMeta = {
  workflow: string;
  tool: string;
  useCase: string;
};

export function mapApiPrompts(prompts: ApiPrompt[]) {
  return prompts.map((prompt) => ({
    ...prompt,
    id: String(prompt.id ?? prompt._id),
  })) as PromptItem[];
}

export function mergeWithCuratedPrompts(prompts: PromptItem[]) {
  return [
    ...prompts,
    ...curatedPrompts.filter(
      (curated) =>
        !prompts.some(
          (prompt) => prompt.title.toLowerCase() === curated.title.toLowerCase()
        )
    ),
  ];
}

export function getPromptMeta(prompt: PromptItem): PromptMeta {
  const value = `${prompt.category} ${prompt.title} ${prompt.tags.join(" ")}`.toLowerCase();

  if (value.includes("breakdown") || value.includes("job")) {
    return {
      workflow: "Job Breakdown",
      tool: "ChatGPT",
      useCase: "Freelancing",
    };
  }

  if (value.includes("upwork") || value.includes("proposal")) {
    return {
      workflow: "Proposal Writing",
      tool: "ChatGPT",
      useCase: "Freelancing",
    };
  }

  if (value.includes("design") || value.includes("audit")) {
    return {
      workflow: "Design Audit",
      tool: "Claude",
      useCase: "Design",
    };
  }

  if (value.includes("code") || value.includes("developer")) {
    return {
      workflow: "Code Review",
      tool: "Claude",
      useCase: "Engineering",
    };
  }

  if (value.includes("youtube") || value.includes("hook")) {
    return {
      workflow: "Content Creation",
      tool: "ChatGPT",
      useCase: "Creator Growth",
    };
  }

  if (value.includes("image") || value.includes("cinematic")) {
    return {
      workflow: "Content Creation",
      tool: "Midjourney",
      useCase: "Visual Creation",
    };
  }

  if (value.includes("social") || value.includes("calendar")) {
    return {
      workflow: "Planning",
      tool: "Canva",
      useCase: "Content Marketing",
    };
  }

  if (value.includes("business") || value.includes("strategy")) {
    return {
      workflow: "Strategy",
      tool: "Gemini",
      useCase: "Business Planning",
    };
  }

  return {
    workflow: "Content Creation",
    tool: "General AI",
    useCase: "Marketing",
  };
}

export function getPromptPopularity(prompt: PromptItem) {
  return (
    prompt.title.length * 17 +
    prompt.category.length * 23 +
    prompt.tags.join("").length * 11
  );
}
