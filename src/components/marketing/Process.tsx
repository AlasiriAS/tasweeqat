"use client";

const steps = [
  {
    num: "١", color: "#e94560",
    ar: { title: "مكالمة تعارف",    desc: "نتعرف على عملك وأهدافك وجمهورك. نحلل المنافسين ونحدد فرصك الرقمية." },
    en: { title: "Discovery Call",   desc: "We learn about your business, goals, and audience. We analyze competitors and identify your digital opportunities." },
  },
  {
    num: "٢", color: "#f5a623",
    ar: { title: "جمع المعلومات",   desc: "تملأ نموذجنا البسيط بمحتواك وتفضيلاتك ومتطلباتك. نحن نتولى الباقي." },
    en: { title: "Info Gathering",   desc: "You fill our simple form with your content, preferences, and requirements. We handle the rest." },
  },
  {
    num: "٣", color: "#0f3460",
    ar: { title: "التصميم والبناء",  desc: "يصمم فريقنا ويطور موقعك بأحدث الأدوات. تحصل على معاينة خلال أيام قليلة." },
    en: { title: "Design & Build",   desc: "Our team designs and develops your website using modern AI-assisted tools. You get a preview within days." },
  },
  {
    num: "٤", color: "#27ae60",
    ar: { title: "المراجعة والإطلاق", desc: "تراجع الموقع وتطلب حتى تعديلين مجاناً. بعد موافقتك، نطلقه مباشرة." },
    en: { title: "Review & Launch",  desc: "You review the website and request up to 2 free revisions. Once approved, we launch it live." },
  },
  {
    num: "٥", color: "#9b59b6",
    ar: { title: "الدعم والنمو",    desc: "ندير استضافتك ونبقي موقعك محدثاً وآمناً. وخدمات إضافية متى احتجتها." },
    en: { title: "Support & Grow",   desc: "We manage your hosting, keep your site updated and secure, and offer future service upgrades." },
  },
];

export function Process() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ✦ <span className="lang-ar">كيف نعمل</span><span className="lang-en">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="lang-ar">من الصفر إلى الإطلاق في أيام</span>
            <span className="lang-en">From Zero to Live in Days</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg">
            <span className="lang-ar">عملية مبسطة من ٥ خطوات تجعل عملك على الإنترنت بسرعة وإتقان.</span>
            <span className="lang-en">Our streamlined 5-step process gets your business online fast, right, and beautifully.</span>
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#e94560] via-[#f5a623] to-[#27ae60] opacity-20" />
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}99)` }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                  <span className="lang-ar">{step.ar.title}</span>
                  <span className="lang-en">{step.en.title}</span>
                </h3>
                <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed">
                  <span className="lang-ar">{step.ar.desc}</span>
                  <span className="lang-en">{step.en.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
