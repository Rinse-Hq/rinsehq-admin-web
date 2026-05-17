import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthLayout({ children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex items-center bg-brand-500 px-6 py-4 text-white lg:hidden">
        <Link href="/" className="text-xl font-bold tracking-tight">
          rinse<span className="font-normal">hq</span>
        </Link>
      </div>
      <aside className="hidden w-[340px] shrink-0 flex-col bg-brand-500 px-10 py-8 text-white lg:flex">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          rinse<span className="font-normal">hq</span>
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <Image
              src="/images/id-badge.svg"
              alt=""
              width={176}
              height={176}
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
        <div className="w-full max-w-md">{children}</div>
        {footer ? <div className="mt-6 text-center text-sm">{footer}</div> : null}
      </main>
    </div>
  );
}
