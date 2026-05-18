type StepActionsProps = {
  onBack: () => void;
  onNext: () => void;
};

export function DeliveryInfoStep({ onBack, onNext }: StepActionsProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="font-serif text-xl font-bold text-slate-900">
        Pickup &amp; Delivery Information
      </h2>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <label
              htmlFor="orderType"
              className="block text-sm font-medium text-slate-800"
            >
              Select Order Type
            </label>
            <select id="orderType" className="flat-input" defaultValue="pickup-delivery">
              <option value="pickup-delivery">Pickup &amp; Delivery</option>
              <option value="drop-off">Store Drop-off</option>
              <option value="pickup-only">Pickup only</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-800"
            >
              Amount
            </label>
            <input
              id="amount"
              type="text"
              defaultValue="N4,000"
              className="flat-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="block text-sm font-medium text-slate-800">
            Pickup Date &amp; Time
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              defaultValue="Mon 06 Dec 2024"
              className="flat-input"
              readOnly
            />
            <select className="flat-input" defaultValue="9-10">
              <option value="9-10">9:00AM-10:00AM</option>
              <option value="10-11">10:00AM-11:00AM</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <span className="block text-sm font-medium text-slate-800">
            Delivery Date &amp; Time
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              defaultValue="Mon 06 Dec 2024"
              className="flat-input"
              readOnly
            />
            <select className="flat-input" defaultValue="9-10">
              <option value="9-10">9:00AM-10:00AM</option>
              <option value="10-11">10:00AM-11:00AM</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-800"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Type Address here"
            className="flat-input min-h-[100px] resize-none py-3"
          />
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
