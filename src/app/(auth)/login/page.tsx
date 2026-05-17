import Link from "next/link";
import { AuthLayout } from "@/presentation/components/auth/auth-layout";
import { SignInForm } from "@/presentation/components/auth/sign-in-form";

export default function LoginPage() {
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
      <SignInForm />
    </AuthLayout>
  );
}
