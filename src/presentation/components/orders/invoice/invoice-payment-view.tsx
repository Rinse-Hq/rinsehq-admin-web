"use client";

import { OrderInvoiceReceipt } from "@/presentation/components/orders/invoice/order-invoice-receipt";
import { sampleInvoice } from "@/presentation/components/orders/invoice/invoice-data";

type InvoicePaymentViewProps = {
  invoiceId: string;
};

export function InvoicePaymentView({ invoiceId }: InvoicePaymentViewProps) {
  const invoice = { ...sampleInvoice, id: invoiceId };

  function handlePay() {
    // TODO: integrate Paystack checkout when API is available
    window.alert("Payment will be processed via Paystack.");
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <OrderInvoiceReceipt
          invoice={invoice}
          variant="customer"
          onPay={handlePay}
        />
      </div>
    </main>
  );
}
