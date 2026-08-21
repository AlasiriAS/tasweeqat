"use client";

import { useState } from "react";

interface Lead {
  businessName: string; category: string | null; city: string | null;
  phone: string | null; website: string | null; websiteStatus: string;
}
interface CrmRecord {
  id: string; agreedPrice: number; contactPerson: string | null;
  pagesNeeded: string | null; requirements: string | null;
  hostingActive: boolean; monthlyFee: number;
  lead: Lead;
  assigned: { name: string | null } | null;
}

const today = (lang: "ar" | "en") =>
  new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-SA", {
    year: "numeric", month: "long", day: "numeric",
  });
const qNum = (id: string) => "QT-" + id.slice(-6).toUpperCase();

const T = {
  ar: {
    quotation: "عرض سعر",
    preparedFor: "مُعدّ لـ",
    validFor: "صالح لمدة",
    validDays: "٣٠ يوماً",
    services: "الخدمات والأسعار",
    service: "الخدمة",
    description: "الوصف",
    price: "السعر (ر.س)",
    websiteName: "موقع إلكتروني احترافي",
    websiteDesc: "تصميم مخصص · متوافق مع الجوال · عربي وإنجليزي",
    delivery: "تسليم خلال ٧ أيام عمل · جولتان من التعديلات",
    hosting: "استضافة ويب ودومين",
    hostingDesc: "خطة شهرية · شاملة SSL",
    hostingRecurring: "دفع شهري · إلغاء في أي وقت",
    mo: "/شهر",
    webDev: "تطوير الموقع",
    monthlyHosting: "الاستضافة الشهرية",
    totalDue: "الإجمالي المستحق الآن",
    pages: "الصفحات المشمولة",
    requirements: "متطلبات العميل",
    payment: "تفاصيل الدفع",
    iban: "تحويل بنكي · رقم الآيبان",
    terms: "الشروط والأحكام",
    termsList: [
      "يُطلب دفع ٥٠٪ مقدماً لبدء المشروع؛ والباقي عند التسليم.",
      "العرض صالح لمدة ٣٠ يوماً من التاريخ أعلاه.",
      "يشمل المشروع جولتين من التعديلات؛ وأي تعديلات إضافية تُحتسب بشكل منفصل.",
      "رسوم الاستضافة تُدفع شهرياً بعد إطلاق الموقع.",
      "العميل مسؤول عن توفير المحتوى (نصوص، صور، شعار) خلال ٣ أيام عمل.",
      "تحتفظ تسويقات بحق عرض المشروع في معرض أعمالها.",
    ],
    clientSig: "توقيع العميل والتاريخ",
    sigText: "التوقيع",
    authorized: "معتمد من تسويقات",
    subtitle: "حلول المواقع والتسويق الرقمي",
    attn: "الاهتمام:",
    print: "🖨️ طباعة / حفظ PDF",
    switchLang: "English",
    pages_label: "صفحة",
  },
  en: {
    quotation: "Quotation",
    preparedFor: "Prepared for",
    validFor: "Valid for",
    validDays: "30 Days",
    services: "Services & Pricing",
    service: "Service",
    description: "Description",
    price: "Price (SAR)",
    websiteName: "Professional Website",
    websiteDesc: "Custom design · Mobile-responsive · Arabic & English",
    delivery: "Delivery within 7 business days · 2 rounds of revisions",
    hosting: "Web Hosting & Domain",
    hostingDesc: "Monthly hosting plan · SSL included",
    hostingRecurring: "Recurring monthly · Cancel anytime",
    mo: "/mo",
    webDev: "Website Development",
    monthlyHosting: "Monthly Hosting",
    totalDue: "Total Due Now",
    pages: "Included Pages",
    requirements: "Client Requirements",
    payment: "Payment Details",
    iban: "Bank Transfer · IBAN",
    terms: "Terms & Conditions",
    termsList: [
      "50% deposit required to start the project; remaining 50% upon delivery.",
      "Quotation valid for 30 days from the date above.",
      "Project includes 2 rounds of revisions. Additional changes billed separately.",
      "Hosting fee is billed monthly after website launch.",
      "Client is responsible for providing content (text, images, logo) within 3 business days.",
      "Tasweeqat retains the right to display the project in its portfolio.",
    ],
    clientSig: "Client Signature & Date",
    sigText: "Signature",
    authorized: "Authorized by Tasweeqat",
    subtitle: "Website & Digital Marketing Solutions",
    attn: "Attn:",
    print: "🖨️ Print / Save PDF",
    switchLang: "عربي",
    pages_label: "pages",
  },
};

