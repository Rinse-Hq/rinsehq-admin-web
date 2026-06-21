"use client";

import { cn } from "@/presentation/lib/utils";

export type AccountSection = "personal" | "business";

const sections: { id: AccountSection; label: string }[] = [
  { id: "personal", label: "Personal info" },
  { id: "business", label: "Business info" },
];

type AccountSectionNavProps = {
  active: AccountSection;
  onChange: (section: AccountSection) => void;
};

export function AccountSectionNav({ active, onChange }: AccountSectionNavProps) {
  return (
    <nav
      className="inline-flex flex-wrap rounded-lg border border-slate-200 bg-white p-1"
      aria-label="Account settings"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            active === section.id
              ? "bg-brand-500 text-white"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
          aria-current={active === section.id ? "page" : undefined}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
