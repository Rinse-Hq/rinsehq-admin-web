export type InvoiceLineItem = {
  index: number;
  laundryMode: string;
  itemsLabel: string;
  unitPrice: number;
  amount: number;
};

export type InvoiceData = {
  id: string;
  businessName: string;
  status: "paid" | "not_paid";
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  invoiceNo: string;
  invoiceDate: string;
  paymentMethod: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  vat: number;
  discount: number;
  total: number;
  businessContact: {
    address: string;
    phone: string;
    whatsapp: string;
  };
};

export const sampleInvoice: InvoiceData = {
  id: "123456789",
  businessName: "Laundry Care",
  status: "not_paid",
  customer: {
    name: "Collin Chukwuemeka Abraham",
    email: "kollinchukwu12@gmail.com",
    phone: "+23481090445567",
    address: "House 25, Apt 5 blk7 Ogudu G.R.A Lagos",
  },
  invoiceNo: "A21508791",
  invoiceDate: "13/02/2025",
  paymentMethod: "Paystack",
  lineItems: [
    {
      index: 1,
      laundryMode: "Wash System",
      itemsLabel: "Wash only X 1",
      unitPrice: 2000,
      amount: 2000,
    },
    {
      index: 2,
      laundryMode: "",
      itemsLabel: "Rewash x 3",
      unitPrice: 850,
      amount: 2550,
    },
  ],
  subtotal: 4550,
  vat: 250,
  discount: 500,
  total: 4300,
  businessContact: {
    address: "Alhaji Lamidi Street Fatai Atere way Ilupeju",
    phone: "+2348000091234",
    whatsapp: "+2348000091234",
  },
};

export function getInvoicePaymentUrl(invoiceId: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/invoice/${invoiceId}`;
  }
  return `https://rinsehq.com/invoice/${invoiceId}`;
}

export function formatNaira(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}
