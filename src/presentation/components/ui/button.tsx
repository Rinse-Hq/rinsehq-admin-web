import { cn } from "@/presentation/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  isLoading?: boolean;
};

export function Button({
  className,
  variant = "primary",
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variant === "primary" && "flat-btn-primary",
        variant === "ghost" &&
          "inline-flex h-12 w-full items-center justify-center rounded-md bg-transparent px-6 text-sm font-medium text-brand-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 disabled:opacity-50",
        variant === "outline" && "flat-btn-outline",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait…" : children}
    </button>
  );
}
