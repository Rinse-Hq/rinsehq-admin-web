export type OrderStatus = "active" | "pending" | "completed";

export type OrderRow = {
  id: string;
  type: string;
  orderDate: string;
  customer: string;
  amount: string;
  status: OrderStatus;
  deliveryDate: string;
  deliveryMode: string;
};

export { latestOrders } from "@/presentation/data/orders-mock-data";

export const orderSummary = [
  {
    label: "Active Order",
    value: "1008",
    variant: "active" as const,
  },
  {
    label: "Completed Order",
    value: "1008",
    variant: "completed" as const,
  },
  {
    label: "Pending Order",
    value: "1008",
    variant: "pending" as const,
  },
];

export const completedOrderChartPoints = [
  { x: 0, y: 42 },
  { x: 1, y: 55 },
  { x: 2, y: 48 },
  { x: 3, y: 62 },
  { x: 4, y: 58 },
  { x: 5, y: 70 },
  { x: 6, y: 65 },
  { x: 7, y: 78 },
  { x: 8, y: 72 },
];

export const chartTimeLabels = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
