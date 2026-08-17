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
  no_website:      "#1B5E4B",
  social_only:     "#E6C16A",
  broken_website:  "#92400e",
  has_website:     "#2E7D68",
};

const STATUS_LABELS: Record<string, string> = {
  no_website:     "No Website",
  social_only:    "Social Only",
  broken_website: "Broken",
  has_website:    "Has Website",
};

const TOOLTIP_STYLE = {
  background: "#0f2419",
  border: "1px solid rgba(230,193,106,.4)",
  borderRadius: 10,
  color: "#e7f1ec",
};

export function DashboardCharts({ data }: { data: ChartData }) {
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

  const delivered = data.pipeline.find(p => p.stage === "delivered")?.count || 0;

  const cardStyle = {
    background: "var(--card)",
    border: "1.5px solid var(--border)",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 1px 4px rgba(0,0,0,.04)",
  };

  const titleStyle = { fontWeight: 800, color: "var(--text)", fontFamily: "'Cairo',sans-serif", fontSize: 15 };
  const subStyle   = { color: "var(--muted)", fontSize: 11, marginTop: 2, marginBottom: 20 };

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* Leads by City */}
      <div className="lg:col-span-2" style={cardStyle}>
        <div style={titleStyle}>Leads by City</div>
        <div style={subStyle}>العملاء المحتملون حسب المدينة</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.leadsByCity} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#7a9e8c" }} />
            <YAxis tick={{ fontSize: 12, fill: "#7a9e8c" }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="value" fill="#1B5E4B" radius={[6,6,0,0]} name="Leads" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Website Status Pie */}
      <div style={cardStyle}>
        <div style={titleStyle}>Website Status</div>
        <div style={subStyle}>حالة الموقع الإلكتروني</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend formatter={(value) => <span style={{ fontSize: 11, color: "#7a9e8c" }}>{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline Funnel */}
      <div className="lg:col-span-2" style={cardStyle}>
        <div style={titleStyle}>Sales Pipeline</div>
        <div style={subStyle}>خط سير المبيعات</div>
        <div className="space-y-3">
          {pipelineData.map((stage, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-28 text-xs text-right flex-shrink-0" style={{ color: "var(--muted)" }}>
                {stage.name}
              </div>
              <div className="flex-1 rounded-full h-7 relative overflow-hidden" style={{ background: "rgba(27,94,75,.08)" }}>
                <div
                  className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{
                    width: `${Math.max((stage.count / Math.max(...pipelineData.map(s => s.count), 1)) * 100, 4)}%`,
                    background: stage.fill,
                  }}
                >
                  <span className="text-white text-xs font-bold">{stage.count}</span>
                </div>
              </div>
              <div className="w-8 text-xs font-bold" style={{ color: "var(--text)" }}>{stage.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 100 Websites Goal */}
      <div style={cardStyle}>
        <div style={titleStyle}>100 Websites Goal</div>
        <div style={subStyle}>هدف ١٠٠ موقع</div>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={160}>
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="60%" outerRadius="90%"
              data={[{ name: "Delivered", value: Math.min(delivered, 100), fill: "#E6C16A" }]}
              startAngle={180} endAngle={-180}
            >
              <RadialBar dataKey="value" background={{ fill: "rgba(27,94,75,.08)" }} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="-mt-12 text-center">
            <div className="text-4xl font-black" style={{ color: "#E6C16A", fontFamily: "'Cairo',sans-serif" }}>{delivered}</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>of 100</div>
          </div>

          <div className="w-full mt-4 rounded-full h-2 overflow-hidden" style={{ background: "rgba(27,94,75,.08)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(delivered, 100)}%`,
                background: "linear-gradient(90deg, #1B5E4B, #E6C16A)",
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>{100 - delivered} websites remaining</p>
        </div>
      </div>

    </div>
  );
}
