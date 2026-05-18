"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { cn } from "@/presentation/lib/utils";

type FileUploadFieldProps = {
  label: string;
  hint?: string;
  className?: string;
  name?: string;
  accept?: string;
  maxSizeMb?: number;
};

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-400"
      aria-hidden
    >
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
      <path d="M4 20h16" />
    </svg>
  );
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export function FileUploadField({
  label,
  hint = "size (5m max), format (PDF, )",
  className,
  name,
  accept = "image/jpeg,image/png,image/webp,application/pdf",
  maxSizeMb = 5,
}: FileUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const maxBytes = maxSizeMb * 1024 * 1024;

  function clearFile() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (selected.size > maxBytes) {
      setError(`File must be ${maxSizeMb}MB or smaller`);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setError(null);
    setFile(selected);

    if (isImageFile(selected)) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
      />

      {!file ? (
        <label
          htmlFor={inputId}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/50"
        >
          <UploadIcon />
          <span className="text-xs text-slate-500">{hint}</span>
        </label>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {previewUrl ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={previewUrl}
                alt={file.name}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
                PDF
              </div>
              <p className="truncate text-sm font-medium text-slate-800">
                {file.name}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-slate-200 bg-white px-3 py-2">
            <p className="truncate text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs font-semibold text-brand-500 hover:underline"
              >
                Change
              </button>
              <button
                type="button"
                onClick={clearFile}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
