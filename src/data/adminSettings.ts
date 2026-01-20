export type AdminSettings = {
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

export const defaultSettings: AdminSettings = {
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
