import { NextResponse } from "next/server";

const defaultSettings = {
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

export async function GET() {
  return NextResponse.json({ ok: true, settings: defaultSettings });
}

export async function POST(request: Request) {
  const settings = await request.json();
  return NextResponse.json({ ok: true, settings });
}
