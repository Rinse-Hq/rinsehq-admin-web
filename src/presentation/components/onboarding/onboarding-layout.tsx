import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { RinseHqLogo } from "@/presentation/components/ui/rinsehq-logo";

type OnboardingLayoutProps = {
  children: ReactNode;
  wide?: boolean;
};

export function OnboardingLayout({ children, wide }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex items-center bg-brand-500 px-6 py-4 text-white lg:hidden">
        <Link href="/">
          <RinseHqLogo className="h-7 w-auto" priority />
        </Link>
      </div>
      <aside className="hidden w-[340px] shrink-0 flex-col bg-brand-500 px-10 py-8 text-white lg:flex">
        <Link href="/">
          <RinseHqLogo priority />
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div className="relative flex h-52 w-52 items-center justify-center">
            <Image
              src="/images/image 20.png"
              alt=""
              width={208}
              height={208}
              className="object-contain"
              priority
            />
          </div>
          <p className="max-w-[220px] text-lg font-medium leading-snug">
            Set up your account to unlock the full power of rinsehq. It&apos;s
            quick and easy
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center bg-surface px-4 py-10">
        <div className={wide ? "w-full max-w-2xl" : "w-full max-w-md"}>
          {children}
        </div>
      </main>
    </div>
  );
}
