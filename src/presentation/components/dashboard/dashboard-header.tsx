import { signOutAction } from "@/presentation/actions/auth-actions";

type DashboardHeaderProps = {
  userName?: string | null;
  userEmail?: string | null;
};

export function DashboardHeader({ userName, userEmail }: DashboardHeaderProps) {
  const displayName = userName ?? userEmail ?? "User";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Dashboard
        </p>
        <h1 className="text-lg font-semibold text-slate-900">
          Hello, {displayName}
        </h1>
      </div>

      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Sign out
        </button>
      </form>
    </header>
  );
}
