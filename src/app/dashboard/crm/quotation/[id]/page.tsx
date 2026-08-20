import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { QuotationPrint } from "@/components/dashboard/QuotationPrint";

export default async function QuotationPage({ params }: { params: { id: string } }) {
  const crm = await prisma.crmRecord.findUnique({
    where: { id: params.id },
    include: { lead: true, assigned: true },
  });
  if (!crm) notFound();
  return <QuotationPrint crm={crm as any} />;
}
