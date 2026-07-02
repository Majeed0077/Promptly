import type { PromptItem } from "@/components/PromptCard";

export const marketplaceFilters = [
  "All",
  "Upwork",
  "Design",
  "Coding",
  "Marketing",
  "YouTube",
  "Business",
  "AI Image",
  "Social Media",
];

export const heroChips = [
  "Upwork",
  "Design",
  "Coding",
  "YouTube",
  "Marketing",
  "AI Image",
  "Business",
];

export const featuredCollections = [
  {
    title: "Upwork Winning Proposals",
    category: "Upwork",
    description:
      "Polished proposal prompts for landing better freelance clients.",
    visual: "freelance",
  },
  {
    title: "AI Image Prompts",
    category: "AI Image",
    description:
      "Detailed visual prompts for product shots, ads, and editorial scenes.",
    visual: "image",
  },
  {
    title: "YouTube Growth Prompts",
    category: "YouTube",
    description:
      "Hooks, scripts, thumbnails, and content strategy prompts for creators.",
    visual: "creator",
  },
];

export const curatedPrompts: PromptItem[] = [
  {
    id: "curated-upwork-proposal",
    title: "Upwork Proposal Writer",
    description: "Write a concise client-first proposal with proof and a clear next step.",
    tags: ["Upwork", "Freelance"],
    category: "Upwork",
    promptText:
      "Write a tailored Upwork proposal for [job post]. Open with the client's real problem, show relevant proof, explain the first milestone, and end with one confident question.",
  },
  {
    id: "curated-upwork-jd-breakdown",
    title: "Upwork JD Breakdown",
    description: "Analyze a job post for scope, client intent, risks, and proposal angles.",
    tags: ["Upwork", "Research"],
    category: "Upwork",
    promptText:
      "Break down this Upwork job post: [paste job post]. Identify the real client goal, required skills, hidden risks, budget signals, likely decision criteria, and the best proposal angle.",
  },
  {
    id: "curated-design-audit",
    title: "Landing Page Design Audit",
    description: "Review hierarchy, trust, friction, and conversion opportunities.",
    tags: ["Design", "UX"],
    category: "Design",
    promptText:
      "Audit this landing page: [paste page copy or URL notes]. Review hierarchy, clarity, trust signals, visual rhythm, CTA strength, and conversion friction. Return prioritized fixes.",
  },
  {
    id: "curated-code-review",
    title: "Senior Code Review Checklist",
    description: "Find bugs, edge cases, refactor risks, and missing tests.",
    tags: ["Coding", "Review"],
    category: "Coding",
    promptText:
      "Review this code as a senior engineer. Prioritize correctness bugs, security issues, edge cases, performance risks, and missing tests. Keep style feedback secondary.",
  },
  {
    id: "curated-youtube-hooks",
    title: "YouTube Hook Generator",
    description: "Create retention-focused hooks for long-form videos.",
    tags: ["YouTube", "Creator"],
    category: "YouTube",
    promptText:
      "Generate 12 YouTube hooks for a video about [topic]. Use curiosity, specificity, stakes, and clear audience relevance. Avoid clickbait.",
  },
  {
    id: "curated-marketing-offer",
    title: "High-Converting Offer Page",
    description: "Turn a product idea into a sharp offer and page outline.",
    tags: ["Marketing", "Copy"],
    category: "Marketing",
    promptText:
      "Create a high-converting offer page outline for [product]. Include promise, audience, pain points, proof, offer stack, objections, FAQs, and CTAs.",
  },
  {
    id: "curated-image-editorial",
    title: "Editorial AI Image Scene",
    description: "Generate tasteful image prompts with camera and mood direction.",
    tags: ["AI Image", "Creative"],
    category: "AI Image",
    promptText:
      "Write a detailed AI image prompt for [subject]. Include scene, composition, lens, lighting, materials, mood, color palette, and negative constraints.",
  },
  {
    id: "curated-business-strategy",
    title: "Business Strategy Snapshot",
    description: "Clarify positioning, audience, channels, and next moves.",
    tags: ["Business", "Strategy"],
    category: "Business",
    promptText:
      "Create a strategy snapshot for [business]. Cover audience, positioning, offer, acquisition channels, risks, and the next 30 days of actions.",
  },
  {
    id: "curated-social-calendar",
    title: "Social Media Content Calendar",
    description: "Plan a week of useful posts without generic filler.",
    tags: ["Social Media", "Content"],
    category: "Social Media",
    promptText:
      "Create a 7-day social content calendar for [brand]. Mix education, proof, story, objection handling, and soft CTAs. Include post angles and captions.",
  },
];
