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
      <span className="h-6 w-11 rounded-full border border-white/10 bg-white/10 transition peer-checked:border-sky-400/40 peer-checked:bg-sky-500/30 peer-checked:shadow-[0_0_12px_rgba(96,165,250,0.45)]"></span>
      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/60 transition peer-checked:translate-x-5 peer-checked:bg-white peer-checked:shadow-[0_0_10px_rgba(96,165,250,0.6)]"></span>
    </label>
  );
}
