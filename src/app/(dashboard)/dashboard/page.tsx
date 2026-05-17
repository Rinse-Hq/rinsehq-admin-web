import { auth } from "@/infrastructure/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Welcome to rinsehq. You&apos;re signed in as{" "}
          <span className="font-medium text-slate-900">
            {session?.user?.email}
          </span>
          .
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Active orders", value: "0" },
          { label: "Customers", value: "0" },
          { label: "Revenue today", value: "$0" },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
