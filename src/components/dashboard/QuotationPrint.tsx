"use client";

import { useEffect } from "react";

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

const today = () => new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
const qNum  = (id: string) => "QT-" + id.slice(-6).toUpperCase();

export function QuotationPrint({ crm }: { crm: CrmRecord }) {
  useEffect(() => {
    // Auto-trigger print dialog
    window.addEventListener("load", () => {});
  }, []);

  const pages = crm.pagesNeeded
    ? (() => { try { return JSON.parse(crm.pagesNeeded!); } catch { return crm.pagesNeeded?.split(",").map(s => s.trim()) || []; } })()
    : [];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #f5f5f5; }
        .page {
          width: 210mm; min-height: 297mm; margin: 20px auto; background: #fff;
          box-shadow: 0 4px 40px rgba(0,0,0,.15); position: relative; overflow: hidden;
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
        .doc-info { text-align: right; }
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

        /* Services table */
        table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
        th { background: #0a1f14; color: #E6C16A; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 12px 16px; text-align: left; }
        td { padding: 14px 16px; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #1a1a1a; vertical-align: top; }
        tr:last-child td { border-bottom: none; }
        tr:nth-child(even) td { background: #fafafa; }
        .item-name { font-weight: 700; }
        .item-desc { font-size: 11px; color: #888; margin-top: 3px; }

        /* Totals */
        .totals { margin-left: auto; width: 280px; margin-bottom: 32px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
        .total-row:last-child { border-bottom: none; border-top: 2px solid #0a1f14; margin-top: 4px; padding-top: 12px; font-size: 16px; font-weight: 900; color: #1B5E4B; }
        .total-row .label { color: #555; }

        /* Pages */
        .pages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 32px; }
        .page-chip { background: #f0f7f4; border: 1px solid #c3ddd6; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 600; color: #1B5E4B; text-align: center; }

        /* Requirements */
        .req-box { background: #f9f9f9; border: 1px solid #ebebeb; border-radius: 10px; padding: 16px 20px; font-size: 13px; color: #444; line-height: 1.7; margin-bottom: 32px; }

        /* Terms */
        .terms { background: #f9f9f9; border-left: 4px solid #1B5E4B; border-radius: 0 10px 10px 0; padding: 16px 20px; margin-bottom: 32px; }
        .terms ul { padding-right: 20px; }
        .terms li { font-size: 12px; color: #555; margin-bottom: 6px; line-height: 1.6; }

        /* IBAN */
        .payment-box { background: #0a1f14; color: #fff; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
        .payment-box .p-label { font-size: 11px; opacity: .6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .payment-box .p-val { font-size: 16px; font-weight: 900; color: #E6C16A; letter-spacing: 2px; }
        .payment-box .p-name { font-size: 12px; opacity: .6; margin-top: 4px; }

        /* Footer */
        .footer { background: #0a1f14; color: rgba(255,255,255,.5); padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
        .footer .brand { color: #E6C16A; font-weight: 900; font-size: 13px; }

        /* Print button */
        .print-btn { position: fixed; bottom: 30px; right: 30px; background: #1B5E4B; color: #fff; border: none; border-radius: 50px; padding: 14px 28px; font-size: 15px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,.2); z-index: 999; display: flex; align-items: center; gap: 8px; }
        .print-btn:hover { background: #2E7D68; }
      `}</style>

      <button className="print-btn no-print" onClick={() => window.print()}>
        🖨️ Print / Save PDF
      </button>

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="logo-row">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="logo-mark">ت</div>
              <div className="logo-text">
                <h1>تسويقات · Tasweeqat</h1>
                <p>Website &amp; Digital Marketing Solutions</p>
              </div>
            </div>
            <div className="doc-info">
              <div className="doc-title">Quotation</div>
              <div className="doc-num"># {qNum(crm.id)}</div>
              <div className="doc-date">{today()}</div>
            </div>
          </div>
          <hr className="divider" />
          <div className="header-bottom">
            <div className="to-block">
              <div className="to-label">Prepared for</div>
              <div className="client-name">{crm.lead.businessName}</div>
              <div className="client-meta">
                {[crm.lead.city, crm.lead.category, crm.lead.phone].filter(Boolean).join(" · ")}
              </div>
              {crm.contactPerson && (
                <div className="client-meta" style={{ marginTop: 4 }}>Attn: {crm.contactPerson}</div>
              )}
            </div>
            <div className="validity">
              <div className="v-label">Valid for</div>
              <div className="v-val">30 Days</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="body">

          {/* Services table */}
          <div className="section-title">Services &amp; Pricing</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Service</th>
                <th>Description</th>
                <th style={{ textAlign: "right", width: "120px" }}>Price (SAR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="item-name">Professional Website</div>
                  <div className="item-desc">Custom design, mobile-responsive, Arabic &amp; English</div>
                </td>
                <td>
                  <div className="item-desc">
                    {pages.length > 0 ? `${pages.length} pages · ` : ""}
                    Delivery within 7 business days · 2 rounds of revisions
                  </div>
                </td>
                <td style={{ textAlign: "right", fontWeight: 800 }}>{crm.agreedPrice.toLocaleString()}</td>
              </tr>
              {crm.hostingActive && (
                <tr>
                  <td>
                    <div className="item-name">Web Hosting &amp; Domain</div>
                    <div className="item-desc">Monthly hosting plan · SSL included</div>
                  </td>
                  <td><div className="item-desc">Recurring monthly · Cancel anytime</div></td>
                  <td style={{ textAlign: "right", fontWeight: 800 }}>{crm.monthlyFee}/mo</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="totals">
            <div className="total-row">
              <span className="label">Website Development</span>
              <span>{crm.agreedPrice.toLocaleString()} SAR</span>
            </div>
            {crm.hostingActive && (
              <div className="total-row">
                <span className="label">Monthly Hosting</span>
                <span>{crm.monthlyFee} SAR/mo</span>
              </div>
            )}
            <div className="total-row">
              <span className="label">Total Due Now</span>
              <span>{crm.agreedPrice.toLocaleString()} SAR</span>
            </div>
          </div>

          {/* Pages */}
          {pages.length > 0 && (
            <>
              <div className="section-title">Included Pages</div>
              <div className="pages-grid">
                {pages.map((p: string, i: number) => <div key={i} className="page-chip">✓ {p}</div>)}
              </div>
            </>
          )}

          {/* Requirements */}
          {crm.requirements && (
            <>
              <div className="section-title">Client Requirements</div>
              <div className="req-box">{crm.requirements}</div>
            </>
          )}

          {/* Payment */}
          <div className="section-title">Payment Details</div>
          <div className="payment-box">
            <div className="p-label">Bank Transfer · IBAN</div>
            <div className="p-val">SA-- ---- ---- ---- ---- --</div>
            <div className="p-name">Tasweeqat Company · To be updated</div>
          </div>

          {/* Terms */}
          <div className="section-title">Terms &amp; Conditions</div>
          <div className="terms">
            <ul>
              <li>50% deposit required to start the project; remaining 50% upon delivery.</li>
              <li>Quotation valid for 30 days from the date above.</li>
              <li>Project includes 2 rounds of revisions. Additional changes billed separately.</li>
              <li>Hosting fee of {crm.monthlyFee} SAR/month is billed monthly after website launch.</li>
              <li>Client is responsible for providing content (text, images, logo) within 3 business days.</li>
              <li>Tasweeqat retains the right to display the project in its portfolio.</li>
            </ul>
          </div>

          {/* Signature */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 40 }}>Client Signature &amp; Date</div>
              <div style={{ borderTop: "2px solid #ddd", paddingTop: 8, fontSize: 12, color: "#aaa" }}>Signature</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 40 }}>Authorized by Tasweeqat</div>
              <div style={{ borderTop: "2px solid #ddd", paddingTop: 8, fontSize: 12, color: "#aaa" }}>Abdullah Al-Asiri</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span className="brand">تسويقات · Tasweeqat</span>
          <span>tasweeqat.com · hello@tasweeqat.com</span>
          <span>Quotation {qNum(crm.id)}</span>
        </div>
      </div>
    </>
  );
}
