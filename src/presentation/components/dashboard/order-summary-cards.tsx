import { orderSummary } from "@/presentation/data/dashboard-mock-data";
import { cn } from "@/presentation/lib/utils";

const variantStyles = {
  active: {
    dot: "bg-status-active",
    icon: "bg-blue-50 text-status-active",
  },
  completed: {
    dot: "bg-status-completed",
    icon: "bg-green-50 text-status-completed",
  },
  pending: {
    dot: "bg-status-pending",
    icon: "bg-red-50 text-status-pending",
  },
};

export function OrderSummaryCards() {
  return (
    <section>
      <h2 className="font-serif text-lg font-semibold text-slate-800">
        Total Order
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {orderSummary.map((card) => {
          const styles = variantStyles[card.variant];
          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5"
            >
              <div>
                <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
                  {card.label}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl",
                  styles.icon,
                )}
              >
                <ChartBarsIcon className="h-7 w-7" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ChartBarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="14" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="10" y="10" width="3" height="10" rx="0.5" fill="currentColor" />
      <rect x="16" y="6" width="3" height="14" rx="0.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
