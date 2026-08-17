"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GitBranch, BarChart3,
  MessageSquare, Settings, LogOut, Globe,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "Overview",     labelAr: "نظرة عامة"        },
  { href: "/dashboard/leads",     icon: Users,           label: "Leads",        labelAr: "العملاء المحتملون" },
  { href: "/dashboard/crm",       icon: GitBranch,       label: "CRM Pipeline", labelAr: "خط المبيعات"      },
  { href: "/dashboard/analytics", icon: BarChart3,       label: "Analytics",    labelAr: "التحليلات"        },
  { href: "/dashboard/contacts",  icon: MessageSquare,   label: "Contacts",     labelAr: "الرسائل"          },
  { href: "/dashboard/users",     icon: Users,           label: "Users",        labelAr: "المستخدمون"       },
  { href: "/dashboard/settings",  icon: Settings,        label: "Settings",     labelAr: "الإعدادات"        },
];

const adminOnly = ["/dashboard/users", "/dashboard/settings"];

interface SidebarProps {
  user: { name?: string | null; email?: string | null; role?: string };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const filtered = navItems.filter(item =>
    !adminOnly.includes(item.href) ||
    ["admin", "manager"].includes(user.role || "")
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;900&family=Tajawal:wght@400;500;700&display=swap');

        .sidebar {
          width: 256px;
          background: linear-gradient(160deg, #1f6b52 0%, #1B5E4B 50%, #103c31 100%);
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-shrink: 0;
          box-shadow: 4px 0 24px rgba(0,0,0,.18);
          font-family: "Tajawal","Cairo",sans-serif;
        }

        .sb-logo {
          padding: 22px 20px;
          border-bottom: 1px solid rgba(255,255,255,.1);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .sb-logo-mark {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #E6C16A, #c9a24e);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Cairo";
          font-weight: 900;
          color: #3a2c0c;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(230,193,106,.35);
        }
        .sb-logo-text { line-height: 1; }
        .sb-logo-text .name {
          color: #fff;
          font-family: "Cairo";
          font-weight: 700;
          font-size: 16px;
        }
        .sb-logo-text .sub {
          color: rgba(255,255,255,.45);
          font-size: 11px;
          margin-top: 2px;
        }

        .sb-user {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,.1);
        }
        .sb-user-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,.07);
          border-radius: 12px;
          padding: 10px 12px;
        }
        .sb-avatar {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #E6C16A, #c9a24e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a2c0c;
          font-family: "Cairo";
          font-weight: 900;
          font-size: 15px;
          flex-shrink: 0;
        }
        .sb-user-name {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-user-role {
          color: rgba(255,255,255,.4);
          font-size: 11px;
          text-transform: capitalize;
        }

        .sb-nav {
          flex: 1;
          padding: 14px 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sb-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 14px;
          border-radius: 11px;
          text-decoration: none;
          color: rgba(255,255,255,.6);
          transition: background .15s, color .15s;
          font-size: 13.5px;
        }
        .sb-link:hover {
          background: rgba(255,255,255,.08);
          color: #fff;
        }
        .sb-link.active {
          background: rgba(230,193,106,.15);
          color: #E6C16A;
          border: 1px solid rgba(230,193,106,.25);
        }
        .sb-link.active svg { stroke: #E6C16A; }
        .sb-link-label { font-weight: 600; line-height: 1; }
        .sb-link-label-ar { font-size: 11px; opacity: .6; margin-top: 2px; }

        .sb-bottom {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,.1);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sb-link-danger {
          color: rgba(252,165,165,.7) !important;
        }
        .sb-link-danger:hover {
          background: rgba(239,68,68,.12) !important;
          color: #fca5a5 !important;
        }
        .sb-link-btn {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }
      `}</style>

      <aside className="sidebar">
        {/* Logo */}
        <Link href="/" className="sb-logo">
          <div className="sb-logo-mark">T</div>
          <div className="sb-logo-text">
            <div className="name">تسويقات</div>
            <div className="sub">Tasweeqat Dashboard</div>
          </div>
        </Link>

        {/* User */}
        <div className="sb-user">
          <div className="sb-user-inner">
            <div className="sb-avatar">{(user.name || "A")[0].toUpperCase()}</div>
            <div style={{ minWidth: 0 }}>
              <div className="sb-user-name">{user.name}</div>
              <div className="sb-user-role">{user.role}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {filtered.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sb-link${active ? " active" : ""}`}
              >
                <item.icon size={17} style={{ flexShrink: 0 }} />
                <div>
                  <div className="sb-link-label">{item.label}</div>
                  <div className="sb-link-label-ar">{item.labelAr}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="sb-bottom">
          <Link href="/" className="sb-link">
            <Globe size={17} style={{ flexShrink: 0 }} />
            <span className="sb-link-label">View Website</span>
          </Link>
          <button
            className="sb-link sb-link-danger sb-link-btn"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut size={17} style={{ flexShrink: 0 }} />
            <span className="sb-link-label">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
