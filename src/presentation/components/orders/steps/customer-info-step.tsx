import { Input } from "@/presentation/components/ui/input";
import { PhoneField } from "@/presentation/components/orders/phone-field";

type StepActionsProps = {
  onNext: () => void;
};

export function CustomerInfoStep({ onNext }: StepActionsProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="font-serif text-xl font-bold text-slate-900">
        Customer Information
      </h2>

      <div className="mt-6 flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-slate-800"
          >
            Customer Name
          </label>
          <select id="customerName" className="flat-input">
            <option value="">Enter Full name</option>
            <option value="jane">Jane Doe</option>
            <option value="john">John Smith</option>
          </select>
        </div>

        <Input
          name="customerEmail"
          type="email"
          label="Enter Email Address"
          placeholder="Enter email address"
        />

        <PhoneField label="Phone number" />

        <div className="space-y-2">
          <label
            htmlFor="homeAddress"
            className="block text-sm font-medium text-slate-800"
          >
            Home Address
          </label>
          <textarea
            id="homeAddress"
            rows={4}
            placeholder="Type Address here"
            className="flat-input min-h-[100px] resize-none py-3"
          />
        </div>
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
