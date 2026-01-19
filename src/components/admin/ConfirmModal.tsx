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
      ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.4)]"
      : tone === "warning"
      ? "border-amber-400/40 bg-amber-500/20 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.35)]"
      : "border-rose-400/40 bg-rose-500/20 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.4)]";

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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirming}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 ${toneClass}`}
          >
            {confirming ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
