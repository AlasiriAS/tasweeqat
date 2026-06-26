import { prisma } from "@/lib/prisma";
import { BarChart3 } from "lucide-react";
import { PIPELINE_STAGES, formatSAR } from "@/lib/utils";

export default async function AnalyticsPage() {
  const [
    totalLeads, highPriority, inPipeline, delivered,
    byCity, byStatus, byStage, revenue, monthlyHosting,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { priority: "high" } }),
    prisma.lead.count({ where: { pipelineStage: { not: null } } }),
    prisma.crmRecord.count({ where: { stage: "delivered" } }),
    prisma.lead.groupBy({ by: ["city"], _count: { id: true }, orderBy: { _count: { id: "desc" } }, take: 10, where: { city: { not: null } } }),
    prisma.lead.groupBy({ by: ["websiteStatus"], _count: { id: true } }),
    prisma.crmRecord.groupBy({ by: ["stage"], _count: { id: true } }),
    prisma.crmRecord.aggregate({ _sum: { agreedPrice: true }, where: { stage: "delivered" } }),
    prisma.crmRecord.count({ where: { hostingActive: true } }),
  ]);

  const conversionRate = totalLeads > 0 ? ((inPipeline / totalLeads) * 100).toFixed(1) : "0";
  const deliveryRate  = inPipeline > 0 ? ((delivered / inPipeline) * 100).toFixed(1) : "0";
  const totalRevenue  = (revenue._sum.agreedPrice || 0) + (monthlyHosting * 50);

  const maxCity = Math.max(...byCity.map(c => c._count.id), 1);

  const STATUS_COLORS: Record<string, string> = {
    no_website: "#e94560", social_only: "#f5a623",
    broken_website: "#9b59b6", has_website: "#27ae60",
  };
  const STATUS_LABELS: Record<string, string> = {
    no_website: "No Website", social_only: "Social Only",
    broken_website: "Broken", has_website: "Has Website",
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-gray-400 dark:text-white/40 text-sm mt-1">التحليلات · Full performance overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads",      value: totalLeads.toLocaleString(),    sub: "identified",        color: "#0f3460" },
          { label: "Conversion Rate",  value: `${conversionRate}%`,           sub: "leads → pipeline",  color: "#e94560" },
          { label: "Delivery Rate",    value: `${deliveryRate}%`,             sub: "pipeline → done",   color: "#27ae60" },
          { label: "Total Revenue",    value: formatSAR(totalRevenue),        sub: "sites + hosting",   color: "#f5a623" },
        ].map((k, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/10">
            <div className="text-2xl font-black" style={{ color: k.color }}>{k.value}</div>
            <div className="text-gray-700 dark:text-white/70 text-sm font-semibold mt-1">{k.label}</div>
            <div className="text-gray-400 dark:text-white/30 text-xs">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads by city */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Top Cities</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs mb-5">أكثر المدن نشاطاً</p>
          <div className="space-y-3">
            {byCity.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-xs text-gray-500 dark:text-white/50 truncate">{c.city}</div>
                <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(c._count.id / maxCity) * 100}%`, background: "#e94560" }}
                  >
                    <span className="text-white text-xs font-bold">{c._count.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website status breakdown */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Website Status</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs mb-5">حالة المواقع الإلكترونية</p>
          <div className="space-y-4">
            {byStatus.map((s, i) => {
              const pct = ((s._count.id / totalLeads) * 100).toFixed(1);
              return (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700 dark:text-white/70">
                      {STATUS_LABELS[s.websiteStatus] || s.websiteStatus}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-white/40">{s._count.id} ({pct}%)</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: STATUS_COLORS[s.websiteStatus] || "#6b7280" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline funnel */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Pipeline Funnel</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs mb-5">مسار المبيعات</p>
          <div className="space-y-3">
            {PIPELINE_STAGES.map((stage) => {
              const count = byStage.find(s => s.stage === stage.id)?._count.id || 0;
              const pct = inPipeline > 0 ? ((count / inPipeline) * 100).toFixed(0) : "0";
              return (
                <div key={stage.id} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-gray-500 dark:text-white/50">{stage.label}</div>
                  <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-full h-7 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${Math.max(Number(pct), 4)}%`, background: stage.color }}
                    >
                      <span className="text-white text-xs font-bold">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue summary */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Revenue Breakdown</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs mb-5">تفاصيل الإيرادات</p>
          <div className="space-y-4">
            {[
              { label: "Website Revenue",  labelAr: "عائد المواقع",   value: revenue._sum.agreedPrice || 0,  color: "#0f3460" },
              { label: "Monthly Hosting",  labelAr: "الاستضافة الشهرية", value: monthlyHosting * 50, color: "#27ae60" },
              { label: "Active Hosting Clients", labelAr: "عملاء الاستضافة", value: monthlyHosting, isCount: true, color: "#f5a623" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">{r.label}</div>
                  <div className="text-xs" style={{ color: r.color }}>{r.labelAr}</div>
                </div>
                <div className="text-lg font-black" style={{ color: r.color }}>
                  {r.isCount ? r.value : formatSAR(r.value as number)}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <div className="font-bold text-gray-900 dark:text-white">Total</div>
              <div className="text-xl font-black text-[#e94560]">{formatSAR(totalRevenue)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
