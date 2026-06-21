import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailView } from "@/presentation/components/orders/order-detail-view";
import { getOrderById } from "@/presentation/data/orders-mock-data";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id} — rinsehq`,
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  return <OrderDetailView order={order} />;
}
