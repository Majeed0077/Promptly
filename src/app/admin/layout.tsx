import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value ?? "";
  const payload = token ? verifySessionToken(token) : null;

  if (!payload) {
    redirect("/signin?next=/admin");
  }

  return <>{children}</>;
}
