import Image from "next/image";
import Link from "next/link";
import { cn } from "@/presentation/lib/utils";

export function AccountActivatedCard() {
  return (
    <div className="rounded-2xl bg-white px-8 py-10 shadow-card">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
          <Image
            src="/images/Account 3D Animated Icon.png"
            alt=""
            width={128}
            height={128}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Account Activated
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your email has been successfully verified. Continue to set up your
          business on rinsehq.
        </p>

        <Link
          href="/onboarding/welcome"
          className={cn(
            "mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700",
          )}
        >
          Continue setup
        </Link>
      </div>
    </div>
  );
}
