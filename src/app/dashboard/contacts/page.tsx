import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, Building2 } from "lucide-react";

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const newCount = contacts.filter(c => c.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Contact Inquiries</h2>
          <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
            رسائل الموقع · {contacts.length} total · {newCount} new
          </p>
        </div>
        {newCount > 0 && (
          <span className="bg-[#e94560] text-white text-sm font-bold px-3 py-1.5 rounded-full">
            {newCount} unread
          </span>
        )}
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-16 text-center">
          <Mail size={40} className="mx-auto text-gray-300 dark:text-white/20 mb-4" />
          <p className="text-gray-400 dark:text-white/30 font-semibold">No inquiries yet</p>
          <p className="text-gray-300 dark:text-white/20 text-sm mt-1">Share your website to start receiving messages</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-5 flex gap-5 items-start hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <div className="w-11 h-11 bg-[#e94560] rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {c.name[0].toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-bold text-gray-900 dark:text-white">{c.name}</span>
                  {c.status === "new" && (
                    <span className="bg-[#e94560]/10 text-[#e94560] text-xs font-bold px-2 py-0.5 rounded-full">new</span>
                  )}
                  {c.service && (
                    <span className="bg-[#0f3460]/10 text-[#0f3460] dark:text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">{c.service}</span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-white/60 text-sm mb-3">{c.message}</p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-white/40">
                  {c.email && (
                    <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-[#e94560]">
                      <Mail size={12} /> {c.email}
                    </a>
                  )}
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="flex items-center gap-1 hover:text-[#27ae60]">
                      <Phone size={12} /> {c.phone}
                    </a>
                  )}
                  {c.company && (
                    <span className="flex items-center gap-1">
                      <Building2 size={12} /> {c.company}
                    </span>
                  )}
                  <span>{formatDate(c.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
