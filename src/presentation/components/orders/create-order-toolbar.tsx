import Link from "next/link";

type CreateOrderToolbarProps = {
  onAddOrder?: () => void;
};

export function CreateOrderToolbar({ onAddOrder }: CreateOrderToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Link href="/dashboard/orders" className="flat-btn-outline h-10 w-auto px-5">
        Save Draft
      </Link>
      <button
        type="button"
        onClick={onAddOrder}
        className="flat-btn-primary h-10 w-auto px-5"
      >
        Add Order
      </button>
    </div>
  );
}
