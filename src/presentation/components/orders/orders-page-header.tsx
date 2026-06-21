"use client";

import Link from "next/link";
import { AccessGate } from "@/presentation/components/dashboard/dashboard-access-guard";
import { useDashboardAccess } from "@/presentation/components/dashboard/dashboard-access-context";

export function OrdersPageHeader() {
  const { isReadOnly } = useDashboardAccess();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
        <p className="mt-2 text-sm text-slate-600">
          {isReadOnly
            ? "View customer orders for this store."
            : "Manage and create customer orders."}
        </p>
      </div>
      <AccessGate permission="orders">
        {!isReadOnly ? (
          <Link href="/dashboard/orders/new" className="flat-btn-primary h-10 w-auto px-6">
            Create Order
          </Link>
        ) : null}
      </AccessGate>
    </div>
  );
}
