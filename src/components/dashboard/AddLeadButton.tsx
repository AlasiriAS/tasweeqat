"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";

export function AddLeadButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "", category: "", city: "", phone: "",
    website: "", websiteStatus: "no_website", rating: "", reviewCount: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rating: form.rating ? parseFloat(form.rating) : undefined,
          reviewCount: form.reviewCount ? parseInt(form.reviewCount) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Lead added!");
      setOpen(false);
      setForm({ businessName: "", category: "", city: "", phone: "", website: "", websiteStatus: "no_website", rating: "", reviewCount: "" });
      router.refresh();
    } catch {
      toast.error("Failed to add lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#1B5E4B] hover:bg-[#2E7D68] text-white text-sm font-bold rounded-xl transition-colors"
      >
        <Plus size={16} /> Add Lead
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#0a1f14] rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/8">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">Add New Lead</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Business Name *</label>
                <input required value={form.businessName} onChange={e => set("businessName", e.target.value)}
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                  placeholder="e.g. Al Noor Barbershop" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Category</label>
                  <input value={form.category} onChange={e => set("category", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                    placeholder="e.g. Barber shop" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">City</label>
                  <input value={form.city} onChange={e => set("city", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                    placeholder="e.g. الدمام" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Phone</label>
                  <input value={form.phone} onChange={e => set("phone", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                    placeholder="+966 5x xxx xxxx" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Website Status</label>
                  <select value={form.websiteStatus} onChange={e => set("websiteStatus", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]">
                    <option value="no_website">No Website</option>
                    <option value="social_only">Social Only</option>
                    <option value="broken_website">Broken Website</option>
                    <option value="has_website">Has Website</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Website URL</label>
                <input value={form.website} onChange={e => set("website", e.target.value)}
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                  placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Google Rating</label>
                  <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={e => set("rating", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                    placeholder="4.5" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wide">Review Count</label>
                  <input type="number" min="0" value={form.reviewCount} onChange={e => set("reviewCount", e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D68]"
                    placeholder="42" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-[#1B5E4B] hover:bg-[#2E7D68] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors">
                  {loading ? "Adding..." : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
