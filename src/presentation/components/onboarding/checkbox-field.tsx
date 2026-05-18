type CheckboxFieldProps = {
  label: string;
  name?: string;
};

export function CheckboxField({ label, name }: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
      <input
        type="checkbox"
        name={name}
        className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-400"
      />
      <span>{label}</span>
    </label>
  );
}
