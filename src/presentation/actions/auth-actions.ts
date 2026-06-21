"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { signUpUseCase, signInUseCase } from "@/infrastructure/di/container";
import { signIn } from "@/infrastructure/auth";
import { storeRepository } from "@/infrastructure/stores/in-memory-store-repository";
import type { StoreAccess } from "@/presentation/data/stores-data";

export type AuthFormState = {
  error?: string;
  success?: boolean;
};

export type LoginPreviewState = {
  error?: string;
  stores?: StoreAccess[];
  email?: string;
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

export async function previewLoginAction(
  _prev: LoginPreviewState,
  formData: FormData,
): Promise<LoginPreviewState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const result = await signInUseCase.execute({ email, password });
  if (!result.success) {
    return { error: "Invalid email or password" };
  }

  storeRepository.seedOwnerStores(result.data.id, result.data.email);
  const stores = storeRepository.getAccessibleStores(
    result.data.id,
    result.data.email,
  );

  if (stores.length === 0) {
    return { error: "No stores are assigned to this account." };
  }

  if (stores.length === 1) {
    try {
      const signInResult = await signIn("credentials", {
        email,
        password,
        storeId: stores[0].storeId,
        redirect: false,
      });

      if (signInResult?.error) {
        return { error: "Unable to sign in. Please try again." };
      }
    } catch (error) {
      if (isRedirectError(error)) throw error;
      return { error: "Unable to sign in. Please try again." };
    }

    redirect(resolveCallbackUrl(String(formData.get("callbackUrl") ?? "/dashboard")));
  }

  return {
    email,
    stores,
  };
}

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const storeId = String(formData.get("storeId") ?? "");

  const callbackUrl = resolveCallbackUrl(
    String(formData.get("callbackUrl") ?? "/dashboard"),
  );

  if (!storeId) {
    return { error: "Please select a store to continue." };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      storeId,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid email, password, or store access." };
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof AuthError) {
      return { error: "Invalid email, password, or store access." };
    }
    throw error;
  }

  redirect(callbackUrl);
}

export async function signOutAction() {
  const { signOut } = await import("@/infrastructure/auth");
  await signOut({ redirectTo: "/login" });
}

export async function switchStoreAction(storeId: string) {
  const { auth, unstable_update } = await import("@/infrastructure/auth");
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Not authenticated." };
  }

  storeRepository.seedOwnerStores(session.user.id, session.user.email);
  const store = storeRepository.getStoreById(
    storeId,
    session.user.id,
    session.user.email,
  );

  if (!store) {
    return { error: "You do not have access to this store." };
  }

  await unstable_update({
    user: {
      storeId: store.storeId,
      storeName: store.storeName,
      storeRole: store.role,
      permissionLevel: store.permissionLevel,
    },
  });

  return { success: true };
}
