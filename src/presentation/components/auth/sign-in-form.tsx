"use client";

import { useActionState } from "react";
import { signInAction } from "@/presentation/actions/auth-actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PasswordInput } from "@/presentation/components/ui/password-input";

const initialState = { error: "" as string | undefined };

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <header className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back to{" "}
          <span className="text-brand-500">
            rinse<span className="font-normal">hq</span>
          </span>
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to manage your laundry services
        </p>
      </header>

      <form action={formAction} className="space-y-5">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          autoComplete="email"
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
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
    </div>
  );
}
