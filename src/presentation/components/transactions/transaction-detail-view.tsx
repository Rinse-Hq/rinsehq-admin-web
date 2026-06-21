import type { ReactNode } from "react";
import Link from "next/link";
import type {
  TransactionDetail,
  TransactionStatus,
} from "@/presentation/data/transactions-mock-data";
import { cn } from "@/presentation/lib/utils";

const statusStyles: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  successful: {
    label: "Successful",
    className: "bg-green-50 text-green-700",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-600",
  },
};

type TransactionDetailViewProps = {
  transaction: TransactionDetail;
};

export function TransactionDetailView({ transaction }: TransactionDetailViewProps) {
  const status = statusStyles[transaction.status];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/transactions"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to transactions
          </Link>
          <h1 className="mt-3 font-serif text-2xl font-bold text-slate-900">
            Transaction Details
          </h1>
          <p className="mt-1 font-mono text-sm text-slate-500">{transaction.id}</p>
        </div>
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-sm font-medium",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="flat-card p-6 lg:col-span-1">
          <p className="text-sm text-slate-500">Amount</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{transaction.amount}</p>
          <p className="mt-4 text-sm text-slate-600">{transaction.description}</p>
          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm">
            <DetailRow label="Type" value={transaction.type === "payment" ? "Payment" : "Refund"} />
            <DetailRow label="Payment method" value={transaction.paymentMethod} />
            <DetailRow label="Channel" value={transaction.channel} />
            <DetailRow label="Date" value={transaction.date} />
            <DetailRow
              label="Paid at"
              value={transaction.paidAt ?? "—"}
            />
          </dl>
        </article>

        <div className="space-y-6 lg:col-span-2">
          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Payment breakdown
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <DetailRow label="Gross amount" value={transaction.amount} />
              <DetailRow label="Processing fee" value={transaction.fee} />
              <div className="flex justify-between border-t border-slate-100 pt-3 font-semibold text-slate-900">
                <dt>Net amount</dt>
                <dd>{transaction.netAmount}</dd>
              </div>
            </dl>
          </article>

          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Customer &amp; order
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <DetailRow label="Customer" value={transaction.customer} />
              <DetailRow label="Email" value={transaction.customerEmail} />
              <DetailRow label="Phone" value={transaction.customerPhone} />
              <DetailRow
                label="Order ID"
                value={
                  <Link
                    href={`/dashboard/orders/${transaction.orderId}`}
                    className="font-medium text-brand-600 hover:underline"
                  >
                    {transaction.orderId}
                  </Link>
                }
              />
            </dl>
          </article>

          <article className="flat-card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Reference
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <DetailRow
                label="Payment reference"
                value={
                  <span className="font-mono text-xs sm:text-sm">{transaction.reference}</span>
                }
              />
              <DetailRow label="Transaction ID" value={transaction.id} />
            </dl>
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
