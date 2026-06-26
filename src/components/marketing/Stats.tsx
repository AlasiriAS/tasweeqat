"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, ShieldCheck, Star, Rocket } from "lucide-react";

const stats = [
  {
    icon: Rocket,
    value: 7, suffix: "",
    label: "أيام للتسليم", labelEn: "Days to Deliver",
    sub: "من التوقيع للإطلاق",
    subEn: "From sign-off to launch",
    color: "#e94560",
    noCounter: false,
  },
  {
    icon: Clock,
    value: 24, suffix: "h",
    label: "وقت الرد", labelEn: "Response Time",
    sub: "نرد خلال ٢٤ ساعة",
    subEn: "We reply within 24 hours",
    color: "#0f3460",
    noCounter: false,
  },
  {
    icon: ShieldCheck,
    value: 99, suffix: ".9%",
    label: "ضمان الاستضافة", labelEn: "Uptime Guarantee",
    sub: "خوادم موثوقة دائماً",
    subEn: "Always-on reliable servers",
    color: "#27ae60",
    noCounter: false,
  },
  {
    icon: Star,
    value: 2, suffix: "",
    label: "تعديلات مجانية مضمونة", labelEn: "Free Revisions",
    sub: "ضمان رضاك التام ⭐",
    subEn: "100% satisfaction guaranteed",
    color: "#f5a623",
    noCounter: false,
    gold: true,
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(target / 60, 1);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [started, target]);

  return (
    <div ref={ref} className="text-4xl font-black text-[#1a1a2e] dark:text-white">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="py-20 bg-white dark:bg-[#1a1a2e] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e94560] via-[#f5a623] to-[#0f3460]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center group card-hover p-5 rounded-2xl border transition-all duration-300 ${
                s.gold
                  ? "border-[#f5a623]/40 bg-gradient-to-b from-[#fff9ee] to-white dark:from-[#2a2010] dark:to-[#1a1a2e] hover:border-[#f5a623]"
                  : "border-gray-100 dark:border-white/10 hover:border-[#e94560]/30"
              }`}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 transition-all group-hover:scale-110"
                style={{ background: `${s.color}18` }}
              >
                <s.icon size={22} style={{ color: s.color }} />
              </div>

              {s.noCounter ? (
                <div className="text-3xl font-black text-[#1a1a2e] dark:text-white">
                  <span className="lang-ar">بالتقسيط</span>
                  <span className="lang-en">Pay Later</span>
                </div>
              ) : (
                <Counter target={s.value} suffix={s.suffix} />
              )}

              <div className="font-bold text-gray-800 dark:text-white/90 mt-1 text-sm leading-tight">
                <span className="lang-ar">{s.label}</span>
                <span className="lang-en">{s.labelEn}</span>
              </div>
              <div className="text-gray-400 dark:text-white/40 text-xs mt-1 leading-snug">
                <span className="lang-ar">{s.sub}</span>
                <span className="lang-en">{s.subEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
