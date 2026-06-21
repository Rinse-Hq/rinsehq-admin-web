import type { Service } from "@/presentation/data/services-mock-data";
import { computeServiceSummary } from "@/presentation/data/services-mock-data";
import { cn } from "@/presentation/lib/utils";

const cards = [
  { key: "total", label: "Total services", variant: "total" as const },
  { key: "active", label: "Active", variant: "active" as const },
  { key: "inactive", label: "Inactive", variant: "inactive" as const },
  { key: "categories", label: "Categories", variant: "categories" as const },
] as const;

const variantStyles = {
  total: {
    dot: "bg-brand-500",
    icon: "bg-brand-50 text-brand-600",
  },
  active: {
    dot: "bg-status-completed",
    icon: "bg-green-50 text-status-completed",
  },
  inactive: {
    dot: "bg-slate-400",
    icon: "bg-slate-100 text-slate-600",
  },
  categories: {
    dot: "bg-status-active",
    icon: "bg-blue-50 text-status-active",
  },
};

type ServicesSummaryCardsProps = {
  services: Service[];
};

export function ServicesSummaryCards({ services }: ServicesSummaryCardsProps) {
  const summary = computeServiceSummary(services);

  const values: Record<(typeof cards)[number]["key"], number> = {
    total: summary.total,
    active: summary.active,
    inactive: summary.inactive,
    categories: summary.categories,
  };

  return (
    <section>
      <h2 className="font-serif text-lg font-semibold text-slate-800">
        Service overview
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const styles = variantStyles[card.variant];
          return (
            <article
              key={card.key}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5"
            >
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {values[card.key]}
                </p>
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
                <ServiceIcon className="h-7 w-7" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9H15M9 13H15M9 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
