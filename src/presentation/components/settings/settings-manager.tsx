"use client";

import { useCallback, useEffect, useState } from "react";
import type { SubAdmin } from "@/presentation/data/account-mock-data";
import { createSubAdminId, initialSubAdmins } from "@/presentation/data/account-mock-data";
import {
  getDefaultStoresState,
  loadStoresState,
  removeAssignmentsForEmail,
  saveStoresState,
  syncAssignmentsForSubAdmin,
} from "@/presentation/data/stores-data";
import type { Store, StoreAssignment } from "@/presentation/data/stores-data";
import { AdminManagementSection } from "@/presentation/components/account/admin-management-section";
import { StoreManagementSection } from "@/presentation/components/account/store-management-section";
import type { SubAdminFormValues } from "@/presentation/components/account/sub-admin-modal";
import {
  SettingsSectionNav,
  type SettingsSection,
} from "@/presentation/components/settings/settings-section-nav";
import { useDashboardAccess } from "@/presentation/components/dashboard/dashboard-access-context";

export function SettingsManager() {
  const { permissions } = useDashboardAccess();
  const showAdminManagement = permissions.adminManagement;
  const [activeSection, setActiveSection] = useState<SettingsSection>("stores");
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>(initialSubAdmins);
  const defaultStores = getDefaultStoresState();
  const [stores, setStores] = useState<Store[]>(defaultStores.stores);
  const [storeAssignments, setStoreAssignments] = useState<StoreAssignment[]>(
    defaultStores.assignments,
  );

  useEffect(() => {
    const saved = loadStoresState();
    if (!saved) return;
    setStores(saved.stores);
    setStoreAssignments(saved.assignments);
  }, []);

  const persistStores = useCallback(
    (nextStores: Store[], nextAssignments: StoreAssignment[]) => {
      setStores(nextStores);
      setStoreAssignments(nextAssignments);
      saveStoresState({ stores: nextStores, assignments: nextAssignments });
    },
    [],
  );

  const handleSaveStores = useCallback(
    (nextStores: Store[]) => {
      persistStores(nextStores, storeAssignments);
    },
    [persistStores, storeAssignments],
  );

  const handleSaveAssignments = useCallback(
    (nextAssignments: StoreAssignment[]) => {
      persistStores(stores, nextAssignments);
    },
    [persistStores, stores],
  );

  const handleAddSubAdmin = useCallback(
    (values: SubAdminFormValues) => {
      const newAdmin: SubAdmin = {
        id: createSubAdminId(subAdmins),
        name: values.name,
        email: values.email,
        permissionLevel: values.permissionLevel,
        permissions: values.permissions,
        status: values.status,
        storeIds: values.storeIds,
        lastActive: "Just now",
      };
      setSubAdmins((prev) => [newAdmin, ...prev]);
      persistStores(
        stores,
        syncAssignmentsForSubAdmin(storeAssignments, values),
      );
    },
    [persistStores, storeAssignments, stores, subAdmins],
  );

  const handleUpdateSubAdmin = useCallback(
    (id: string, values: SubAdminFormValues) => {
      const previousEmail = subAdmins.find((admin) => admin.id === id)?.email;
      setSubAdmins((prev) =>
        prev.map((admin) =>
          admin.id === id
            ? {
                ...admin,
                name: values.name,
                email: values.email,
                permissionLevel: values.permissionLevel,
                permissions: values.permissions,
                status: values.status,
                storeIds: values.storeIds,
              }
            : admin,
        ),
      );
      persistStores(
        stores,
        syncAssignmentsForSubAdmin(
          storeAssignments,
          values,
          previousEmail,
        ),
      );
    },
    [persistStores, storeAssignments, stores, subAdmins],
  );

  const handleRemoveSubAdmin = useCallback(
    (id: string) => {
      const admin = subAdmins.find((item) => item.id === id);
      setSubAdmins((prev) => prev.filter((item) => item.id !== id));
      if (admin) {
        persistStores(
          stores,
          removeAssignmentsForEmail(storeAssignments, admin.email),
        );
      }
    },
    [persistStores, storeAssignments, stores, subAdmins],
  );

  const handleToggleSubAdminStatus = useCallback((id: string) => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "active" ? "inactive" : "active",
            }
          : admin,
      ),
    );
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-slate-600" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage store locations and team access for your business.
            </p>
          </div>
        </div>
        <SettingsSectionNav
          active={activeSection}
          onChange={setActiveSection}
          showAdminManagement={showAdminManagement}
        />
      </div>

      {activeSection === "stores" ? (
        <StoreManagementSection
          stores={stores}
          assignments={storeAssignments}
          onSaveStores={handleSaveStores}
          onSaveAssignments={handleSaveAssignments}
        />
      ) : null}

      {activeSection === "admins" && showAdminManagement ? (
        <AdminManagementSection
          admins={subAdmins}
          stores={stores}
          onAdd={handleAddSubAdmin}
          onUpdate={handleUpdateSubAdmin}
          onRemove={handleRemoveSubAdmin}
          onToggleStatus={handleToggleSubAdminStatus}
        />
      ) : null}
    </div>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3V5M12 19V21M5 12H3M21 12H19M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
