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
      className={`rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/76 transition hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)] ${className}`}
    >
      {children}
    </select>
  );
}
