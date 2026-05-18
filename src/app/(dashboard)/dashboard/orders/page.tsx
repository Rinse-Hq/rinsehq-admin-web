import Link from "next/link";

export default function OrdersPage() {
  return (
    <section className="flat-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage and create customer orders.
          </p>
        </div>
        <Link href="/dashboard/orders/new" className="flat-btn-primary h-10 w-auto px-6">
          Create Order
        </Link>
      </div>
    </section>
  );
}
