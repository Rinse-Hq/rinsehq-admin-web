"use client";

import { useEffect, useState } from "react";
import type {
  AdminPermissionLevel,
  AdminPermissions,
  SubAdmin,
} from "@/presentation/data/account-mock-data";
import {
  permissionLabels,
  permissionLevelDescriptions,
  permissionLevelLabels,
  permissionPresets,
} from "@/presentation/data/account-mock-data";
import type { Store } from "@/presentation/data/stores-data";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/lib/utils";

export type SubAdminFormValues = {
  name: string;
  email: string;
  permissionLevel: AdminPermissionLevel;
  permissions: AdminPermissions;
  status: SubAdmin["status"];
  storeIds: string[];
};

type SubAdminModalProps = {
  open: boolean;
  admin?: SubAdmin | null;
  stores: Store[];
  onClose: () => void;
  onSave: (values: SubAdminFormValues) => void;
};

const emptyForm: SubAdminFormValues = {
  name: "",
  email: "",
  permissionLevel: "staff",
  permissions: permissionPresets.staff,
  status: "active",
  storeIds: [],
};

export function SubAdminModal({
  open,
  admin,
  stores,
  onClose,
  onSave,
}: SubAdminModalProps) {
  const [form, setForm] = useState<SubAdminFormValues>(emptyForm);
  const isEditing = !!admin;
  const activeStores = stores.filter((store) => store.status === "active");

  useEffect(() => {
    if (!open) return;

    if (admin) {
      setForm({
        name: admin.name,
        email: admin.email,
        permissionLevel: admin.permissionLevel,
        permissions: { ...admin.permissions },
        status: admin.status,
        storeIds: [...admin.storeIds],
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, admin]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    if (form.storeIds.length === 0) return;
    onSave(form);
  }

  function updateField<K extends keyof SubAdminFormValues>(
    key: K,
    value: SubAdminFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleLevelChange(level: AdminPermissionLevel) {
    setForm((prev) => ({
      ...prev,
      permissionLevel: level,
      permissions: { ...permissionPresets[level] },
    }));
  }

  function togglePermission(key: keyof AdminPermissions) {
    setForm((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key],
      },
    }));
  }

  const storeError = form.storeIds.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sub-admin-form-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2
          id="sub-admin-form-title"
          className="pr-10 font-serif text-xl font-bold text-slate-900"
        >
          {isEditing ? "Edit sub-admin" : "Add sub-admin"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {isEditing
            ? "Update access level and permissions for this team member."
            : "Invite a team member with a specific permission level."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            name="name"
            label="Full name"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />

          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <StoreAssignmentPicker
            stores={activeStores}
            selectedStoreIds={form.storeIds}
            onChange={(storeIds) => updateField("storeIds", storeIds)}
            error={storeError}
          />

          <div className="space-y-2">
            <label
              htmlFor="permissionLevel"
              className="block text-sm font-medium text-slate-800"
            >
              Permission level
            </label>
            <select
              id="permissionLevel"
              value={form.permissionLevel}
              onChange={(e) =>
                handleLevelChange(e.target.value as AdminPermissionLevel)
              }
              className="flat-input"
            >
              {(Object.keys(permissionLevelLabels) as AdminPermissionLevel[]).map(
                (level) => (
                  <option key={level} value={level}>
                    {permissionLevelLabels[level]}
                  </option>
                ),
              )}
            </select>
            <p className="text-xs text-slate-500">
              {permissionLevelDescriptions[form.permissionLevel]}
            </p>
          </div>

          <fieldset className="space-y-3 rounded-md border border-slate-200 p-4">
            <legend className="px-1 text-sm font-medium text-slate-800">
              Permissions
            </legend>
            <p className="text-xs text-slate-500">
              Fine-tune access beyond the preset level.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(permissionLabels) as (keyof AdminPermissions)[]).map(
                (key) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={form.permissions[key]}
                      onChange={() => togglePermission(key)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                    />
                    {permissionLabels[key]}
                  </label>
                ),
              )}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-slate-800">
              Status
            </label>
            <select
              id="status"
              value={form.status}
              onChange={(e) =>
                updateField("status", e.target.value as SubAdmin["status"])
              }
              className="flat-input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flat-btn-outline h-10 w-auto px-6"
            >
              Cancel
            </button>
            <button type="submit" className="flat-btn-primary h-10 w-auto px-6">
              {isEditing ? "Save changes" : "Add sub-admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StoreAssignmentPicker({
  stores,
  selectedStoreIds,
  onChange,
  error,
}: {
  stores: Store[];
  selectedStoreIds: string[];
  onChange: (storeIds: string[]) => void;
  error?: boolean;
}) {
  const allStoreIds = stores.map((store) => store.id);
  const allSelected =
    allStoreIds.length > 0 &&
    allStoreIds.every((id) => selectedStoreIds.includes(id));
  const someSelected = selectedStoreIds.length > 0 && !allSelected;

  function toggleAll() {
    onChange(allSelected ? [] : [...allStoreIds]);
  }

  function toggleStore(storeId: string) {
    if (selectedStoreIds.includes(storeId)) {
      onChange(selectedStoreIds.filter((id) => id !== storeId));
      return;
    }
    onChange([...selectedStoreIds, storeId]);
  }

  return (
    <fieldset className="space-y-2">
      <legend className="block text-sm font-medium text-slate-800">
        Assigned stores
      </legend>

      {stores.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-500">
          No active stores available. Add a store first.
        </p>
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-md border",
            error ? "border-red-300" : "border-slate-200",
          )}
        >
          <label className="flex cursor-pointer items-start gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100/80">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={toggleAll}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-900">
                All stores
              </span>
              <span className="block text-xs text-slate-500">
                Grant access to every active location
              </span>
            </span>
          </label>

          <div className="max-h-48 overflow-y-auto">
            {stores.map((store) => {
              const checked = selectedStoreIds.includes(store.id);

              return (
                <label
                  key={store.id}
                  className="flex cursor-pointer items-start gap-3 border-b border-slate-50 px-4 py-3 last:border-b-0 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleStore(store.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">
                        {store.name}
                      </span>
                      {store.isMainStore ? (
                        <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
                          Main
                        </span>
                      ) : null}
                    </span>
                    <span className="block text-xs text-slate-500">{store.city}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        {stores.length === 0
          ? "Assign at least one store before saving."
          : allSelected
            ? `All ${stores.length} stores selected.`
            : selectedStoreIds.length > 0
              ? `${selectedStoreIds.length} of ${stores.length} stores selected.`
              : "Select one or more stores, or choose All stores."}
      </p>
      {error ? (
        <p className="text-xs text-red-600">Assign at least one store.</p>
      ) : null}
    </fieldset>
  );
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
