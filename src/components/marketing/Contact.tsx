"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

const WA_NUMBER = "966594700600";
const WA_MSG    = encodeURIComponent("السلام عليكم، أنا مهتم في الخدمات الي تقدمونها / Hi, I am interested in your services.");
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export function Contact() {
  const [form, setForm]     = useState({ name: "", phone: "", company: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: "طلب تواصل من الموقع" }),
      });
      if (res.ok) {
        toast.success("تم الإرسال! سنتواصل معك قريباً ✓");
        setForm({ name: "", phone: "", company: "" });
      } else {
        toast.error("حدث خطأ. حاول مرة أخرى.");
      }
    } catch {
      toast.error("خطأ في الاتصال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-[#0d0d1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ✦ <span className="lang-ar">تواصل معنا</span><span className="lang-en">Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="lang-ar">هل تريد موقعاً إلكترونياً؟</span>
            <span className="lang-en">Ready to Go Online?</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg">
            <span className="lang-ar">اترك رقمك وسنتواصل معك — بسيطة!</span>
            <span className="lang-en">Leave your number and we'll reach out within 24 hours.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: contact info + WhatsApp */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-2">
                <span className="lang-ar">تواصل مباشرة</span>
                <span className="lang-en">Get In Touch</span>
              </h3>
              <p className="text-white/50 text-sm mb-6">
                <span className="lang-ar">نرد خلال ٢٤ ساعة</span>
                <span className="lang-en">We reply within 24 hours</span>
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-[#e94560]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#e94560]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">اتصل أو واتساب</div>
                    <div className="text-white font-semibold text-sm" dir="ltr">+966 594 700 600</div>
                  </div>
                </a>

                <a
                  href="mailto:Abdullah@tasweeqat.com"
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-[#e94560]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#e94560]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">البريد الإلكتروني</div>
                    <div className="text-white font-semibold text-sm" dir="ltr">Abdullah@tasweeqat.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#e94560]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#e94560]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">الموقع</div>
                    <div className="text-white font-semibold text-sm">المنطقة الشرقية، المملكة العربية السعودية</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-green-900/20"
              >
                <MessageCircle size={20} />
                <span className="lang-ar">راسلنا على واتساب</span>
                <span className="lang-en">Message us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: simple form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                <span className="lang-ar">اترك بياناتك</span>
                <span className="lang-en">Leave Your Details</span>
              </h3>
              <p className="text-gray-400 dark:text-white/30 text-sm mb-6">
                <span className="lang-ar">سنتواصل معك لمعرفة احتياجاتك</span>
                <span className="lang-en">We'll reach out to understand your needs</span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-2">
                    <span className="lang-ar">اسم النشاط التجاري *</span>
                  <span className="lang-en">Business Name *</span>
                  </label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="مثال: مطعم الأصيل، صالون الجمال..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-2">
                    <span className="lang-ar">رقم الجوال (واتساب) *</span>
                    <span className="lang-en">Phone / WhatsApp *</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-2">
                    <span className="lang-ar">اسمك (اختياري)</span>
                    <span className="lang-en">Your Name (optional)</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="الاسم الكريم"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560] transition-all text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-[#e94560] hover:bg-[#c73652] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span className="lang-ar">أرسل — وسنتواصل معك قريباً</span>
                    <span className="lang-en">Send — we'll reach out soon</span>
                  </>
                )}
              </button>

              <p className="text-center text-gray-300 dark:text-white/20 text-xs mt-4">
                أو تواصل معنا مباشرة على واتساب 👆
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
