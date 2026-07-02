type PromptVisualProps = {
  category?: string;
  title?: string;
  compact?: boolean;
  elevated?: boolean;
};

export default function PromptVisual({
  category = "Business",
  title = "Prompt",
  compact = false,
  elevated = false,
}: PromptVisualProps) {
  const visual = getVisualType(category, title);

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/10 ${compact ? "h-48" : "aspect-[1.22/1]"} ${elevated ? "shadow-[0_26px_80px_rgba(0,0,0,0.34)]" : ""}`}
      aria-label={`${category} prompt visual for ${title}`}
      role="img"
    >
      {visual === "upwork-proposal" && <UpworkProposalVisual />}
      {visual === "upwork-breakdown" && <JobBreakdownVisual />}
      {visual === "design-audit" && <DesignAuditVisual />}
      {visual === "code-review" && <CodeReviewVisual />}
      {visual === "youtube" && <YouTubeVisual />}
      {visual === "ai-image" && <AIImageVisual />}
      {visual === "business" && <BusinessStrategyVisual />}
      {visual === "social" && <SocialCalendarVisual />}
      {visual === "marketing" && <MarketingOfferVisual />}
      {visual === "default" && <BusinessStrategyVisual />}
    </div>
  );
}

function getVisualType(category: string, title: string) {
  const value = `${category} ${title}`.toLowerCase();
  if (value.includes("breakdown") || value.includes("job post")) {
    return "upwork-breakdown";
  }
  if (value.includes("upwork") || value.includes("proposal")) {
    return "upwork-proposal";
  }
  if (value.includes("design") || value.includes("audit")) return "design-audit";
  if (value.includes("code") || value.includes("developer")) return "code-review";
  if (value.includes("youtube") || value.includes("hook")) return "youtube";
  if (value.includes("image") || value.includes("cinematic")) return "ai-image";
  if (value.includes("social") || value.includes("calendar")) return "social";
  if (value.includes("marketing") || value.includes("offer")) return "marketing";
  if (value.includes("business") || value.includes("strategy")) return "business";
  return "default";
}

function UpworkProposalVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#213024_0%,#14120f_58%,#2b2416_100%)]">
      <SoftLight />
      <div className="absolute left-6 top-6 h-10 w-10 rounded-full border border-emerald-200/20 bg-emerald-300/18" />
      <div className="absolute left-6 top-24 w-[58%] rounded-2xl border border-white/12 bg-[#f7f3ea]/10 p-4 backdrop-blur">
        <div className="h-2 w-24 rounded-full bg-emerald-200/70" />
        <div className="mt-4 space-y-2">
          <Line width="w-full" />
          <Line width="w-4/5" muted />
          <Line width="w-3/5" muted />
        </div>
        <div className="mt-5 rounded-xl border border-[#d7b46a]/25 bg-[#d7b46a]/16 px-3 py-2 text-[10px] font-semibold text-[#f6d78a]">
          Client-first opening
        </div>
      </div>
      <div className="absolute bottom-6 right-6 w-[42%] rounded-2xl border border-white/10 bg-black/24 p-4 shadow-2xl">
        <div className="mb-3 flex gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="h-2 w-10 rounded-full bg-white/20" />
        </div>
        <Line width="w-5/6" />
        <Line width="w-2/3" muted />
      </div>
    </div>
  );
}

function JobBreakdownVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#221d16_0%,#14120f_55%,#303026_100%)]">
      <SoftLight />
      <div className="absolute left-5 top-5 bottom-5 w-[48%] rounded-2xl border border-white/10 bg-[#f7f3ea]/8 p-4">
        <div className="mb-4 h-3 w-28 rounded-full bg-[#d7b46a]/75" />
        <div className="space-y-3">
          <Line width="w-full" />
          <Line width="w-5/6" muted />
          <Line width="w-4/6" muted />
          <Line width="w-full" />
          <Line width="w-3/5" muted />
        </div>
      </div>
      <div className="absolute right-5 top-10 grid w-[38%] gap-3">
        {["Scope", "Budget", "Risk"].map((label, index) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/22 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d7b46a]">
              {label}
            </div>
            <div className={`mt-3 h-2 rounded-full ${index === 1 ? "w-3/4" : "w-full"} bg-white/22`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignAuditVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#2b211b_0%,#15120f_52%,#33231b_100%)]">
      <SoftLight />
      <div className="absolute left-5 top-6 h-[68%] w-[64%] rounded-2xl border border-white/10 bg-[#f7f3ea]/9 p-3">
        <div className="h-12 rounded-xl bg-[#d7b46a]/22" />
        <div className="mt-3 grid grid-cols-[1.4fr_0.8fr] gap-3">
          <div className="space-y-2 rounded-xl bg-black/18 p-3">
            <Line width="w-5/6" />
            <Line width="w-2/3" muted />
            <Line width="w-full" muted />
          </div>
          <div className="rounded-xl border border-[#f0b18a]/25 bg-[#f0b18a]/16" />
        </div>
      </div>
      <div className="absolute bottom-6 right-6 rounded-2xl border border-[#d7b46a]/30 bg-[#211912] px-4 py-3 text-xs font-semibold text-[#f1cc7b] shadow-2xl">
        UX audit notes
      </div>
      <div className="absolute right-10 top-10 h-20 w-20 rounded-full border border-white/10 bg-white/8" />
    </div>
  );
}

function CodeReviewVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#13242a_0%,#10100e_54%,#222a28_100%)]">
      <SoftLight />
      <div className="absolute left-5 right-5 top-6 rounded-2xl border border-white/10 bg-black/28 p-4 font-mono text-[10px] text-white/65">
        <div className="mb-4 flex gap-2">
          <span className="h-2 w-2 rounded-full bg-red-300/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/70" />
        </div>
        <div className="space-y-2">
          <CodeLine accent="text-[#8bc6d8]" text="function reviewRisk() {" />
          <CodeLine text="  check(edgeCases);" />
          <CodeLine text="  validate(tests);" />
          <CodeLine accent="text-[#d7b46a]" text="  return findings;" />
          <CodeLine text="}" />
        </div>
      </div>
      <div className="absolute bottom-6 right-6 rounded-2xl border border-[#8bc6d8]/25 bg-[#8bc6d8]/12 px-4 py-3 text-xs font-semibold text-[#bfe9f3]">
        12 review checks
      </div>
    </div>
  );
}

function YouTubeVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#351d1b_0%,#14110f_54%,#2c2017_100%)]">
      <SoftLight />
      <div className="absolute left-6 top-8 w-[66%] rounded-[24px] border border-white/10 bg-black/26 p-3">
        <div className="relative aspect-video rounded-2xl bg-[#ef7770]/18">
          <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-[#f7f3ea]/90">
            <div className="ml-[18px] mt-[13px] h-0 w-0 border-y-[11px] border-l-[16px] border-y-transparent border-l-[#351d1b]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#1a1713]/90 p-4">
        <div className="h-2 w-24 rounded-full bg-[#ef7770]" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-xl bg-white/8" />
          <div className="h-10 rounded-xl bg-white/12" />
          <div className="h-10 rounded-xl bg-[#d7b46a]/18" />
        </div>
      </div>
    </div>
  );
}

function AIImageVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#261f2f_0%,#13110f_52%,#302316_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_42%,rgba(215,180,106,0.26),transparent_22%),radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.14),transparent_18%)]" />
      <div className="absolute left-6 top-7 h-28 w-28 rounded-full border border-white/10 bg-[#d7b46a]/18 blur-[1px]" />
      <div className="absolute right-6 top-10 h-36 w-24 rounded-full border border-white/10 bg-white/8" />
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/24 p-4 backdrop-blur">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d7b46a]">
          cinematic prompt
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          <div className="h-12 rounded-xl bg-white/9" />
          <div className="h-12 rounded-xl bg-[#c7a6ff]/18" />
          <div className="h-12 rounded-xl bg-[#d7b46a]/18" />
          <div className="h-12 rounded-xl bg-white/12" />
        </div>
      </div>
    </div>
  );
}

function BusinessStrategyVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#242319_0%,#12110f_56%,#302918_100%)]">
      <SoftLight />
      <div className="absolute left-6 top-7 grid w-[58%] grid-cols-2 gap-3">
        {["Market", "Offer", "Channel", "Risk"].map((label, index) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7b46a]">
              {label}
            </div>
            <div className={`mt-4 h-2 rounded-full ${index === 2 ? "w-2/3" : "w-full"} bg-white/22`} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-7 right-7 h-28 w-28 rounded-full border border-[#d7b46a]/22 bg-[#d7b46a]/12">
        <div className="absolute bottom-6 left-6 h-12 w-12 rounded-full bg-[#8fc7a1]/24" />
      </div>
    </div>
  );
}

function SocialCalendarVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#17292a_0%,#12110f_55%,#2c2115_100%)]">
      <SoftLight />
      <div className="absolute inset-x-6 top-7 rounded-2xl border border-white/10 bg-[#f7f3ea]/8 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-2 w-24 rounded-full bg-[#88d6c7]/70" />
          <div className="h-7 w-7 rounded-full border border-white/10 bg-[#d7b46a]/20" />
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-md ${index % 5 === 0 ? "bg-[#d7b46a]/35" : index % 3 === 0 ? "bg-[#88d6c7]/24" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-xs font-semibold text-[#d7b46a]">
        7-day plan
      </div>
    </div>
  );
}

function MarketingOfferVisual() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#321f25_0%,#13110f_54%,#2d2314_100%)]">
      <SoftLight />
      <div className="absolute left-6 top-7 right-6 rounded-2xl border border-white/10 bg-white/8 p-4">
        <div className="h-8 w-32 rounded-full bg-[#e99aa6]/24" />
        <div className="mt-5 h-3 w-4/5 rounded-full bg-white/36" />
        <div className="mt-3 h-2 w-3/5 rounded-full bg-white/18" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
        <div className="h-16 rounded-2xl border border-white/10 bg-[#d7b46a]/18" />
        <div className="h-16 rounded-2xl border border-white/10 bg-white/8" />
        <div className="h-16 rounded-2xl border border-white/10 bg-[#e99aa6]/14" />
      </div>
    </div>
  );
}

function SoftLight() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(215,180,106,0.16),transparent_26%)]" />
  );
}

function Line({ width, muted = false }: { width: string; muted?: boolean }) {
  return (
    <div
      className={`h-2 rounded-full ${width} ${muted ? "bg-white/16" : "bg-white/38"}`}
    />
  );
}

function CodeLine({ text, accent = "text-white/55" }: { text: string; accent?: string }) {
  return <div className={accent}>{text}</div>;
}
