"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import { SharePaymentLinkModal } from "@/presentation/components/orders/invoice/share-payment-link-modal";
import type { OrderDetail, OrderStatus } from "@/presentation/data/orders-mock-data";
import { formatNaira } from "@/presentation/data/orders-mock-data";
import { cn } from "@/presentation/lib/utils";

const statusStyles: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-blue-50 text-blue-700",
  },
  pending: {
    label: "Pending",
    className: "bg-red-50 text-red-600",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700",
  },
};

const paymentStatusStyles = {
  paid: {
    label: "Paid",
    className: "bg-green-50 text-green-700",
  },
  not_paid: {
    label: "Not paid",
    className: "bg-amber-50 text-amber-700",
  },
};

type OrderDetailViewProps = {
  order: OrderDetail;
};

export function OrderDetailView({ order }: OrderDetailViewProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const status = statusStyles[order.status];
  const paymentStatus = paymentStatusStyles[order.paymentStatus];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Back to orders
            </Link>
            <h1 className="mt-3 font-serif text-2xl font-bold text-slate-900">
              Order Details
            </h1>
            <p className="mt-1 font-mono text-sm text-slate-500">#{order.id}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-sm font-medium",
                status.className,
              )}
            >
              {status.label}
            </span>
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-sm font-medium",
                paymentStatus.className,
              )}
            >
              {paymentStatus.label}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="flat-card p-6 lg:col-span-1">
            <p className="text-sm text-slate-500">Total amount</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{order.amount}</p>
            <dl className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm">
              <DetailRow label="Order date" value={order.orderDate} />
              <DetailRow label="Order type" value={order.type} />
              <DetailRow label="Service type" value={order.serviceType} />
              <DetailRow label="Laundry mode" value={order.laundryMode} />
              <DetailRow label="Delivery mode" value={order.deliveryMode} />
              <DetailRow label="Delivery date" value={order.deliveryDate} />
            </dl>
          </article>

          <div className="space-y-6 lg:col-span-2">
            <article className="flat-card p-6">
              <h2 className="font-serif text-lg font-semibold text-slate-900">
                Customer
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailRow label="Name" value={order.customer} />
                <DetailRow label="Email" value={order.customerEmail} />
                <DetailRow label="Phone" value={order.customerPhone} />
                <DetailRow label="Address" value={order.customerAddress} />
              </dl>
            </article>

            <article className="flat-card overflow-hidden p-0">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="font-serif text-lg font-semibold text-slate-900">
                  Line items
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-medium text-slate-500">
                      <th className="px-6 py-3 font-medium">Item</th>
                      <th className="px-4 py-3 font-medium">Laundry mode</th>
                      <th className="px-4 py-3 font-medium text-center">Qty</th>
                      <th className="px-4 py-3 font-medium text-right">Unit price</th>
                      <th className="px-6 py-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.lineItems.map((item, index) => (
                      <tr
                        key={`${item.name}-${index}`}
                        className="border-b border-slate-50 last:border-b-0"
                      >
                        <td className="px-6 py-3 font-medium text-slate-800">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.laundryMode ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600">
                          {formatNaira(item.unitPrice)}
                        </td>
                        <td className="px-6 py-3 text-right font-medium text-slate-900">
                          {formatNaira(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 px-6 py-4">
                <dl className="ml-auto max-w-xs space-y-2 text-sm">
                  <DetailRow label="Subtotal" value={formatNaira(order.subtotal)} />
                  <DetailRow label="VAT" value={formatNaira(order.vat)} />
                  <DetailRow label="Discount" value={formatNaira(order.discount)} />
                  <div className="flex justify-between border-t border-slate-100 pt-3 font-semibold text-slate-900">
                    <dt>Total</dt>
                    <dd>{formatNaira(order.total)}</dd>
                  </div>
                </dl>
              </div>
            </article>

            <article className="flat-card p-6">
              <h2 className="font-serif text-lg font-semibold text-slate-900">
                Pickup &amp; delivery
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailRow label="Pickup date" value={order.pickupDate} />
                <DetailRow label="Pickup time" value={order.pickupTime} />
                <DetailRow label="Delivery time" value={order.deliveryTime} />
                <DetailRow label="Description" value={order.description} />
              </dl>
            </article>

            <article className="flat-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="font-serif text-lg font-semibold text-slate-900">
                  Invoice &amp; payment
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/invoice/${order.invoiceId}`}
                    className="flat-btn-outline h-9 w-auto px-4 text-sm"
                  >
                    View invoice
                  </Link>
                  {order.paymentStatus === "not_paid" ? (
                    <button
                      type="button"
                      onClick={() => setShareOpen(true)}
                      className="flat-btn-primary h-9 w-auto px-4 text-sm"
                    >
                      Share payment link
                    </button>
                  ) : null}
                </div>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailRow label="Invoice no" value={order.invoiceNo} />
                <DetailRow label="Payment method" value={order.paymentMethod} />
                <DetailRow
                  label="Invoice ID"
                  value={
                    <span className="font-mono text-xs sm:text-sm">{order.invoiceId}</span>
                  }
                />
              </dl>
            </article>
          </div>
        </div>
      </div>

      <SharePaymentLinkModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        invoiceId={order.invoiceId}
      />
    </>
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
