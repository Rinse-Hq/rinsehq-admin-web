"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { Service } from "@/presentation/data/services-mock-data";
import {
  formatNaira,
  getCategoryLabel,
  getPricingUnitLabel,
} from "@/presentation/data/services-mock-data";
import { ServicesViewNav } from "@/presentation/components/services/services-view-nav";
import { cn } from "@/presentation/lib/utils";

const statusStyles = {
  active: {
    label: "Active",
    className: "bg-green-50 text-green-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-600",
  },
};

type ServiceDetailViewProps = {
  service: Service;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const status = statusStyles[service.status];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to catalog
          </Link>
          <h1 className="mt-3 font-serif text-2xl font-bold text-slate-900">
            {service.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-slate-500">{service.id}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ServicesViewNav />
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-sm font-medium",
              status.className,
            )}
          >
            {status.label}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="flat-card p-6 lg:col-span-1">
          <p className="text-sm text-slate-500">Unit price</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {formatNaira(service.unitPrice)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {getPricingUnitLabel(service.pricingUnit)}
          </p>
          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm">
            <DetailRow label="Category" value={getCategoryLabel(service.category)} />
            <DetailRow label="Laundry mode" value={service.laundryMode} />
            <DetailRow
              label="Turnaround"
              value={
                service.turnaroundHours > 0
                  ? `${service.turnaroundHours} hours`
                  : "Add-on (no extra time)"
              }
            />
            <DetailRow label="Total orders" value={String(service.ordersCount)} />
            <DetailRow label="Last updated" value={service.updatedAt} />
          </dl>
        </article>

        <div className="space-y-6 lg:col-span-2">
          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {service.description || "No description provided."}
            </p>
          </article>

          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Pricing breakdown
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <DetailRow label="Base price" value={formatNaira(service.unitPrice)} />
              <DetailRow
                label="Billing unit"
                value={getPricingUnitLabel(service.pricingUnit)}
              />
              <DetailRow label="Laundry mode" value={service.laundryMode} />
              <div className="flex justify-between border-t border-slate-100 pt-3 font-semibold text-slate-900">
                <dt>Customer pays</dt>
                <dd>{formatNaira(service.unitPrice)}</dd>
              </div>
            </dl>
          </article>

          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Usage
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This service has been used in{" "}
              <span className="font-semibold text-slate-900">
                {service.ordersCount}
              </span>{" "}
              orders.{" "}
              {service.status === "active"
                ? "It is currently available when creating new orders."
                : "It is inactive and hidden from new order flows."}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 sm:text-right">{value}</dd>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
