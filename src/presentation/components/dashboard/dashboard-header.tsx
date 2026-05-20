"use client";

import Link from "next/link";
import { signOutAction } from "@/presentation/actions/auth-actions";
import { useDashboardNav } from "@/presentation/components/dashboard/dashboard-nav-context";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";

type DashboardHeaderProps = {
  userName?: string | null;
};

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const displayName = userName ?? "Laundry Care";
  const { isCollapsed, toggleCollapsed, openMobile } = useDashboardNav();

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:gap-4 sm:px-5 lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        onClick={openMobile}
        aria-label="Open menu"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:inline-flex"
        onClick={toggleCollapsed}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <PanelExpandIcon className="h-5 w-5" />
        ) : (
          <PanelCollapseIcon className="h-5 w-5" />
        )}
      </button>

      <Link href="/dashboard" className="shrink-0 lg:hidden">
        <RinseHqLogo variant="light" className="h-7 w-auto" />
      </Link>

      <div className="mx-auto hidden w-full max-w-xl md:block">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search"
            className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            {displayName.charAt(0)}
          </div>
          <span className="hidden text-sm font-medium text-slate-800 sm:block">
            {displayName}
          </span>
        </div>

        <form action={signOutAction} className="hidden sm:block">
          <button
            type="submit"
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PanelCollapseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 8L18 12L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 8L14 12L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 17H9L9.5 19H14.5L15 17ZM18 13V9C18 5.69 15.31 3 12 3C8.69 3 6 5.69 6 9V13L4 15V16H20V15L18 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
