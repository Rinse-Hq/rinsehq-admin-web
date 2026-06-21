"use client";

import type { ReactNode } from "react";
import { DashboardAccessProvider } from "@/presentation/components/dashboard/dashboard-access-context";
import { DashboardAccessGuard } from "@/presentation/components/dashboard/dashboard-access-guard";
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header";
import { DashboardNavProvider } from "@/presentation/components/dashboard/dashboard-nav-context";
import { DashboardSidebar } from "@/presentation/components/dashboard/dashboard-sidebar";
import type { StoreAccess } from "@/presentation/data/stores-data";
import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";

type DashboardShellProps = {
  children: ReactNode;
  userName?: string | null;
  storeName?: string | null;
  storeId?: string | null;
  permissionLevel: AdminPermissionLevel;
  accessibleStores?: StoreAccess[];
};

export function DashboardShell({
  children,
  userName,
  storeName,
  storeId,
  permissionLevel,
  accessibleStores,
}: DashboardShellProps) {
  return (
    <DashboardAccessProvider permissionLevel={permissionLevel}>
      <DashboardNavProvider>
        <div className="flex min-h-screen bg-surface">
          <DashboardSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <DashboardHeader
              userName={userName}
              storeName={storeName}
              storeId={storeId}
              permissionLevel={permissionLevel}
              accessibleStores={accessibleStores}
            />
            <main className="flex-1 overflow-auto p-4 sm:p-5 lg:p-6">
              <DashboardAccessGuard>{children}</DashboardAccessGuard>
            </main>
          </div>
        </div>
      </DashboardNavProvider>
    </DashboardAccessProvider>
  );
}
