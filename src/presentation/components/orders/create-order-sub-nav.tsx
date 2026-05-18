import { cn } from "@/presentation/lib/utils";

export type CreateOrderSubStep = "customer" | "order-info" | "delivery";

const items: { id: CreateOrderSubStep; label: string }[] = [
  { id: "customer", label: "Customer Info" },
  { id: "order-info", label: "Order Info" },
  { id: "delivery", label: "Delivery Info" },
];

type CreateOrderSubNavProps = {
  current: CreateOrderSubStep;
  onSelect?: (step: CreateOrderSubStep) => void;
};

export function CreateOrderSubNav({ current, onSelect }: CreateOrderSubNavProps) {
  return (
    <nav className="flex shrink-0 flex-col gap-1 border-r border-slate-100 pr-6">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item.id)}
          className={cn(
            "rounded-md px-2 py-2 text-left text-sm font-medium transition-colors",
            current === item.id
              ? "text-brand-600"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
