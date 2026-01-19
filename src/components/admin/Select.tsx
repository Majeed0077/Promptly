import { ReactNode } from "react";

export default function Select({
  value,
  onChange,
  children,
  className = "",
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className={`rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${className}`}
    >
      {children}
    </select>
  );
}
