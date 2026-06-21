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

export type OrderLineItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  laundryMode?: string;
};

export type OrderDetail = OrderRow & {
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  invoiceId: string;
  invoiceNo: string;
  paymentStatus: "paid" | "not_paid";
  paymentMethod: string;
  laundryMode: string;
  serviceType: string;
  lineItems: OrderLineItem[];
  subtotal: number;
  vat: number;
  discount: number;
  total: number;
  pickupDate: string;
  pickupTime: string;
  deliveryTime: string;
  description: string;
};

const orderDetails: OrderDetail[] = [
  {
    id: "0123756",
    type: "Offline",
    orderDate: "13/02/2025, 12:00pm",
    customer: "Collin Chukwuemeka Abraham",
    amount: "N4,300",
    status: "active",
    deliveryDate: "15/02/2025, 10:00am",
    deliveryMode: "Pickup & delivery",
    customerEmail: "kollinchukwu12@gmail.com",
    customerPhone: "+23481090445567",
    customerAddress: "House 25, Apt 5 blk7 Ogudu G.R.A Lagos",
    invoiceId: "123456789",
    invoiceNo: "A21508791",
    paymentStatus: "paid",
    paymentMethod: "Paystack",
    laundryMode: "Wash system",
    serviceType: "Wash only",
    lineItems: [
      { name: "Wash Only", quantity: 1, unitPrice: 2000, amount: 2000, laundryMode: "Wash system" },
      { name: "Rewash", quantity: 3, unitPrice: 850, amount: 2550 },
    ],
    subtotal: 4550,
    vat: 250,
    discount: 500,
    total: 4300,
    pickupDate: "13/02/2025",
    pickupTime: "9:00AM–10:00AM",
    deliveryTime: "9:00AM–10:00AM",
    description: "Handle with care — delicate fabrics included.",
  },
  {
    id: "0123755",
    type: "Mobile app",
    orderDate: "12/02/2025, 11:20am",
    customer: "Olayiwola, Samuel",
    amount: "N15,000",
    status: "pending",
    deliveryDate: "14/02/2025, 2:00pm",
    deliveryMode: "Pickup & delivery",
    customerEmail: "samuel.olayiwola@email.com",
    customerPhone: "+2348012345678",
    customerAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
    invoiceId: "123456790",
    invoiceNo: "A21508792",
    paymentStatus: "not_paid",
    paymentMethod: "Paystack",
    laundryMode: "Count system",
    serviceType: "Wash & Fold",
    lineItems: [
      { name: "Wash & Fold", quantity: 2, unitPrice: 4500, amount: 9000, laundryMode: "Count system" },
      { name: "Iron only", quantity: 1, unitPrice: 6000, amount: 6000 },
    ],
    subtotal: 15000,
    vat: 0,
    discount: 0,
    total: 15000,
    pickupDate: "12/02/2025",
    pickupTime: "10:00AM–11:00AM",
    deliveryTime: "2:00PM–3:00PM",
    description: "Customer requested express turnaround.",
  },
  {
    id: "0123754",
    type: "Offline",
    orderDate: "11/02/2025, 4:10pm",
    customer: "Jane Doe",
    amount: "N8,500",
    status: "completed",
    deliveryDate: "12/02/2025, 11:00am",
    deliveryMode: "Store drop-off",
    customerEmail: "jane.doe@email.com",
    customerPhone: "+2348098765432",
    customerAddress: "45 Allen Avenue, Ikeja, Lagos",
    invoiceId: "123456791",
    invoiceNo: "A21508793",
    paymentStatus: "paid",
    paymentMethod: "Bank transfer",
    laundryMode: "Scale system",
    serviceType: "Dry clean",
    lineItems: [
      { name: "Dry clean", quantity: 3, unitPrice: 2500, amount: 7500, laundryMode: "Scale system" },
      { name: "Iron", quantity: 1, unitPrice: 1000, amount: 1000 },
    ],
    subtotal: 8500,
    vat: 0,
    discount: 0,
    total: 8500,
    pickupDate: "11/02/2025",
    pickupTime: "4:00PM–5:00PM",
    deliveryTime: "11:00AM–12:00PM",
    description: "Suit and formal wear — starch lightly.",
  },
  {
    id: "0123752",
    type: "Mobile app",
    orderDate: "10/02/2025, 9:30am",
    customer: "Amina Hassan",
    amount: "N2,000",
    status: "completed",
    deliveryDate: "10/02/2025, 5:00pm",
    deliveryMode: "Pickup only",
    customerEmail: "amina.hassan@email.com",
    customerPhone: "+2348076543210",
    customerAddress: "8 Bourdillon Road, Ikoyi, Lagos",
    invoiceId: "123456792",
    invoiceNo: "A21508794",
    paymentStatus: "paid",
    paymentMethod: "Paystack",
    laundryMode: "Wash system",
    serviceType: "Rewash",
    lineItems: [
      { name: "Rewash", quantity: 1, unitPrice: 2000, amount: 2000, laundryMode: "Wash system" },
    ],
    subtotal: 2000,
    vat: 0,
    discount: 0,
    total: 2000,
    pickupDate: "10/02/2025",
    pickupTime: "9:00AM–10:00AM",
    deliveryTime: "5:00PM–6:00PM",
    description: "Cancelled and refunded — quality issue on first wash.",
  },
  {
    id: "0123750",
    type: "Offline",
    orderDate: "08/02/2025, 1:15pm",
    customer: "Olayiwola, Samuel",
    amount: "N12,200",
    status: "active",
    deliveryDate: "09/02/2025, 10:00am",
    deliveryMode: "Customer rider",
    customerEmail: "samuel.olayiwola@email.com",
    customerPhone: "+2348012345678",
    customerAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
    invoiceId: "123456793",
    invoiceNo: "A21508795",
    paymentStatus: "paid",
    paymentMethod: "Paystack",
    laundryMode: "Wash system",
    serviceType: "Wash only",
    lineItems: [
      { name: "Wash only", quantity: 2, unitPrice: 3500, amount: 7000, laundryMode: "Wash system" },
      { name: "Express", quantity: 1, unitPrice: 5200, amount: 5200 },
    ],
    subtotal: 12200,
    vat: 0,
    discount: 0,
    total: 12200,
    pickupDate: "08/02/2025",
    pickupTime: "1:00PM–2:00PM",
    deliveryTime: "10:00AM–11:00AM",
    description: "Express service — deliver before noon.",
  },
];

export const latestOrders: OrderRow[] = orderDetails.map(
  ({ id, type, orderDate, customer, amount, status, deliveryDate, deliveryMode }) => ({
    id,
    type,
    orderDate,
    customer,
    amount,
    status,
    deliveryDate,
    deliveryMode,
  }),
);

export function getOrderById(id: string): OrderDetail | undefined {
  return orderDetails.find((order) => order.id === id);
}

export function formatNaira(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}
