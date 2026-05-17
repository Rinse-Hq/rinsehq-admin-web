import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth";
import { DashboardShell } from "@/presentation/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell userName={session.user.name ?? "Laundry Care"}>
      {children}
    </DashboardShell>
  );
}
