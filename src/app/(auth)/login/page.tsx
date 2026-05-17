import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth";
import { AuthLayout } from "@/presentation/components/auth/auth-layout";
import { SignInForm } from "@/presentation/components/auth/sign-in-form";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function resolveCallbackUrl(raw?: string): string {
  if (raw?.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }
  return "/dashboard";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const { callbackUrl: rawCallback } = await searchParams;
  const callbackUrl = resolveCallbackUrl(rawCallback);

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <AuthLayout
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-brand-500 hover:underline">
            Create Account
          </Link>
        </>
      }
    >
      <SignInForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
