export default function ConfirmModal({
  title,
  description,
  confirmLabel = "Confirm",
  tone = "danger",
  onClose,
  onConfirm,
  confirming,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  tone?: "danger" | "warning" | "success";
  onClose: () => void;
  onConfirm: () => void;
  confirming?: boolean;
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-300/24 bg-emerald-500/10 text-emerald-100"
      : tone === "warning"
      ? "border-amber-300/24 bg-amber-500/10 text-amber-100"
      : "border-rose-300/20 bg-rose-500/10 text-rose-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="surface w-full max-w-md rounded-xl p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirming}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${toneClass}`}
          >
            {confirming ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
