export function RevenueDonutChart() {
  const size = 160;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const successPct = 0.78;
  const successLength = circumference * successPct;
  const failedLength = circumference - successLength;

  return (
    <article className="rounded-xl border border-slate-100 bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold text-slate-800">
          Total Revenue
        </h2>
        <select
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 focus:border-brand-400 focus:outline-none"
          defaultValue="7d"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex shrink-0 items-center justify-center">
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#fecaca"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#22c55e"
              strokeWidth={stroke}
              strokeDasharray={`${successLength} ${failedLength}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-slate-500">All Transaction</p>
            <p className="text-sm font-bold text-slate-900">1234,579</p>
            <p className="mt-0.5 text-xs font-medium text-status-completed">
              ↑ 15% Vs last month
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-status-completed" />
            <span className="text-slate-600">Successful</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-status-pending" />
            <span className="text-slate-600">Failed</span>
          </li>
        </ul>
      </div>
    </article>
  );
}
