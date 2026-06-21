"use client";

import { cn } from "@/presentation/lib/utils";

export type SettingsSection = "stores" | "admins";

const allSections: { id: SettingsSection; label: string; requiresAdmin?: boolean }[] = [
  { id: "stores", label: "Stores" },
  { id: "admins", label: "Admin management", requiresAdmin: true },
];

type SettingsSectionNavProps = {
  active: SettingsSection;
  onChange: (section: SettingsSection) => void;
  showAdminManagement?: boolean;
};

export function SettingsSectionNav({
  active,
  onChange,
  showAdminManagement = false,
}: SettingsSectionNavProps) {
  const sections = allSections.filter(
    (section) => !section.requiresAdmin || showAdminManagement,
  );

  return (
    <nav
      className="inline-flex flex-wrap rounded-lg border border-slate-200 bg-white p-1"
      aria-label="Settings"
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
