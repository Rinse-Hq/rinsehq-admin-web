"use client";

import { useState } from "react";
import type { BusinessInfo } from "@/presentation/data/account-mock-data";
import { FileUploadField } from "@/presentation/components/onboarding/file-upload-field";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";

type BusinessInfoSectionProps = {
  initialData: BusinessInfo;
  onSave: (data: BusinessInfo) => void;
};

export function BusinessInfoSection({
  initialData,
  onSave,
}: BusinessInfoSectionProps) {
  const [form, setForm] = useState<BusinessInfo>(initialData);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateField<K extends keyof BusinessInfo>(key: K, value: BusinessInfo[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  return (
    <article className="flat-card p-6 sm:p-8">
      <header className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-slate-900">
          Business information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your business profile, registration, and contact details.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="businessName"
          label="Business name"
          placeholder="Enter business name"
          value={form.businessName}
          onChange={(e) => updateField("businessName", e.target.value)}
          required
        />

        <div className="space-y-2">
          <label
            htmlFor="businessBio"
            className="block text-sm font-medium text-slate-800"
          >
            Business bio
          </label>
          <textarea
            id="businessBio"
            name="businessBio"
            rows={4}
            placeholder="Describe your laundry business"
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="flat-input min-h-[100px] resize-none py-3"
          />
        </div>

        <Input
          name="registrationNo"
          label="Business registration no."
          placeholder="Enter registration number"
          value={form.registrationNo}
          onChange={(e) => updateField("registrationNo", e.target.value)}
        />

        <FileUploadField
          name="businessDocument"
          label="Business document (e.g. CAC)"
          accept="application/pdf,image/jpeg,image/png"
          hint="size (5m max), format (PDF, jpg, png)"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FileUploadField
            name="businessLogo"
            label="Business logo"
            accept="image/jpeg,image/png,image/webp"
            hint="size (5m max), format (jpg, png)"
          />
          <FileUploadField
            name="businessBanner"
            label="Business banner (optional)"
            accept="image/jpeg,image/png,image/webp"
            hint="size (5m max), format (jpg, png)"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-800">Business address</h3>
          <div className="mt-4 space-y-5">
            <Input
              name="address"
              label="Address"
              placeholder="Street address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="city"
                label="City"
                placeholder="City"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
              <Input
                name="postalCode"
                label="Postal code"
                placeholder="Postal code"
                value={form.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-800"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="flat-input"
              >
                <option value="nigeria">🇳🇬 Nigeria</option>
              </select>
            </div>
            <PhoneField
              label="Phone number"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
            />
            <PhoneField
              label="WhatsApp number"
              value={form.whatsapp}
              onChange={(value) => updateField("whatsapp", value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" className="h-10 w-auto px-8">
            Save changes
          </Button>
          {saved ? (
            <p className="text-sm text-green-600">Business info updated.</p>
          ) : null}
        </div>
      </form>
    </article>
  );
}

function PhoneField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      <div className="flex gap-2">
        <div className="flex h-12 shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <span aria-hidden>🇳🇬</span>
          <span>+234</span>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flat-input flex-1"
        />
      </div>
    </div>
  );
}
