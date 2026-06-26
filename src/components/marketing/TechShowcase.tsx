"use client";

import { ShieldCheck, Zap, Smartphone, Globe, Server, Lock } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    color: "#e94560",
    ar: { title: "تصميم متجاوب 100%",       desc: "يعمل على الجوال والتابلت والكمبيوتر بشكل مثالي." },
    en: { title: "100% Responsive Design",   desc: "Perfect on mobile, tablet, and desktop." },
  },
  {
    icon: Zap,
    color: "#f5a623",
    ar: { title: "سرعة تحميل فائقة",          desc: "مواقع محسّنة تُحمَّل في ثوانٍ — أفضل لـ SEO والزوار." },
    en: { title: "Lightning Fast Loading",   desc: "Optimized sites that load in seconds." },
  },
  {
    icon: ShieldCheck,
    color: "#27ae60",
    ar: { title: "SSL + أمان كامل",           desc: "شهادة HTTPS مجانية مع حماية ضد الاختراق." },
    en: { title: "SSL + Full Security",       desc: "Free HTTPS certificate with hack protection." },
  },
  {
    icon: Server,
    color: "#0f3460",
    ar: { title: "استضافة سحابية موثوقة",     desc: "خوادم قوية بضمان 99.9% وقت تشغيل." },
    en: { title: "Reliable Cloud Hosting",   desc: "Powerful servers with 99.9% uptime guarantee." },
  },
  {
    icon: Globe,
    color: "#9b59b6",
    ar: { title: "دومين خاص بك",              desc: "نساعدك في اختيار وتسجيل اسم نطاقك الخاص." },
    en: { title: "Your Own Domain",          desc: "We help you pick and register your domain name." },
  },
  {
    icon: Lock,
    color: "#f5a623",
    ar: { title: "نسخ احتياطية يومية",         desc: "بياناتك محفوظة — نسخ احتياطية تلقائية كل يوم." },
    en: { title: "Daily Backups",            desc: "Your data is safe with automatic daily backups." },
  },
];

/* ── Browser Mockup SVG ──────────────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
      {/* Browser chrome */}
      <rect x="0" y="0" width="520" height="340" rx="14" fill="#1a1a2e" />
      {/* Title bar */}
      <rect x="0" y="0" width="520" height="42" rx="14" fill="#0f3460" />
      <rect x="0" y="28" width="520" height="14" fill="#0f3460" />
      {/* Traffic lights */}
      <circle cx="22" cy="21" r="6" fill="#e94560" />
      <circle cx="42" cy="21" r="6" fill="#f5a623" />
      <circle cx="62" cy="21" r="6" fill="#27ae60" />
      {/* Address bar */}
      <rect x="84" y="11" width="340" height="20" rx="10" fill="#1a1a2e" />
      <text x="102" y="24" fontSize="9" fill="#ffffff60" fontFamily="monospace">🔒 tasweeqat.com</text>
      {/* Page content area */}
      <rect x="12" y="50" width="496" height="278" rx="4" fill="#f0f2f5" />
      {/* Hero gradient block */}
      <rect x="12" y="50" width="496" height="110" fill="url(#heroGrad)" />
      {/* Navbar */}
      <rect x="12" y="50" width="496" height="24" fill="#1a1a2e" opacity="0.9" />
      <rect x="20" y="57" width="40" height="10" rx="5" fill="#e94560" />
      <rect x="390" y="57" width="30" height="10" rx="5" fill="#ffffff30" />
      <rect x="350" y="57" width="30" height="10" rx="5" fill="#ffffff30" />
      <rect x="310" y="57" width="30" height="10" rx="5" fill="#ffffff30" />
      {/* Hero headline */}
      <rect x="120" y="88" width="280" height="16" rx="8" fill="#ffffff" opacity="0.9" />
      <rect x="160" y="110" width="200" height="10" rx="5" fill="#ffffff60" />
      {/* CTA Buttons */}
      <rect x="148" y="128" width="90" height="22" rx="11" fill="#e94560" />
      <rect x="248" y="128" width="90" height="22" rx="11" fill="#ffffff20" />
      {/* Stats row */}
      <rect x="12" y="162" width="496" height="60" fill="white" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={30 + i*118} y="172" width="100" height="40" rx="8" fill="#f8f9fa" />
          <rect x={50 + i*118} y="180" width="60" height="12" rx="6" fill="#e94560" opacity="0.3" />
          <rect x={45 + i*118} y="196" width="70" height="8" rx="4" fill="#1a1a2e" opacity="0.2" />
        </g>
      ))}
      {/* Services grid */}
      <rect x="12" y="224" width="496" height="104" fill="#f8f9fa" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={24 + i*164} y="234" width="150" height="84" rx="10" fill="white" />
          <rect x={40 + i*164} y="248" width="28" height="28" rx="8" fill="#e94560" opacity="0.15" />
          <rect x={78 + i*164} y="252" width="80" height="8" rx="4" fill="#1a1a2e" opacity="0.3" />
          <rect x={78 + i*164} y="266" width="60" height="6" rx="3" fill="#1a1a2e" opacity="0.15" />
          <rect x={40 + i*164} y="292" width="120" height="6" rx="3" fill="#1a1a2e" opacity="0.1" />
          <rect x={40 + i*164} y="302" width="90" height="6" rx="3" fill="#1a1a2e" opacity="0.1" />
        </g>
      ))}
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="520" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#0f3460" />
          <stop offset="100%" stopColor="#e94560" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Server / Hosting SVG ────────────────────────────────────────────────── */
