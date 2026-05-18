type OnboardingProgressProps = {
  step: number;
  total?: number;
};

export function OnboardingProgress({
  step,
  total = 4,
}: OnboardingProgressProps) {
  const percent = (step / total) * 100;

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-start justify-between gap-4 text-sm">
        <span className="font-bold text-slate-900">
          Step {step} of {total}
        </span>
        <span className="text-right text-xs text-slate-500">
          (Exceptional management! rinsehq streamlines laundry)
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${percent}%` }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 text-sm"
          style={{ left: `calc(${percent}% - 8px)` }}
          aria-hidden
        >
          🎉
        </span>
      </div>
    </div>
  );
}
