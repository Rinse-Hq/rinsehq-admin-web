import Link from "next/link";
import { AuthLayout } from "@/presentation/components/auth/auth-layout";
import { SignUpForm } from "@/presentation/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-500 hover:underline">
            Log In
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
