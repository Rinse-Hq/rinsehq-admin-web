import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth";
import { AuthLayout } from "@/presentation/components/auth/auth-layout";
import { SignInForm } from "@/presentation/components/auth/sign-in-form";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string; verified?: string }>;
};

function resolveCallbackUrl(raw?: string): string {
  if (raw?.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }
  return "/dashboard";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const { callbackUrl: rawCallback, verified } = await searchParams;
  const callbackUrl = resolveCallbackUrl(rawCallback);
  const emailVerified = verified === "1";

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
      {emailVerified ? (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-center text-sm text-green-800">
          Email verified. You can sign in now.
        </p>
      ) : null}
      <SignInForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
