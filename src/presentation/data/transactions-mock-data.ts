export type TransactionStatus = "successful" | "pending" | "failed";

export type TransactionType = "payment" | "refund";

export type TransactionRow = {
  id: string;
  reference: string;
  orderId: string;
  customer: string;
  amount: string;
  type: TransactionType;
  paymentMethod: string;
  status: TransactionStatus;
  date: string;
};

export type TransactionDetail = TransactionRow & {
  customerEmail: string;
  customerPhone: string;
  description: string;
  fee: string;
  netAmount: string;
  channel: string;
  paidAt: string | null;
};

export const transactions: TransactionRow[] = [
  {
    id: "TXN-88421",
    reference: "pay_a8f2k9m1x7",
    orderId: "0123756",
    customer: "Collin Chukwuemeka Abraham",
    amount: "N4,300",
    type: "payment",
    paymentMethod: "Paystack",
    status: "successful",
    date: "13/02/2025, 2:45pm",
  },
  {
    id: "TXN-88420",
    reference: "pay_b3c7n2p4q8",
    orderId: "0123755",
    customer: "Olayiwola, Samuel",
    amount: "N15,000",
    type: "payment",
    paymentMethod: "Paystack",
    status: "pending",
    date: "12/02/2025, 11:20am",
  },
  {
    id: "TXN-88419",
    reference: "pay_d5e9r1s6t0",
    orderId: "0123754",
    customer: "Jane Doe",
    amount: "N8,500",
    type: "payment",
    paymentMethod: "Bank transfer",
    status: "successful",
    date: "11/02/2025, 4:10pm",
  },
  {
    id: "TXN-88418",
    reference: "ref_f2h6j8l0n4",
    orderId: "0123752",
    customer: "Amina Hassan",
    amount: "N2,000",
    type: "refund",
    paymentMethod: "Paystack",
    status: "successful",
    date: "10/02/2025, 9:30am",
  },
  {
    id: "TXN-88417",
    reference: "pay_g7i1k3m5o9",
    orderId: "0123751",
    customer: "Chidi Okonkwo",
    amount: "N6,750",
    type: "payment",
    paymentMethod: "Paystack",
    status: "failed",
    date: "09/02/2025, 6:55pm",
  },
  {
    id: "TXN-88416",
    reference: "pay_h8j2l4n6p0",
    orderId: "0123750",
    customer: "Olayiwola, Samuel",
    amount: "N12,200",
    type: "payment",
    paymentMethod: "Paystack",
    status: "successful",
    date: "08/02/2025, 1:15pm",
  },
];

const transactionDetails: Record<string, Omit<TransactionDetail, keyof TransactionRow>> = {
  "TXN-88421": {
    customerEmail: "kollinchukwu12@gmail.com",
    customerPhone: "+23481090445567",
    description: "Payment for order #0123756 — Wash System, Rewash",
    fee: "N65",
    netAmount: "N4,235",
    channel: "Card",
    paidAt: "13/02/2025, 2:45pm",
  },
  "TXN-88420": {
    customerEmail: "samuel.olayiwola@email.com",
    customerPhone: "+2348012345678",
    description: "Payment for order #0123755 — Wash & Fold",
    fee: "N225",
    netAmount: "N14,775",
    channel: "Bank transfer",
    paidAt: null,
  },
  "TXN-88419": {
    customerEmail: "jane.doe@email.com",
    customerPhone: "+2348098765432",
    description: "Payment for order #0123754 — Dry clean, Iron",
    fee: "N128",
    netAmount: "N8,372",
    channel: "Bank transfer",
    paidAt: "11/02/2025, 4:10pm",
  },
  "TXN-88418": {
    customerEmail: "amina.hassan@email.com",
    customerPhone: "+2348076543210",
    description: "Refund for order #0123752 — Cancelled rewash",
    fee: "N0",
    netAmount: "N2,000",
    channel: "Paystack",
    paidAt: "10/02/2025, 9:30am",
  },
  "TXN-88417": {
    customerEmail: "chidi.okonkwo@email.com",
    customerPhone: "+2348123456789",
    description: "Payment for order #0123751 — Pickup & delivery",
    fee: "N101",
    netAmount: "N6,649",
    channel: "Card",
    paidAt: null,
  },
  "TXN-88416": {
    customerEmail: "samuel.olayiwola@email.com",
    customerPhone: "+2348012345678",
    description: "Payment for order #0123750 — Wash only, Express",
    fee: "N183",
    netAmount: "N12,017",
    channel: "USSD",
    paidAt: "08/02/2025, 1:15pm",
  },
};

export function getTransactionById(id: string): TransactionDetail | undefined {
  const row = transactions.find((t) => t.id === id);
  if (!row) return undefined;

  const detail = transactionDetails[id] ?? {
    customerEmail: "—",
    customerPhone: "—",
    description: `Transaction ${id}`,
    fee: "N0",
    netAmount: row.amount,
    channel: row.paymentMethod,
    paidAt: row.status === "successful" ? row.date : null,
  };

  return { ...row, ...detail };
}
