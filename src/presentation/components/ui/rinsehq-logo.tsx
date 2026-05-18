import Image from "next/image";
import { cn } from "@/presentation/lib/utils";

type RinseHqLogoProps = {
  className?: string;
  priority?: boolean;
  /** Use on light backgrounds; default logo is for brand/dark surfaces */
  variant?: "light" | "dark";
};

export function RinseHqLogo({
  className,
  priority,
  variant = "dark",
}: RinseHqLogoProps) {
  return (
    <Image
      src={
        variant === "light"
          ? "/images/rinsehq-logo-dark.svg"
          : "/images/rinsehq-logo.svg"
      }
      alt="rinsehq"
      width={96.29}
      height={37.35}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
