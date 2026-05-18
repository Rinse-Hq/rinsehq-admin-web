"use client";

import Link from "next/link";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/lib/utils";

export function ActivateEmailForm() {
  return (
    <div className="flat-card px-8 py-10">
      <header className="mb-8 space-y-2 text-center">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Activate Your Email
        </h1>
        <p className="text-sm text-slate-500">
          We&apos;ve sent a code to your email. Enter the code below to verify
          your account
        </p>
      </header>

      <div className="space-y-5">
        <Input
          name="code"
          label="Enter code"
          placeholder="Enter code"
          inputMode="numeric"
          autoComplete="one-time-code"
        />

        <p className="text-center text-sm text-slate-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="font-semibold text-brand-500 hover:underline"
          >
            Resend
          </button>
        </p>

        <div className="flex gap-3">
          <Link href="/signup" className={cn("flat-btn-outline w-1/2")}>
            Back
          </Link>
          <Link href="/account-activated" className={cn("flat-btn-primary w-1/2")}>
            Continue
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
        By creating account with rinsehq you agree to our{" "}
        <Link href="#" className="font-semibold text-slate-700 hover:underline">
          Code of Conduct
        </Link>
        ,{" "}
        <Link href="#" className="font-semibold text-slate-700 hover:underline">
          Terms of Service
        </Link>
        , and{" "}
        <Link href="#" className="font-semibold text-slate-700 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
