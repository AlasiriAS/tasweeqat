import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// ── Priority scoring (matches original logic) ────────────────────────────────
function calcPriority(row: any): { score: number; priority: string; websiteStatus: string } {
  const site = String(row.website || row.site || "").trim().toLowerCase();
  let websiteStatus = "no_website";
  let score = 0;

  if (!site || site === "nan" || site === "undefined" || site === "") {
    websiteStatus = "no_website"; score += 40;
  } else if (site.includes("instagram") || site.includes("facebook") || site.includes("twitter")) {
    websiteStatus = "social_only"; score += 35;
  } else if (/^\d{1,3}\.\d{1,3}/.test(site)) {
    websiteStatus = "broken_website"; score += 30;
  } else {
    websiteStatus = "has_website"; score += 5;
  }

  const reviews = parseInt(row.reviews || row.reviewCount || row.review_count || "0") || 0;
  if (reviews >= 10  && reviews < 50)   score += 20;
  else if (reviews >= 50  && reviews < 200)  score += 15;
  else if (reviews >= 200 && reviews < 1000) score += 8;
  else if (reviews >= 1000) score += 2;

  const rating = parseFloat(row.rating || "0") || 0;
  if (rating >= 3.5 && rating <= 4.8) score += 10;

  const phone = String(row.phone || row.Phone || "").trim();
  if (phone && phone !== "nan") score += 5;

  const priority = score >= 60 ? "high" : score >= 40 ? "medium" : "low";
  return { score, priority, websiteStatus };
}

function normalizeCity(raw: string): string {
  const c = String(raw || "").trim().toLowerCase();
  if (c.includes("dammam") || c.includes("دمام") || c.includes("fahid")) return "الدمام";
  if (c.includes("khobar") || c.includes("خبر") || c.includes("aqrabia") || c.includes("عقربية")) return "الخبر";
  if (c.includes("saihat") || c.includes("سيهات")) return "سيهات";
  if (c.includes("anak") || c.includes("عنك")) return "عنك";
  if (c.includes("dhahran") || c.includes("ظهران")) return "الظهران";
  return raw || "Unknown";
}

function generatePresaleInfo(row: any, websiteStatus: string): string {
  const cat = String(row.category || row.type || "").toLowerCase();
  if (websiteStatus === "no_website") {
    if (cat.includes("restaurant") || cat.includes("مطعم"))
      return "معظم العملاء يبحثون عن المطاعم على جوجل قبل الزيارة. موقع احترافي مع قائمة الطعام والصور يضاعف حجوزاتك.";
    if (cat.includes("barber") || cat.includes("حلاقة"))
      return "معظم عملاء الحلاقة يحجزون مواعيد عبر الإنترنت. موقع بنظام حجز بسيط يوفر وقتك ويزيد عدد العملاء.";
    if (cat.includes("clinic") || cat.includes("عيادة") || cat.includes("doctor"))
      return "العيادات الطبية التي لديها موقع تحصل على 3 أضعاف المرضى. أضف خدمة الحجز الإلكتروني وزد ثقة المرضى.";
    return "المنافسون لديهم مواقع إلكترونية وأنت لا. كل يوم بدون موقع = عملاء يذهبون لغيرك.";
  }
  if (websiteStatus === "social_only")
    return "إنستغرام وحده لا يكفي — العملاء الجادون يبحثون على جوجل. موقع احترافي يُظهرك في نتائج البحث ويبني الثقة.";
  return "موقعك الحالي قديم. تصميم عصري يرفع معدل تحويل الزوار لعملاء بنسبة تصل إلى 200%.";
}

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const adminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@2024!", 12);
  await prisma.user.upsert({
    where: { email: "admin@tasweeqat.com" },
    update: {},
    create: {
      name:     "Abdullah — Admin",
      email:    "admin@tasweeqat.com",
      password: adminPass,
      role:     "admin",
    },
  });

  // Sample team members
  const sampleUsers = [
    { name: "Sara Al-Qahtani", email: "sara@tasweeqat.com",   role: "manager"   },
    { name: "Ahmed Al-Ghamdi", email: "ahmed@tasweeqat.com",  role: "sales"     },
    { name: "Noor Al-Harbi",   email: "noor@tasweeqat.com",   role: "sales"     },
    { name: "Khalid Dev",      email: "khalid@tasweeqat.com", role: "developer" },
  ];
  for (const u of sampleUsers) {
    const pw = await bcrypt.hash("Team@2024!", 12);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: pw },
    });
  }
  console.log("✅ Users created");

  // ── Import leads from Excel files ───────────────────────────────────────────
  const xlsxDir = path.resolve(__dirname, "..");
  const files = fs.readdirSync(xlsxDir).filter(f => f.endsWith(".xlsx"));

  const seenNames = new Set<string>();
  let total = 0;

  for (const file of files) {
    const wb = XLSX.readFile(path.join(xlsxDir, file));
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

    for (const row of rows) {
      const name = String(row.title || row.name || row.businessName || "").trim();
      if (!name || seenNames.has(name)) continue;

      const phone = String(row.phone || row.Phone || "").trim();
      const rawSite = String(row.website || row.site || row.Website || "").trim();
      const city = normalizeCity(String(row.city || row.City || row.address || ""));

      // Skip uncontactable
      if (!phone && (!rawSite || rawSite === "nan")) continue;

      seenNames.add(name);
      const { score, priority, websiteStatus } = calcPriority(row);
      const presaleInfo = generatePresaleInfo(row, websiteStatus);

      try {
        await prisma.lead.upsert({
          where: { id: `lead_${name.replace(/\s+/g, "_").substring(0, 30)}` },
          update: {},
          create: {
            id:            `lead_${name.replace(/\s+/g, "_").substring(0, 30)}`,
            businessName:  name,
            category:      String(row.category || row.type || row.Category || ""),
            city,
            phone:         phone !== "nan" ? phone : null,
            website:       rawSite && rawSite !== "nan" ? rawSite : null,
            websiteStatus,
            rating:        parseFloat(row.rating || "0") || null,
            reviewCount:   parseInt(row.reviews || row.reviewCount || "0") || null,
            googleMapsUrl: String(row.url || row.maps_url || row.googleMapsUrl || ""),
            priorityScore: score,
            priority,
            presaleInfo,
          },
        });
        total++;
      } catch {
        // skip duplicate IDs
      }
    }
  }

  console.log(`✅ ${total} leads imported`);

  // ── Sample CRM clients (first 5 high-priority leads) ────────────────────────
  const highLeads = await prisma.lead.findMany({
    where: { priority: "high", websiteStatus: "no_website" },
    take: 5,
  });

  for (const lead of highLeads) {
    await prisma.lead.update({
      where: { id: lead.id },
      data: { pipelineStage: "contact" },
    });
    await prisma.crmRecord.upsert({
      where: { leadId: lead.id },
      update: {},
      create: {
        leadId:       lead.id,
        stage:        "contact",
        agreedPrice:  2000,
        internalNotes: "Lead added to pipeline — follow up this week",
      },
    });
  }

  console.log("✅ Sample CRM records created");
  console.log("\n🎉 Seed complete!");
  console.log("📧 Admin login: admin@tasweeqat.com");
  console.log("🔑 Password:   Admin@2024!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
