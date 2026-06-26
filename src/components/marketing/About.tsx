"use client";

import { CheckCircle, MapPin, Calendar, Zap } from "lucide-react";

const highlights = [
  { ar: "مقرنا في المنطقة الشرقية، المملكة العربية السعودية", en: "Based in Eastern Province, Saudi Arabia"        },
  { ar: "١٠٠٪ متخصصون في السوق السعودي",                   en: "100% focused on Saudi market needs"              },
  { ar: "فريق ثنائي اللغة — عربي وإنجليزي",                en: "Bilingual team — Arabic & English"               },
  { ar: "تطوير مدعوم بالذكاء الاصطناعي لتسليم أسرع",       en: "AI-assisted development for faster delivery"     },
  { ar: "شراكات طويلة الأمد وليس مشاريع عابرة",            en: "Long-term partnerships, not one-off projects"    },
  { ar: "شفافية كاملة في كل خطوة",                        en: "Full transparency at every step"                  },
];

const cardItems = [
  { icon: MapPin,     ar: { label: "الموقع",    value: "المنطقة الشرقية" }, en: { label: "Location", value: "Eastern Province, KSA" } },
  { icon: Calendar,   ar: { label: "التأسيس",   value: "٢٠٢٤"            }, en: { label: "Founded",  value: "2024"                  } },
  { icon: Zap,        ar: { label: "التسليم",   value: "أيام لا أسابيع" }, en: { label: "Delivery", value: "Days, not weeks"        } },
  { icon: CheckCircle,ar: { label: "الهدف",     value: "١٠٠ موقع"        }, en: { label: "Goal",     value: "100 Websites"          } },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-[#1a1a2e] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] rounded-full px-4 py-2 text-sm font-semibold mb-6">
              ✦ <span className="lang-ar">من نحن</span><span className="lang-en">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="lang-ar">فريق سعودي<br /><span className="text-[#e94560]">يبني علامات سعودية</span></span>
              <span className="lang-en">A Saudi Team<br /><span className="text-[#e94560]">Building Saudi Brands</span></span>
            </h2>

            <p className="text-gray-600 dark:text-white/60 text-lg mb-5 leading-relaxed">
              <span className="lang-ar">
                وُلدت تسويقات من ملاحظة بسيطة: آلاف الأعمال الرائعة في المنطقة الشرقية لم يكن لها حضور رقمي — ليس لعدم رغبتهم، بل لأن الخدمات الرقمية الجيدة كانت مكلفة أو بطيئة أو بعيدة المنال.
              </span>
              <span className="lang-en">
                Tasweeqat was born from a simple observation: thousands of great businesses in Eastern Province had no online presence — not because they didn't want one, but because quality digital services were expensive, slow, or inaccessible.
              </span>
            </p>

            <p className="text-gray-600 dark:text-white/60 text-base mb-8 leading-relaxed">
              <span className="lang-ar">
                أطلقنا <strong className="text-[#e94560]">تحدي ١٠٠ موقع</strong> — التزام بتسليم ١٠٠ موقع احترافي لـ١٠٠ نشاط تجاري محلي في ١٠٠ يوم.
              </span>
              <span className="lang-en">
                We launched the <strong className="text-[#e94560]">100 Websites Challenge</strong> — a commitment to deliver 100 professional websites to 100 local businesses in 100 days.
              </span>
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#27ae60] flex-shrink-0" />
                  <span className="text-gray-700 dark:text-white/70 text-sm">
                    <span className="lang-ar">{h.ar}</span>
                    <span className="lang-en">{h.en}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-8 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
              />

              <div className="w-24 h-24 bg-[#e94560] rounded-3xl flex items-center justify-center text-5xl font-black text-white mb-6 relative">
                ت
              </div>

              <h3 className="text-3xl font-black mb-1">
                <span className="lang-ar">تسويقات</span>
                <span className="lang-en">Tasweeqat</span>
              </h3>
              <p className="text-white/50 text-lg mb-6">
                <span className="lang-ar">وكالتك الرقمية</span>
                <span className="lang-en">تسويقات</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {cardItems.map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <item.icon size={16} className="text-[#e94560] mb-1" />
                    <div className="text-white/40 text-xs">
                      <span className="lang-ar">{item.ar.label}</span>
                      <span className="lang-en">{item.en.label}</span>
                    </div>
                    <div className="text-white text-sm font-semibold">
                      <span className="lang-ar">{item.ar.value}</span>
                      <span className="lang-en">{item.en.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="block w-full text-center bg-[#e94560] hover:bg-[#c73652] text-white font-bold py-3 rounded-xl transition-colors"
              >
                <span className="lang-ar">تواصل معنا ←</span>
                <span className="lang-en">Get In Touch →</span>
              </a>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#f5a623] text-[#1a1a2e] font-black text-sm px-4 py-2 rounded-2xl shadow-xl">
              <span className="lang-ar">🚀 تحدي ١٠٠ موقع</span>
              <span className="lang-en">🚀 100 Websites Challenge</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
