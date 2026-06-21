"use client";

import { useState } from "react";
import type { BusinessInfo, PersonalInfo } from "@/presentation/data/account-mock-data";
import {
  initialBusinessInfo,
  initialPersonalInfo,
} from "@/presentation/data/account-mock-data";
import {
  AccountSectionNav,
  type AccountSection,
} from "@/presentation/components/account/account-section-nav";
import { BusinessInfoSection } from "@/presentation/components/account/business-info-section";
import { PersonalInfoSection } from "@/presentation/components/account/personal-info-section";

const DEMO_PASSWORD = "Demo1234!";

export function AccountSettingsManager() {
  const [activeSection, setActiveSection] = useState<AccountSection>("personal");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(initialBusinessInfo);

  function handlePasswordChange(current: string, next: string) {
    if (current !== DEMO_PASSWORD) return false;
    void next;
    return true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <AccountIcon className="h-5 w-5 text-slate-600" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Account</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your profile and business details.
            </p>
          </div>
        </div>
        <AccountSectionNav active={activeSection} onChange={setActiveSection} />
      </div>

      {activeSection === "personal" ? (
        <PersonalInfoSection
          initialData={personalInfo}
          onSave={setPersonalInfo}
          onPasswordChange={handlePasswordChange}
        />
      ) : null}

      {activeSection === "business" ? (
        <BusinessInfoSection initialData={businessInfo} onSave={setBusinessInfo} />
      ) : null}
    </div>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
