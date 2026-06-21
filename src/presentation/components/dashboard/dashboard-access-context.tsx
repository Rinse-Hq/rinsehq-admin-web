"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type {
  AdminPermissionLevel,
  AdminPermissions,
} from "@/presentation/data/account-mock-data";
import {
  canAccessPath as checkPath,
  getPermissionsForLevel,
  isReadOnlyLevel,
} from "@/presentation/lib/access-control";

type DashboardAccessContextValue = {
  permissionLevel: AdminPermissionLevel;
  permissions: AdminPermissions;
  isReadOnly: boolean;
  canAccessPath: (pathname: string) => boolean;
};

const DashboardAccessContext = createContext<DashboardAccessContextValue | null>(
  null,
);

type DashboardAccessProviderProps = {
  permissionLevel: AdminPermissionLevel;
  children: ReactNode;
};

export function DashboardAccessProvider({
  permissionLevel,
  children,
}: DashboardAccessProviderProps) {
  const value = useMemo(() => {
    const permissions = getPermissionsForLevel(permissionLevel);

    return {
      permissionLevel,
      permissions,
      isReadOnly: isReadOnlyLevel(permissionLevel),
      canAccessPath: (pathname: string) => checkPath(pathname, permissions),
    };
  }, [permissionLevel]);

  return (
    <DashboardAccessContext.Provider value={value}>
      {children}
    </DashboardAccessContext.Provider>
  );
}

export function useDashboardAccess() {
  const context = useContext(DashboardAccessContext);
  if (!context) {
    throw new Error(
      "useDashboardAccess must be used within DashboardAccessProvider",
    );
  }
  return context;
}
