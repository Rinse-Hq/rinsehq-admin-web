import { cn } from "@/presentation/lib/utils";
import {
  formatNaira,
  type InvoiceData,
} from "@/presentation/components/orders/invoice/invoice-data";

type OrderInvoiceReceiptProps = {
  invoice: InvoiceData;
  variant?: "admin" | "customer";
  onShareInvoice?: () => void;
  onPay?: () => void;
  className?: string;
};

export function OrderInvoiceReceipt({
  invoice,
  variant = "admin",
  onShareInvoice,
  onPay,
  className,
}: OrderInvoiceReceiptProps) {
  const isPaid = invoice.status === "paid";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-md border border-slate-200 bg-white",
        className,
      )}
    >
      <div className="p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
              Order Invoice
            </h1>
            <p className="mt-2 font-serif text-2xl font-semibold italic text-lime-600 sm:text-3xl">
              {invoice.businessName}
            </p>
          </div>
          <p
            className={cn(
              "text-sm font-semibold sm:text-base",
              isPaid ? "text-status-completed" : "text-status-pending",
            )}
          >
            {isPaid ? "Paid" : "Not Paid"}
          </p>
        </header>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Invoice to:
            </p>
            <div className="mt-2 space-y-1 text-sm text-slate-700">
              <p className="font-medium text-slate-900">{invoice.customer.name}</p>
              <p>{invoice.customer.email}</p>
              <p>{invoice.customer.phone}</p>
              <p>{invoice.customer.address}</p>
            </div>
          </div>
          <dl className="space-y-3 text-sm sm:text-right">
            <div className="flex justify-between gap-4 sm:block">
              <dt className="text-slate-500">Invoice no</dt>
              <dd className="font-medium text-slate-900">{invoice.invoiceNo}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:block">
              <dt className="text-slate-500">Invoice date</dt>
              <dd className="font-medium text-slate-900">{invoice.invoiceDate}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:block">
              <dt className="text-slate-500">Payment method</dt>
              <dd className="font-medium text-slate-900">{invoice.paymentMethod}</dd>
            </div>
          </dl>
        </div>

        <section className="mt-8">
          <div className="rounded-t-md bg-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Order Information</h2>
          </div>
          <div className="overflow-x-auto border border-t-0 border-slate-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-500">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Laundry mode</th>
                  <th className="px-4 py-3 font-medium">Items X Number</th>
                  <th className="px-4 py-3 font-medium text-right">Unit Price</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((row) => (
                  <tr
                    key={row.index}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-4 py-3 text-slate-600">{row.index}</td>
                    <td className="px-4 py-3 text-slate-800">{row.laundryMode || "—"}</td>
                    <td className="px-4 py-3 text-slate-800">{row.itemsLabel}</td>
                    <td className="px-4 py-3 text-right text-slate-800">
                      {formatNaira(row.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">
                      {formatNaira(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <dt>Subtotal</dt>
              <dd>{formatNaira(invoice.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-slate-600">
              <dt>VAT</dt>
              <dd>{formatNaira(invoice.vat)}</dd>
            </div>
            <div className="flex justify-between text-slate-600">
              <dt>Discount</dt>
              <dd>{formatNaira(invoice.discount)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
              <dt>TOTAL</dt>
              <dd>{formatNaira(invoice.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex justify-end">
          {variant === "admin" ? (
            <button
              type="button"
              onClick={onShareInvoice}
              className="flat-btn-primary h-11 w-auto min-w-[140px] px-8"
            >
              Share Invoice
            </button>
          ) : (
            <button
              type="button"
              onClick={onPay}
              disabled={isPaid}
              className="flat-btn-primary h-11 w-auto min-w-[100px] px-10 disabled:opacity-50"
            >
              Pay
            </button>
          )}
        </div>
      </div>

      <footer className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:px-8">
        <p className="font-semibold text-slate-900">{invoice.businessName}</p>
        <div className="mt-2 space-y-1 text-xs text-slate-500 sm:text-sm">
          <p>Address: {invoice.businessContact.address}</p>
          <p>Call: {invoice.businessContact.phone}</p>
          <p>WhatsApp: {invoice.businessContact.whatsapp}</p>
        </div>
      </footer>
    </article>
  );
}
