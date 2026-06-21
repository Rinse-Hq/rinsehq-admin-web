"use client";

import { useCallback, useEffect, useState } from "react";
import type { ServiceConfigItem } from "@/presentation/data/services-config-data";
import {
  createConfigItem,
  getDefaultServicesConfiguration,
  loadServicesConfiguration,
  saveServicesConfiguration,
} from "@/presentation/data/services-config-data";
import { AddServiceTypeModal } from "@/presentation/components/services/add-service-type-modal";
import { ServiceTypeGrid } from "@/presentation/components/services/service-type-grid";
import { ServicesViewNav } from "@/presentation/components/services/services-view-nav";

type AddTarget = "serviceTypes" | "orderTypes" | null;

export function ServicesConfigManager() {
  const defaults = getDefaultServicesConfiguration();
  const [laundryModes, setLaundryModes] =
    useState<ServiceConfigItem[]>(defaults.laundryModes);
  const [serviceTypes, setServiceTypes] =
    useState<ServiceConfigItem[]>(defaults.serviceTypes);
  const [orderTypes, setOrderTypes] =
    useState<ServiceConfigItem[]>(defaults.orderTypes);

  const [editingServiceTypes, setEditingServiceTypes] = useState(false);
  const [editingOrderTypes, setEditingOrderTypes] = useState(false);
  const [addTarget, setAddTarget] = useState<AddTarget>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadServicesConfiguration();
    if (!saved) return;

    setLaundryModes(saved.laundryModes);
    setServiceTypes(saved.serviceTypes);
    setOrderTypes(saved.orderTypes);
  }, []);

  useEffect(() => {
    if (!saveMessage) return;
    const timer = window.setTimeout(() => setSaveMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [saveMessage]);

  const markDirty = useCallback(() => {
    setIsDirty(true);
    setSaveMessage(null);
  }, []);

  const toggleLaundryMode = useCallback((id: string) => {
    markDirty();
    setLaundryModes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  }, [markDirty]);

  const toggleItem = useCallback(
    (setter: React.Dispatch<React.SetStateAction<ServiceConfigItem[]>>) =>
      (id: string) => {
        markDirty();
        setter((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, enabled: !item.enabled } : item,
          ),
        );
      },
    [markDirty],
  );

  const deleteItem = useCallback(
    (setter: React.Dispatch<React.SetStateAction<ServiceConfigItem[]>>) =>
      (id: string) => {
        markDirty();
        setter((prev) => prev.filter((item) => item.id !== id));
      },
    [markDirty],
  );

  const handleAddService = useCallback(
    (name: string) => {
      markDirty();
      const item = createConfigItem(name);
      if (addTarget === "serviceTypes") {
        setServiceTypes((prev) => [...prev, item]);
      } else if (addTarget === "orderTypes") {
        setOrderTypes((prev) => [...prev, item]);
      }
      setAddTarget(null);
    },
    [addTarget, markDirty],
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    saveServicesConfiguration({
      laundryModes,
      serviceTypes,
      orderTypes,
    });
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setIsSaving(false);
    setIsDirty(false);
    setSaveMessage("Configuration saved successfully.");
  }, [laundryModes, orderTypes, serviceTypes]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <ServiceIcon className="h-5 w-5 text-slate-600" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Service</h1>
            <p className="mt-1 text-sm text-slate-600">
              Configure laundry modes, service types, and fulfillment options.
            </p>
          </div>
        </div>
        <ServicesViewNav />
      </div>

      <div className="mt-6 space-y-6">
        <section className="flat-card p-6">
          <h2 className="text-sm font-semibold text-slate-800">
            Select laundry mode
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {laundryModes.map((mode) => (
              <label
                key={mode.id}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={mode.enabled}
                  onChange={() => toggleLaundryMode(mode.id)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-brand-500 focus:ring-1 focus:ring-brand-500"
                />
                <span>{mode.label}</span>
              </label>
            ))}
          </div>
        </section>

        <ServiceTypeGrid
          title="Search Service Type"
          items={serviceTypes}
          isEditing={editingServiceTypes}
          onToggleEdit={() => setEditingServiceTypes((prev) => !prev)}
          onToggleItem={toggleItem(setServiceTypes)}
          onDeleteItem={deleteItem(setServiceTypes)}
          onAddItem={() => setAddTarget("serviceTypes")}
        />

        <ServiceTypeGrid
          title="Search Service Type"
          items={orderTypes}
          isEditing={editingOrderTypes}
          onToggleEdit={() => setEditingOrderTypes((prev) => !prev)}
          onToggleItem={toggleItem(setOrderTypes)}
          onDeleteItem={deleteItem(setOrderTypes)}
          onAddItem={() => setAddTarget("orderTypes")}
        />

        <div className="flex flex-wrap items-center justify-end gap-4">
          {saveMessage ? (
            <p className="text-sm font-medium text-status-completed">{saveMessage}</p>
          ) : isDirty ? (
            <p className="text-sm text-slate-500">You have unsaved changes</p>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="flat-btn-primary h-10 w-auto min-w-[120px] px-8 disabled:opacity-50"
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <AddServiceTypeModal
        open={addTarget !== null}
        onClose={() => setAddTarget(null)}
        onSave={handleAddService}
      />
    </>
  );
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9H15M9 13H15M9 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
