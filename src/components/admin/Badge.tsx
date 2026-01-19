import { ReactNode } from "react";

export default function Badge({
  tone,
  children,
  className = "",
}: {
  tone: "success" | "warning";
  children: ReactNode;
  className?: string;
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
      : "border-amber-400/30 bg-amber-500/20 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.3)]";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
