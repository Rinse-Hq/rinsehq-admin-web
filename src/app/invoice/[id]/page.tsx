import type { Metadata } from "next";
import { InvoicePaymentView } from "@/presentation/components/orders/invoice/invoice-payment-view";

type InvoicePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Invoice ${id} — rinsehq`,
    description: "View and pay your laundry order invoice",
  };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params;
  return <InvoicePaymentView invoiceId={id} />;
}
