"use client";

import { useActionState } from "react";
import { signInAction } from "@/presentation/actions/auth-actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";

const initialState = { error: "" as string | undefined };

type SignInFormProps = {
  callbackUrl?: string;
};

export function SignInForm({ callbackUrl = "/dashboard" }: SignInFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <div className="flat-card px-8 py-10">
      <header className="mb-8 space-y-2 text-center">
        <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-slate-900">
          Welcome back to
          <RinseHqLogo variant="light" className="h-7 w-auto" />
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to manage your laundry services
        </p>
      </header>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          autoComplete="email"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {state.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" isLoading={pending}>
          Log In
        </Button>
      </form>

      <p className="mt-6 border border-slate-200 bg-white px-3 py-2 text-center text-xs text-slate-600">
        Demo: <span className="font-medium">demo@rinsehq.com</span> /{" "}
        <span className="font-medium">Demo1234!</span>
      </p>
    </div>
  );
}
