export type AdminPermissionLevel = "full_admin" | "manager" | "staff" | "viewer";

export type AdminPermissions = {
  orders: boolean;
  services: boolean;
  transactions: boolean;
  reports: boolean;
  settings: boolean;
  adminManagement: boolean;
};

export type SubAdmin = {
  id: string;
  name: string;
  email: string;
  permissionLevel: AdminPermissionLevel;
  permissions: AdminPermissions;
  status: "active" | "inactive";
  storeIds: string[];
  lastActive?: string;
};

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
};

export type BusinessInfo = {
  businessName: string;
  bio: string;
  registrationNo: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  whatsapp: string;
};

export const permissionLevelLabels: Record<AdminPermissionLevel, string> = {
  full_admin: "Full Admin",
  manager: "Manager",
  staff: "Staff",
  viewer: "Viewer",
};

export const permissionLevelDescriptions: Record<AdminPermissionLevel, string> = {
  full_admin: "Full access to all features including admin management",
  manager: "Manage orders, services, and transactions",
  staff: "Create and view orders, limited service access",
  viewer: "Read-only access to orders and reports",
};

export const permissionPresets: Record<AdminPermissionLevel, AdminPermissions> = {
  full_admin: {
    orders: true,
    services: true,
    transactions: true,
    reports: true,
    settings: true,
    adminManagement: true,
  },
  manager: {
    orders: true,
    services: true,
    transactions: true,
    reports: true,
    settings: false,
    adminManagement: false,
  },
  staff: {
    orders: true,
    services: false,
    transactions: false,
    reports: false,
    settings: false,
    adminManagement: false,
  },
  viewer: {
    orders: true,
    services: true,
    transactions: true,
    reports: true,
    settings: false,
    adminManagement: false,
  },
};

export const permissionLabels: Record<keyof AdminPermissions, string> = {
  orders: "Orders",
  services: "Services",
  transactions: "Transactions",
  reports: "Reports",
  settings: "Settings",
  adminManagement: "Admin management",
};

export const initialPersonalInfo: PersonalInfo = {
  fullName: "Adeola Johnson",
  email: "demo@rinsehq.com",
  phone: "8012345678",
};

export const initialBusinessInfo: BusinessInfo = {
  businessName: "Laundry Care",
  bio: "Premium laundry and dry cleaning services in Lagos.",
  registrationNo: "RC-1234567",
  address: "12 Admiralty Way",
  city: "Lekki",
  postalCode: "101245",
  country: "nigeria",
  phone: "8012345678",
  whatsapp: "8012345678",
};

export const initialSubAdmins: SubAdmin[] = [
  {
    id: "ADM-001",
    name: "Chioma Okafor",
    email: "chioma@laundrycare.ng",
    permissionLevel: "manager",
    permissions: permissionPresets.manager,
    status: "active",
    storeIds: ["STR-002", "STR-003"],
    lastActive: "Today, 9:42 AM",
  },
  {
    id: "ADM-002",
    name: "Emeka Nwosu",
    email: "emeka@laundrycare.ng",
    permissionLevel: "staff",
    permissions: permissionPresets.staff,
    status: "active",
    storeIds: ["STR-003"],
    lastActive: "Yesterday, 4:15 PM",
  },
  {
    id: "ADM-003",
    name: "Fatima Bello",
    email: "fatima@laundrycare.ng",
    permissionLevel: "viewer",
    permissions: permissionPresets.viewer,
    status: "active",
    storeIds: ["STR-001", "STR-002"],
    lastActive: "Mar 12, 2026",
  },
];

export function createSubAdminId(existing: SubAdmin[]) {
  const max = existing.reduce((highest, admin) => {
    const num = Number.parseInt(admin.id.replace("ADM-", ""), 10);
    return Number.isNaN(num) ? highest : Math.max(highest, num);
  }, 0);
  return `ADM-${String(max + 1).padStart(3, "0")}`;
}
