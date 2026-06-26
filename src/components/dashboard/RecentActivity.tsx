import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function RecentActivity() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take:    10,
    include: {
      lead: { select: { businessName: true } },
      user: { select: { name: true } },
    },
  });

  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    where: { status: "new" },
  });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent pipeline activity */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        {activities.length === 0 ? (
          <p className="text-gray-400 dark:text-white/30 text-sm text-center py-8">
            No activity yet. Add leads to the pipeline to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="w-8 h-8 bg-[#e94560]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#e94560] text-xs">●</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-800 dark:text-white/80 text-sm font-medium truncate">
                    {a.lead.businessName}
                  </p>
                  <p className="text-gray-400 dark:text-white/30 text-xs">{a.description}</p>
                </div>
                <span className="text-gray-300 dark:text-white/20 text-xs flex-shrink-0">
                  {formatDate(a.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New contact submissions */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">New Inquiries</h3>
          {contacts.length > 0 && (
            <span className="bg-[#e94560] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {contacts.length} new
            </span>
          )}
        </div>
        {contacts.length === 0 ? (
          <p className="text-gray-400 dark:text-white/30 text-sm text-center py-8">
            No new inquiries. Share your website to start getting leads!
          </p>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="w-9 h-9 bg-[#0f3460] rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  {c.name[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-800 dark:text-white/80 text-sm font-medium">{c.name}</p>
                  <p className="text-gray-400 dark:text-white/30 text-xs truncate">{c.message}</p>
                </div>
                <span className="text-[#e94560] text-xs flex-shrink-0 bg-[#e94560]/10 px-2 py-0.5 rounded-full">
                  new
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
