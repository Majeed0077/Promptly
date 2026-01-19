export type UserRole = "admin" | "editor" | "viewer";
export type UserStatus = "active" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt: string;
  createdAt: string;
};

export const roleOptions: UserRole[] = ["admin", "editor", "viewer"];
export const statusOptions: UserStatus[] = ["active", "suspended"];
