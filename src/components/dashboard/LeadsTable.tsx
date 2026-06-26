"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Phone, Globe, MapPin, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Lead {
  id: string; businessName: string; category: string | null; city: string | null;
  phone: string | null; website: string | null; websiteStatus: string;
  rating: number | null; reviewCount: number | null; priority: string;
  priorityScore: number; presaleInfo: string | null; pipelineStage: string | null;
}

interface Props {
  leads:   Lead[];
  cities:  string[];
  filters: { priority?: string; city?: string; status?: string; search?: string; };
}

const STATUS_LABELS: Record<string, string> = {
  no_website:     "No Website",
  social_only:    "Social Only",
  broken_website: "Broken",
  has_website:    "Has Website",
};

export function LeadsTable({ leads, cities, filters }: Props) {
  const router = useRouter();
  const [search,   setSearch]   = useState(filters.search   || "");
  const [priority, setPriority] = useState(filters.priority || "");
  const [city,     setCity]     = useState(filters.city     || "");
  const [status,   setStatus]   = useState(filters.status   || "");
  const [adding,   setAdding]   = useState<string | null>(null);

  const apply = () => {
    const p = new URLSearchParams();
    if (search)   p.set("search",   search);
    if (priority) p.set("priority", priority);
    if (city)     p.set("city",     city);
    if (status)   p.set("status",   status);
    router.push(`/dashboard/leads?${p.toString()}`);
  };

  const addToPipeline = async (leadId: string) => {
    setAdding(leadId);
    try {
      const res = await fetch("/api/crm/add-to-pipeline", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ leadId }),
      });
      if (res.ok) {
        toast.success("Added to pipeline!");
        router.refresh();
      }
    } catch {
      toast.error("Failed to add to pipeline");
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
      {/* Filters bar */}
      <div className="p-4 border-b border-gray-100 dark:border-white/10 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="Search businesses..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
        </div>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#1a1a2e] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟠 Medium</option>
          <option value="low">🔵 Low</option>
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#1a1a2e] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#1a1a2e] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        >
          <option value="">All Statuses</option>
          <option value="no_website">No Website</option>
          <option value="social_only">Social Only</option>
          <option value="broken_website">Broken</option>
          <option value="has_website">Has Website</option>
        </select>

        <button
          onClick={apply}
          className="flex items-center gap-2 bg-[#e94560] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c73652] transition-colors"
        >
          <Filter size={14} /> Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 text-left text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider">
              <th className="px-4 py-3 font-semibold">Business</th>
              <th className="px-4 py-3 font-semibold">City</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                {/* Business */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900 dark:text-white">{lead.businessName}</div>
                  {lead.category && (
                    <div className="text-gray-400 dark:text-white/30 text-xs">{lead.category}</div>
                  )}
                </td>

                {/* City */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-white/50">
                    <MapPin size={12} />
                    <span className="text-xs">{lead.city || "—"}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    lead.websiteStatus === "no_website"     && "badge-high",
                    lead.websiteStatus === "social_only"    && "badge-medium",
                    lead.websiteStatus === "broken_website" && "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
                    lead.websiteStatus === "has_website"    && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                  )}>
                    {STATUS_LABELS[lead.websiteStatus] || lead.websiteStatus}
                  </span>
                </td>

                {/* Rating */}
                <td className="px-4 py-3">
                  {lead.rating ? (
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#f5a623] fill-[#f5a623]" />
                      <span className="text-xs text-gray-700 dark:text-white/60">{lead.rating}</span>
                      {lead.reviewCount && (
                        <span className="text-gray-300 dark:text-white/20 text-xs">({lead.reviewCount})</span>
                      )}
                    </div>
                  ) : <span className="text-gray-300 dark:text-white/20 text-xs">—</span>}
                </td>

                {/* Priority */}
                <td className="px-4 py-3">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-bold",
                    lead.priority === "high"   && "badge-high",
                    lead.priority === "medium" && "badge-medium",
                    lead.priority === "low"    && "badge-low",
                  )}>
                    {lead.priority === "high" ? "🔴" : lead.priority === "medium" ? "🟠" : "🔵"} {lead.priority}
                  </span>
                </td>

                {/* Contact */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="text-[#27ae60] hover:text-green-600">
                        <Phone size={14} />
                      </a>
                    )}
                    {lead.website && (
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[#0f3460] dark:text-blue-400 hover:opacity-80">
                        <Globe size={14} />
                      </a>
                    )}
                  </div>
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  {lead.pipelineStage ? (
                    <span className="text-[#27ae60] text-xs font-semibold">✓ In Pipeline</span>
                  ) : (
                    <button
                      onClick={() => addToPipeline(lead.id)}
                      disabled={adding === lead.id}
                      className="flex items-center gap-1 text-xs bg-[#e94560]/10 hover:bg-[#e94560] text-[#e94560] hover:text-white px-3 py-1.5 rounded-lg font-semibold transition-all"
                    >
                      <Plus size={12} />
                      {adding === lead.id ? "Adding..." : "Add to CRM"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-white/30">
            <p className="text-lg font-semibold mb-1">No leads found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-50 dark:border-white/5 text-xs text-gray-400 dark:text-white/30">
        Showing {leads.length} leads (first 100 matching results)
      </div>
    </div>
  );
}
