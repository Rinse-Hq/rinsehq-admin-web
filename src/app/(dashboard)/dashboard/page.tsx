import { CompletedOrderChart } from "@/presentation/components/dashboard/completed-order-chart";
import { DashboardPageHeader } from "@/presentation/components/dashboard/dashboard-page-header";
import { OrderHistoryTable } from "@/presentation/components/dashboard/order-history-table";
import { OrderSummaryCards } from "@/presentation/components/dashboard/order-summary-cards";
import { RevenueDonutChart } from "@/presentation/components/dashboard/revenue-donut-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader />
      <OrderSummaryCards />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CompletedOrderChart />
        </div>
        <RevenueDonutChart />
      </div>

      <OrderHistoryTable />
    </div>
  );
}
