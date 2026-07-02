import { useEffect, useState } from "react";
import Select from "@/components/admin/Select";
import { User, UserRole, UserStatus, roleOptions, statusOptions } from "@/components/admin/userTypes";

export default function UserModal({
  title,
  initial,
  onClose,
  onSave,
  saving,
  showStatus = true,
}: {
  title: string;
  initial: User;
  onClose: () => void;
  onSave: (user: User) => void;
  saving?: boolean;
  showStatus?: boolean;
}) {
  const [form, setForm] = useState<User>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const updateField = <K extends keyof User>(key: K, value: User[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="surface w-full max-w-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/55">User Management</p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white/64 transition hover:text-white"
            aria-label="Close modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="User name"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="user@company.com"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
            />
          </div>
          <div className={`grid gap-3 ${showStatus ? "md:grid-cols-2" : ""}`}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Role
              </label>
              <Select
                value={form.role}
                onChange={(value) => updateField("role", value as UserRole)}
                className="w-full"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {formatRole(role)}
                  </option>
                ))}
              </Select>
            </div>
            {showStatus ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  Status
                </label>
                <Select
                  value={form.status}
                  onChange={(value) => updateField("status", value as UserStatus)}
                  className="w-full"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {formatStatus(status)}
                    </option>
                  ))}
                </Select>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving}
            className="rounded-lg border border-[rgba(216,181,109,0.38)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#17130b] transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save User"}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatRole(role: UserRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatStatus(status: UserStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
