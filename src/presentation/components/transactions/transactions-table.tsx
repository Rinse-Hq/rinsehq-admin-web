import Link from "next/link";
import type {
  TransactionRow,
  TransactionStatus,
} from "@/presentation/data/transactions-mock-data";
import { transactions } from "@/presentation/data/transactions-mock-data";
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

const typeLabels: Record<TransactionRow["type"], string> = {
  payment: "Payment",
  refund: "Refund",
};

type TransactionsTableProps = {
  className?: string;
};

export function TransactionsTable({ className }: TransactionsTableProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-slate-100 bg-white",
        className,
      )}
    >
      <div className="border-b border-slate-100 p-5">
        <h2 className="font-serif text-lg font-semibold text-slate-800">
          All Transactions
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search"
            className="h-10 min-w-[140px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:max-w-[200px]"
          />
          <select
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
            defaultValue="transactionId"
          >
            <option value="transactionId">Transaction ID</option>
            <option value="orderId">Order ID</option>
            <option value="customer">Customer</option>
          </select>
          <select
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
            defaultValue="all"
          >
            <option value="all">All status</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button
            type="button"
            className="flat-btn-primary h-10 w-auto rounded-md bg-sidebar px-5 hover:opacity-90"
          >
            Search
          </button>

          <div className="ml-auto flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <button type="button" className="flex items-center gap-1.5 hover:text-slate-900">
              <ExportIcon className="h-4 w-4" />
              Export
            </button>
            <select className="border-0 bg-transparent text-sm focus:outline-none">
              <option>Sort by</option>
              <option>Date</option>
              <option>Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500">
              <th className="px-4 py-3 font-medium">Transaction ID</th>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Payment method</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionTableRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function TransactionTableRow({ transaction }: { transaction: TransactionRow }) {
  const status = statusStyles[transaction.status];

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50">
      <td className="px-4 py-3 font-medium text-slate-800">
        <Link
          href={`/dashboard/transactions/${transaction.id}`}
          className="text-brand-600 hover:underline"
        >
          {transaction.id}
        </Link>
      </td>
      <td className="px-4 py-3 font-mono text-xs text-slate-600">{transaction.reference}</td>
      <td className="px-4 py-3 text-slate-600">{transaction.orderId}</td>
      <td className="px-4 py-3 text-slate-600">{transaction.customer}</td>
      <td className="px-4 py-3 text-slate-600">{typeLabels[transaction.type]}</td>
      <td className="px-4 py-3 font-medium text-slate-800">{transaction.amount}</td>
      <td className="px-4 py-3 text-slate-600">{transaction.paymentMethod}</td>
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
      <td className="px-4 py-3 text-slate-600">{transaction.date}</td>
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/transactions/${transaction.id}`}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label={`View transaction ${transaction.id}`}
        >
          <MoreIcon className="h-5 w-5" />
        </Link>
      </td>
    </tr>
  );
}

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4V16M12 4L8 8M12 4L16 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  );
}
