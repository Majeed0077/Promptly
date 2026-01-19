"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";
import Toast from "@/components/ui/Toast";

type UserRole = "Admin" | "Editor" | "Viewer";
type UserStatus = "Active" | "Suspended";
type SortOption = "Newest" | "Oldest" | "Name A-Z";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
};

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: true, href: "/admin/users" },
  { name: "Settings", active: false, href: "/admin/settings" },
];

const roleOptions: UserRole[] = ["Admin", "Editor", "Viewer"];
const statusOptions: Array<UserStatus | "All"> = [
  "All",
  "Active",
  "Suspended",
];
const sortOptions: SortOption[] = ["Newest", "Oldest", "Name A-Z"];

const emptyUser: UserRecord = {
  id: "",
  name: "",
  email: "",
  role: "Viewer",
  status: "Active",
  lastLogin: "",
  createdAt: "",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [sortOption, setSortOption] = useState<SortOption>("Newest");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [activeUser, setActiveUser] = useState<UserRecord | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        if (!isMounted) return;
        setUsers(data.users as UserRecord[]);
      } catch {
        if (!isMounted) return;
        setToast({ message: "Failed to load users", variant: "error" });
      }
    };
    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const search = query.toLowerCase();
    const filtered = users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "Name A-Z") {
        return a.name.localeCompare(b.name);
      }
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      if (sortOption === "Oldest") return aTime - bTime;
      return bTime - aTime;
    });

    return sorted;
  }, [users, query, roleFilter, statusFilter, sortOption]);

  const handleCreateUser = async (form: UserRecord) => {
    const createdAt = form.createdAt || new Date().toISOString();
    const payload = {
      ...form,
      createdAt,
      lastLogin: form.lastLogin || "",
    };

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setUsers((prev) => [data.user as UserRecord, ...prev]);
      setIsAddOpen(false);
      setToast({ message: "User created", variant: "success" });
    } catch {
      setToast({ message: "Failed to create user", variant: "error" });
    }
  };

  const handleUpdateUser = async (form: UserRecord) => {
    try {
      const response = await fetch(`/api/admin/users/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === form.id ? data.user : user))
      );
      setIsEditOpen(false);
      setToast({ message: "User updated", variant: "success" });
    } catch {
      setToast({ message: "Failed to update user", variant: "error" });
    }
  };

  const handleDeleteUser = async () => {
    if (!activeUser) return;
    try {
      const response = await fetch(`/api/admin/users/${activeUser.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed");
      setUsers((prev) => prev.filter((user) => user.id !== activeUser.id));
      setIsDeleteOpen(false);
      setActiveUser(null);
      setToast({ message: "User deleted", variant: "success" });
    } catch {
      setToast({ message: "Failed to delete user", variant: "error" });
    }
  };

  const handleStatusToggle = async (user: UserRecord) => {
    const nextStatus: UserStatus =
      user.status === "Active" ? "Suspended" : "Active";
    await handleUpdateUser({ ...user, status: nextStatus });
  };

  const handleRoleChange = async (user: UserRecord, role: UserRole) => {
    await handleUpdateUser({ ...user, role });
  };

  const clearFilters = () => {
    setQuery("");
    setRoleFilter("All");
    setStatusFilter("All");
    setSortOption("Newest");
  };

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Users"
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.55)] transition hover:brightness-110"
          >
            <span className="text-lg">+</span>
            New Prompt
          </Link>
        }
      />

      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex items-center justify-end">
            <AdminUserActions />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Users</h1>
              <p className="text-sm text-white/60">
                Manage user access and roles.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveUser({ ...emptyUser });
                setIsAddOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(120,160,255,0.6)] transition hover:brightness-110"
            >
              <PlusIcon className="h-4 w-4" />
              Add User
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <SearchIcon className="h-4 w-4 text-white/60" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search users..."
                  className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(event.target.value as UserRole | "All")
                }
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-white/30 focus:outline-none"
              >
                <option value="All">All</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as UserStatus | "All")
                }
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-white/30 focus:outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as SortOption)
                }
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-white/30 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setViewMode("table")}
                  className={`rounded-lg border px-2.5 py-2 text-white/70 transition hover:text-white ${
                    viewMode === "table"
                      ? "border-sky-400/40 bg-sky-500/20 shadow-[0_0_12px_rgba(120,160,255,0.4)]"
                      : "border-white/10 bg-white/5"
                  }`}
                  aria-label="Table view"
                >
                  <TableIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`rounded-lg border px-2.5 py-2 text-white/70 transition hover:text-white ${
                    viewMode === "cards"
                      ? "border-sky-400/40 bg-sky-500/20 shadow-[0_0_12px_rgba(120,160,255,0.4)]"
                      : "border-white/10 bg-white/5"
                  }`}
                  aria-label="Card view"
                >
                  <GridIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(20,30,60,0.35)] backdrop-blur-xl">
            <div className="hidden grid-cols-[2.2fr_1fr_0.9fr_1fr_1fr_0.9fr] gap-4 border-b border-white/10 bg-white/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 lg:grid">
              <div>User</div>
              <div>Role</div>
              <div>Status</div>
              <div>Last Login</div>
              <div>Created</div>
              <div>Actions</div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
                <p className="text-sm text-white/70">
                  No users match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4 px-4 py-4 lg:space-y-0 lg:px-0 lg:py-0">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 shadow-[0_0_20px_rgba(15,20,40,0.2)] transition hover:bg-white/10 lg:grid lg:grid-cols-[2.2fr_1fr_0.9fr_1fr_1fr_0.9fr] lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-sm font-semibold text-white/80 shadow-[0_0_16px_rgba(90,120,255,0.25)]">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-white/50">{user.email}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 lg:mt-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 lg:hidden">
                        Role
                      </p>
                      <select
                        value={user.role}
                        onChange={(event) =>
                          handleRoleChange(user, event.target.value as UserRole)
                        }
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 focus:outline-none"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4 space-y-1 lg:mt-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 lg:hidden">
                        Status
                      </p>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                          user.status === "Active"
                            ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                            : "border-amber-400/30 bg-amber-500/20 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-white/70 lg:mt-0 lg:text-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 lg:hidden">
                        Last Login
                      </p>
                      {formatDate(user.lastLogin)}
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-white/70 lg:mt-0 lg:text-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 lg:hidden">
                        Created
                      </p>
                      {formatDate(user.createdAt)}
                    </div>

                    <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:justify-end">
                      <button
                        onClick={() => {
                          setActiveUser(user);
                          setIsEditOpen(true);
                        }}
                        className="rounded-lg border border-blue-400/40 bg-blue-500/20 p-2 text-blue-100 shadow-[0_0_16px_rgba(90,120,255,0.5)] transition hover:bg-blue-500/30"
                        aria-label="Edit user"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(user)}
                        className={`rounded-lg border p-2 transition ${
                          user.status === "Active"
                            ? "border-amber-400/40 bg-amber-500/20 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.35)] hover:bg-amber-500/30"
                            : "border-emerald-400/40 bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:bg-emerald-500/30"
                        }`}
                        aria-label={
                          user.status === "Active" ? "Suspend user" : "Activate user"
                        }
                      >
                        {user.status === "Active" ? (
                          <SuspendIcon className="h-4 w-4" />
                        ) : (
                          <ActivateIcon className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setActiveUser(user);
                          setIsDeleteOpen(true);
                        }}
                        className="rounded-lg border border-rose-400/40 bg-rose-500/20 p-2 text-rose-100 shadow-[0_0_16px_rgba(255,110,150,0.35)] transition hover:bg-rose-500/30"
                        aria-label="Delete user"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {isAddOpen && activeUser && (
        <UserModal
          title="Add User"
          initial={activeUser}
          onClose={() => setIsAddOpen(false)}
          onSave={handleCreateUser}
        />
      )}

      {isEditOpen && activeUser && (
        <UserModal
          title="Edit User"
          initial={activeUser}
          onClose={() => setIsEditOpen(false)}
          onSave={handleUpdateUser}
        />
      )}

      {isDeleteOpen && activeUser && (
        <ConfirmModal
          title="Delete User"
          description={`Remove ${activeUser.name} from the workspace?`}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteUser}
        />
      )}

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

function UserModal({
  title,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  initial: UserRecord;
  onClose: () => void;
  onSave: (user: UserRecord) => void;
}) {
  const [form, setForm] = useState<UserRecord>(initial);

  const updateField = <K extends keyof UserRecord>(key: K, value: UserRecord[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[rgba(15,18,32,0.9)] p-6 shadow-[0_0_40px_rgba(90,120,255,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">User Management</p>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
            aria-label="Close modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="User name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="user@company.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Role
              </label>
              <select
                value={form.role}
                onChange={(event) => updateField("role", event.target.value as UserRole)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Status
              </label>
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as UserStatus)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:brightness-110"
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(15,18,32,0.9)] p-6 shadow-[0_0_40px_rgba(255,110,150,0.25)]">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl border border-rose-400/40 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.4)] transition hover:bg-rose-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
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

function TableIcon({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M9 4v16" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
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
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}
