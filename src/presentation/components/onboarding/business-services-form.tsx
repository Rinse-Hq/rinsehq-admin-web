import { CheckboxField } from "@/presentation/components/onboarding/checkbox-field";
import { OnboardingNextLink } from "@/presentation/components/onboarding/onboarding-next-link";
import { OnboardingProgress } from "@/presentation/components/onboarding/onboarding-progress";

const laundryModes = ["Wash system", "Count system", "Scale system"];

const serviceTypes = [
  "Wash & Fold",
  "Wash & Press",
  "Stream Press",
  "Dry Cleaning",
  "Ironing",
  "Wash only",
  "suit",
  "Rewash",
  "Fabric softener",
  "Duvet",
  "Dry only",
  "Fabric softener with Fragrance",
  "Bleach",
  "Starch",
];

const orderTypes = [
  "Pickup & Delivery",
  "Store Drop-off",
  "Customer rider",
  "Pickup only",
  "Delivery only",
];

export function BusinessServicesForm() {
  return (
    <div className="flat-card px-8 py-10">
      <OnboardingProgress step={3} />

      <header className="mb-6 space-y-1">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Business Information
        </h1>
        <p className="text-sm text-slate-500">Please select the options below</p>
      </header>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Select laundry mode
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {laundryModes.map((mode) => (
              <CheckboxField key={mode} label={mode} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Select service type
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {serviceTypes.map((service) => (
              <CheckboxField key={service} label={service} />
            ))}
            <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-span-3">
              <CheckboxField label="Others" />
              <input
                type="text"
                placeholder="Please other services type"
                className="flat-input h-10 min-w-[200px] flex-1 py-2"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Select order type
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {orderTypes.map((type) => (
              <CheckboxField key={type} label={type} />
            ))}
          </div>
        </section>
      </div>

      <OnboardingNextLink href="/login?verified=1" label="Next" />
    </div>
  );
}
