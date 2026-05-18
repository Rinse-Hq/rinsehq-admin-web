type StepActionsProps = {
  onBack: () => void;
  onComplete: () => void;
};

export function OrderInvoiceStep({ onBack, onComplete }: StepActionsProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="font-serif text-xl font-bold text-slate-900">Order invoice</h2>
      <p className="mt-2 text-sm text-slate-500">
        Invoice preview for this order.
      </p>

      <div className="mt-6 flat-card p-6">
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs text-slate-500">Invoice #</p>
            <p className="font-semibold text-slate-900">INV-2024-0012</p>
          </div>
          <p className="text-sm text-slate-500">Mon 06 Dec 2024</p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Wash Only × 1</span>
            <span className="font-medium">N2,000</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Rewash × 3</span>
            <span className="font-medium">N2,550</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold">
            <span>Total</span>
            <span>N4,550</span>
          </div>
        </div>
      </div>

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
    </div>
  );
}
