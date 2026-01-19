"use client";

import React from "react";

type SettingsSectionProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function SettingsSection({
  title,
  description,
  actions,
  children,
}: SettingsSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(20,30,60,0.35)]">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-white/60">{description}</p>
        )}
      </div>

      <div className="mt-6 space-y-4">{children}</div>

      {actions && <div className="mt-6 flex justify-end">{actions}</div>}
    </section>
  );
}
