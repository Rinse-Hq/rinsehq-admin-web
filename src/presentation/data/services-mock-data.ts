export type LaundryMode = "Wash system" | "Count system" | "Scale system";

export type ServiceCategory =
  | "wash"
  | "press"
  | "dry_clean"
  | "addon"
  | "special";

export type PricingUnit = "per_item" | "per_kg" | "per_load" | "flat";

export type ServiceStatus = "active" | "inactive";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  laundryMode: LaundryMode;
  unitPrice: number;
  pricingUnit: PricingUnit;
  turnaroundHours: number;
  status: ServiceStatus;
  description: string;
  ordersCount: number;
  updatedAt: string;
};

export const laundryModes: LaundryMode[] = [
  "Wash system",
  "Count system",
  "Scale system",
];

export const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "wash", label: "Wash" },
  { value: "press", label: "Press & iron" },
  { value: "dry_clean", label: "Dry clean" },
  { value: "addon", label: "Add-on" },
  { value: "special", label: "Specialty" },
];

export const pricingUnits: { value: PricingUnit; label: string }[] = [
  { value: "per_item", label: "Per item" },
  { value: "per_kg", label: "Per kg" },
  { value: "per_load", label: "Per load" },
  { value: "flat", label: "Flat rate" },
];

const services: Service[] = [
  {
    id: "SRV-001",
    name: "Wash only",
    category: "wash",
    laundryMode: "Wash system",
    unitPrice: 2000,
    pricingUnit: "per_load",
    turnaroundHours: 24,
    status: "active",
    description: "Standard wash cycle without folding or pressing.",
    ordersCount: 342,
    updatedAt: "13/02/2025",
  },
  {
    id: "SRV-002",
    name: "Wash & Fold",
    category: "wash",
    laundryMode: "Count system",
    unitPrice: 4500,
    pricingUnit: "per_load",
    turnaroundHours: 48,
    status: "active",
    description: "Full wash, dry, and neatly folded — ideal for everyday laundry.",
    ordersCount: 518,
    updatedAt: "12/02/2025",
  },
  {
    id: "SRV-003",
    name: "Wash & Press",
    category: "press",
    laundryMode: "Count system",
    unitPrice: 3500,
    pricingUnit: "per_item",
    turnaroundHours: 48,
    status: "active",
    description: "Wash and professional press for shirts, trousers, and uniforms.",
    ordersCount: 276,
    updatedAt: "11/02/2025",
  },
  {
    id: "SRV-004",
    name: "Steam Press",
    category: "press",
    laundryMode: "Count system",
    unitPrice: 1500,
    pricingUnit: "per_item",
    turnaroundHours: 24,
    status: "active",
    description: "Steam pressing for already-clean garments.",
    ordersCount: 189,
    updatedAt: "10/02/2025",
  },
  {
    id: "SRV-005",
    name: "Dry Cleaning",
    category: "dry_clean",
    laundryMode: "Scale system",
    unitPrice: 2500,
    pricingUnit: "per_item",
    turnaroundHours: 72,
    status: "active",
    description: "Professional dry clean for suits, dresses, and delicate fabrics.",
    ordersCount: 164,
    updatedAt: "09/02/2025",
  },
  {
    id: "SRV-006",
    name: "Ironing",
    category: "press",
    laundryMode: "Count system",
    unitPrice: 1000,
    pricingUnit: "per_item",
    turnaroundHours: 24,
    status: "active",
    description: "Hand or machine ironing for individual garments.",
    ordersCount: 203,
    updatedAt: "08/02/2025",
  },
  {
    id: "SRV-007",
    name: "Rewash",
    category: "addon",
    laundryMode: "Wash system",
    unitPrice: 850,
    pricingUnit: "per_item",
    turnaroundHours: 24,
    status: "active",
    description: "Additional wash cycle for items that need a second pass.",
    ordersCount: 87,
    updatedAt: "07/02/2025",
  },
  {
    id: "SRV-008",
    name: "Express service",
    category: "special",
    laundryMode: "Wash system",
    unitPrice: 5200,
    pricingUnit: "flat",
    turnaroundHours: 6,
    status: "active",
    description: "Same-day turnaround — subject to capacity and cut-off times.",
    ordersCount: 94,
    updatedAt: "06/02/2025",
  },
  {
    id: "SRV-009",
    name: "Duvet cleaning",
    category: "special",
    laundryMode: "Scale system",
    unitPrice: 8000,
    pricingUnit: "per_item",
    turnaroundHours: 96,
    status: "active",
    description: "Large-item wash and dry for duvets, comforters, and blankets.",
    ordersCount: 41,
    updatedAt: "05/02/2025",
  },
  {
    id: "SRV-010",
    name: "Fabric softener with fragrance",
    category: "addon",
    laundryMode: "Wash system",
    unitPrice: 500,
    pricingUnit: "flat",
    turnaroundHours: 0,
    status: "active",
    description: "Premium softener add-on with customer-selected fragrance.",
    ordersCount: 156,
    updatedAt: "04/02/2025",
  },
  {
    id: "SRV-011",
    name: "Suit dry clean",
    category: "dry_clean",
    laundryMode: "Scale system",
    unitPrice: 4500,
    pricingUnit: "per_item",
    turnaroundHours: 72,
    status: "inactive",
    description: "Two-piece suit dry clean with light starch option.",
    ordersCount: 62,
    updatedAt: "01/02/2025",
  },
  {
    id: "SRV-012",
    name: "Bleach treatment",
    category: "addon",
    laundryMode: "Wash system",
    unitPrice: 750,
    pricingUnit: "flat",
    turnaroundHours: 0,
    status: "inactive",
    description: "Whitening bleach add-on for whites and linens.",
    ordersCount: 23,
    updatedAt: "28/01/2025",
  },
];

export const initialServices: Service[] = services;

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getCategoryLabel(category: ServiceCategory): string {
  return serviceCategories.find((c) => c.value === category)?.label ?? category;
}

export function getPricingUnitLabel(unit: PricingUnit): string {
  return pricingUnits.find((u) => u.value === unit)?.label ?? unit;
}

export function formatNaira(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}

export function computeServiceSummary(serviceList: Service[]) {
  const active = serviceList.filter((s) => s.status === "active").length;
  const inactive = serviceList.filter((s) => s.status === "inactive").length;
  const categories = new Set(serviceList.map((s) => s.category)).size;

  return {
    total: serviceList.length,
    active,
    inactive,
    categories,
  };
}
