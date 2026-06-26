"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// Particle component
function Particle({ size, top, left, delay, duration }: {
  size: number; top: number; left: number; delay: number; duration: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top:  `${top}%`,
        left: `${left}%`,
        background: `rgba(233, 69, 96, ${Math.random() * 0.15 + 0.05})`,
        animationName: "float",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
    />
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 10,
  top:  Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 6 + 4,
}));

export function Hero() {
  const c1 = useCounter(100);
  const c2 = useCounter(100);
  const c3 = useCounter(1407);
  const c4 = useCounter(98);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e94560] rounded-full blur-[120px] opacity-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0f3460] rounded-full blur-[100px] opacity-20 animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-8 text-white/90 text-sm font-medium">
          <span className="w-2 h-2 bg-[#e94560] rounded-full animate-pulse" />
          <span className="lang-ar">١٠٠ موقع · ١٠٠ نشاط تجاري · ١٠٠ يوم</span>
          <span className="lang-en">100 Websites · 100 Businesses · 100 Days</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          <span className="lang-ar">
            نبني مواقع{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#f5a623]">تحقق نتائج</span>
          </span>
          <span className="lang-en">
            We Build Websites That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#f5a623]">Deliver Results</span>
          </span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          <span className="lang-ar">تسويقات في مهمة لوضع ١٠٠ نشاط تجاري سعودي على الإنترنت — بمواقع احترافية واستضافة موثوقة وتسويق رقمي يحقق نتائج حقيقية.</span>
          <span className="lang-en">Tasweeqat is on a mission to put 100 Saudi businesses online — with professional websites, reliable hosting, and digital marketing that drives real growth.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 bg-[#e94560] hover:bg-[#c73652] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e94560]/30"
          >
            <span className="lang-ar">احصل على موقعك الآن</span>
            <span className="lang-en">Get Your Website Now</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg backdrop-blur transition-all duration-300"
          >
            <Play size={18} />
            <span className="lang-ar">اكتشف خدماتنا</span>
            <span className="lang-en">See Our Services</span>
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { ref: c1.ref, count: c1.count, suffix: "",  ar: "موقع هدفنا",   en: "Websites Goal"       },
            { ref: c2.ref, count: c2.count, suffix: "",  ar: "يوم حملتنا",  en: "Day Campaign"        },
            { ref: c3.ref, count: c3.count, suffix: "+", ar: "عميل محتمل",  en: "Leads Identified"    },
            { ref: c4.ref, count: c4.count, suffix: "%", ar: "رضا العملاء", en: "Client Satisfaction" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center">
              <div className="text-3xl md:text-4xl font-black text-white">
                <span ref={s.ref}>{s.count.toLocaleString()}</span>{s.suffix}
              </div>
              <div className="text-white/80 text-sm font-semibold mt-1">
                <span className="lang-ar">{s.ar}</span>
                <span className="lang-en">{s.en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 animate-bounce transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
