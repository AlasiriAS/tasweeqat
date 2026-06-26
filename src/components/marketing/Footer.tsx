import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/966594700600?text=" + encodeURIComponent("السلام عليكم، أنا مهتم في الخدمات الي تقدمونها / Hi, I am interested in your services.");

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#e94560] rounded-xl flex items-center justify-center font-black text-white text-lg">
                ت
              </div>
              <div>
                <div className="font-bold text-lg">تسويقات</div>
                <div className="text-white/40 text-xs">Tasweeqat</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm" dir="rtl">
              وكالة رقمية سعودية في مهمة لوضع ١٠٠ نشاط تجاري محلي على الإنترنت في ١٠٠ يوم — بمواقع احترافية واستضافة وتسويق رقمي.
            </p>
            <p className="text-white/30 text-xs mt-3">
              A Saudi digital agency on a mission to put 100 local businesses online in 100 days.
            </p>

            {/* WhatsApp button */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              <MessageCircle size={16} />
              واتساب مباشر
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/70 uppercase tracking-wider">
              <span className="lang-ar">الخدمات</span>
              <span className="lang-en">Services</span>
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { ar: "تصميم المواقع الإلكترونية", en: "Website Design" },
                { ar: "استضافة المواقع",            en: "Website Hosting" },
                { ar: "البريد الإلكتروني الاحترافي", en: "Professional Email" },
                { ar: "إدارة السوشيال ميديا",       en: "Social Media" },
                { ar: "نظام إدارة العملاء",         en: "CRM Systems" },
                { ar: "صيانة المواقع",              en: "Maintenance" },
              ].map(s => (
                <li key={s.ar}>
                  <a href="#services" className="hover:text-[#e94560] transition-colors">
                    <span className="lang-ar">{s.ar}</span>
                    <span className="lang-en">{s.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/70 uppercase tracking-wider">
              <span className="lang-ar">تواصل معنا</span>
              <span className="lang-en">Company</span>
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#about"   className="hover:text-[#e94560] transition-colors"><span className="lang-ar">من نحن</span><span className="lang-en">About Us</span></a></li>
              <li><a href="#vision"  className="hover:text-[#e94560] transition-colors"><span className="lang-ar">رؤيتنا ورسالتنا</span><span className="lang-en">Vision &amp; Mission</span></a></li>
              <li><a href="#contact" className="hover:text-[#e94560] transition-colors"><span className="lang-ar">تواصل معنا</span><span className="lang-en">Contact</span></a></li>
              <li>
                <Link href="/login" className="hover:text-[#e94560] transition-colors">
                    <span className="lang-ar">تسجيل الدخول</span>
                    <span className="lang-en">Dashboard Login</span>
                  </Link>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-1.5" dir="rtl">
              <a href="mailto:Abdullah@tasweeqat.com" className="block text-white/40 text-xs hover:text-[#e94560] transition-colors" dir="ltr">
                Abdullah@tasweeqat.com
              </a>
              <a href="tel:+966594700600" className="block text-white/40 text-xs hover:text-[#e94560] transition-colors" dir="ltr">
                +966 594 700 600
              </a>
              <p className="text-white/30 text-xs">المنطقة الشرقية، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            <span className="lang-ar">© 2024 تسويقات. جميع الحقوق محفوظة.</span>
            <span className="lang-en">© 2024 Tasweeqat. All rights reserved.</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">
              <span className="lang-ar">صُنع بـ ❤️ في المملكة العربية السعودية 🇸🇦</span>
              <span className="lang-en">Made with ❤️ in Saudi Arabia 🇸🇦</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#27ae60] rounded-full animate-pulse" />
              <span className="text-white/30 text-xs">
                <span className="lang-ar">الأنظمة تعمل</span>
                <span className="lang-en">Systems operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
