"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email:    form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700&family=Poppins:wght@500;600&display=swap');

        .login-root {
          font-family: "Tajawal","Cairo",Arial,sans-serif;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 100vh;
          direction: rtl;
        }

        /* ── BRAND PANEL ── */
        .brand-panel {
          position: relative;
          overflow: hidden;
          background: radial-gradient(120% 120% at 90% 0%, #24785f 0%, #1B5E4B 42%, #103c31 100%);
          color: #fff;
          padding: 56px 54px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .brand-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(230,193,106,.22) 1.6px, transparent 1.7px);
          background-size: 24px 24px;
          opacity: .5;
          mask-image: linear-gradient(160deg,#000,transparent 70%);
          -webkit-mask-image: linear-gradient(160deg,#000,transparent 70%);
        }
        .brand-glow {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(230,193,106,.16),transparent 70%);
          top: -120px; left: -80px;
        }
        .brand-inner {
          position: relative;
          z-index: 2;
          max-width: 440px;
        }
        .brand-inner h1 {
          font-family: "Cairo";
          font-weight: 900;
          font-size: 38px;
          line-height: 1.3;
          margin-bottom: 14px;
        }
        .brand-inner h1 .gold { color: #E6C16A; }
        .brand-inner p {
          color: #cfe0d8;
          font-size: 17px;
          line-height: 1.9;
          margin-bottom: 30px;
        }
        .brand-features {
          list-style: none;
          display: grid;
          gap: 16px;
        }
        .brand-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          color: #e7f1ec;
        }
        .feat-icon {
          width: 30px; height: 30px;
          flex-shrink: 0;
          border-radius: 9px;
          background: rgba(230,193,106,.16);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-foot {
          position: relative;
          z-index: 2;
          margin-top: 44px;
          color: #9fb8ac;
          font-size: 13.5px;
        }

        /* ── FORM PANEL ── */
        .form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: radial-gradient(700px 300px at 100% 0%, rgba(46,125,104,.06), transparent 60%), #F7F7F7;
        }
        .form-card {
          width: 100%;
          max-width: 410px;
        }
        .form-card h2 {
          font-family: "Cairo";
          font-weight: 900;
          color: #1B5E4B;
          font-size: 30px;
          margin-bottom: 6px;
        }
        .form-card .subtitle {
          color: #5b6b64;
          font-size: 15.5px;
          margin-bottom: 26px;
        }

        .form-label {
          display: block;
          font-family: "Cairo";
          font-weight: 700;
          font-size: 14px;
          color: #2f3d36;
          margin-bottom: 7px;
        }
        .form-field {
          position: relative;
          margin-bottom: 16px;
        }
        .field-icon {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          right: 14px;
          width: 20px; height: 20px;
          stroke: #93a49c;
          fill: none;
          stroke-width: 1.8;
        }
        .form-input {
          width: 100%;
          padding: 14px 44px 14px 44px;
          border: 1.5px solid #e3e7e4;
          border-radius: 13px;
          font-family: inherit;
          font-size: 15.5px;
          background: #fff;
          transition: border-color .15s, box-shadow .15s;
          color: #18261f;
          direction: ltr;
          text-align: right;
        }
        .form-input:focus {
          outline: none;
          border-color: #2E7D68;
          box-shadow: 0 0 0 4px rgba(46,125,104,.1);
        }
        .form-input::placeholder { color: #b0bcb7; }

        .eye-btn {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          left: 14px;
          cursor: pointer;
          width: 22px; height: 22px;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #93a49c;
        }
        .eye-btn:hover { color: #1B5E4B; }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 13px;
          background: linear-gradient(90deg, #E6C16A, #c9a24e);
          color: #3a2c0c;
          font-family: "Cairo";
          font-weight: 900;
          font-size: 17px;
          cursor: pointer;
          transition: filter .15s, box-shadow .15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
        }
        .submit-btn:hover:not(:disabled) {
          filter: brightness(.96);
          box-shadow: 0 12px 26px -12px rgba(201,162,78,.7);
        }
        .submit-btn:disabled { opacity: .6; cursor: not-allowed; }

        .error-box {
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          color: #b91c1c;
          border-radius: 13px;
          padding: 12px 16px;
          font-size: 14px;
          margin-bottom: 16px;
          font-family: "Cairo";
        }

        .back-home {
          text-align: center;
          margin-top: 18px;
        }
        .back-home a {
          color: #8a988f;
          font-size: 13.5px;
          text-decoration: none;
        }
        .back-home a:hover { color: #1B5E4B; }

        @media (max-width: 860px) {
          .login-root { grid-template-columns: 1fr; }
          .brand-panel { display: none; }
        }

        .spin {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(58,44,12,.3);
          border-top-color: #3a2c0c;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="login-root">

        {/* ── BRAND PANEL ── */}
        <section className="brand-panel">
          <span className="brand-glow" />
          <div className="brand-inner">
            <h1>
              أهلاً بعودتك <span className="gold">👋</span><br />
              لوحة تحكم <span className="gold">تسويقات</span>
            </h1>
            <p>سجّل دخولك لمتابعة مشاريعك وعملائك، ومراقبة نموك الرقمي من مكان واحد.</p>
            <ul className="brand-features">
              <li>
                <span className="feat-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E6C16A" strokeWidth="2.4"><path d="M5 12l4 4 10-10"/></svg>
                </span>
                متابعة العملاء المحتملين ومهامك لحظياً
              </li>
              <li>
                <span className="feat-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E6C16A" strokeWidth="2.4"><path d="M5 12l4 4 10-10"/></svg>
                </span>
                تقارير أداء ونتائج واضحة
              </li>
              <li>
                <span className="feat-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E6C16A" strokeWidth="2.4"><path d="M5 12l4 4 10-10"/></svg>
                </span>
                إدارة الصفقات وخط المبيعات
              </li>
            </ul>
          </div>
          <div className="brand-foot">نبني حضورك الرقمي ونحقق النمو · tasweeqat.com</div>
        </section>

        {/* ── FORM PANEL ── */}
        <section className="form-panel">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>تسجيل الدخول</h2>
            <p className="subtitle">أدخل بياناتك للوصول إلى لوحة التحكم.</p>

            {error && <div className="error-box">{error}</div>}

            <label className="form-label" htmlFor="email">البريد الإلكتروني</label>
            <div className="form-field">
              <svg className="field-icon" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 7l9 6 9-6"/>
              </svg>
              <input
                id="email"
                className="form-input"
                type="email"
                required
                placeholder="admin@tasweeqat.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <label className="form-label" htmlFor="pass">كلمة المرور</label>
            <div className="form-field">
              <svg className="field-icon" viewBox="0 0 24 24">
                <rect x="4" y="10" width="16" height="10" rx="2"/>
                <path d="M8 10V7a4 4 0 018 0v3"/>
              </svg>
              <input
                id="pass"
                className="form-input"
                type={show ? "text" : "password"}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button type="button" className="eye-btn" onClick={() => setShow(!show)}>
                {show
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                }
              </button>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading
                ? <span className="spin" />
                : <>دخول <span>←</span></>
              }
            </button>

            <div className="back-home">
              <Link href="/">→ العودة للصفحة الرئيسية</Link>
            </div>
          </form>
        </section>

      </div>
    </>
  );
}
