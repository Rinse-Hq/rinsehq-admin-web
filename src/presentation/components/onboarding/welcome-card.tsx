import Image from "next/image";
import Link from "next/link";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";
import { cn } from "@/presentation/lib/utils";

export function WelcomeCard() {
  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <div className="flex flex-col items-center text-center">
        <RinseHqLogo variant="light" className="h-8 w-auto" />

        <div className="relative my-6 flex h-36 w-36 items-center justify-center">
          <Image
            src="/images/rocket-image.png"
            alt=""
            width={144}
            height={144}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Welcome Laundrycare
        </h1>
        <p className="mt-2 max-w-xs text-sm text-slate-500">
          Your Account have successfully been created with rinsehq with
        </p>

        <p className="mt-4 text-sm font-bold text-slate-900">Business ID :</p>

        <Link
          href="/onboarding/business-info"
          className={cn(
            "mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700",
          )}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
