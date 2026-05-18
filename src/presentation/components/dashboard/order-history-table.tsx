import type { OrderRow, OrderStatus } from "@/presentation/data/dashboard-mock-data";
import { latestOrders } from "@/presentation/data/dashboard-mock-data";
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

export function OrderHistoryTable() {
  return (
    <article className="rounded-xl border border-slate-100 bg-white">
      <div className="border-b border-slate-100 p-5">
        <h2 className="font-serif text-lg font-semibold text-slate-800">
          Latest Order History
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search"
            className="h-10 min-w-[140px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:max-w-[200px]"
          />
          <select
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600"
            defaultValue="orderId"
          >
            <option value="orderId">Order ID</option>
            <option value="customer">Customer</option>
          </select>
          <button
            type="button"
            className="flat-btn-primary h-10 w-auto rounded-md bg-sidebar px-5 hover:opacity-90"
          >
            Search
          </button>

          <div className="ml-auto flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <button type="button" className="flex items-center gap-1.5 hover:text-slate-900">
              <ImportIcon className="h-4 w-4" />
              Import
            </button>
            <button type="button" className="flex items-center gap-1.5 hover:text-slate-900">
              <FilterIcon className="h-4 w-4" />
              Filter
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
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="rounded border-slate-300" aria-label="Select all" />
              </th>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Order Date</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Delivery Date</th>
              <th className="px-4 py-3 font-medium">Delivery Mode</th>
              <th className="px-4 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order, index) => (
              <OrderTableRow key={`${order.id}-${index}`} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function OrderTableRow({ order }: { order: OrderRow }) {
  const status = statusStyles[order.status];

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50">
      <td className="px-4 py-3">
        <input type="checkbox" className="rounded border-slate-300" aria-label={`Select order ${order.id}`} />
      </td>
      <td className="px-4 py-3 font-medium text-slate-800">{order.id}</td>
      <td className="px-4 py-3 text-slate-600">{order.type}</td>
      <td className="px-4 py-3 text-slate-600">{order.orderDate}</td>
      <td className="px-4 py-3 text-slate-600">{order.customer}</td>
      <td className="px-4 py-3 font-medium text-slate-800">{order.amount}</td>
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
      <td className="px-4 py-3 text-slate-600">{order.deliveryDate}</td>
      <td className="px-4 py-3 text-slate-600">{order.deliveryMode}</td>
      <td className="px-4 py-3">
        <button
          type="button"
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="View order options"
        >
          <MoreIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}

function ImportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4V16M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
