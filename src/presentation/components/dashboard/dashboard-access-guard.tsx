"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  getDefaultRedirectPath,
  type NavPermissionKey,
} from "@/presentation/lib/access-control";
import { useDashboardAccess } from "@/presentation/components/dashboard/dashboard-access-context";

type DashboardAccessGuardProps = {
  children: ReactNode;
};

export function DashboardAccessGuard({ children }: DashboardAccessGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { canAccessPath, permissions } = useDashboardAccess();

  useEffect(() => {
    if (canAccessPath(pathname)) return;

    router.replace(getDefaultRedirectPath(permissions));
  }, [canAccessPath, pathname, permissions, router]);

  if (!canAccessPath(pathname)) {
    return null;
  }

  return children;
}

export function AccessGate({
  permission,
  children,
  fallback = null,
}: {
  permission: NavPermissionKey;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { permissions } = useDashboardAccess();

  if (permission === "always") return children;
  if (!permissions[permission]) return fallback;

  return children;
}
