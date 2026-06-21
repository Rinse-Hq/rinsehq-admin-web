import type {
  AdminPermissionLevel,
  AdminPermissions,
} from "@/presentation/data/account-mock-data";
import { permissionPresets } from "@/presentation/data/account-mock-data";

export type NavPermissionKey = keyof AdminPermissions | "always";

export type NavItemConfig = {
  href: string;
  label: string;
  permission: NavPermissionKey;
  hasChevron?: boolean;
};

export const primaryNavConfig: NavItemConfig[] = [
  { href: "/dashboard", label: "Dashboard", permission: "always" },
  { href: "/dashboard/orders", label: "Order", permission: "orders", hasChevron: true },
  {
    href: "/dashboard/transactions",
    label: "Transaction",
    permission: "transactions",
    hasChevron: true,
  },
  { href: "/dashboard/services", label: "Service", permission: "services" },
  { href: "/dashboard/account", label: "Account", permission: "always" },
  { href: "/dashboard/settings", label: "Settings", permission: "settings" },
];

export const secondaryNavConfig: NavItemConfig[] = [
  { href: "/dashboard/notifications", label: "Notification", permission: "always" },
  { href: "/dashboard/help", label: "Help & Support", permission: "always" },
  { href: "/dashboard/tickets", label: "Ticket", permission: "always" },
];

export function getPermissionsForLevel(
  level: AdminPermissionLevel,
): AdminPermissions {
  return { ...permissionPresets[level] };
}

export function isReadOnlyLevel(level: AdminPermissionLevel): boolean {
  return level === "viewer";
}

export function canAccessPath(
  pathname: string,
  permissions: AdminPermissions,
): boolean {
  if (pathname.startsWith("/dashboard/settings")) {
    return permissions.settings;
  }
  if (pathname.startsWith("/dashboard/orders")) {
    return permissions.orders;
  }
  if (pathname.startsWith("/dashboard/transactions")) {
    return permissions.transactions;
  }
  if (pathname.startsWith("/dashboard/services")) {
    return permissions.services;
  }

  return true;
}

export function filterNavItems(
  items: NavItemConfig[],
  permissions: AdminPermissions,
): NavItemConfig[] {
  return items.filter((item) => {
    if (item.permission === "always") return true;
    return permissions[item.permission];
  });
}

export function getDefaultRedirectPath(
  permissions: AdminPermissions,
): string {
  if (permissions.orders) return "/dashboard/orders";
  if (permissions.services) return "/dashboard/services";
  if (permissions.transactions) return "/dashboard/transactions";
  return "/dashboard";
}
