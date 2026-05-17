import type { ReactNode } from "react";
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/presentation/components/dashboard/dashboard-sidebar";

type DashboardShellProps = {
  children: ReactNode;
  userName?: string | null;
  userEmail?: string | null;
};

export function DashboardShell({
  children,
  userName,
  userEmail,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader userName={userName} userEmail={userEmail} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
