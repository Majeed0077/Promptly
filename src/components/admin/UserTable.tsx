import Badge from "@/components/admin/Badge";
import Select from "@/components/admin/Select";
import { User, UserRole, UserStatus, roleOptions } from "@/components/admin/userTypes";

export default function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
  onRoleChange,
}: {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onRoleChange: (user: User, role: UserRole) => void;
}) {
  if (isLoading) {
    return (
      <div className="surface rounded-xl px-4 py-6">
        <div className="hidden grid-cols-[2.4fr_1fr_0.9fr_1fr_1fr_0.9fr] gap-4 border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/46 lg:grid">
          <div>User</div>
          <div>Role</div>
          <div>Status</div>
          <div>Last Login</div>
          <div>Created</div>
          <div>Actions</div>
        </div>
        <div className="space-y-4 px-2 py-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-16 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="surface overflow-hidden rounded-xl">
      <div className="hidden grid-cols-[2.4fr_1fr_0.9fr_1fr_1fr_0.9fr] gap-4 border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/46 lg:grid">
        <div>User</div>
        <div>Role</div>
        <div>Status</div>
        <div>Last Login</div>
        <div>Created</div>
        <div>Actions</div>
      </div>

      <div className="space-y-4 px-4 py-4 lg:space-y-0 lg:px-0 lg:py-0">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/76 transition hover:bg-white/[0.065] lg:grid lg:grid-cols-[2.4fr_1fr_0.9fr_1fr_1fr_0.9fr] lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/76">
                {user.name[0]}
              </div>
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-xs text-white/50">{user.email}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1 lg:mt-0">
              <p className="text-xs uppercase tracking-[0.12em] text-white/40 lg:hidden">
                Role
              </p>
              <Select
                value={user.role}
                onChange={(value) => onRoleChange(user, value as UserRole)}
                className="rounded-full"
                ariaLabel={`Role for ${user.name}`}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {formatRole(role)}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mt-4 space-y-1 lg:mt-0">
              <p className="text-xs uppercase tracking-[0.12em] text-white/40 lg:hidden">
                Status
              </p>
              <Badge tone={user.status === "active" ? "success" : "warning"}>
                {formatStatus(user.status)}
              </Badge>
            </div>

            <div className="mt-4 space-y-1 text-xs text-white/70 lg:mt-0 lg:text-sm">
              <p className="text-xs uppercase tracking-[0.12em] text-white/40 lg:hidden">
                Last Login
              </p>
              {formatDate(user.lastLoginAt)}
            </div>

            <div className="mt-4 space-y-1 text-xs text-white/70 lg:mt-0 lg:text-sm">
              <p className="text-xs uppercase tracking-[0.12em] text-white/40 lg:hidden">
                Created
              </p>
              {formatDate(user.createdAt)}
            </div>

            <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:justify-end">
              <button
                onClick={() => onEdit(user)}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-2 text-white/70 transition hover:border-[rgba(216,181,109,0.34)] hover:text-[var(--accent-strong)]"
                aria-label={`Edit ${user.name}`}
              >
                <EditIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onToggleStatus(user)}
                className={`rounded-lg border p-2 transition ${
                  user.status === "active"
                    ? "border-amber-300/24 bg-amber-500/10 text-amber-100 hover:bg-amber-500/16"
                    : "border-emerald-300/24 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/16"
                }`}
                aria-label={
                  user.status === "active" ? "Suspend user" : "Activate user"
                }
              >
                {user.status === "active" ? (
                  <SuspendIcon className="h-4 w-4" />
                ) : (
                  <ActivateIcon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => onDelete(user)}
                className="rounded-lg border border-rose-300/20 bg-rose-500/10 p-2 text-rose-100 transition hover:bg-rose-500/18"
                aria-label={`Delete ${user.name}`}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatRole(role: UserRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatStatus(status: UserStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function EditIcon({ className }: { className?: string }) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
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
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
    </svg>
  );
}

function SuspendIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9v6" />
      <path d="M15 9v6" />
    </svg>
  );
}

function ActivateIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4Z" />
    </svg>
  );
}
