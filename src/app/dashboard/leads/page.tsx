import { prisma } from "@/lib/prisma";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

interface SearchParams { priority?: string; city?: string; status?: string; search?: string; }

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  const where: any = {};
  if (searchParams.priority) where.priority      = searchParams.priority;
  if (searchParams.city)     where.city          = searchParams.city;
  if (searchParams.status)   where.websiteStatus = searchParams.status;
  if (searchParams.search)   where.businessName  = { contains: searchParams.search };

  const [leads, cities, total, high, medium, noWebsite] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { priorityScore: "desc" },
      take:    100,
    }),
    prisma.lead.findMany({
      distinct: ["city"],
      select:   { city: true },
      where:    { city: { not: null } },
    }),
    prisma.lead.count(),
    prisma.lead.count({ where: { priority: "high" } }),
    prisma.lead.count({ where: { priority: "medium" } }),
    prisma.lead.count({ where: { websiteStatus: "no_website" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Leads Database</h2>
          <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
            {total.toLocaleString()} businesses identified · {high} high priority
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Leads",   value: total,     color: "#0f3460"  },
          { label: "High Priority", value: high,      color: "#e94560"  },
          { label: "Medium",        value: medium,    color: "#f5a623"  },
          { label: "No Website",    value: noWebsite, color: "#27ae60"  },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/10">
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value.toLocaleString()}</div>
            <div className="text-gray-500 dark:text-white/50 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <LeadsTable
        leads={leads}
        cities={cities.map(c => c.city!).filter(Boolean)}
        filters={searchParams}
      />
    </div>
  );
}
