"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/presentation/lib/utils";

const views = [
  {
    href: "/dashboard/services",
    label: "Catalog",
    match: (path: string) =>
      path === "/dashboard/services" ||
      (path.startsWith("/dashboard/services/") &&
        !path.startsWith("/dashboard/services/configure")),
  },
  {
    href: "/dashboard/services/configure",
    label: "Configuration",
    match: (path: string) => path.startsWith("/dashboard/services/configure"),
  },
] as const;

export function ServicesViewNav() {
  const pathname = usePathname();

  return (
    <nav
      className="inline-flex rounded-lg border border-slate-200 bg-white p-1"
      aria-label="Service views"
    >
      {views.map((view) => {
        const active = view.match(pathname);

        return (
          <Link
            key={view.href}
            href={view.href}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-500 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
            aria-current={active ? "page" : undefined}
          >
            {view.label}
          </Link>
        );
      })}
    </nav>
  );
}
