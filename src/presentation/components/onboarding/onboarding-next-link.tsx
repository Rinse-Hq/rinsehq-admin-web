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
    <Link
      href={href}
      className={cn(
        "mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700",
      )}
    >
      {label}
    </Link>
  );
}
