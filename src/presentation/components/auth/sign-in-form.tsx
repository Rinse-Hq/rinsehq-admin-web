"use client";

import { useActionState, useState } from "react";
import { signInSchema } from "@/application/dtos/auth-dtos";
import { signInAction } from "@/presentation/actions/auth-actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PasswordInput } from "@/presentation/components/ui/password-input";

const initialState = { error: "" as string | undefined };

type SignInFormProps = {
  callbackUrl?: string;
};

export function SignInForm({ callbackUrl = "/dashboard" }: SignInFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const parsed = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.errors) {
        const key = issue.path[0];
        if (key && !errors[String(key)]) {
          errors[String(key)] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    formAction(formData);
  }

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

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          autoComplete="email"
          required
          error={fieldErrors.email}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          error={fieldErrors.password}
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

      <p className="mt-6 rounded-lg bg-brand-50 px-3 py-2 text-center text-xs text-slate-600">
        Demo: <span className="font-medium">demo@rinsehq.com</span> /{" "}
        <span className="font-medium">Demo1234!</span>
      </p>
    </div>
  );
}
