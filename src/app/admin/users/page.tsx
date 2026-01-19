"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminUserActions from "@/components/AdminUserActions";
import Toast from "@/components/ui/Toast";
import Select from "@/components/admin/Select";
import UserTable from "@/components/admin/UserTable";
import UserModal from "@/components/admin/UserModal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { User, UserRole, UserStatus, roleOptions, statusOptions } from "@/components/admin/userTypes";

type SortOption = "newest" | "oldest" | "name";

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: false, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: true, href: "/admin/users" },
  { name: "Settings", active: false, href: "/admin/settings" },
];

const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  role: "viewer",
  status: "active",
  lastLoginAt: "",
  createdAt: "",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [confirmMode, setConfirmMode] = useState<"delete" | "status" | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        if (!isMounted) return;
        setUsers(data.users as User[]);
      } catch {
        if (!isMounted) return;
        setToast({ message: "Failed to load users", variant: "error" });
      } finally {
        if (isMounted) setIsLoading(false);
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
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      if (sortOption === "oldest") return aTime - bTime;
      return bTime - aTime;
    });

    return sorted;
  }, [users, query, roleFilter, statusFilter, sortOption]);

  const handleCreateUser = async (form: User) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setUsers((prev) => [data.user as User, ...prev]);
      setActiveUser(null);
      setToast({ message: "User created", variant: "success" });
    } catch {
      setToast({ message: "Failed to create user", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateUser = async (form: User) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/users/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === form.id ? data.user : user))
      );
      setActiveUser(null);
      setToast({ message: "User updated", variant: "success" });
    } catch {
      setToast({ message: "Failed to update user", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!activeUser) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/users/${activeUser.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed");
      setUsers((prev) => prev.filter((user) => user.id !== activeUser.id));
      setActiveUser(null);
      setConfirmMode(null);
      setToast({ message: "User deleted", variant: "success" });
    } catch {
      setToast({ message: "Failed to delete user", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!activeUser) return;
    const nextStatus: UserStatus =
      activeUser.status === "active" ? "suspended" : "active";
    await handleUpdateUser({ ...activeUser, status: nextStatus });
    setConfirmMode(null);
  };

  const handleRoleChange = async (user: User, role: UserRole) => {
    await handleUpdateUser({ ...user, role });
  };

  const clearFilters = () => {
    setQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setSortOption("newest");
  };

  const openAddModal = () => {
    setActiveUser({ ...emptyUser });
  };

  const openEditModal = (user: User) => {
    setActiveUser(user);
  };

  const openDeleteModal = (user: User) => {
    setActiveUser(user);
    setConfirmMode("delete");
  };

  const openStatusModal = (user: User) => {
    setActiveUser(user);
    setConfirmMode("status");
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
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(120,160,255,0.6)] transition hover:-translate-y-0.5 hover:brightness-110"
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
              <Select
                value={roleFilter}
                onChange={(value) => setRoleFilter(value as UserRole | "all")}
              >
                <option value="all">All</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {formatRole(role)}
                  </option>
                ))}
              </Select>
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as UserStatus | "all")}
              >
                <option value="all">All</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </Select>
              <Select
                value={sortOption}
                onChange={(value) => setSortOption(value as SortOption)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name A-Z</option>
              </Select>
            </div>
          </div>

          {filteredUsers.length === 0 && !isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur">
              <p className="text-sm text-white/70">
                No users match your filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              isLoading={isLoading}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onToggleStatus={openStatusModal}
              onRoleChange={handleRoleChange}
            />
          )}
        </div>
      </main>

      {activeUser && !confirmMode && (
        <UserModal
          title={activeUser.id ? "Edit User" : "Add User"}
          initial={activeUser}
          onClose={() => setActiveUser(null)}
          onSave={activeUser.id ? handleUpdateUser : handleCreateUser}
          saving={isSaving}
          showStatus={Boolean(activeUser.id)}
        />
      )}

      {activeUser && confirmMode === "delete" && (
        <ConfirmModal
          title="Delete User"
          description={`Remove ${activeUser.name} from the workspace?`}
          confirmLabel="Delete"
          tone="danger"
          onClose={() => setConfirmMode(null)}
          onConfirm={handleDeleteUser}
          confirming={isSaving}
        />
      )}

      {activeUser && confirmMode === "status" && (
        <ConfirmModal
          title={
            activeUser.status === "active" ? "Suspend User" : "Activate User"
          }
          description={
            activeUser.status === "active"
              ? `Suspend ${activeUser.name}? They will lose access until reactivated.`
              : `Activate ${activeUser.name}? They will regain access immediately.`
          }
          confirmLabel={activeUser.status === "active" ? "Suspend" : "Activate"}
          tone={activeUser.status === "active" ? "warning" : "success"}
          onClose={() => setConfirmMode(null)}
          onConfirm={handleStatusToggle}
          confirming={isSaving}
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

function formatRole(role: UserRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatStatus(status: UserStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
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