function ServerMockup() {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-xl">
      {/* Server rack */}
      <rect x="40" y="10" width="180" height="200" rx="12" fill="#0f3460" />
      <rect x="40" y="10" width="180" height="200" rx="12" stroke="#e94560" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Server units */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="52" y={24 + i*36} width="156" height="28" rx="6" fill="#1a1a2e" />
          {/* LED */}
          <circle cx="68" cy={38 + i*36} r="4" fill={i === 0 ? "#27ae60" : i === 2 ? "#f5a623" : "#27ae60"} />
          <circle cx="68" cy={38 + i*36} r="4" fill={i === 0 ? "#27ae60" : i === 2 ? "#f5a623" : "#27ae60"} opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i*0.4}s`} repeatCount="indefinite" />
          </circle>
          {/* Bars */}
          <rect x="82" y={33 + i*36} width="80" height="4" rx="2" fill="#ffffff10" />
          <rect x="82" y={33 + i*36} width={`${40 + i*10}`} height="4" rx="2" fill="#e94560" opacity="0.5" />
          <rect x="82" y={41 + i*36} width="60" height="3" rx="1.5" fill="#ffffff10" />
          <rect x="82" y={41 + i*36} width={`${30 + i*8}`} height="3" rx="1.5" fill="#0f3460" />
          {/* Port dots */}
          {[0,1,2].map(j => (
            <rect key={j} x={170 + j*9} y={34 + i*36} width="6" height="6" rx="1" fill="#27ae60" opacity={j === 1 ? "0.8" : "0.3"} />
          ))}
        </g>
      ))}
      {/* Connecting lines (decorative) */}
      <line x1="130" y1="210" x2="80"  y2="240" stroke="#e94560" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 2" />
      <line x1="130" y1="210" x2="130" y2="240" stroke="#27ae60" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 2" />
      <line x1="130" y1="210" x2="180" y2="240" stroke="#f5a623" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 2" />
    </svg>
  );
}

/* ── Mobile Responsive SVG ───────────────────────────────────────────────── */
function ResponsiveMockup() {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {/* Tablet */}
      <rect x="10" y="20" width="150" height="190" rx="12" fill="#1a1a2e" />
      <rect x="18" y="32" width="134" height="164" rx="4" fill="#0f3460" />
      {/* Tablet content */}
      <rect x="18" y="32" width="134" height="32" fill="#e94560" opacity="0.8" />
      <rect x="28" y="40" width="60" height="8" rx="4" fill="white" opacity="0.9" />
      <rect x="28" y="74" width="114" height="8" rx="4" fill="white" opacity="0.2" />
      <rect x="28" y="86" width="90" height="8" rx="4" fill="white" opacity="0.2" />
      <rect x="28" y="104" width="50" height="20" rx="10" fill="#e94560" />
      <rect x="28" y="132" width="114" height="55" rx="6" fill="#ffffff08" />
      {[0,1].map(i => (
        <g key={i}>
          <rect x={36 + i*56} y={140} width="44" height="40" rx="6" fill="#ffffff10" />
          <rect x={42 + i*56} y={148} width="20" height="14" rx="4" fill="#e94560" opacity="0.3" />
          <rect x={40 + i*56} y={166} width="32" height="4" rx="2" fill="white" opacity="0.2" />
        </g>
      ))}
      {/* Phone */}
      <rect x="168" y="60" width="82" height="150" rx="12" fill="#e94560" />
      <rect x="174" y="72" width="70" height="128" rx="4" fill="#1a1a2e" />
      {/* Phone content */}
      <rect x="174" y="72" width="70" height="28" fill="#0f3460" />
      <rect x="180" y="79" width="30" height="6" rx="3" fill="white" opacity="0.6" />
      <rect x="180" y="110" width="58" height="6" rx="3" fill="white" opacity="0.2" />
      <rect x="180" y="120" width="45" height="6" rx="3" fill="white" opacity="0.2" />
      <rect x="180" y="136" width="40" height="16" rx="8" fill="#e94560" opacity="0.8" />
      <rect x="180" y="162" width="58" height="30" rx="6" fill="#ffffff08" />
      {/* Checkmark badge */}
      <circle cx="215" cy="55" r="16" fill="#27ae60" />
      <path d="M207 55 L213 61 L223 49" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TechShowcase() {
  return (
    <section className="py-24 bg-[#0d0d1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e94560] rounded-full blur-[180px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ✦ <span className="lang-ar">تقنياتنا</span><span className="lang-en">Our Technology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="lang-ar">مواقع حديثة · آمنة · سريعة</span>
            <span className="lang-en">Modern · Secure · Fast</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            <span className="lang-ar">نبني كل موقع بأحدث التقنيات مع ضمان الأمان والأداء والاستضافة الاحترافية.</span>
            <span className="lang-en">Every site built with cutting-edge tech, guaranteed security, performance, and professional hosting.</span>
          </p>
        </div>

        {/* Top row: Browser mockup + features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Browser mockup */}
          <div className="order-2 lg:order-1">
            <BrowserMockup />
          </div>

          {/* Features list */}
          <div className="order-1 lg:order-2 space-y-4">
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#e94560]/30 rounded-2xl p-5 transition-all duration-200 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${f.color}20` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">
                    <span className="lang-ar">{f.ar.title}</span>
                    <span className="lang-en">{f.en.title}</span>
                  </h3>
                  <p className="text-white/50 text-sm">
                    <span className="lang-ar">{f.ar.desc}</span>
                    <span className="lang-en">{f.en.desc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: features + Server + Phone */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left features */}
          <div className="space-y-4">
            {features.slice(3).map((f, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#e94560]/30 rounded-2xl p-5 transition-all duration-200 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${f.color}20` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">
                    <span className="lang-ar">{f.ar.title}</span>
                    <span className="lang-en">{f.en.title}</span>
                  </h3>
                  <p className="text-white/50 text-sm">
                    <span className="lang-ar">{f.ar.desc}</span>
                    <span className="lang-en">{f.en.desc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center: server mockup */}
          <div className="flex items-center justify-center py-4">
            <div className="w-full max-w-[260px]">
              <ServerMockup />
              <p className="text-center text-white/40 text-xs mt-4">
                <span className="lang-ar">تشغيل مستمر · نسخ احتياطية يومية · أداء عالي</span>
                <span className="lang-en">Always On · Daily Backups · High Performance</span>
              </p>
            </div>
          </div>

          {/* Right: responsive mockup */}
          <div className="flex items-center justify-center py-4">
            <div className="w-full max-w-[260px]">
              <ResponsiveMockup />
              <p className="text-center text-white/40 text-xs mt-4">
                <span className="lang-ar">متجاوب مع جميع الأجهزة</span>
                <span className="lang-en">Responsive on all devices</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom SSL / Security banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔒", ar: "SSL مجاني",           en: "Free SSL",           color: "#27ae60" },
            { icon: "☁️", ar: "استضافة سحابية",       en: "Cloud Hosting",      color: "#0f3460" },
            { icon: "⚡", ar: "CDN عالمي",            en: "Global CDN",         color: "#f5a623" },
            { icon: "🛡️", ar: "حماية DDoS",          en: "DDoS Protection",    color: "#e94560" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-white/80 text-sm font-semibold">
                <span className="lang-ar">{b.ar}</span>
                <span className="lang-en">{b.en}</span>
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
