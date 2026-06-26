"use client";

import { Eye, Target, Rocket } from "lucide-react";

const cards = [
  {
    icon: Eye,
    color: "#e94560",
    ar: {
      title: "رؤيتنا",
      body: "أن نكون وكالة رقمية رائدة في المنطقة الشرقية بالمملكة العربية السعودية — معروفون بتحويل الأعمال المحلية إلى علامات تجارية رقمية قوية تنافس محلياً وعالمياً.",
    },
    en: {
      title: "Our Vision",
      body: "To be the leading digital agency in Eastern Province Saudi Arabia — known for transforming local businesses into strong online brands that compete regionally and globally.",
    },
  },
  {
    icon: Target,
    color: "#f5a623",
    ar: {
      title: "رسالتنا",
      body: "نضع ١٠٠ عمل سعودي على الإنترنت في ١٠٠ يوم — بتقديم حلول رقمية احترافية تحقق نمواً حقيقياً لكل عميل نخدمه.",
    },
    en: {
      title: "Our Mission",
      body: "To put 100 Saudi businesses online in 100 days — delivering professional, results-driven digital solutions that fuel real growth for every client we serve.",
    },
  },
  {
    icon: Rocket,
    color: "#0f3460",
    ar: {
      title: "قيمنا",
      body: "الجودة فوق الكمية. الشفافية في كل تعامل. شراكات طويلة الأمد وليس مشاريع عابرة. ننجح عندما ينجح عملاؤنا.",
    },
    en: {
      title: "Our Values",
      body: "Quality over quantity. Transparency in every deal. Long-term partnerships, not one-time projects. We succeed when our clients succeed.",
    },
  },
];

export function VisionMission() {
  return (
    <section id="vision" className="py-24 bg-white dark:bg-[#1a1a2e] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#e94560] rounded-full blur-[150px] opacity-5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0f3460] rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0f3460]/10 text-[#0f3460] dark:bg-white/10 dark:text-white/70 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ✦ <span className="lang-ar">الرؤية والرسالة</span><span className="lang-en">Vision &amp; Mission</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="lang-ar">هدفنا واتجاهنا</span>
            <span className="lang-en">Our Purpose &amp; Direction</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <div
              key={i}
              className="relative bg-gray-50 dark:bg-[#0d0d1a] rounded-3xl p-8 border border-gray-100 dark:border-white/10 card-hover group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: item.color }} />
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 group-hover:scale-110 transition-transform"
                style={{ background: `${item.color}18` }}
              >
                <item.icon size={28} style={{ color: item.color }} />
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                <span className="lang-ar">{item.ar.title}</span>
                <span className="lang-en">{item.en.title}</span>
              </h3>
              <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                <span className="lang-ar">{item.ar.body}</span>
                <span className="lang-en">{item.en.body}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #e94560 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="text-6xl text-[#e94560] font-black mb-4 relative">"</div>
          <p className="text-2xl md:text-3xl font-bold relative max-w-3xl mx-auto leading-relaxed">
            <span className="lang-ar">كل عمل تجاري يستحق حضوراً رقمياً احترافياً —<br /><span className="text-[#e94560]">بغض النظر عن حجمه.</span></span>
            <span className="lang-en">Every business deserves a professional online presence —<br /><span className="text-[#e94560]">regardless of size.</span></span>
          </p>
        </div>
      </div>
    </section>
  );
}
