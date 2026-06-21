import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <section className="flat-card p-8 text-center">
      <h1 className="font-serif text-xl font-bold text-slate-900">
        Service not found
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        This service does not exist or may have been removed.
      </p>
      <Link
        href="/dashboard/services"
        className="mt-6 inline-flex flat-btn-primary h-10 w-auto px-6"
      >
        Back to catalog
      </Link>
    </section>
  );
}
