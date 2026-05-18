"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { signUpUseCase } from "@/infrastructure/di/container";
import { signIn } from "@/infrastructure/auth";

export type AuthFormState = {
  error?: string;
  success?: boolean;
};

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  await signUpUseCase.execute({ email, password });

  redirect(
    `/activate-email?email=${encodeURIComponent(email)}`,
  );
}

function resolveCallbackUrl(raw: string): string {
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }
  return "/dashboard";
}

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const callbackUrl = resolveCallbackUrl(
    String(formData.get("callbackUrl") ?? "/dashboard"),
  );

  try {
    const result = await signIn("credentials", {
      email: raw.email,
      password: raw.password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }

  redirect(callbackUrl);
}

export async function signOutAction() {
  const { signOut } = await import("@/infrastructure/auth");
  await signOut({ redirectTo: "/login" });
}
