export type ServiceConfigItem = {
  id: string;
  label: string;
  enabled: boolean;
};

export const initialLaundryModes: ServiceConfigItem[] = [
  { id: "wash-system", label: "Wash System", enabled: true },
  { id: "count-system", label: "Count System", enabled: false },
  { id: "weight-system", label: "Weight System", enabled: false },
];

export const initialServiceTypes: ServiceConfigItem[] = [
  { id: "wash-fold", label: "Wash & Fold", enabled: true },
  { id: "dry-cleaning", label: "Dry Cleaning", enabled: true },
  { id: "wash-press", label: "Wash & Press", enabled: false },
  { id: "fabric-softener", label: "Fabric Softener", enabled: true },
  { id: "rewash", label: "Rewash", enabled: false },
  { id: "wash-only", label: "Wash Only", enabled: true },
  { id: "duvet", label: "Duvet", enabled: false },
  { id: "dry-only", label: "Dry Only", enabled: false },
  { id: "fabric-softener-fragrance", label: "Fabric softener with Fragrance", enabled: true },
  { id: "bleach", label: "Bleach", enabled: false },
  { id: "ironing", label: "Ironing", enabled: true },
  { id: "suit", label: "Suit", enabled: false },
];

export const initialOrderTypes: ServiceConfigItem[] = [
  { id: "pickup-delivery", label: "Pickup & Delivery", enabled: true },
  { id: "store-dropoff", label: "Store Drop-off", enabled: true },
  { id: "customer-rider", label: "Customer Rider", enabled: false },
  { id: "pickup-only", label: "Pickup only", enabled: true },
  { id: "delivery-only", label: "Delivery only", enabled: false },
];

export function createConfigItem(label: string): ServiceConfigItem {
  return {
    id: `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    label,
    enabled: true,
  };
}

export type ServicesConfiguration = {
  laundryModes: ServiceConfigItem[];
  serviceTypes: ServiceConfigItem[];
  orderTypes: ServiceConfigItem[];
};

const STORAGE_KEY = "rinsehq-services-config";

export function loadServicesConfiguration(): ServicesConfiguration | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ServicesConfiguration;
  } catch {
    return null;
  }
}

export function saveServicesConfiguration(config: ServicesConfiguration): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function getDefaultServicesConfiguration(): ServicesConfiguration {
  return {
    laundryModes: initialLaundryModes,
    serviceTypes: initialServiceTypes,
    orderTypes: initialOrderTypes,
  };
}
