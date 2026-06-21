import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";
import {
  permissionLevelLabels,
  permissionPresets,
} from "@/presentation/data/account-mock-data";
import type { StoreRole } from "@/presentation/data/stores-data";

export type DemoAccount = {
  email: string;
  password: string;
  name: string;
  role: StoreRole | "super_admin";
  permissionLevel: AdminPermissionLevel;
  description: string;
  storeHint: string;
  assignedStoreIds: string[];
  accessSummary: string;
};

export const DEMO_PASSWORD = "Demo1234!";

export const demoAccounts: DemoAccount[] = [
  {
    email: "demo@rinsehq.com",
    password: DEMO_PASSWORD,
    name: "Adeola Johnson",
    role: "super_admin",
    permissionLevel: "full_admin",
    description: "Super / main admin",
    storeHint: "All stores — picker on login",
    assignedStoreIds: ["STR-001", "STR-002", "STR-003"],
    accessSummary:
      "Dashboard, Orders, Transactions, Services, Account, Settings (stores + admin management)",
  },
  {
    email: "chioma@laundrycare.ng",
    password: DEMO_PASSWORD,
    name: "Chioma Okafor",
    role: "manager",
    permissionLevel: "manager",
    description: "Manager",
    storeHint: "2 stores — picker on login",
    assignedStoreIds: ["STR-002", "STR-003"],
    accessSummary:
      "Dashboard, Orders, Transactions, Services, Account — no Settings",
  },
  {
    email: "emeka@laundrycare.ng",
    password: DEMO_PASSWORD,
    name: "Emeka Nwosu",
    role: "sub_admin",
    permissionLevel: "staff",
    description: "Staff",
    storeHint: "1 store — direct to dashboard",
    assignedStoreIds: ["STR-003"],
    accessSummary: "Dashboard, Orders, Account only — no Transactions, Services, or Settings",
  },
  {
    email: "fatima@laundrycare.ng",
    password: DEMO_PASSWORD,
    name: "Fatima Bello",
    role: "sub_admin",
    permissionLevel: "viewer",
    description: "Viewer",
    storeHint: "2 stores — picker on login",
    assignedStoreIds: ["STR-001", "STR-002"],
    accessSummary:
      "Dashboard, Orders, Transactions, Services, Account (read-only) — no Settings",
  },
];

export function getDemoAccount(email: string) {
  const normalized = email.toLowerCase().trim();
  return demoAccounts.find((account) => account.email === normalized) ?? null;
}

export function getDemoAccountPermissions(email: string) {
  const account = getDemoAccount(email);
  if (!account) return null;
  return permissionPresets[account.permissionLevel];
}

export function getDemoAccountPermissionLabel(email: string) {
  const account = getDemoAccount(email);
  if (!account) return null;
  return permissionLevelLabels[account.permissionLevel];
}
