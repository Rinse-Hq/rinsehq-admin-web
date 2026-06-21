"use client";

import { useActionState, useState } from "react";
import type { StoreAccess } from "@/presentation/data/stores-data";
import {
  previewLoginAction,
  signInAction,
  type LoginPreviewState,
} from "@/presentation/actions/auth-actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";
import { demoAccounts, DEMO_PASSWORD } from "@/presentation/data/demo-accounts";
import { getStoreRoleLabel } from "@/presentation/data/stores-data";
import { cn } from "@/presentation/lib/utils";

const signInInitialState = { error: "" as string | undefined };
const previewInitialState: LoginPreviewState = {};

type SignInFormProps = {
  callbackUrl?: string;
};

export function SignInForm({ callbackUrl = "/dashboard" }: SignInFormProps) {
  const [step, setStep] = useState<"credentials" | "store">("credentials");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [stores, setStores] = useState<StoreAccess[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [previewPending, setPreviewPending] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    signInInitialState,
  );

  async function handleCredentialsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewError(null);
    setPreviewPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    setCredentials({ email, password });

    const result = await previewLoginAction(previewInitialState, formData);
    setPreviewPending(false);

    if (result.error) {
      setPreviewError(result.error);
      return;
    }

    if (result.stores?.length) {
      setStores(result.stores);
      setSelectedStoreId(
        result.stores.find((store) => store.isMainStore)?.storeId ??
          result.stores[0].storeId,
      );
      setStep("store");
    }
  }

  function handleBackToCredentials() {
    setStep("credentials");
    setStores([]);
    setSelectedStoreId("");
    setPreviewError(null);
  }

  function fillDemoAccount(email: string) {
    setCredentials({ email, password: DEMO_PASSWORD });
    setPreviewError(null);
  }

  if (step === "store") {
    return (
      <div className="flat-card px-8 py-10">
        <header className="mb-8 space-y-2 text-center">
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Select a store
          </h1>
          <p className="text-sm text-slate-500">
            Choose which store you want to manage
          </p>
        </header>

        <form action={signInFormAction} className="space-y-5">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <input type="hidden" name="email" value={credentials.email} />
          <input type="hidden" name="password" value={credentials.password} />
          <input type="hidden" name="storeId" value={selectedStoreId} />

          <div className="space-y-3">
            {stores.map((store) => (
              <button
                key={store.storeId}
                type="button"
                onClick={() => setSelectedStoreId(store.storeId)}
                className={cn(
                  "w-full rounded-md border px-4 py-4 text-left transition-colors",
                  selectedStoreId === store.storeId
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{store.storeName}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {[store.address, store.city].filter(Boolean).join(", ") ||
                        "No address set"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {store.isMainStore ? (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                        Main store
                      </span>
                    ) : null}
                    <span className="text-xs text-slate-500">
                      {getStoreRoleLabel(store.role)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {signInState.error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {signInState.error}
            </p>
          ) : null}

          <Button type="submit" isLoading={signInPending} disabled={!selectedStoreId}>
            Continue
          </Button>

          <button
            type="button"
            onClick={handleBackToCredentials}
            className="w-full text-center text-sm text-slate-500 hover:text-slate-800"
          >
            Back to sign in
          </button>
        </form>
      </div>
    );
  }

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

      <form onSubmit={handleCredentialsSubmit} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          autoComplete="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        {previewError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {previewError}
          </p>
        ) : null}

        <Button type="submit" isLoading={previewPending}>
          Log In
        </Button>
      </form>

      <div className="mt-6 space-y-2">
        <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-500">
          Demo accounts
        </p>
        <p className="text-center text-xs text-slate-500">
          Password for all: <span className="font-medium">{DEMO_PASSWORD}</span>
        </p>
        <div className="space-y-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => fillDemoAccount(account.email)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-brand-400 hover:bg-brand-50/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {account.description}
                  </p>
                  <p className="text-xs text-slate-500">{account.email}</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">
                    {account.accessSummary}
                  </p>
                </div>
                <span className="shrink-0 text-right text-[10px] text-slate-400">
                  {account.storeHint}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
