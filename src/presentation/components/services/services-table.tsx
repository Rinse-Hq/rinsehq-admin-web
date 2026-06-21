"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  LaundryMode,
  Service,
  ServiceCategory,
  ServiceStatus,
} from "@/presentation/data/services-mock-data";
import {
  formatNaira,
  getCategoryLabel,
  getPricingUnitLabel,
  laundryModes,
  serviceCategories,
} from "@/presentation/data/services-mock-data";
import { cn } from "@/presentation/lib/utils";

const statusStyles: Record<
  ServiceStatus,
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

type ServicesTableProps = {
  services: Service[];
  onAdd: () => void;
  onEdit: (service: Service) => void;
  onToggleStatus: (service: Service) => void;
  onDelete: (service: Service) => void;
};

export function ServicesTable({
  services,
  onAdd,
  onEdit,
  onToggleStatus,
  onDelete,
}: ServicesTableProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | "all">(
    "all",
  );
  const [modeFilter, setModeFilter] = useState<LaundryMode | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | "all">("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return services.filter((service) => {
      if (categoryFilter !== "all" && service.category !== categoryFilter) {
        return false;
      }
      if (modeFilter !== "all" && service.laundryMode !== modeFilter) {
        return false;
      }
      if (statusFilter !== "all" && service.status !== statusFilter) {
        return false;
      }
      if (!normalized) return true;

      return (
        service.name.toLowerCase().includes(normalized) ||
        service.id.toLowerCase().includes(normalized) ||
        service.description.toLowerCase().includes(normalized)
      );
    });
  }, [services, query, categoryFilter, modeFilter, statusFilter]);

  return (
    <article className="flat-card overflow-hidden">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-semibold text-slate-800">
            Service catalog
          </h2>
          <button
            type="button"
            onClick={onAdd}
            className="flat-btn-primary h-10 w-auto px-6"
          >
            Add service
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search services"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 min-w-[140px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:max-w-[220px]"
          />
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as ServiceCategory | "all")
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="all">All categories</option>
            {serviceCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            value={modeFilter}
            onChange={(e) =>
              setModeFilter(e.target.value as LaundryMode | "all")
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="all">All modes</option>
            {laundryModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ServiceStatus | "all")
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <p className="ml-auto text-sm text-slate-500">
            {filtered.length} of {services.length} services
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500">
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Laundry mode</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Turnaround</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  No services match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((service) => (
                <ServiceTableRow
                  key={service.id}
                  service={service}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function ServiceTableRow({
  service,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  service: Service;
  onEdit: (service: Service) => void;
  onToggleStatus: (service: Service) => void;
  onDelete: (service: Service) => void;
}) {
  const status = statusStyles[service.status];

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50">
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/services/${service.id}`}
          className="font-medium text-brand-600 hover:underline"
        >
          {service.name}
        </Link>
        <p className="mt-0.5 font-mono text-xs text-slate-400">{service.id}</p>
      </td>
      <td className="px-4 py-3 text-slate-600">
        {getCategoryLabel(service.category)}
      </td>
      <td className="px-4 py-3 text-slate-600">{service.laundryMode}</td>
      <td className="px-4 py-3">
        <span className="font-medium text-slate-800">
          {formatNaira(service.unitPrice)}
        </span>
        <span className="mt-0.5 block text-xs text-slate-400">
          {getPricingUnitLabel(service.pricingUnit)}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-600">
        {service.turnaroundHours > 0
          ? `${service.turnaroundHours}h`
          : "Add-on"}
      </td>
      <td className="px-4 py-3 text-slate-600">{service.ordersCount}</td>
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
            status.className,
          )}
        >
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(service)}
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onToggleStatus(service)}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            {service.status === "active" ? "Deactivate" : "Activate"}
          </button>
          <button
            type="button"
            onClick={() => onDelete(service)}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
