import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransactionDetailView } from "@/presentation/components/transactions/transaction-detail-view";
import { getTransactionById } from "@/presentation/data/transactions-mock-data";

type TransactionPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: TransactionPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Transaction ${id} — rinsehq`,
  };
}

export default async function TransactionPage({ params }: TransactionPageProps) {
  const { id } = await params;
  const transaction = getTransactionById(id);

  if (!transaction) {
    notFound();
  }

  return <TransactionDetailView transaction={transaction} />;
}
