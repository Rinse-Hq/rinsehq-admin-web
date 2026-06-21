import { TransactionsTable } from "@/presentation/components/transactions/transactions-table";

export default function TransactionsPage() {
  return (
    <section>
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Transactions</h1>
        <p className="mt-2 text-sm text-slate-600">
          View and manage payment history for your laundry orders.
        </p>
      </div>

      <TransactionsTable className="mt-6" />
    </section>
  );
}
