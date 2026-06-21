import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";

export type StoreRole = "owner" | "manager" | "sub_admin";

export type StoreStatus = "active" | "inactive";

export type Store = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  isMainStore: boolean;
  status: StoreStatus;
  ownerUserId: string;
};

export type StoreAssignment = {
  id: string;
  storeId: string;
  email: string;
  name: string;
  role: Exclude<StoreRole, "owner">;
  permissionLevel: AdminPermissionLevel;
  status: "active" | "inactive";
};

export type StoreAccess = {
  storeId: string;
  storeName: string;
  address: string;
  city: string;
  isMainStore: boolean;
  role: StoreRole;
  permissionLevel: AdminPermissionLevel;
};

export function createStoreId(existing: Store[]) {
  const max = existing.reduce((highest, store) => {
    const num = Number.parseInt(store.id.replace("STR-", ""), 10);
    return Number.isNaN(num) ? highest : Math.max(highest, num);
  }, 0);
  return `STR-${String(max + 1).padStart(3, "0")}`;
}

export function createAssignmentId(existing: StoreAssignment[]) {
  const max = existing.reduce((highest, item) => {
    const num = Number.parseInt(item.id.replace("ASG-", ""), 10);
    return Number.isNaN(num) ? highest : Math.max(highest, num);
  }, 0);
  return `ASG-${String(max + 1).padStart(3, "0")}`;
}

export type StoresState = {
  stores: Store[];
  assignments: StoreAssignment[];
};

const STORAGE_KEY = "rinsehq-stores-state";

export function getDefaultStoresState(ownerUserId = "demo-owner"): StoresState {
  const mainStoreId = "STR-001";
  const lekkiStoreId = "STR-002";
  const ikejaStoreId = "STR-003";

  return {
    stores: [
      {
        id: mainStoreId,
        name: "Laundry Care — Main Store",
        address: "12 Admiralty Way",
        city: "Lekki",
        phone: "+2348012345678",
        isMainStore: true,
        status: "active",
        ownerUserId,
      },
      {
        id: lekkiStoreId,
        name: "Laundry Care — Lekki Branch",
        address: "45 Fola Osibo Street",
        city: "Lekki Phase 1",
        phone: "+2348023456789",
        isMainStore: false,
        status: "active",
        ownerUserId,
      },
      {
        id: ikejaStoreId,
        name: "Laundry Care — Ikeja Branch",
        address: "18 Allen Avenue",
        city: "Ikeja",
        phone: "+2348034567890",
        isMainStore: false,
        status: "active",
        ownerUserId,
      },
    ],
    assignments: [
      {
        id: "ASG-001",
        storeId: lekkiStoreId,
        email: "chioma@laundrycare.ng",
        name: "Chioma Okafor",
        role: "manager",
        permissionLevel: "manager",
        status: "active",
      },
      {
        id: "ASG-002",
        storeId: ikejaStoreId,
        email: "emeka@laundrycare.ng",
        name: "Emeka Nwosu",
        role: "sub_admin",
        permissionLevel: "staff",
        status: "active",
      },
      {
        id: "ASG-003",
        storeId: ikejaStoreId,
        email: "chioma@laundrycare.ng",
        name: "Chioma Okafor",
        role: "manager",
        permissionLevel: "manager",
        status: "active",
      },
      {
        id: "ASG-004",
        storeId: mainStoreId,
        email: "fatima@laundrycare.ng",
        name: "Fatima Bello",
        role: "sub_admin",
        permissionLevel: "viewer",
        status: "active",
      },
      {
        id: "ASG-005",
        storeId: lekkiStoreId,
        email: "fatima@laundrycare.ng",
        name: "Fatima Bello",
        role: "sub_admin",
        permissionLevel: "viewer",
        status: "active",
      },
    ],
  };
}

export function loadStoresState(): StoresState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoresState;
  } catch {
    return null;
  }
}

export function saveStoresState(state: StoresState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getAssignmentsForStore(
  storeId: string,
  assignments: StoreAssignment[],
) {
  return assignments.filter(
    (assignment) => assignment.storeId === storeId && assignment.status === "active",
  );
}

export function getStoreRoleLabel(role: StoreRole) {
  switch (role) {
    case "owner":
      return "Owner";
    case "manager":
      return "Manager";
    case "sub_admin":
      return "Sub-admin";
  }
}

export function getStoreRoleForPermissionLevel(
  permissionLevel: AdminPermissionLevel,
): Exclude<StoreRole, "owner"> {
  return permissionLevel === "manager" || permissionLevel === "full_admin"
    ? "manager"
    : "sub_admin";
}

export function syncAssignmentsForSubAdmin(
  assignments: StoreAssignment[],
  values: {
    name: string;
    email: string;
    permissionLevel: AdminPermissionLevel;
    status: StoreAssignment["status"];
    storeIds: string[];
  },
  previousEmail?: string,
): StoreAssignment[] {
  const targetEmail = values.email.toLowerCase();
  const emailsToReplace = new Set([targetEmail]);
  if (previousEmail && previousEmail.toLowerCase() !== targetEmail) {
    emailsToReplace.add(previousEmail.toLowerCase());
  }

  const remaining = assignments.filter(
    (assignment) => !emailsToReplace.has(assignment.email.toLowerCase()),
  );

  const role = getStoreRoleForPermissionLevel(values.permissionLevel);
  const nextAssignments: StoreAssignment[] = [];

  for (const storeId of values.storeIds) {
    nextAssignments.push({
      id: createAssignmentId([...remaining, ...nextAssignments]),
      storeId,
      email: values.email,
      name: values.name,
      role,
      permissionLevel: values.permissionLevel,
      status: values.status,
    });
  }

  return [...remaining, ...nextAssignments];
}

export function removeAssignmentsForEmail(
  assignments: StoreAssignment[],
  email: string,
) {
  const normalized = email.toLowerCase();
  return assignments.filter(
    (assignment) => assignment.email.toLowerCase() !== normalized,
  );
}
