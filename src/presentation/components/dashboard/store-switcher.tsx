"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { StoreAccess } from "@/presentation/data/stores-data";
import { getStoreRoleLabel } from "@/presentation/data/stores-data";
import { permissionLevelLabels } from "@/presentation/data/account-mock-data";
import { switchStoreAction } from "@/presentation/actions/auth-actions";
import { cn } from "@/presentation/lib/utils";

type StoreSwitcherProps = {
  stores: StoreAccess[];
  activeStoreId: string;
};

export function StoreSwitcher({ stores, activeStoreId }: StoreSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStore =
    stores.find((store) => store.storeId === activeStoreId) ?? stores[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!activeStore || stores.length <= 1) {
    return (
      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Store
        </p>
        <p className="max-w-[180px] truncate text-sm font-medium text-slate-800">
          {activeStore?.storeName ?? "Store"}
        </p>
      </div>
    );
  }

  async function handleSelect(storeId: string) {
    if (storeId === activeStoreId || pending) return;

    setPending(true);
    const result = await switchStoreAction(storeId);
    setPending(false);
    setOpen(false);

    if (result.error) return;

    router.refresh();
  }

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={pending}
        className="flex max-w-[220px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:bg-slate-50"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <StoreIcon className="h-4 w-4 shrink-0 text-brand-600" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-slate-800">
            {activeStore.storeName}
          </span>
          <span className="block truncate text-xs text-slate-500">
            {permissionLevelLabels[activeStore.permissionLevel]}
          </span>
        </span>
        <ChevronIcon
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {stores.map((store) => {
            const selected = store.storeId === activeStoreId;

            return (
              <li key={store.storeId}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(store.storeId)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50",
                    selected && "bg-brand-50",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">
                        {store.storeName}
                      </span>
                      {store.isMainStore ? (
                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                          Main
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {[store.city, getStoreRoleLabel(store.role)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  {selected ? (
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10L12 4L20 10V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 20V12H15V20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
