import Link from "next/link";
import { signOutAction } from "@/presentation/actions/auth-actions";

type DashboardHeaderProps = {
  userName?: string | null;
};

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const displayName = userName ?? "Laundry Care";

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-5 lg:px-6">
      <Link href="/dashboard" className="shrink-0 text-xl font-bold text-slate-800">
        rinse<span className="font-normal text-slate-600">hq</span>
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

      <div className="ml-auto flex shrink-0 items-center gap-4">
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
