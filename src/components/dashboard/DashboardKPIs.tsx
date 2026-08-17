"use client";

import { Users, Target, TrendingUp, CheckCircle, DollarSign, MessageSquare } from "lucide-react";
import { formatSAR } from "@/lib/utils";

interface KPIs {
  totalLeads:   number;
  highPriority: number;
  inPipeline:   number;
  delivered:    number;
  revenue:      number;
  contacts:     number;
}

const cards = (k: KPIs) => [
  {
    icon:    Users,
    label:   "Total Leads",
    labelAr: "إجمالي العملاء",
    value:   k.totalLeads.toLocaleString(),
    sub:     "Identified businesses",
    color:   "#1B5E4B",
    bgLight: "rgba(27,94,75,.07)",
    bgDark:  "rgba(27,94,75,.25)",
  },
  {
    icon:    Target,
    label:   "High Priority",
    labelAr: "أولوية عالية",
    value:   k.highPriority.toLocaleString(),
    sub:     "Best prospects",
    color:   "#b45309",
    bgLight: "rgba(180,83,9,.07)",
    bgDark:  "rgba(180,83,9,.2)",
  },
  {
    icon:    TrendingUp,
    label:   "In Pipeline",
    labelAr: "في المبيعات",
    value:   k.inPipeline.toLocaleString(),
    sub:     "Active deals",
    color:   "#c9a24e",
    bgLight: "rgba(201,162,78,.1)",
    bgDark:  "rgba(201,162,78,.15)",
  },
  {
    icon:    CheckCircle,
    label:   "Delivered",
    labelAr: "تم التسليم",
    value:   k.delivered.toLocaleString(),
    sub:     `Goal: 100 (${Math.round(k.delivered)}%)`,
    color:   "#2E7D68",
    bgLight: "rgba(46,125,104,.08)",
    bgDark:  "rgba(46,125,104,.2)",
  },
  {
    icon:    DollarSign,
    label:   "Total Revenue",
    labelAr: "إجمالي الإيرادات",
    value:   formatSAR(k.revenue),
    sub:     "From delivered sites",
    color:   "#E6C16A",
    bgLight: "rgba(230,193,106,.1)",
    bgDark:  "rgba(230,193,106,.12)",
  },
  {
    icon:    MessageSquare,
    label:   "New Contacts",
    labelAr: "رسائل جديدة",
    value:   k.contacts.toLocaleString(),
    sub:     "From website form",
    color:   "#0e7490",
    bgLight: "rgba(14,116,144,.07)",
    bgDark:  "rgba(14,116,144,.2)",
  },
];

export function DashboardKPIs({ kpis }: { kpis: KPIs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards(kpis).map((card, i) => (
        <div
          key={i}
          className="card-hover rounded-2xl p-5 group"
          style={{
            background: "var(--card)",
            border: "1.5px solid var(--border)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 group-hover:scale-110 transition-transform"
            style={{ background: card.bgLight }}
          >
            <card.icon size={20} style={{ color: card.color }} />
          </div>

          <div
            className="text-2xl font-black mb-1 leading-none"
            style={{ color: "var(--text)", fontFamily: "'Cairo',sans-serif" }}
          >
            {card.value}
          </div>
          <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>{card.label}</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: card.color }}>{card.labelAr}</div>
          <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
