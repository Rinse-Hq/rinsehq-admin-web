import { Input } from "@/presentation/components/ui/input";
import { OnboardingNextLink } from "@/presentation/components/onboarding/onboarding-next-link";
import { OnboardingProgress } from "@/presentation/components/onboarding/onboarding-progress";

function PhoneField({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      <div className="flex gap-2">
        <div className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-3 text-sm text-slate-700">
          <span aria-hidden>🇳🇬</span>
          <span>+234</span>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          className="h-12 flex-1 rounded-xl border border-transparent bg-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
    </div>
  );
}

export function BusinessAddressForm() {
  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <OnboardingProgress step={2} />

      <header className="mb-6 space-y-1">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Business Address Info
        </h1>
        <p className="text-sm text-slate-500">Please fill in the fields below</p>
      </header>

      <div className="space-y-5">
        <Input name="address" label="Address" placeholder="Enter Business name" />
        <Input name="city" label="City" placeholder="Enter full name" />
        <Input name="postalCode" label="Postal code" placeholder="Enter full name" />
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-slate-800"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            defaultValue="nigeria"
            className="h-12 w-full rounded-xl border border-transparent bg-slate-100 px-4 text-sm text-slate-900 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="nigeria">🇳🇬 Nigeria</option>
          </select>
        </div>
        <PhoneField label="WhatsApp Number" />
        <PhoneField label="Phone number" />
      </div>

      <OnboardingNextLink href="/onboarding/business-services" />
    </div>
  );
}
