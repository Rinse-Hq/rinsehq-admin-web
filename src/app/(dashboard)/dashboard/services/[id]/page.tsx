import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/presentation/components/services/service-detail-view";
import { getServiceById } from "@/presentation/data/services-mock-data";

type ServicePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  return {
    title: service
      ? `${service.name} — rinsehq`
      : `Service ${id} — rinsehq`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}
