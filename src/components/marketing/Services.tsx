"use client";

import { useEffect, useRef } from "react";
import { Globe, Server, Share2, BarChart3, Mail, Wrench } from "lucide-react";

const services = [
  {
    icon: Globe,
    ar: { title: "تصميم وتطوير المواقع", desc: "مواقع احترافية متوافقة مع الجوال، مبنية بأحدث التقنيات. من صفحات الهبوط البسيطة إلى تطبيقات الويب المتكاملة — سريعة وآمنة وجاهزة لمحركات البحث." },
    en: { title: "Website Design & Development", desc: "Professional, mobile-first websites built with modern technology. From simple landing pages to full web applications — fast, secure, and SEO-ready." },
    color: "#e94560",
  },
  {
    icon: Server,
    ar: { title: "استضافة المواقع", desc: "استضافة موثوقة وسريعة بضمان 99.9% وقت تشغيل. ندير كل شيء — نسخ احتياطية، شهادات SSL، أمان ومتابعة الأداء." },
    en: { title: "Website Hosting", desc: "Reliable, fast hosting with 99.9% uptime. We manage everything — backups, SSL certificates, security, and performance monitoring." },
    color: "#0f3460",
  },
  {
    icon: Mail,
    ar: { title: "البريد الإلكتروني الاحترافي", desc: "بريد إلكتروني احترافي بنطاقك الخاص (أنت@عملك.com). ابنِ الثقة وابدُ محترفاً في كل رسالة ترسلها." },
    en: { title: "Professional Email", desc: "Custom business email on your domain (you@yourbusiness.com). Build trust and look professional with every email you send." },
    color: "#27ae60",
  },
  {
    icon: Share2,
    ar: { title: "إدارة السوشيال ميديا", desc: "إنشاء محتوى استراتيجي وإدارة مجتمعات على إنستغرام وسناب وتويتر وتيك توك. نمّ جمهورك وحوّل المتابعين لعملاء." },
    en: { title: "Social Media Marketing", desc: "Strategic content creation and community management across Instagram, Snapchat, X, and TikTok. Grow your audience and convert followers to customers." },
    color: "#f5a623",
  },
  {
    icon: BarChart3,
    ar: { title: "نظام إدارة العملاء CRM", desc: "أنظمة CRM مخصصة لتتبع العملاء المحتملين، إدارة العلاقات، أتمتة المتابعة، وعدم إضاعة أي فرصة بيع." },
    en: { title: "CRM & Business Systems", desc: "Custom CRM systems to track leads, manage client relationships, automate follow-ups, and never miss a sales opportunity." },
    color: "#9b59b6",
  },
  {
    icon: Wrench,
    ar: { title: "صيانة المواقع", desc: "حافظ على موقعك محدثاً وآمناً وعاملاً بأفضل أداء. تحديثات منتظمة وفحص الأداء ودعم ذو أولوية." },
    en: { title: "Website Maintenance", desc: "Keep your website up-to-date, secure, and performing at its best. Regular updates, performance checks, and priority support." },
    color: "#1abc9c",
  },
];

export function Services() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.15 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ✦ <span className="lang-ar">خدماتنا</span><span className="lang-en">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="lang-ar">كل ما يحتاجه عملك</span>
            <span className="lang-en">Everything Your Business Needs</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            <span className="lang-ar">من موقعك الأول إلى حضور رقمي متكامل — نحن معك في كل خطوة.</span>
            <span className="lang-en">From your first website to a complete digital presence — we have you covered at every step.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="fade-up card-hover bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all group-hover:scale-110"
                style={{ background: `${s.color}15` }}
              >
                <s.icon size={26} style={{ color: s.color }} />
              </div>

              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">
                <span className="lang-ar">{s.ar.title}</span>
                <span className="lang-en">{s.en.title}</span>
              </h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                <span className="lang-ar">{s.ar.desc}</span>
                <span className="lang-en">{s.en.desc}</span>
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/10">
                <a
                  href="#contact"
                  className="text-xs font-bold transition-colors"
                  style={{ color: s.color }}
                >
                  <span className="lang-ar">تواصل معنا ←</span>
                  <span className="lang-en">Get in touch →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
