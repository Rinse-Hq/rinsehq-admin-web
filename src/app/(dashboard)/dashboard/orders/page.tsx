import { OrderHistoryTable } from "@/presentation/components/dashboard/order-history-table";
import { OrdersPageHeader } from "@/presentation/components/orders/orders-page-header";

export default function OrdersPage() {
  return (
    <section>
      <OrdersPageHeader />
      <OrderHistoryTable className="mt-6" />
    </section>
  );
}
