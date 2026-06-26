"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = {
  en: [
    { href: "#services",  label: "Services"  },
    { href: "#vision",    label: "Vision"    },
    { href: "#about",     label: "About Us"  },
    { href: "#contact",   label: "Contact"   },
  ],
  ar: [
    { href: "#services",  label: "خدماتنا"  },
    { href: "#vision",    label: "رؤيتنا"   },
    { href: "#about",     label: "من نحن"   },
    { href: "#contact",   label: "تواصل"    },
  ],
};

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [lang,      setLang]      = useState<"en" | "ar">("ar");
  const { theme, setTheme }       = useTheme();
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    document.documentElement.dir  = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const links = navLinks[lang];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e94560] rounded-xl flex items-center justify-center font-black text-white text-lg">
            T
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none block">Tasweeqat</span>
            <span className="text-white/60 text-xs">تسويقات</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 hover:text-[#e94560]"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-all"
          >
            <Globe size={14} />
            {lang === "en" ? "عربي" : "EN"}
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* CTA */}
          <Link
            href="/login"
            className="hidden md:flex bg-[#e94560] hover:bg-[#c73652] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors duration-200"
          >
            {lang === "en" ? "Dashboard →" : "← لوحة التحكم"}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a2e]/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#e94560] text-base font-medium py-2 border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/login"
            className="bg-[#e94560] text-white text-center font-semibold py-3 rounded-xl mt-2"
          >
            {lang === "en" ? "Dashboard" : "لوحة التحكم"}
          </Link>
        </div>
      )}
    </nav>
  );
}
