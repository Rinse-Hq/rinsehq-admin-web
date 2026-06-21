"use client";

import { useCallback, useMemo, useState } from "react";
import type { SubAdmin } from "@/presentation/data/account-mock-data";
import {
  permissionLevelLabels,
  permissionLabels,
} from "@/presentation/data/account-mock-data";
import type { Store } from "@/presentation/data/stores-data";
import { cn } from "@/presentation/lib/utils";
import {
  SubAdminModal,
  type SubAdminFormValues,
} from "@/presentation/components/account/sub-admin-modal";

const statusStyles: Record<
  SubAdmin["status"],
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-green-50 text-green-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-600",
  },
};

type AdminManagementSectionProps = {
  admins: SubAdmin[];
  stores: Store[];
  onAdd: (values: SubAdminFormValues) => void;
  onUpdate: (id: string, values: SubAdminFormValues) => void;
  onRemove: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export function AdminManagementSection({
  admins,
  stores,
  onAdd,
  onUpdate,
  onRemove,
  onToggleStatus,
}: AdminManagementSectionProps) {
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<SubAdmin | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return admins;

    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(normalized) ||
        admin.email.toLowerCase().includes(normalized) ||
        admin.id.toLowerCase().includes(normalized),
    );
  }, [admins, query]);

  const openCreateModal = useCallback(() => {
    setEditingAdmin(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((admin: SubAdmin) => {
    setEditingAdmin(admin);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingAdmin(null);
  }, []);

  const handleSave = useCallback(
    (values: SubAdminFormValues) => {
      if (editingAdmin) {
        onUpdate(editingAdmin.id, values);
      } else {
        onAdd(values);
      }
      closeModal();
    },
    [closeModal, editingAdmin, onAdd, onUpdate],
  );

  return (
    <>
      <article className="flat-card overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-slate-900">
                Admin management
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add sub-admins and assign permission levels for your team.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="flat-btn-primary h-10 w-auto shrink-0 px-5"
            >
              Add sub-admin
            </button>
          </div>

          <div className="mt-4">
            <input
              type="search"
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Admin</th>
                <th className="px-5 py-3">Stores</th>
                <th className="px-5 py-3">Permission level</th>
                <th className="px-5 py-3">Access</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Last active</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                    No sub-admins found.
                  </td>
                </tr>
              ) : (
                filtered.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{admin.name}</p>
                          <p className="text-xs text-slate-500">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StoreBadges storeIds={admin.storeIds} stores={stores} />
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                        {permissionLevelLabels[admin.permissionLevel]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <PermissionBadges permissions={admin.permissions} />
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          statusStyles[admin.status].className,
                        )}
                      >
                        {statusStyles[admin.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {admin.lastActive ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(admin)}
                          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(admin.id)}
                          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          {admin.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(admin.id)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </article>

      <SubAdminModal
        open={modalOpen}
        admin={editingAdmin}
        stores={stores}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}

function StoreBadges({
  storeIds,
  stores,
}: {
  storeIds: string[];
  stores: Store[];
}) {
  if (storeIds.length === 0) {
    return <span className="text-xs text-slate-400">No stores</span>;
  }

  const assignedStores = storeIds
    .map((id) => stores.find((store) => store.id === id))
    .filter((store): store is Store => !!store);

  const visible = assignedStores.slice(0, 2);
  const remaining = assignedStores.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((store) => (
        <span
          key={store.id}
          className="inline-flex rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
        >
          {store.city}
        </span>
      ))}
      {remaining > 0 ? (
        <span className="inline-flex rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}

function PermissionBadges({
  permissions,
}: {
  permissions: SubAdmin["permissions"];
}) {
  const enabled = (Object.keys(permissions) as (keyof typeof permissions)[]).filter(
    (key) => permissions[key],
  );

  if (enabled.length === 0) {
    return <span className="text-xs text-slate-400">No access</span>;
  }

  const visible = enabled.slice(0, 3);
  const remaining = enabled.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((key) => (
        <span
          key={key}
          className="inline-flex rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
        >
          {permissionLabels[key]}
        </span>
      ))}
      {remaining > 0 ? (
        <span className="inline-flex rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}
