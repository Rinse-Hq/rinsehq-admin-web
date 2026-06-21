"use client";

import { useId, useState } from "react";
import { cn } from "@/presentation/lib/utils";

type CollapsibleProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Collapsible({
  title,
  description,
  defaultOpen = false,
  className,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className={cn("border-b border-slate-100 last:border-b-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:bg-slate-50/80"
        aria-expanded={open}
        aria-controls={contentId}
      >
        <div className="min-w-0">
          <h3 className="font-serif text-base font-semibold text-slate-900">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        <ChevronIcon
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div id={contentId} hidden={!open} className="pb-6">
        {children}
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
