"use client";

import { useState, useEffect } from "react";
import { Shield, CheckCircle, XCircle, UserPlus, Eye, EyeOff, X } from "lucide-react";
import { USER_ROLES } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "sales" });

  useEffect(() => {
    fetch("/api/users/list")
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess(`Account created for ${data.name}`);
      setForm({ name: "", email: "", password: "", role: "sales" });
      setShowForm(false);
      // refresh list
      fetch("/api/users/list").then(r => r.json()).then(setUsers);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Team Members</h2>
          <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
            إدارة الفريق · {users.length} accounts
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setError(""); setSuccess(""); }}
          className="flex items-center gap-2 bg-[#1B5E4B] hover:bg-[#145240] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
        >
          <UserPlus size={16} />
          Add Member
        </button>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
          <CheckCircle size={15} /> {success}
        </div>
      )}

      {/* Create User Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0f2419] rounded-2xl border border-gray-100 dark:border-white/8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/8">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Add Team Member</h3>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">إضافة عضو جديد للفريق</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Bader Al-..."
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2E7D68]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="bader@tasweeqat.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2E7D68]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2E7D68]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D68]/40"
                >
                  {USER_ROLES.map(r => (
                    <option key={r.id} value={r.id}>{r.label} — {r.labelAr}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#1B5E4B] hover:bg-[#145240] disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                >
                  {submitting ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-[#0f2419] rounded-2xl border border-gray-100 dark:border-white/8 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 dark:text-white/30 text-sm">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 text-left text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Member</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {users.map((user) => {
                const role = USER_ROLES.find(r => r.id === user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ background: role?.color || "#6b7280" }}
                        >
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-gray-400 dark:text-white/30 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: role?.color || "#6b7280" }}
                      >
                        {role?.label || user.role}
                      </span>
                      <div className="text-xs mt-0.5" style={{ color: role?.color }}>{role?.labelAr}</div>
                    </td>
                    <td className="px-5 py-4">
                      {user.isActive ? (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold">
                          <CheckCircle size={13} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 text-xs font-semibold">
                          <XCircle size={13} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-400 dark:text-white/30 text-xs">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-[#1B5E4B]/10 dark:bg-[#1B5E4B]/20 rounded-2xl p-5 border border-[#1B5E4B]/20">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-[#1B5E4B] dark:text-[#E6C16A] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-white/60">
            Only <strong>Admin</strong> and <strong>Manager</strong> roles can create or manage team members.
          </p>
        </div>
      </div>
    </div>
  );
}
