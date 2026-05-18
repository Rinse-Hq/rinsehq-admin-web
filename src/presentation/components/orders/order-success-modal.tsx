"use client";

import Image from "next/image";
import Link from "next/link";

type OrderSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export function OrderSuccessModal({ open, onClose }: OrderSuccessModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
    >
      <div className="flat-card w-full max-w-md px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex h-40 w-32 items-center justify-center">
          <Image
            src="/images/Checkout.png"
            alt=""
            width={128}
            height={160}
            className="object-contain"
            priority
          />
        </div>

        <h2
          id="order-success-title"
          className="font-serif text-xl font-bold text-slate-900"
        >
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Your order has been created. You can track and manage it from the
          dashboard.
        </p>

        <Link
          href="/dashboard/orders"
          onClick={onClose}
          className="mt-8 flat-btn-primary"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
