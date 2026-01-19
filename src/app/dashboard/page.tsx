import Sidebar from "@/components/Sidebar";
import AuthActions from "@/components/AuthActions";

export default function DashboardPage() {
  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar activeItem="Dashboard" />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-white/60">Your workspace at a glance.</p>
            </div>
            <AuthActions />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_24px_rgba(60,100,255,0.2)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Total Prompts
              </p>
              <p className="mt-3 text-2xl font-semibold">128</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_24px_rgba(140,90,255,0.2)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Favorites
              </p>
              <p className="mt-3 text-2xl font-semibold">24</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_24px_rgba(80,200,255,0.2)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Last Updated
              </p>
              <p className="mt-3 text-2xl font-semibold">2 hours ago</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(20,30,60,0.35)] backdrop-blur">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="mt-2 text-sm text-white/60">
                Track your latest prompts and updates.
              </p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  Edited "Blog Post Generator"
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  Added "Creative Story Idea"
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  Saved "Email Subject Lines"
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(20,30,60,0.35)] backdrop-blur">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="mt-2 text-sm text-white/60">
                Jump back into your most used tools.
              </p>
              <div className="mt-4 grid gap-3">
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:border-white/30">
                  Create new prompt
                </button>
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:border-white/30">
                  Browse favorites
                </button>
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:border-white/30">
                  Manage tags
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
