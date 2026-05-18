import { BusinessInfoForm } from "@/presentation/components/onboarding/business-info-form";
import { OnboardingLayout } from "@/presentation/components/onboarding/onboarding-layout";

export default function BusinessInfoPage() {
  return (
    <OnboardingLayout wide>
      <BusinessInfoForm />
    </OnboardingLayout>
  );
}
