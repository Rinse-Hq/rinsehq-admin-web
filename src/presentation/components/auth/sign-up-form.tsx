"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "@/presentation/actions/auth-actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";

const initialState = {};

export function SignUpForm() {
  const [, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <header className="mb-8 space-y-2 text-center">
        <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-slate-900">
          Welcome to
          <RinseHqLogo variant="light" className="h-7 w-auto" />
        </h1>
        <p className="text-sm text-slate-500">
          Manage your Laundry Services Effortlessly
        </p>
      </header>

      <form action={formAction} className="space-y-5">
        <Input
          name="email"
          type="email"
          label="Enter Email"
          placeholder="Enter email address"
          autoComplete="email"
        />
        <PasswordInput
          name="password"
          label="Create Password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Button type="submit" isLoading={pending}>
          Create Account
        </Button>
      </form>

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
