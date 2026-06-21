import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth";
import { storeRepository } from "@/infrastructure/stores/in-memory-store-repository";
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

  storeRepository.seedOwnerStores(session.user.id, session.user.email ?? "");
  const accessibleStores = storeRepository.getAccessibleStores(
    session.user.id,
    session.user.email ?? "",
  );

  return (
    <DashboardShell
      userName={session.user.name ?? "Laundry Care"}
      storeName={session.user.storeName}
      storeId={session.user.storeId}
      permissionLevel={session.user.permissionLevel ?? "staff"}
      accessibleStores={accessibleStores}
    >
      {children}
    </DashboardShell>
  );
}
