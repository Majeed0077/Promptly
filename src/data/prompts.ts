import { PromptItem } from "@/components/PromptCard";

export const categories = [
  "All Prompts",
  "AI Writing",
  "Marketing",
  "Productivity",
  "Creative",
];

export const prompts: PromptItem[] = [
  {
    id: "prompt-1",
    title: "Blog Post Generator",
    description:
      "Create an SEO-friendly blog post outline with intro, headings, and CTA.",
    tags: ["AI Writing", "Content"],
    category: "AI Writing",
    promptText:
      "Write a blog post outline about [topic] with an engaging intro, 4 H2 sections, and a strong CTA.",
  },
  {
    id: "prompt-2",
    title: "Social Media Ad Copy",
    description:
      "Craft scroll-stopping ad copy for a product launch across platforms.",
    tags: ["Marketing", "Ads"],
    category: "Marketing",
    promptText:
      "Generate three social media ad variations for [product], highlighting benefits and urgency.",
  },
  {
    id: "prompt-3",
    title: "Productivity Tips",
    description:
      "Generate actionable tips to help teams stay focused and deliver faster.",
    tags: ["Productivity", "Tips"],
    category: "Productivity",
    promptText:
      "List 7 productivity tips for remote teams, each with a short explanation and quick win.",
  },
  {
    id: "prompt-4",
    title: "Email Subject Lines",
    description: "Write high-open-rate subject lines for a weekly newsletter.",
    tags: ["Marketing", "Email"],
    category: "Marketing",
    promptText:
      "Provide 12 email subject lines for a weekly newsletter about [topic], mixing curiosity and value.",
  },
  {
    id: "prompt-5",
    title: "Creative Story Idea",
    description:
      "Spin a unique story prompt with character, conflict, and twist.",
    tags: ["Creative", "Storytelling"],
    category: "Creative",
    promptText:
      "Give a creative story idea featuring a protagonist, setting, inciting incident, and twist ending.",
  },
  {
    id: "prompt-6",
    title: "Startup Pitch Outline",
    description:
      "Outline a punchy startup pitch deck narrative for investors.",
    tags: ["AI Writing", "Business"],
    category: "AI Writing",
    promptText:
      "Create a 10-slide pitch deck outline for [startup], including problem, solution, market, and traction.",
  },
];
