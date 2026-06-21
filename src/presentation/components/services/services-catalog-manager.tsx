"use client";

import { useCallback, useState } from "react";
import type { Service } from "@/presentation/data/services-mock-data";
import { initialServices } from "@/presentation/data/services-mock-data";
import {
  ServiceFormModal,
  type ServiceFormValues,
} from "@/presentation/components/services/service-form-modal";
import { ServicesSummaryCards } from "@/presentation/components/services/services-summary-cards";
import { ServicesTable } from "@/presentation/components/services/services-table";
import { ServicesViewNav } from "@/presentation/components/services/services-view-nav";

function formatToday() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

function createServiceId(existing: Service[]) {
  const max = existing.reduce((highest, service) => {
    const num = Number.parseInt(service.id.replace("SRV-", ""), 10);
    return Number.isNaN(num) ? highest : Math.max(highest, num);
  }, 0);
  return `SRV-${String(max + 1).padStart(3, "0")}`;
}

export function ServicesCatalogManager() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const openCreateModal = useCallback(() => {
    setEditingService(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingService(null);
  }, []);

  const handleSave = useCallback(
    (values: ServiceFormValues) => {
      if (editingService) {
        setServices((prev) =>
          prev.map((service) =>
            service.id === editingService.id
              ? {
                  ...service,
                  ...values,
                  updatedAt: formatToday(),
                }
              : service,
          ),
        );
      } else {
        const newService: Service = {
          id: createServiceId(services),
          ...values,
          ordersCount: 0,
          updatedAt: formatToday(),
        };
        setServices((prev) => [newService, ...prev]);
      }
      closeModal();
    },
    [closeModal, editingService, services],
  );

  const handleToggleStatus = useCallback((service: Service) => {
    setServices((prev) =>
      prev.map((item) =>
        item.id === service.id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
              updatedAt: formatToday(),
            }
          : item,
      ),
    );
  }, []);

  const handleDelete = useCallback((service: Service) => {
    const confirmed = window.confirm(
      `Delete "${service.name}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    setServices((prev) => prev.filter((item) => item.id !== service.id));
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Services</h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your laundry service catalog, pricing, and availability.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ServicesViewNav />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <ServicesSummaryCards services={services} />
        <ServicesTable
          services={services}
          onAdd={openCreateModal}
          onEdit={openEditModal}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>

      <ServiceFormModal
        open={modalOpen}
        service={editingService}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}
