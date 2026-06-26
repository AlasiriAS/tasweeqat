import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate, USER_ROLES } from "@/lib/utils";
import { Shield, CheckCircle, XCircle } from "lucide-react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (!["admin", "manager"].includes(session?.user?.role || "")) {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Team Members</h2>
        <p className="text-gray-400 dark:text-white/40 text-sm mt-1">إدارة الفريق · {users.length} accounts</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
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
      </div>

      <div className="bg-[#0f3460]/10 dark:bg-[#0f3460]/20 rounded-2xl p-5 border border-[#0f3460]/20">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-[#0f3460] dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Default password for new accounts</p>
            <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">
              New team members are created with <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">Team@2024!</code> — remind them to change it on first login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
