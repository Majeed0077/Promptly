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
      ? "border-emerald-300/24 bg-emerald-500/10 text-emerald-100"
      : "border-amber-300/24 bg-amber-500/10 text-amber-100";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
