"use client";

import Link from "next/link";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/lib/utils";

export function ActivateEmailForm() {
  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
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
          <Link
            href="/signup"
            className={cn(
              "inline-flex h-12 w-1/2 items-center justify-center rounded-xl border border-slate-900 bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50",
            )}
          >
            Back
          </Link>
          <Link
            href="/account-activated"
            className={cn(
              "inline-flex h-12 w-1/2 items-center justify-center rounded-xl bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700",
            )}
          >
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
