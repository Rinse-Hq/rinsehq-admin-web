"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "@/application/dtos/auth-dtos";
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
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message ?? "Invalid input",
    };
  }

  const result = await signUpUseCase.execute(parsed.data);
  if (!result.success) {
    return { error: result.error };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created but sign-in failed. Please log in." };
    }
    throw error;
  }

  redirect("/dashboard");
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

  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message ?? "Invalid input",
    };
  }

  const callbackUrl = resolveCallbackUrl(
    String(formData.get("callbackUrl") ?? "/dashboard"),
  );

  try {
    const result = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
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
