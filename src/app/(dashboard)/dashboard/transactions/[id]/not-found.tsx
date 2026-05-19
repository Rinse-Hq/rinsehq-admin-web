import Link from "next/link";

export default function TransactionNotFound() {
  return (
    <section className="flat-card p-8 text-center">
      <h1 className="font-serif text-xl font-bold text-slate-900">Transaction not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        This transaction does not exist or may have been removed.
      </p>
      <Link
        href="/dashboard/transactions"
        className="mt-6 inline-flex flat-btn-primary h-10 w-auto px-6"
      >
        Back to transactions
      </Link>
    </section>
  );
}
