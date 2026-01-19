"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";
import SettingsSection from "@/components/admin/SettingsSection";
import Toggle from "@/components/admin/Toggle";
import Toast from "@/components/ui/Toast";

type AdminSettings = {
  general: {
    appName: string;
    defaultTheme: "dark" | "light";
    defaultLanguage: "en" | "ur";
  };
  prompts: {
    defaultStatus: "draft" | "published";
    allowPublic: boolean;
    allowCopy: boolean;
    maxLength: number;
    approvalRequired: boolean;
  };
  taxonomy: {
    enableCategories: boolean;
    enableTags: boolean;
    maxTagsPerPrompt: number;
  };
  security: {
    sessionExpiry: "24h" | "7d" | "30d";
    loginAttemptLimit: number;
    forceLogoutAll: boolean;
    password: {
      current: string;
      next: string;
      confirm: string;
    };
  };
  billing: {
    currentPlan: "Free" | "Pro" | "Enterprise";
    promptLimit: number;
    showUpgradeButton: boolean;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
  };
};

const defaultSettings: AdminSettings = {
  general: {
    appName: "Promptly",
    defaultTheme: "dark",
    defaultLanguage: "en",
  },
  prompts: {
    defaultStatus: "draft",
    allowPublic: true,
    allowCopy: true,
    maxLength: 2000,
    approvalRequired: false,
  },
  taxonomy: {
    enableCategories: true,
    enableTags: true,
    maxTagsPerPrompt: 5,
  },
  security: {
    sessionExpiry: "24h",
    loginAttemptLimit: 5,
    forceLogoutAll: false,
    password: {
      current: "",
      next: "",
      confirm: "",
    },
  },
  billing: {
    currentPlan: "Free",
    promptLimit: 500,
    showUpgradeButton: true,
  },
  system: {
    maintenanceMode: false,
    debugMode: false,
  },
};

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: false, href: "/admin/users" },
  { name: "Settings", active: true, href: "/admin/settings" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [savedSettings, setSavedSettings] =
    useState<AdminSettings>(defaultSettings);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [settings, savedSettings]
  );

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        if (!isMounted) return;
        setSettings(data.settings as AdminSettings);
        setSavedSettings(data.settings as AdminSettings);
      } catch {
        if (!isMounted) return;
        setToast({ message: "Failed to load settings", variant: "error" });
      }
    };
    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setSavedSettings(data.settings as AdminSettings);
      setToast({ message: "Settings saved", variant: "success" });
    } catch {
      setToast({ message: "Failed to save", variant: "error" });
    }
  };

  const updateNested = <
    K extends keyof AdminSettings,
    F extends keyof AdminSettings[K],
  >(
    key: K,
    field: F,
    value: AdminSettings[K][F]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const updatePasswordField = (
    field: keyof AdminSettings["security"]["password"],
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        password: {
          ...prev.security.password,
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Settings"
        footerProfile={
          <Link
            href="/admin"
            className="block w-full rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur transition hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/30 to-white/10"></div>
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-white/60">Administrator</p>
              </div>
            </div>
          </Link>
        }
        footerAction={
          <Link
            href="/admin/prompts"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.55)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <span className="text-lg">+</span>
            New Prompt
          </Link>
        }
      />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Settings</h1>
              {hasUnsavedChanges && (
                <span className="text-xs text-amber-200/80">
                  Unsaved changes
                </span>
              )}
            </div>
            <AdminUserActions />
          </div>

          <SettingsSection
            title="General"
            description="Configure the core appearance and defaults for your app."
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">App Name</p>
                  <p className="text-xs text-white/50">Shown in navigation.</p>
                </div>
                <input
                  type="text"
                  value={settings.general.appName}
                  onChange={(event) =>
                    updateNested("general", "appName", event.target.value)
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">App Logo</p>
                  <p className="text-xs text-white/50">Upload a brand mark.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-white/10 shadow-[0_0_12px_rgba(120,160,255,0.2)]"></div>
                  <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                    <input type="file" className="hidden" />
                    Upload
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Theme</p>
                  <p className="text-xs text-white/50">Initial UI mode.</p>
                </div>
                <select
                  value={settings.general.defaultTheme}
                  onChange={(event) =>
                    updateNested(
                      "general",
                      "defaultTheme",
                      event.target.value as AdminSettings["general"]["defaultTheme"]
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                >
                  <option>dark</option>
                  <option>light</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Language</p>
                  <p className="text-xs text-white/50">Locale for labels.</p>
                </div>
                <select
                  value={settings.general.defaultLanguage}
                  onChange={(event) =>
                    updateNested(
                      "general",
                      "defaultLanguage",
                      event.target.value as AdminSettings["general"]["defaultLanguage"]
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                >
                  <option>en</option>
                  <option>ur</option>
                </select>
              </div>
          </SettingsSection>

          <SettingsSection
            title="Prompt Settings"
            description="Control default prompt behavior and permissions."
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Default Prompt Status</p>
                  <p className="text-xs text-white/50">Applied on creation.</p>
                </div>
                <select
                  value={settings.prompts.defaultStatus}
                  onChange={(event) =>
                    updateNested(
                      "prompts",
                      "defaultStatus",
                      event.target.value as AdminSettings["prompts"]["defaultStatus"]
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                >
                  <option>draft</option>
                  <option>published</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Allow Public Prompts</p>
                  <p className="text-xs text-white/50">Public visibility toggle.</p>
                </div>
                <Toggle
                  checked={settings.prompts.allowPublic}
                  onChange={(value) => updateNested("prompts", "allowPublic", value)}
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Allow Copy</p>
                  <p className="text-xs text-white/50">Enable copy button.</p>
                </div>
                <Toggle
                  checked={settings.prompts.allowCopy}
                  onChange={(value) => updateNested("prompts", "allowCopy", value)}
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Max Prompt Length</p>
                  <p className="text-xs text-white/50">Characters allowed.</p>
                </div>
                <input
                  type="number"
                  value={settings.prompts.maxLength}
                  onChange={(event) =>
                    updateNested(
                      "prompts",
                      "maxLength",
                      Number(event.target.value)
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Prompt Approval Required</p>
                  <p className="text-xs text-white/50">Manual review before publish.</p>
                </div>
                <Toggle
                  checked={settings.prompts.approvalRequired}
                  onChange={(value) =>
                    updateNested("prompts", "approvalRequired", value)
                  }
                />
              </div>
          </SettingsSection>

          <SettingsSection
            title="Categories & Tags"
            description="Choose how prompts are classified and organized."
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Enable Categories</p>
                  <p className="text-xs text-white/50">Use category grouping.</p>
                </div>
                <Toggle
                  checked={settings.taxonomy.enableCategories}
                  onChange={(value) =>
                    updateNested("taxonomy", "enableCategories", value)
                  }
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Enable Tags</p>
                  <p className="text-xs text-white/50">Tag-based filtering.</p>
                </div>
                <Toggle
                  checked={settings.taxonomy.enableTags}
                  onChange={(value) => updateNested("taxonomy", "enableTags", value)}
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Max Tags Per Prompt</p>
                  <p className="text-xs text-white/50">Limit tag count.</p>
                </div>
                <input
                  type="number"
                  value={settings.taxonomy.maxTagsPerPrompt}
                  onChange={(event) =>
                    updateNested(
                      "taxonomy",
                      "maxTagsPerPrompt",
                      Number(event.target.value)
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>
          </SettingsSection>

          <SettingsSection
            title="Security"
            description="Manage session controls and account protection."
            actions={
              <button className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:-translate-y-0.5 hover:brightness-110">
                Save changes
              </button>
            }
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Session Expiry</p>
                  <p className="text-xs text-white/50">Auto logout timing.</p>
                </div>
                <select
                  value={settings.security.sessionExpiry}
                  onChange={(event) =>
                    updateNested(
                      "security",
                      "sessionExpiry",
                      event.target.value as AdminSettings["security"]["sessionExpiry"]
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                >
                  <option>24h</option>
                  <option>7d</option>
                  <option>30d</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Login Attempt Limit</p>
                  <p className="text-xs text-white/50">Lock after retries.</p>
                </div>
                <input
                  type="number"
                  value={settings.security.loginAttemptLimit}
                  onChange={(event) =>
                    updateNested(
                      "security",
                      "loginAttemptLimit",
                      Number(event.target.value)
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <details className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-white/80">
                  Change Admin Password
                </summary>
                <div className="mt-4 space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={settings.security.password.current}
                    onChange={(event) =>
                      updatePasswordField("current", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={settings.security.password.next}
                    onChange={(event) =>
                      updatePasswordField("next", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={settings.security.password.confirm}
                    onChange={(event) =>
                      updatePasswordField("confirm", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)]"
                  />
                </div>
              </details>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Force Logout All Sessions</p>
                  <p className="text-xs text-white/50">Invalidate all active logins.</p>
                </div>
                <button className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.3)] transition hover:-translate-y-0.5 hover:bg-rose-500/20">
                  Force Logout
                </button>
              </div>
          </SettingsSection>

          <SettingsSection
            title="Billing"
            description="Review your plan and usage limits."
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Current Plan</p>
                  <p className="text-xs text-white/50">Billing status.</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  Free
                </span>
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Prompt Limit / Month</p>
                  <p className="text-xs text-white/50">Usage cap.</p>
                </div>
                <input
                  type="number"
                  value={settings.billing.promptLimit}
                  onChange={(event) =>
                    updateNested(
                      "billing",
                      "promptLimit",
                      Number(event.target.value)
                    )
                  }
                  className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_0_16px_rgba(96,165,250,0.25)] md:text-right"
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Show Upgrade Button</p>
                  <p className="text-xs text-white/50">Display CTA in UI.</p>
                </div>
                <Toggle
                  checked={settings.billing.showUpgradeButton}
                  onChange={(value) =>
                    updateNested("billing", "showUpgradeButton", value)
                  }
                />
              </div>
          </SettingsSection>

          <SettingsSection
            title="System"
            description="Administrative tools for system management."
          >
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Maintenance Mode</p>
                  <p className="text-xs text-white/50">Restrict user access.</p>
                </div>
                <Toggle
                  checked={settings.system.maintenanceMode}
                  onChange={(value) =>
                    updateNested("system", "maintenanceMode", value)
                  }
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Debug Mode</p>
                  <p className="text-xs text-white/50">Enable verbose logs.</p>
                </div>
                <Toggle
                  checked={settings.system.debugMode}
                  onChange={(value) => updateNested("system", "debugMode", value)}
                />
              </div>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Export Prompts</p>
                  <p className="text-xs text-white/50">Download all prompts.</p>
                </div>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                  Export
                </button>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">Import Prompts</p>
                  <p className="text-xs text-white/50">Upload prompt CSV.</p>
                </div>
                <div className="flex w-full max-w-sm items-center gap-2 md:justify-end">
                  <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30">
                    <input type="file" className="hidden" />
                    Choose file
                  </label>
                  <button className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_14px_rgba(120,160,255,0.45)] transition hover:-translate-y-0.5 hover:brightness-110">
                    Import
                  </button>
                </div>
              </div>
          </SettingsSection>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
