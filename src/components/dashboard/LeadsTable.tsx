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
  googleMapsUrl: string | null;
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

const STATUS_COLORS: Record<string, string> = {
  no_website:     "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  social_only:    "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  broken_website: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  has_website:    "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
};

export function LeadsTable({ leads, cities, filters }: Props) {
  const router = useRouter();
  const [search,   setSearch]   = useState(filters.search   || "");
  const [priority, setPriority] = useState(filters.priority || "");
  const [city,     setCity]     = useState(filters.city     || "");
  const [status,   setStatus]   = useState(filters.status   || "");
  const [adding,   setAdding]   = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const apply = () => {
    const p = new URLSearchParams();
    if (search)   p.set("search",   search);
    if (priority) p.set("priority", priority);
    if (city)     p.set("city",     city);
    if (status)   p.set("status",   status);
    router.push(`/dashboard/leads?${p.toString()}`);
  };

  const reset = () => {
    setSearch(""); setPriority(""); setCity(""); setStatus("");
    router.push("/dashboard/leads");
  };

  const addToPipeline = async (leadId: string) => {
    setAdding(leadId);
    try {
      const res = await fetch("/api/crm/add-to-pipeline", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ leadId }),
      });
      if (res.ok) { toast.success("Added to pipeline!"); router.refresh(); }
    } catch { toast.error("Failed to add to pipeline"); }
    finally  { setAdding(null); }
  };

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="bg-white dark:bg-[#0f2419] rounded-2xl border border-gray-100 dark:border-white/8 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="Search by name, city, category..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-white/8 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
          />
        </div>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/8 rounded-xl bg-gray-50 dark:bg-[#0f2419] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D68]">
          <option value="">All Priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟠 Medium</option>
          <option value="low">🔵 Low</option>
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/8 rounded-xl bg-gray-50 dark:bg-[#0f2419] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D68]">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 dark:border-white/8 rounded-xl bg-gray-50 dark:bg-[#0f2419] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D68]">
          <option value="">All Website Status</option>
          <option value="no_website">No Website</option>
          <option value="social_only">Social Only</option>
          <option value="broken_website">Broken</option>
          <option value="has_website">Has Website</option>
        </select>

        <button onClick={apply}
          className="flex items-center gap-2 bg-[#1B5E4B] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#145240] transition-colors">
          <Filter size={14} /> Apply
        </button>
        <button onClick={reset}
          className="px-4 py-2.5 border border-gray-200 dark:border-white/8 rounded-xl text-sm font-semibold text-gray-600 dark:text-white/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          Reset
        </button>
      </div>

      {/* Count */}
      <div className="text-xs text-gray-400 dark:text-white/30 px-1">
        Showing {leads.length} leads (first 100 matching results)
      </div>

      {/* Cards grid */}
      {leads.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-white/30 bg-white dark:bg-[#0f2419] rounded-2xl border border-gray-100 dark:border-white/8">
          <p className="text-lg font-semibold mb-1">No leads found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {leads.map((lead) => (
            <div key={lead.id}
              className="bg-white dark:bg-[#0f2419] rounded-2xl border border-gray-100 dark:border-white/8 shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:border-[#E6C16A]/40 transition-all">

              {/* Card header */}
              <div className="p-4 flex-1 space-y-2">
                {/* Website status badge */}
                <span className={cn("inline-block px-2 py-0.5 rounded-full text-xs font-bold", STATUS_COLORS[lead.websiteStatus] || "bg-gray-100 text-gray-500")}>
                  {STATUS_LABELS[lead.websiteStatus] || lead.websiteStatus}
                </span>

                {/* Business name */}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
                  {lead.businessName}
                </h3>

                {/* Meta row */}
                <div className="flex flex-wrap gap-1.5 text-xs text-gray-500 dark:text-white/40">
                  {lead.rating && (
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="text-[#E6C16A] fill-[#E6C16A]" />
                      {lead.rating}
                      {lead.reviewCount ? ` (${lead.reviewCount})` : ""}
                    </span>
                  )}
                  {lead.city && (
                    <span className="flex items-center gap-0.5">
                      <MapPin size={10} /> {lead.city}
                    </span>
                  )}
                  {lead.category && <span>· {lead.category}</span>}
                </div>

                {/* Phone */}
                {lead.phone && (
                  <div className="text-xs text-gray-600 dark:text-white/50 flex items-center gap-1">
                    <Phone size={10} /> {lead.phone}
                  </div>
                )}

                {/* Pre-sale info */}
                {lead.presaleInfo && (
                  <div className="mt-2">
                    <button
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                      className="text-xs font-bold text-[#1B5E4B] dark:text-[#E6C16A] flex items-center gap-1"
                    >
                      Pre-Sale Info — Closing Points {expanded === lead.id ? "▲" : "▼"}
                    </button>
                    {expanded === lead.id && (
                      <p className="mt-1 text-xs text-gray-600 dark:text-white/60 leading-relaxed border-t border-gray-100 dark:border-white/8 pt-2">
                        {lead.presaleInfo}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Priority strip */}
              <div className={cn(
                "h-1",
                lead.priority === "high"   && "bg-red-400",
                lead.priority === "medium" && "bg-orange-400",
                lead.priority === "low"    && "bg-blue-400",
              )} />

              {/* Action buttons */}
              <div className="flex border-t border-gray-100 dark:border-white/8">
                {lead.phone ? (
                  <a href={`tel:${lead.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
                    <Phone size={12} /> Call
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-2.5 text-xs text-gray-300 dark:text-white/20">No phone</div>
                )}

                {lead.googleMapsUrl ? (
                  <a href={lead.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-[#0a1f14] hover:bg-[#1B5E4B] transition-colors border-l border-gray-100 dark:border-white/8">
                    <MapPin size={12} /> Maps
                  </a>
                ) : lead.website ? (
                  <a href={lead.website} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-[#0a1f14] hover:bg-[#1B5E4B] transition-colors border-l border-gray-100 dark:border-white/8">
                    <Globe size={12} /> Website
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-2.5 text-xs text-gray-300 dark:text-white/20 border-l border-gray-100 dark:border-white/8">No link</div>
                )}
              </div>

              {/* Add to CRM */}
              <div className="px-3 pb-3 pt-2">
                {lead.pipelineStage ? (
                  <div className="text-center text-xs text-[#2E7D68] font-semibold py-1">✓ In Pipeline</div>
                ) : (
                  <button
                    onClick={() => addToPipeline(lead.id)}
                    disabled={adding === lead.id}
                    className="w-full flex items-center justify-center gap-1.5 text-xs bg-[#1B5E4B]/10 hover:bg-[#1B5E4B] text-[#2E7D68] hover:text-white py-2 rounded-xl font-semibold transition-all disabled:opacity-50">
                    <Plus size={12} />
                    {adding === lead.id ? "Adding..." : "Add to CRM"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
