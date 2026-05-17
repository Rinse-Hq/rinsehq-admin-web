import type { ReactNode } from "react";
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/presentation/components/dashboard/dashboard-sidebar";

type DashboardShellProps = {
  children: ReactNode;
  userName?: string | null;
};

export function DashboardShell({ children, userName }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader userName={userName} />
        <main className="flex-1 overflow-auto p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
