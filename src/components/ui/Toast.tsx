"use client";

import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  variant?: "success" | "error";
  onClose: () => void;
};

export default function Toast({ message, variant = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 2500);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const styles =
    variant === "error"
      ? "border-rose-300/20 bg-rose-500/10 text-rose-100"
      : "border-emerald-300/20 bg-emerald-500/10 text-emerald-100";

  return (
    <div
      role="status"
      className={`fixed right-6 top-6 z-50 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur ${styles}`}
    >
      {message}
    </div>
  );
}
