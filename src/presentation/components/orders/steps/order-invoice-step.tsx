"use client";

import { useState } from "react";
import { OrderInvoiceReceipt } from "@/presentation/components/orders/invoice/order-invoice-receipt";
import { sampleInvoice } from "@/presentation/components/orders/invoice/invoice-data";
import { SharePaymentLinkModal } from "@/presentation/components/orders/invoice/share-payment-link-modal";

type StepActionsProps = {
  onBack: () => void;
  onComplete: () => void;
};

export function OrderInvoiceStep({ onBack, onComplete }: StepActionsProps) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <OrderInvoiceReceipt
        invoice={sampleInvoice}
        variant="admin"
        onShareInvoice={() => setShareOpen(true)}
      />

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flat-btn-outline w-auto min-w-[100px] px-6"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onComplete}
          className="flat-btn-primary w-auto min-w-[140px] px-8"
        >
          Place Order
        </button>
      </div>

      <SharePaymentLinkModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        invoiceId={sampleInvoice.id}
      />
    </div>
  );
}
