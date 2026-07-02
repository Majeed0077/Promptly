"use client";

import React from "react";

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
};

export default function Toggle({ checked, defaultChecked, onChange }: ToggleProps) {
  const inputProps =
    checked === undefined ? { defaultChecked } : { checked };

  return (
    <label className="relative inline-flex items-center">
      <input
        type="checkbox"
        {...inputProps}
        onChange={(event) => onChange?.(event.target.checked)}
        className="peer sr-only"
      />
      <span className="h-6 w-11 rounded-full border border-white/10 bg-white/10 transition peer-checked:border-[rgba(216,181,109,0.42)] peer-checked:bg-[var(--accent-soft)]"></span>
      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/60 transition peer-checked:translate-x-5 peer-checked:bg-[var(--accent-strong)]"></span>
    </label>
  );
}
