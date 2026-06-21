"use client";

import { useEffect, useState } from "react";
import type { Store } from "@/presentation/data/stores-data";
import { Input } from "@/presentation/components/ui/input";

export type StoreFormValues = {
  name: string;
  address: string;
  city: string;
  phone: string;
  status: Store["status"];
};

type StoreFormModalProps = {
  open: boolean;
  store?: Store | null;
  onClose: () => void;
  onSave: (values: StoreFormValues) => void;
};

const emptyForm: StoreFormValues = {
  name: "",
  address: "",
  city: "",
  phone: "",
  status: "active",
};

export function StoreFormModal({
  open,
  store,
  onClose,
  onSave,
}: StoreFormModalProps) {
  const [form, setForm] = useState<StoreFormValues>(emptyForm);
  const isEditing = !!store;

  useEffect(() => {
    if (!open) return;

    if (store) {
      setForm({
        name: store.name,
        address: store.address,
        city: store.city,
        phone: store.phone,
        status: store.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, store]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  }

  function updateField<K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-form-title"
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
          ×
        </button>

        <h2
          id="store-form-title"
          className="pr-10 font-serif text-xl font-bold text-slate-900"
        >
          {isEditing ? "Edit store" : "Add store"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            name="name"
            label="Store name"
            placeholder="e.g. Laundry Care — Ikeja Branch"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
          <Input
            name="address"
            label="Address"
            placeholder="Street address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
          <Input
            name="city"
            label="City"
            placeholder="City"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
          <Input
            name="phone"
            label="Phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          <div className="space-y-2">
            <label htmlFor="storeStatus" className="block text-sm font-medium text-slate-800">
              Status
            </label>
            <select
              id="storeStatus"
              value={form.status}
              onChange={(e) =>
                updateField("status", e.target.value as Store["status"])
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
              {isEditing ? "Save changes" : "Add store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
