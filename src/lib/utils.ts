import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSAR(amount: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export const PIPELINE_STAGES = [
  { id: "contact",       label: "Contact & Pitch",     labelAr: "التواصل والعرض",    color: "#3498db" },
  { id: "info_gathering",label: "Info Gathering",       labelAr: "جمع المعلومات",     color: "#e67e22" },
  { id: "building",      label: "Building",             labelAr: "بناء الموقع",       color: "#9b59b6" },
  { id: "review",        label: "Review & Approval",    labelAr: "المراجعة والتأكيد", color: "#1abc9c" },
  { id: "delivered",     label: "Delivered ✓",          labelAr: "تم التسليم ✓",      color: "#27ae60" },
  { id: "upsell",        label: "Upsell Opportunity",   labelAr: "فرصة بيع إضافية",  color: "#e94560" },
];

export const UPSELL_SERVICES = [
  { id: "social_media",  label: "Social Media Management",  labelAr: "إدارة السوشيال ميديا" },
  { id: "seo",           label: "SEO & Search Ranking",     labelAr: "تحسين محركات البحث"   },
  { id: "paid_ads",      label: "Paid Ads (Google/Meta)",   labelAr: "إعلانات مدفوعة"       },
  { id: "crm_system",    label: "CRM System",               labelAr: "نظام إدارة العملاء"   },
  { id: "photography",   label: "Photography Session",      labelAr: "جلسة تصوير احترافية"  },
  { id: "maintenance",   label: "Monthly Maintenance",      labelAr: "صيانة شهرية"          },
  { id: "content",       label: "Content Writing",          labelAr: "كتابة محتوى"          },
];

export const USER_ROLES = [
  { id: "admin",     label: "Admin",            labelAr: "مدير النظام",      color: "#e94560" },
  { id: "manager",   label: "Manager",          labelAr: "مدير",             color: "#9b59b6" },
  { id: "sales",     label: "Sales",            labelAr: "مبيعات",           color: "#3498db" },
  { id: "developer", label: "Developer",        labelAr: "مطور",             color: "#27ae60" },
  { id: "it",        label: "IT",               labelAr: "تقنية المعلومات", color: "#1abc9c" },
  { id: "support",   label: "Customer Support", labelAr: "دعم العملاء",      color: "#f5a623" },
];
