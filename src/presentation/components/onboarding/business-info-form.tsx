import { Input } from "@/presentation/components/ui/input";
import { FileUploadField } from "@/presentation/components/onboarding/file-upload-field";
import { OnboardingNextLink } from "@/presentation/components/onboarding/onboarding-next-link";
import { OnboardingProgress } from "@/presentation/components/onboarding/onboarding-progress";

export function BusinessInfoForm() {
  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <OnboardingProgress step={2} />

      <header className="mb-6 space-y-1">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Business Information
        </h1>
        <p className="text-sm text-slate-500">Please fill in the fields below</p>
      </header>

      <div className="space-y-5">
        <Input
          name="businessName"
          label="Business Name"
          placeholder="Enter Business name"
        />
        <div className="space-y-2">
          <label
            htmlFor="businessBio"
            className="block text-sm font-semibold text-slate-800"
          >
            Business Bio
          </label>
          <textarea
            id="businessBio"
            name="businessBio"
            rows={4}
            placeholder="Type Bio here"
            className="w-full resize-none rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <Input
          name="registrationNo"
          label="Business Registration no."
          placeholder="Enter Business name"
        />
        <FileUploadField
          name="businessDocument"
          label="Business document (e.g CAC)"
          accept="application/pdf,image/jpeg,image/png"
          hint="size (5m max), format (PDF, jpg, png)"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FileUploadField
            name="businessLogo"
            label="Add logo"
            accept="image/jpeg,image/png,image/webp"
            hint="size (5m max), format (jpg, png)"
          />
          <FileUploadField
            name="businessBanner"
            label="Add Business Banner (optional)"
            accept="image/jpeg,image/png,image/webp"
            hint="size (5m max), format (jpg, png)"
          />
        </div>
      </div>

      <OnboardingNextLink href="/onboarding/business-address" />
    </div>
  );
}
