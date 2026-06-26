"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GitBranch, BarChart3,
  MessageSquare, Settings, LogOut, Globe,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Overview",    labelAr: "نظرة عامة"      },
  { href: "/dashboard/leads",    icon: Users,           label: "Leads",       labelAr: "العملاء المحتملون" },
  { href: "/dashboard/crm",      icon: GitBranch,       label: "CRM Pipeline",labelAr: "خط المبيعات"    },
  { href: "/dashboard/analytics",icon: BarChart3,       label: "Analytics",   labelAr: "التحليلات"      },
  { href: "/dashboard/contacts", icon: MessageSquare,   label: "Contacts",    labelAr: "الرسائل"        },
  { href: "/dashboard/users",    icon: Users,           label: "Users",       labelAr: "المستخدمون"     },
  { href: "/dashboard/settings", icon: Settings,        label: "Settings",    labelAr: "الإعدادات"      },
];

const adminOnly = ["/dashboard/users", "/dashboard/settings"];

interface SidebarProps {
  user: { name?: string | null; email?: string | null; role?: string; };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const filtered = navItems.filter(item =>
    !adminOnly.includes(item.href) ||
    ["admin", "manager"].includes(user.role || "")
  );

  return (
    <aside className="w-64 bg-[#1a1a2e] flex flex-col h-full flex-shrink-0 shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e94560] rounded-xl flex items-center justify-center font-black text-white text-lg">
            T
          </div>
          <div>
            <div className="text-white font-bold text-base leading-none">Tasweeqat</div>
            <div className="text-white/30 text-xs mt-0.5">تسويقات Dashboard</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
          <div className="w-9 h-9 bg-[#e94560] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {(user.name || "A")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{user.name}</div>
            <div className="text-white/40 text-xs capitalize">{user.role}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {filtered.map((item) => {
            const active = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "sidebar-link",
                  active && "active"
                )}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <div>
                  <div className="text-sm leading-none">{item.label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{item.labelAr}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="sidebar-link"
        >
          <Globe size={18} />
          <span className="text-sm">View Website</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
