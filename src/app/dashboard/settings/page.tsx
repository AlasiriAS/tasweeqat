import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings2, Server, Mail, Shield, Globe } from "lucide-react";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!["admin", "manager"].includes(session?.user?.role || "")) {
    redirect("/dashboard");
  }

  const sections = [
    {
      icon: Globe,
      title: "Business Info",
      titleAr: "معلومات الشركة",
      color: "#0f3460",
      items: [
        { label: "Company Name",  value: "Tasweeqat · تسويقات" },
        { label: "Website",       value: "tasweeqat.com" },
        { label: "Website Price", value: "2,000 SAR" },
        { label: "Monthly Hosting", value: "50 SAR / month" },
      ],
    },
    {
      icon: Server,
      title: "Server & Hosting",
      titleAr: "الخادم والاستضافة",
      color: "#27ae60",
      items: [
        { label: "VPS Provider",  value: "Hostinger KVM 2" },
        { label: "Location",      value: "France (Paris)" },
        { label: "RAM",           value: "8 GB" },
        { label: "Storage",       value: "100 GB NVMe" },
        { label: "Panel",         value: "Coolify" },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      titleAr: "البريد الإلكتروني",
      color: "#f5a623",
      items: [
        { label: "Provider",      value: "Hostinger Business Email" },
        { label: "Plan",          value: "Starter (up to 5 mailboxes)" },
        { label: "Price",         value: "$0.39 / mailbox / month" },
        { label: "Upgrade at",    value: "8+ mailboxes → Mailcow on KVM 1" },
      ],
    },
    {
      icon: Shield,
      title: "Security",
      titleAr: "الأمان",
      color: "#e94560",
      items: [
        { label: "Auth",          value: "NextAuth.js v4 (JWT)" },
        { label: "Passwords",     value: "bcryptjs hashed" },
        { label: "SSL",           value: "Let's Encrypt via Coolify" },
        { label: "Admin default", value: "admin@tasweeqat.com / Admin@2024!" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-400 dark:text-white/40 text-sm mt-1">الإعدادات · System configuration overview</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {sections.map((section, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${section.color}18` }}
              >
                <section.icon size={20} style={{ color: section.color }} />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{section.title}</div>
                <div className="text-xs" style={{ color: section.color }}>{section.titleAr}</div>
              </div>
            </div>
            <div className="space-y-3">
              {section.items.map((item, j) => (
                <div key={j} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                  <span className="text-xs text-gray-500 dark:text-white/40 flex-shrink-0">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-white/80 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-5 border border-amber-200 dark:border-amber-700/30">
        <div className="flex items-start gap-3">
          <Settings2 size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Dynamic settings coming soon</p>
            <p className="text-xs text-amber-600 dark:text-amber-400/70 mt-0.5">
              Future update will allow editing prices, adding team members, and managing integrations from this page.
              For now, update values directly in <code className="bg-amber-100 dark:bg-white/10 px-1 rounded">.env.local</code> and the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
