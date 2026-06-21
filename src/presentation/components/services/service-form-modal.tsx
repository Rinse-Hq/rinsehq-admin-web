"use client";

import { useEffect, useState } from "react";
import type {
  LaundryMode,
  PricingUnit,
  Service,
  ServiceCategory,
  ServiceStatus,
} from "@/presentation/data/services-mock-data";
import {
  laundryModes,
  pricingUnits,
  serviceCategories,
} from "@/presentation/data/services-mock-data";
import { Input } from "@/presentation/components/ui/input";

export type ServiceFormValues = {
  name: string;
  category: ServiceCategory;
  laundryMode: LaundryMode;
  unitPrice: number;
  pricingUnit: PricingUnit;
  turnaroundHours: number;
  status: ServiceStatus;
  description: string;
};

type ServiceFormModalProps = {
  open: boolean;
  service?: Service | null;
  onClose: () => void;
  onSave: (values: ServiceFormValues) => void;
};

const emptyForm: ServiceFormValues = {
  name: "",
  category: "wash",
  laundryMode: "Wash system",
  unitPrice: 0,
  pricingUnit: "per_item",
  turnaroundHours: 24,
  status: "active",
  description: "",
};

export function ServiceFormModal({
  open,
  service,
  onClose,
  onSave,
}: ServiceFormModalProps) {
  const [form, setForm] = useState<ServiceFormValues>(emptyForm);
  const isEditing = !!service;

  useEffect(() => {
    if (!open) return;

    if (service) {
      setForm({
        name: service.name,
        category: service.category,
        laundryMode: service.laundryMode,
        unitPrice: service.unitPrice,
        pricingUnit: service.pricingUnit,
        turnaroundHours: service.turnaroundHours,
        status: service.status,
        description: service.description,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, service]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  }

  function updateField<K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-form-title"
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
          id="service-form-title"
          className="pr-10 font-serif text-xl font-bold text-slate-900"
        >
          {isEditing ? "Edit service" : "Add service"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {isEditing
            ? "Update pricing, category, or availability for this service."
            : "Create a new laundry service for your catalog."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            name="name"
            label="Service name"
            placeholder="e.g. Wash & Fold"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />

          <SelectField
            label="Category"
            value={form.category}
            onChange={(value) => updateField("category", value as ServiceCategory)}
            options={serviceCategories.map((c) => ({
              value: c.value,
              label: c.label,
            }))}
          />

          <SelectField
            label="Laundry mode"
            value={form.laundryMode}
            onChange={(value) => updateField("laundryMode", value as LaundryMode)}
            options={laundryModes.map((mode) => ({ value: mode, label: mode }))}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="unitPrice"
              type="number"
              min={0}
              step={50}
              label="Unit price (₦)"
              value={form.unitPrice || ""}
              onChange={(e) => updateField("unitPrice", Number(e.target.value))}
              required
            />
            <SelectField
              label="Pricing unit"
              value={form.pricingUnit}
              onChange={(value) => updateField("pricingUnit", value as PricingUnit)}
              options={pricingUnits.map((u) => ({
                value: u.value,
                label: u.label,
              }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="turnaroundHours"
              type="number"
              min={0}
              label="Turnaround (hours)"
              value={form.turnaroundHours}
              onChange={(e) =>
                updateField("turnaroundHours", Number(e.target.value))
              }
            />
            <SelectField
              label="Status"
              value={form.status}
              onChange={(value) => updateField("status", value as ServiceStatus)}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-800"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Brief description for staff and customers"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="flat-input min-h-[80px] resize-none py-3"
            />
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
              {isEditing ? "Save changes" : "Add service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flat-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
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
