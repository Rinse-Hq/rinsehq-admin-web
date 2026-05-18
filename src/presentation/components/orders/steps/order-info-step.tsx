import { CheckboxField } from "@/presentation/components/onboarding/checkbox-field";
import { OrderLineItems } from "@/presentation/components/orders/order-line-items";

type StepActionsProps = {
  onNext: () => void;
};

const laundryModes = ["Wash system", "Count system", "Scale system"];

export function OrderInfoStep({ onNext }: StepActionsProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="font-serif text-xl font-bold text-slate-900">
        Order Information
      </h2>

      <div className="mt-6 space-y-6">
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-slate-800">
            Select laundry mode
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {laundryModes.map((mode, i) => (
              <CheckboxField
                key={mode}
                label={mode}
                name={`mode-${i}`}
                defaultChecked={i === 0}
              />
            ))}
          </div>
        </section>

        <div className="space-y-2">
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium text-slate-800"
          >
            Search Service Type
          </label>
          <select id="serviceType" className="flat-input">
            <option value="wash-only">Wash only</option>
            <option value="wash-fold">Wash &amp; Fold</option>
            <option value="dry-clean">Dry Cleaning</option>
          </select>
        </div>

        <OrderLineItems />
      </div>

      <div className="mt-8 flex justify-end">
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
