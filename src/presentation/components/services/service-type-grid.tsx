"use client";

import type { ServiceConfigItem } from "@/presentation/data/services-config-data";
import { cn } from "@/presentation/lib/utils";

type ServiceTypeGridProps = {
  title: string;
  items: ServiceConfigItem[];
  isEditing: boolean;
  onToggleEdit: () => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: () => void;
};

export function ServiceTypeGrid({
  title,
  items,
  isEditing,
  onToggleEdit,
  onToggleItem,
  onDeleteItem,
  onAddItem,
}: ServiceTypeGridProps) {
  return (
    <section
      className={cn(
        "flat-card p-6 transition-shadow",
        isEditing && "ring-2 ring-brand-100",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        <button
          type="button"
          onClick={onToggleEdit}
          className={cn(
            "rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700",
            isEditing && "bg-brand-50 text-brand-600",
          )}
          aria-label={isEditing ? "Done editing" : "Edit services"}
          aria-pressed={isEditing}
        >
          <EditIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2.5"
          >
            <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => onToggleItem(item.id)}
                className="h-4 w-4 shrink-0 rounded-sm border-slate-300 text-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <span className="truncate text-sm text-slate-700">{item.label}</span>
            </label>
            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
              className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label={`Delete ${item.label}`}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-100"
      >
        <PlusIcon className="h-4 w-4" />
        Add new service
      </button>
    </section>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20H8L18.5 9.5C19.328 8.672 19.328 7.328 18.5 6.5C17.672 5.672 16.328 5.672 15.5 6.5L5 17V20H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 7.5L16.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7H20M9 7V5C9 4.45 9.45 4 10 4H14C14.55 4 15 4.45 15 5V7M17 7V19C17 20.1 16.1 21 15 21H9C7.9 21 7 20.1 7 19V7H17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
