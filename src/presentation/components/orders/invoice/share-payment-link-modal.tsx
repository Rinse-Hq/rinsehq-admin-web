"use client";

import { useCallback, useEffect, useState } from "react";
import { getInvoicePaymentUrl } from "@/presentation/components/orders/invoice/invoice-data";

type SharePaymentLinkModalProps = {
  open: boolean;
  onClose: () => void;
  invoiceId: string;
};

export function SharePaymentLinkModal({
  open,
  onClose,
  invoiceId,
}: SharePaymentLinkModalProps) {
  const [copied, setCopied] = useState(false);
  const paymentUrl = getInvoicePaymentUrl(invoiceId);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [paymentUrl]);

  function shareViaWhatsApp() {
    const message = `Complete your payment for your laundry order: ${paymentUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-payment-link-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-md border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2
          id="share-payment-link-title"
          className="pr-10 font-serif text-xl font-bold text-slate-900 sm:text-2xl"
        >
          Share Payment Link
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          This invoice contains the payment details for the order. Share the link
          with your customer so they can complete their payment securely.
        </p>

        <div className="mt-6">
          <label
            htmlFor="payment-link"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Copy link
          </label>
          <div className="relative mt-2">
            <input
              id="payment-link"
              type="text"
              readOnly
              value={paymentUrl}
              className="flat-input h-11 pr-12 text-slate-700"
            />
            <button
              type="button"
              onClick={copyLink}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              aria-label={copied ? "Link copied" : "Copy link"}
            >
              <CopyIcon />
            </button>
          </div>
          {copied ? (
            <p className="mt-2 text-xs font-medium text-status-completed">Link copied</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={shareViaWhatsApp}
          className="mt-8 flat-btn-primary"
        >
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 15H5.5C4.67 15 4 14.33 4 13.5v-9C4 3.67 4.67 3 5.5 3h9C15.33 3 16 3.67 16 5.5V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
