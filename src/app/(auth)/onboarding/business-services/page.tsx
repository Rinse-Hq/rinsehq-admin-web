import { BusinessServicesForm } from "@/presentation/components/onboarding/business-services-form";
import { OnboardingLayout } from "@/presentation/components/onboarding/onboarding-layout";

export default function BusinessServicesPage() {
  return (
    <OnboardingLayout wide>
      <BusinessServicesForm />
    </OnboardingLayout>
  );
}
