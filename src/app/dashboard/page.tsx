import { prisma } from "@/lib/prisma";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  // Fetch all KPIs in parallel
  const [
    totalLeads,
    highPriority,
    inPipeline,
    delivered,
    revenue,
    contacts,
    leadsByCity,
    leadsByStatus,
    pipelineByStage,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { priority: "high" } }),
    prisma.lead.count({ where: { pipelineStage: { not: null } } }),
    prisma.crmRecord.count({ where: { stage: "delivered" } }),
    prisma.crmRecord.aggregate({
      where: { stage: "delivered" },
      _sum: { agreedPrice: true },
    }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.lead.groupBy({
      by: ["city"],
      _count: true,
      orderBy: { _count: { city: "desc" } },
      take: 6,
    }),
    prisma.lead.groupBy({
      by: ["websiteStatus"],
      _count: true,
    }),
    prisma.crmRecord.groupBy({
      by: ["stage"],
      _count: true,
    }),
  ]);

  const kpis = {
    totalLeads,
    highPriority,
    inPipeline,
    delivered,
    revenue: revenue._sum.agreedPrice || 0,
    contacts,
  };

  const chartData = {
    leadsByCity: leadsByCity.map(r => ({ name: r.city || "Unknown", value: r._count })),
    leadsByStatus: leadsByStatus.map(r => ({ name: r.websiteStatus, value: r._count })),
    pipeline: pipelineByStage.map(r => ({ stage: r.stage, count: r._count })),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Overview</h2>
        <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
          Tasweeqat — 100 Websites Campaign · نظرة عامة على الحملة
        </p>
      </div>

      <DashboardKPIs kpis={kpis} />
      <DashboardCharts data={chartData} />
      <RecentActivity />
    </div>
  );
}
