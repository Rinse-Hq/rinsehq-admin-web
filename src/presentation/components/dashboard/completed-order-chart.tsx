import {
  chartTimeLabels,
  completedOrderChartPoints,
} from "@/presentation/data/dashboard-mock-data";

const WIDTH = 560;
const HEIGHT = 200;
const PADDING = { top: 24, right: 16, bottom: 32, left: 16 };

function buildPath(points: { x: number; y: number }[]) {
  const chartW = WIDTH - PADDING.left - PADDING.right;
  const chartH = HEIGHT - PADDING.top - PADDING.bottom;
  const maxX = points.length - 1;

  const coords = points.map((p, i) => ({
    x: PADDING.left + (i / maxX) * chartW,
    y: PADDING.top + chartH - (p.y / 100) * chartH,
  }));

  return coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
}

export function CompletedOrderChart() {
  const path = buildPath(completedOrderChartPoints);
  const chartW = WIDTH - PADDING.left - PADDING.right;
  const chartH = HEIGHT - PADDING.top - PADDING.bottom;
  const tooltipX = PADDING.left + (4 / 8) * chartW;
  const tooltipY = PADDING.top + chartH - (62 / 100) * chartH;

  return (
    <article className="rounded-xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold text-slate-800">
          Completed Order
        </h2>
        <select
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 focus:border-brand-400 focus:outline-none"
          defaultValue="week"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full min-w-[320px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4699c2" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4699c2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((i) => {
            const y = PADDING.top + (i / 4) * chartH;
            return (
              <line
                key={i}
                x1={PADDING.left}
                y1={y}
                x2={WIDTH - PADDING.right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
            );
          })}

          <path
            d={`${path} L ${WIDTH - PADDING.right} ${PADDING.top + chartH} L ${PADDING.left} ${PADDING.top + chartH} Z`}
            fill="url(#lineGradient)"
          />
          <path
            d={path}
            fill="none"
            stroke="#4699c2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx={tooltipX} cy={tooltipY} r="5" fill="#4699c2" />
          <circle cx={tooltipX} cy={tooltipY} r="9" fill="#4699c2" fillOpacity="0.2" />

          {chartTimeLabels.map((label, i) => {
            const x = PADDING.left + (i / (chartTimeLabels.length - 1)) * chartW;
            return (
              <text
                key={label}
                x={x}
                y={HEIGHT - 8}
                textAnchor="middle"
                className="fill-slate-400 text-[10px]"
              >
                {label}
              </text>
            );
          })}
        </svg>

        <div
          className="pointer-events-none absolute rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs shadow-md"
          style={{
            left: `${(tooltipX / WIDTH) * 100}%`,
            top: `${(tooltipY / HEIGHT) * 100 - 18}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="font-medium text-slate-700">No. Completed</p>
          <p className="text-sm font-bold text-slate-900">7546</p>
        </div>
      </div>
    </article>
  );
}
