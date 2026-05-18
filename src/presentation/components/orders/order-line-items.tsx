"use client";

import { useState } from "react";
import { cn } from "@/presentation/lib/utils";

export type OrderLineItem = {
  id: string;
  name: string;
  quantity: number;
  amount: number;
};

const defaultItems: OrderLineItem[] = [
  { id: "1", name: "Wash Only", quantity: 1, amount: 2000 },
  { id: "2", name: "Rewash", quantity: 3, amount: 2550 },
];

function formatNaira(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}

export function OrderLineItems() {
  const [items, setItems] = useState<OrderLineItem[]>(defaultItems);

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "New service",
        quantity: 1,
        amount: 0,
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="hidden gap-4 border-b border-slate-100 pb-2 text-xs font-medium text-slate-500 sm:grid sm:grid-cols-[1fr_120px_100px_40px]">
        <span>List of Items selected</span>
        <span className="text-center">Number</span>
        <span className="text-right">Amount</span>
        <span />
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid gap-3 border-b border-slate-50 pb-3 sm:grid-cols-[1fr_120px_100px_40px] sm:items-center sm:gap-4"
          >
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((row) =>
                    row.id === item.id ? { ...row, name: e.target.value } : row,
                  ),
                )
              }
              className="flat-input h-10"
            />
            <div className="flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-right text-sm font-medium text-slate-800">
              {formatNaira(item.amount)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-500 hover:bg-red-100"
              aria-label="Remove item"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={addItem}
        className={cn(
          "rounded-md border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-100",
        )}
      >
        + Add new service
      </button>
    </div>
  );
}
