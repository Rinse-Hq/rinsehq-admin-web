import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";
import type {
  Store,
  StoreAccess,
  StoreAssignment,
  StoresState,
} from "@/presentation/data/stores-data";
import {
  createAssignmentId,
  createStoreId,
  getDefaultStoresState,
} from "@/presentation/data/stores-data";

type CreateMainStoreInput = {
  ownerUserId: string;
  businessName?: string;
};

type AssignMemberInput = {
  storeId: string;
  email: string;
  name: string;
  role: StoreAssignment["role"];
  permissionLevel: AdminPermissionLevel;
};

const ownerStores = new Map<string, StoresState>();

function normalizeEmail(email: string) {
  return email.toLowerCase().trim();
}

function getOrCreateOwnerState(ownerUserId: string): StoresState {
  const existing = ownerStores.get(ownerUserId);
  if (existing) return existing;

  const state = getDefaultStoresState(ownerUserId);
  ownerStores.set(ownerUserId, state);
  return state;
}

export class InMemoryStoreRepository {
  createMainStore(input: CreateMainStoreInput): Store {
    const businessName = input.businessName?.trim() || "My Laundry";
    const store: Store = {
      id: createStoreId([]),
      name: `${businessName} — Main Store`,
      address: "",
      city: "",
      phone: "",
      isMainStore: true,
      status: "active",
      ownerUserId: input.ownerUserId,
    };

    ownerStores.set(input.ownerUserId, {
      stores: [store],
      assignments: [],
    });

    return store;
  }

  seedOwnerStores(ownerUserId: string, email: string) {
    if (ownerStores.has(ownerUserId)) return;

    if (normalizeEmail(email) === "demo@rinsehq.com") {
      ownerStores.set(ownerUserId, getDefaultStoresState(ownerUserId));
      return;
    }

    getOrCreateOwnerState(ownerUserId);
  }

  getOwnerState(ownerUserId: string): StoresState {
    return getOrCreateOwnerState(ownerUserId);
  }

  getAccessibleStores(userId: string, email: string): StoreAccess[] {
    const normalizedEmail = normalizeEmail(email);
    const access: StoreAccess[] = [];

    const ownedState = ownerStores.get(userId);
    if (ownedState) {
      for (const store of ownedState.stores) {
        if (store.status !== "active") continue;
        access.push({
          storeId: store.id,
          storeName: store.name,
          address: store.address,
          city: store.city,
          isMainStore: store.isMainStore,
          role: "owner",
          permissionLevel: "full_admin",
        });
      }
    }

    for (const state of ownerStores.values()) {
      for (const assignment of state.assignments) {
        if (
          normalizeEmail(assignment.email) !== normalizedEmail ||
          assignment.status !== "active"
        ) {
          continue;
        }

        const store = state.stores.find(
          (item) => item.id === assignment.storeId && item.status === "active",
        );
        if (!store) continue;

        if (access.some((item) => item.storeId === store.id)) continue;

        access.push({
          storeId: store.id,
          storeName: store.name,
          address: store.address,
          city: store.city,
          isMainStore: store.isMainStore,
          role: assignment.role,
          permissionLevel: assignment.permissionLevel,
        });
      }
    }

    return access.sort((a, b) => {
      if (a.isMainStore !== b.isMainStore) return a.isMainStore ? -1 : 1;
      return a.storeName.localeCompare(b.storeName);
    });
  }

  getStoreById(storeId: string, userId: string, email: string): StoreAccess | null {
    return (
      this.getAccessibleStores(userId, email).find(
        (store) => store.storeId === storeId,
      ) ?? null
    );
  }

  replaceOwnerState(ownerUserId: string, state: StoresState) {
    ownerStores.set(ownerUserId, state);
  }

  assignMember(ownerUserId: string, input: AssignMemberInput): StoreAssignment {
    const state = getOrCreateOwnerState(ownerUserId);
    const assignment: StoreAssignment = {
      id: createAssignmentId(state.assignments),
      storeId: input.storeId,
      email: normalizeEmail(input.email),
      name: input.name,
      role: input.role,
      permissionLevel: input.permissionLevel,
      status: "active",
    };
    state.assignments = [...state.assignments, assignment];
    ownerStores.set(ownerUserId, state);
    return assignment;
  }
}

export const storeRepository = new InMemoryStoreRepository();