export function QuotationPrint({ crm }: { crm: CrmRecord }) {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = T[lang];
  const isAr = lang === "ar";

  const pages = crm.pagesNeeded
    ? (() => { try { return JSON.parse(crm.pagesNeeded!); } catch { return crm.pagesNeeded?.split(",").map(s => s.trim()) || []; } })()
    : [];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: ${isAr ? "'Segoe UI', Tahoma, Arial, sans-serif" : "'Segoe UI', Tahoma, Arial, sans-serif"}; background: #f5f5f5; }
        .page {
          width: 210mm; min-height: 297mm; margin: 20px auto; background: #fff;
          box-shadow: 0 4px 40px rgba(0,0,0,.15); position: relative; overflow: hidden;
          direction: ${isAr ? "rtl" : "ltr"};
        }
        @media print {
          body { background: #fff; }
          .page { margin: 0; box-shadow: none; width: 100%; min-height: 100vh; }
          .no-print { display: none !important; }
        }
        .header { background: linear-gradient(135deg, #0a1f14 0%, #1B5E4B 100%); color: #fff; padding: 40px 50px 32px; }
        .logo-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .logo-mark { width: 56px; height: 56px; background: #E6C16A; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 900; color: #0a1f14; }
        .logo-text h1 { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
        .logo-text p { font-size: 12px; opacity: .65; margin-top: 3px; }
        .doc-info { text-align: ${isAr ? "left" : "right"}; }
        .doc-info .doc-title { font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #E6C16A; }
        .doc-info .doc-num { font-size: 13px; opacity: .7; margin-top: 4px; }
        .doc-info .doc-date { font-size: 13px; opacity: .7; }
        .divider { border: none; border-top: 1px solid rgba(255,255,255,.15); margin: 0 0 24px; }
        .header-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
        .to-block .to-label { font-size: 11px; font-weight: 700; opacity: .6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .to-block .client-name { font-size: 20px; font-weight: 900; }
        .to-block .client-meta { font-size: 13px; opacity: .7; margin-top: 4px; }
        .validity { background: rgba(230,193,106,.12); border: 1px solid rgba(230,193,106,.3); border-radius: 10px; padding: 10px 16px; text-align: center; }
        .validity .v-label { font-size: 10px; opacity: .6; text-transform: uppercase; letter-spacing: 1px; }
        .validity .v-val { font-size: 13px; font-weight: 800; color: #E6C16A; margin-top: 2px; }
        .body { padding: 40px 50px; }
        .section-title { font-size: 12px; font-weight: 800; color: #1B5E4B; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #E6C16A; padding-bottom: 8px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
        th { background: #0a1f14; color: #E6C16A; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 12px 16px; text-align: ${isAr ? "right" : "left"}; }
        td { padding: 14px 16px; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #1a1a1a; vertical-align: top; }
        tr:last-child td { border-bottom: none; }
        tr:nth-child(even) td { background: #fafafa; }
        .item-name { font-weight: 700; }
        .item-desc { font-size: 11px; color: #888; margin-top: 3px; }
        .totals { margin-${isAr ? "right" : "left"}: auto; width: 280px; margin-bottom: 32px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
        .total-row:last-child { border-bottom: none; border-top: 2px solid #0a1f14; margin-top: 4px; padding-top: 12px; font-size: 16px; font-weight: 900; color: #1B5E4B; }
        .total-row .label { color: #555; }
        .pages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 32px; }
        .page-chip { background: #f0f7f4; border: 1px solid #c3ddd6; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 600; color: #1B5E4B; text-align: center; }
        .req-box { background: #f9f9f9; border: 1px solid #ebebeb; border-radius: 10px; padding: 16px 20px; font-size: 13px; color: #444; line-height: 1.7; margin-bottom: 32px; }
        .terms { background: #f9f9f9; border-${isAr ? "right" : "left"}: 4px solid #1B5E4B; border-radius: ${isAr ? "10px 0 0 10px" : "0 10px 10px 0"}; padding: 16px 20px; margin-bottom: 32px; }
        .terms ul { padding-${isAr ? "right" : "left"}: 20px; }
        .terms li { font-size: 12px; color: #555; margin-bottom: 6px; line-height: 1.6; }
        .payment-box { background: #0a1f14; color: #fff; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
        .payment-box .p-label { font-size: 11px; opacity: .6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .payment-box .p-val { font-size: 16px; font-weight: 900; color: #E6C16A; letter-spacing: 2px; }
        .payment-box .p-name { font-size: 12px; opacity: .6; margin-top: 4px; }
        .footer { background: #0a1f14; color: rgba(255,255,255,.5); padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
        .footer .brand { color: #E6C16A; font-weight: 900; font-size: 13px; }
        .print-btn { position: fixed; bottom: 30px; right: 30px; background: #1B5E4B; color: #fff; border: none; border-radius: 50px; padding: 14px 28px; font-size: 15px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,.2); z-index: 999; display: flex; align-items: center; gap: 8px; }
        .print-btn:hover { background: #2E7D68; }
        .lang-btn { position: fixed; bottom: 30px; left: 30px; background: #E6C16A; color: #0a1f14; border: none; border-radius: 50px; padding: 14px 28px; font-size: 15px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,.2); z-index: 999; }
        .lang-btn:hover { background: #c9a24e; }
      `}</style>

      <button className="print-btn no-print" onClick={() => window.print()}>{t.print}</button>
      <button className="lang-btn no-print" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>{t.switchLang}</button>

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="logo-row">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="logo-mark">ت</div>
              <div className="logo-text">
                <h1>تسويقات · Tasweeqat</h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
            <div className="doc-info">
              <div className="doc-title">{t.quotation}</div>
              <div className="doc-num"># {qNum(crm.id)}</div>
              <div className="doc-date">{today(lang)}</div>
            </div>
          </div>
          <hr className="divider" />
          <div className="header-bottom">
            <div className="to-block">
              <div className="to-label">{t.preparedFor}</div>
              <div className="client-name">{crm.lead.businessName}</div>
              <div className="client-meta">
                {[crm.lead.city, crm.lead.category, crm.lead.phone].filter(Boolean).join(" · ")}
              </div>
              {crm.contactPerson && (
                <div className="client-meta" style={{ marginTop: 4 }}>{t.attn} {crm.contactPerson}</div>
              )}
            </div>
            <div className="validity">
              <div className="v-label">{t.validFor}</div>
              <div className="v-val">{t.validDays}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="body">
          <div className="section-title">{t.services}</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "40%" }}>{t.service}</th>
                <th>{t.description}</th>
                <th style={{ textAlign: isAr ? "left" : "right", width: "120px" }}>{t.price}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="item-name">{t.websiteName}</div>
                  <div className="item-desc">{t.websiteDesc}</div>
                </td>
                <td>
                  <div className="item-desc">
                    {pages.length > 0 ? `${pages.length} ${t.pages_label} · ` : ""}
                    {t.delivery}
                  </div>
                </td>
                <td style={{ textAlign: isAr ? "left" : "right", fontWeight: 800 }}>{crm.agreedPrice.toLocaleString()}</td>
              </tr>
              {crm.hostingActive && (
                <tr>
                  <td>
                    <div className="item-name">{t.hosting}</div>
                    <div className="item-desc">{t.hostingDesc}</div>
                  </td>
                  <td><div className="item-desc">{t.hostingRecurring}</div></td>
                  <td style={{ textAlign: isAr ? "left" : "right", fontWeight: 800 }}>{crm.monthlyFee}{t.mo}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="totals">
            <div className="total-row">
              <span className="label">{t.webDev}</span>
              <span>{crm.agreedPrice.toLocaleString()} SAR</span>
            </div>
            {crm.hostingActive && (
              <div className="total-row">
                <span className="label">{t.monthlyHosting}</span>
                <span>{crm.monthlyFee} SAR{t.mo}</span>
              </div>
            )}
            <div className="total-row">
              <span className="label">{t.totalDue}</span>
              <span>{crm.agreedPrice.toLocaleString()} SAR</span>
            </div>
          </div>

          {pages.length > 0 && (
            <>
              <div className="section-title">{t.pages}</div>
              <div className="pages-grid">
                {pages.map((p: string, i: number) => <div key={i} className="page-chip">✓ {p}</div>)}
              </div>
            </>
          )}

          {crm.requirements && (
            <>
              <div className="section-title">{t.requirements}</div>
              <div className="req-box">{crm.requirements}</div>
            </>
          )}

          <div className="section-title">{t.payment}</div>
          <div className="payment-box">
            <div className="p-label">{t.iban}</div>
            <div className="p-val">SA-- ---- ---- ---- ---- --</div>
            <div className="p-name">Tasweeqat · {isAr ? "قيد التحديث" : "To be updated"}</div>
          </div>

          <div className="section-title">{t.terms}</div>
          <div className="terms">
            <ul>
              {t.termsList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 40 }}>{t.clientSig}</div>
              <div style={{ borderTop: "2px solid #ddd", paddingTop: 8, fontSize: 12, color: "#aaa" }}>{t.sigText}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 40 }}>{t.authorized}</div>
              <div style={{ borderTop: "2px solid #ddd", paddingTop: 8, fontSize: 12, color: "#aaa" }}>Abdullah Al-Asiri</div>
            </div>
          </div>
        </div>

        <div className="footer">
          <span className="brand">تسويقات · Tasweeqat</span>
          <span>tasweeqat.com · hello@tasweeqat.com</span>
          <span>{t.quotation} {qNum(crm.id)}</span>
        </div>
      </div>
    </>
  );
}
