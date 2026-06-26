import { prisma } from "@/lib/prisma";
import { CrmKanban } from "@/components/dashboard/CrmKanban";

export default async function CrmPage() {
  const records = await prisma.crmRecord.findMany({
    include: {
      lead:     true,
      assigned: { select: { id: true, name: true } },
      notes:    { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  const [total, revenue, active] = await Promise.all([
    prisma.crmRecord.count(),
    prisma.crmRecord.aggregate({ _sum: { agreedPrice: true }, where: { stage: "delivered" } }),
    prisma.crmRecord.count({ where: { stage: { not: "delivered" } } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">CRM Pipeline</h2>
          <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
            {total} clients · {active} active · {(revenue._sum.agreedPrice || 0).toLocaleString()} SAR delivered
          </p>
        </div>
      </div>

      <CrmKanban initialRecords={records as any} />
    </div>
  );
}
