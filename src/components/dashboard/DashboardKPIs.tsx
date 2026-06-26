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
    color:   "#0f3460",
    bg:      "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon:    Target,
    label:   "High Priority",
    labelAr: "أولوية عالية",
    value:   k.highPriority.toLocaleString(),
    sub:     "Best prospects",
    color:   "#e94560",
    bg:      "bg-red-50 dark:bg-red-950/20",
  },
  {
    icon:    TrendingUp,
    label:   "In Pipeline",
    labelAr: "في المبيعات",
    value:   k.inPipeline.toLocaleString(),
    sub:     "Active deals",
    color:   "#f5a623",
    bg:      "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon:    CheckCircle,
    label:   "Delivered",
    labelAr: "تم التسليم",
    value:   k.delivered.toLocaleString(),
    sub:     `Goal: 100 (${Math.round(k.delivered)}%)`,
    color:   "#27ae60",
    bg:      "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon:    DollarSign,
    label:   "Total Revenue",
    labelAr: "إجمالي الإيرادات",
    value:   formatSAR(k.revenue),
    sub:     "From delivered sites",
    color:   "#9b59b6",
    bg:      "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon:    MessageSquare,
    label:   "New Contacts",
    labelAr: "رسائل جديدة",
    value:   k.contacts.toLocaleString(),
    sub:     "From website form",
    color:   "#1abc9c",
    bg:      "bg-teal-50 dark:bg-teal-950/20",
  },
];

export function DashboardKPIs({ kpis }: { kpis: KPIs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards(kpis).map((card, i) => (
        <div
          key={i}
          className={`${card.bg} rounded-2xl p-5 border border-gray-100 dark:border-white/10 card-hover group`}
        >
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 group-hover:scale-110 transition-transform"
            style={{ background: `${card.color}18` }}
          >
            <card.icon size={20} style={{ color: card.color }} />
          </div>

          <div className="text-2xl font-black text-gray-900 dark:text-white mb-1 leading-none">
            {card.value}
          </div>
          <div className="text-gray-700 dark:text-white/70 text-xs font-semibold">{card.label}</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: card.color }}>{card.labelAr}</div>
          <div className="text-gray-400 dark:text-white/30 text-xs mt-1">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
