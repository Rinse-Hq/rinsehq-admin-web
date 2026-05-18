type StepActionsProps = {
  onBack: () => void;
  onNext: () => void;
};

export function OrderDetailsStep({ onBack, onNext }: StepActionsProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="font-serif text-xl font-bold text-slate-900">Order Details</h2>
      <p className="mt-2 text-sm text-slate-500">
        Review order summary before generating the invoice.
      </p>

      <div className="mt-6 space-y-4 border border-slate-200 rounded-md p-4 text-sm">
        <div className="flex justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500">Customer</span>
          <span className="font-medium text-slate-900">Jane Doe</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500">Services</span>
          <span className="font-medium text-slate-900">Wash Only, Rewash</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500">Order type</span>
          <span className="font-medium text-slate-900">Pickup &amp; Delivery</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Total</span>
          <span className="font-semibold text-slate-900">N4,550</span>
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
          onClick={onNext}
          className="flat-btn-primary w-auto min-w-[120px] px-8"
        >
          Next
        </button>
      </div>
    </div>
  );
}
