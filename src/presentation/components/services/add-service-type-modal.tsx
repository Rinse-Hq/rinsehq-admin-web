"use client";

import { useEffect, useState } from "react";

type AddServiceTypeModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

export function AddServiceTypeModal({
  open,
  onClose,
  onSave,
}: AddServiceTypeModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-service-type-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-md border border-slate-200 bg-white px-8 py-10 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2
          id="add-service-type-title"
          className="font-serif text-2xl font-bold text-slate-900"
        >
          Add New Service Type
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="new-service-name"
              className="block text-sm font-medium text-slate-800"
            >
              New Service
            </label>
            <input
              id="new-service-name"
              type="text"
              placeholder="Enter New Service"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flat-input"
              autoFocus
            />
          </div>

          <button type="submit" className="flat-btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
