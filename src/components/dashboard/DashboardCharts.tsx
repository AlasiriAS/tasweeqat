"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar,
} from "recharts";
import { PIPELINE_STAGES } from "@/lib/utils";

interface ChartData {
  leadsByCity:   { name: string; value: number }[];
  leadsByStatus: { name: string; value: number }[];
  pipeline:      { stage: string; count: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  no_website:      "#e94560",
  social_only:     "#f5a623",
  broken_website:  "#9b59b6",
  has_website:     "#27ae60",
};

const STATUS_LABELS: Record<string, string> = {
  no_website:     "No Website",
  social_only:    "Social Only",
  broken_website: "Broken",
  has_website:    "Has Website",
};

export function DashboardCharts({ data }: { data: ChartData }) {
  // Enrich pipeline data with labels
  const pipelineData = PIPELINE_STAGES.map(s => ({
    name:   s.label,
    nameAr: s.labelAr,
    count:  data.pipeline.find(p => p.stage === s.id)?.count || 0,
    fill:   s.color,
  }));

  const statusData = data.leadsByStatus.map(s => ({
    name:  STATUS_LABELS[s.name] || s.name,
    value: s.value,
    color: STATUS_COLORS[s.name] || "#6b7280",
  }));

  // Progress toward 100 goal
  const delivered = data.pipeline.find(p => p.stage === "delivered")?.count || 0;
  const goalData = [
    { name: "Delivered", value: delivered, fill: "#27ae60" },
    { name: "Remaining", value: Math.max(100 - delivered, 0), fill: "#e5e7eb" },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Leads by city - bar chart */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Leads by City</h3>
        <p className="text-gray-400 dark:text-white/30 text-xs mb-5">العملاء المحتملون حسب المدينة</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.leadsByCity} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{ background: "#1a1a2e", border: "1px solid #e94560", borderRadius: 10, color: "#fff" }}
            />
            <Bar dataKey="value" fill="#e94560" radius={[6, 6, 0, 0]} name="Leads" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Website status - pie chart */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Website Status</h3>
        <p className="text-gray-400 dark:text-white/30 text-xs mb-5">حالة الموقع الإلكتروني</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "#1a1a2e", border: "1px solid #e94560", borderRadius: 10, color: "#fff" }}
            />
            <Legend
              formatter={(value) => <span style={{ fontSize: 11, color: "#9ca3af" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline funnel */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Sales Pipeline</h3>
        <p className="text-gray-400 dark:text-white/30 text-xs mb-5">خط سير المبيعات</p>
        <div className="space-y-3">
          {pipelineData.map((stage, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-28 text-xs text-gray-500 dark:text-white/50 text-right flex-shrink-0">
                {stage.name}
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-full h-7 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{
                    width:      `${Math.max((stage.count / Math.max(...pipelineData.map(s => s.count), 1)) * 100, 4)}%`,
                    background: stage.fill,
                  }}
                >
                  <span className="text-white text-xs font-bold">{stage.count}</span>
                </div>
              </div>
              <div className="w-8 text-xs font-bold text-gray-900 dark:text-white">{stage.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal progress */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">100 Websites Goal</h3>
        <p className="text-gray-400 dark:text-white/30 text-xs mb-2">هدف ١٠٠ موقع</p>

        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={160}>
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              data={[{ name: "Delivered", value: Math.min(delivered, 100), fill: "#27ae60" }]}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar dataKey="value" background={{ fill: "rgba(0,0,0,0.05)" }} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="-mt-12 text-center">
            <div className="text-4xl font-black text-[#27ae60]">{delivered}</div>
            <div className="text-gray-400 dark:text-white/40 text-sm">of 100</div>
          </div>

          <div className="w-full mt-4 bg-gray-100 dark:bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e94560] to-[#27ae60] rounded-full transition-all"
              style={{ width: `${Math.min(delivered, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-white/30 mt-2">{100 - delivered} websites remaining</p>
        </div>
      </div>
    </div>
  );
}
