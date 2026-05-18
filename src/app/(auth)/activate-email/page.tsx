import { AuthLayout } from "@/presentation/components/auth/auth-layout";
import { ActivateEmailForm } from "@/presentation/components/auth/activate-email-form";

export default function ActivateEmailPage() {
  return (
    <AuthLayout>
      <ActivateEmailForm />
    </AuthLayout>
  );
}
