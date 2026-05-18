type PhoneFieldProps = {
  label: string;
};

export function PhoneField({ label }: PhoneFieldProps) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      <div className="flex gap-2">
        <div className="flex h-12 shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <span aria-hidden>🇳🇬</span>
          <span>+234</span>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          className="flat-input flex-1"
        />
      </div>
    </div>
  );
}
