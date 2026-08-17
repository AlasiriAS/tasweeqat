"use client";

import { Bell, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface Props {
  user: { name?: string | null; role?: string };
}

export function DashboardHeader({ user }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const hour = new Date().getHours();
  const greetingAr = hour < 12 ? "صباح الخير" : hour < 17 ? "مساء الخير" : "مساء النور";
  const greeting   = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr    = new Date().toLocaleDateString("en-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header
      className="flex items-center justify-between flex-shrink-0 px-6 py-4"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 0 rgba(27,94,75,.06)",
        fontFamily: "'Tajawal','Cairo',sans-serif",
      }}
    >
      {/* Greeting */}
      <div>
        <h1 style={{ color: "var(--brand)", fontFamily: "'Cairo',sans-serif", fontWeight: 800, fontSize: 17 }}>
          {greetingAr}، {user.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
          {greeting} · {dateStr}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 8,
            background: "var(--bg)",
            border: "1.5px solid var(--border)",
            borderRadius: 12,
            padding: "8px 14px",
            width: 220,
          }}
        >
          <Search size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search leads..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "var(--text)",
              width: "100%",
            }}
          />
        </div>

        {/* Notifications */}
        <button
          style={{
            position: "relative",
            width: 36, height: 36,
            borderRadius: 10,
            background: "var(--bg)",
            border: "1.5px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--muted)",
            cursor: "pointer",
          }}
        >
          <Bell size={15} />
          <span style={{
            position: "absolute", top: 7, right: 7,
            width: 7, height: 7,
            background: "#E6C16A",
            borderRadius: "50%",
          }} />
        </button>

        {/* Dark mode toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: theme === "dark" ? "rgba(230,193,106,.15)" : "var(--bg)",
              border: `1.5px solid ${theme === "dark" ? "rgba(230,193,106,.3)" : "var(--border)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: theme === "dark" ? "#E6C16A" : "var(--muted)",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}
      </div>
    </header>
  );
}
