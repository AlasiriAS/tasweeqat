"use client";

import { Bell, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface Props {
  user: { name?: string | null; role?: string; };
}

export function DashboardHeader({ user }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greetingAr = hour < 12 ? "صباح الخير" : hour < 17 ? "مساء الخير" : "مساء النور";

  return (
    <header className="bg-white dark:bg-[#1a1a2e] border-b border-gray-100 dark:border-white/10 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
      {/* Left - greeting */}
      <div>
        <h1 className="text-gray-900 dark:text-white font-bold text-lg">
          {greeting}, {user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-400 dark:text-white/40 text-xs">
          {greetingAr} · {now.toLocaleDateString("en-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Right - actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded-xl px-4 py-2 w-56 border border-gray-200 dark:border-white/10">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-400 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10">
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#e94560] rounded-full" />
        </button>

        {/* Theme */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </header>
  );
}
