import Link from "next/link";
import { cn } from "@/presentation/lib/utils";

type OnboardingNextLinkProps = {
  href: string;
  label?: string;
};

export function OnboardingNextLink({
  href,
  label = "Next",
}: OnboardingNextLinkProps) {
  return (
    <Link href={href} className={cn("mt-6 flat-btn-primary")}>
      {label}
    </Link>
  );
}
