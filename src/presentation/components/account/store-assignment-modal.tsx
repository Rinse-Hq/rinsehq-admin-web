"use client";

import { useEffect, useState } from "react";
import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";
import { permissionLevelLabels } from "@/presentation/data/account-mock-data";
import type { Store, StoreAssignment } from "@/presentation/data/stores-data";
import { Input } from "@/presentation/components/ui/input";

export type StoreAssignmentFormValues = {
  name: string;
  email: string;
  role: StoreAssignment["role"];
  permissionLevel: AdminPermissionLevel;
  status: StoreAssignment["status"];
};

type StoreAssignmentModalProps = {
  open: boolean;
  store: Store | null;
  assignment?: StoreAssignment | null;
  onClose: () => void;
  onSave: (values: StoreAssignmentFormValues) => void;
};

const emptyForm: StoreAssignmentFormValues = {
  name: "",
  email: "",
  role: "manager",
  permissionLevel: "manager",
  status: "active",
};

export function StoreAssignmentModal({
  open,
  store,
  assignment,
  onClose,
  onSave,
}: StoreAssignmentModalProps) {
  const [form, setForm] = useState<StoreAssignmentFormValues>(emptyForm);
  const isEditing = !!assignment;

  useEffect(() => {
    if (!open) return;

    if (assignment) {
      setForm({
        name: assignment.name,
        email: assignment.email,
        role: assignment.role,
        permissionLevel: assignment.permissionLevel,
        status: assignment.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, assignment]);

  if (!open || !store) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSave(form);
  }

  function updateField<K extends keyof StoreAssignmentFormValues>(
    key: K,
    value: StoreAssignmentFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleRoleChange(role: StoreAssignment["role"]) {
    const permissionLevel = role === "manager" ? "manager" : "staff";
    setForm((prev) => ({
      ...prev,
      role,
      permissionLevel,
    }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-assignment-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-md border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="store-assignment-title" className="font-serif text-xl font-bold text-slate-900">
          {isEditing ? "Edit assignment" : "Assign team member"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Assign a manager or sub-admin to <span className="font-medium">{store.name}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            name="name"
            label="Full name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
          <Input
            name="email"
            type="email"
            label="Email address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <div className="space-y-2">
            <label htmlFor="storeRole" className="block text-sm font-medium text-slate-800">
              Role at this store
            </label>
            <select
              id="storeRole"
              value={form.role}
              onChange={(e) =>
                handleRoleChange(e.target.value as StoreAssignment["role"])
              }
              className="flat-input"
            >
              <option value="manager">Manager</option>
              <option value="sub_admin">Sub-admin</option>
            </select>
          </div>

          {form.role === "sub_admin" ? (
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
                  updateField(
                    "permissionLevel",
                    e.target.value as AdminPermissionLevel,
                  )
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
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="assignmentStatus" className="block text-sm font-medium text-slate-800">
              Status
            </label>
            <select
              id="assignmentStatus"
              value={form.status}
              onChange={(e) =>
                updateField("status", e.target.value as StoreAssignment["status"])
              }
              className="flat-input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="flat-btn-outline h-10 w-auto px-6">
              Cancel
            </button>
            <button type="submit" className="flat-btn-primary h-10 w-auto px-6">
              {isEditing ? "Save changes" : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
