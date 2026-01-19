import Sidebar from "@/components/Sidebar";
import AuthActions from "@/components/AuthActions";

export default function SettingsPage() {
  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar activeItem="Settings" />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-sm text-white/60">Personalize your workspace.</p>
            </div>
            <AuthActions />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(20,30,60,0.35)] backdrop-blur">
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="mt-2 text-sm text-white/60">
                Manage your account details.
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  Email notifications
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  Display name
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(20,30,60,0.35)] backdrop-blur">
              <h2 className="text-lg font-semibold">Preferences</h2>
              <p className="mt-2 text-sm text-white/60">
                Control your default experience.
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  Theme: Dark
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  Language: English
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
