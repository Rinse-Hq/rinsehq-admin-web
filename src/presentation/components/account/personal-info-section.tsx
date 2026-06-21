"use client";

import { useState } from "react";
import type { PersonalInfo } from "@/presentation/data/account-mock-data";
import { ChangePasswordForm } from "@/presentation/components/account/change-password-section";
import { Button } from "@/presentation/components/ui/button";
import { Collapsible } from "@/presentation/components/ui/collapsible";
import { Input } from "@/presentation/components/ui/input";

type PersonalInfoSectionProps = {
  initialData: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
  onPasswordChange: (current: string, next: string) => boolean;
};

export function PersonalInfoSection({
  initialData,
  onSave,
  onPasswordChange,
}: PersonalInfoSectionProps) {
  const [form, setForm] = useState<PersonalInfo>(initialData);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateField<K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  return (
    <article className="flat-card px-6 sm:px-8">
      <Collapsible
        title="Personal information"
        description="Update your name and contact details used across the dashboard."
        defaultOpen
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-xl font-semibold text-brand-700">
              {form.fullName.charAt(0) || "?"}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">Profile photo</p>
              <p className="text-xs text-slate-500">
                Avatar is generated from your name. Photo upload coming soon.
              </p>
            </div>
          </div>

          <Input
            name="fullName"
            label="Full name"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            required
          />

          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <PhoneField
            label="Phone number"
            value={form.phone}
            onChange={(value) => updateField("phone", value)}
          />

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" className="h-10 w-auto px-8">
              Save changes
            </Button>
            {saved ? (
              <p className="text-sm text-green-600">Personal info updated.</p>
            ) : null}
          </div>
        </form>
      </Collapsible>

      <Collapsible
        title="Change password"
        description="Use a strong password with at least 8 characters."
      >
        <ChangePasswordForm onSave={onPasswordChange} />
      </Collapsible>
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
