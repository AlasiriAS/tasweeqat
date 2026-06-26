import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const priority = searchParams.get("priority");
  const city     = searchParams.get("city");
  const status   = searchParams.get("status");
  const search   = searchParams.get("search");
  const take     = parseInt(searchParams.get("take") || "100");

  const where: any = {};
  if (priority) where.priority      = priority;
  if (city)     where.city          = city;
  if (status)   where.websiteStatus = status;
  if (search)   where.businessName  = { contains: search };

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { priorityScore: "desc" },
    take,
  });

  return NextResponse.json(leads);
}

const createSchema = z.object({
  businessName:  z.string().min(1),
  category:      z.string().optional(),
  city:          z.string().optional(),
  phone:         z.string().optional(),
  website:       z.string().optional(),
  websiteStatus: z.enum(["no_website", "social_only", "broken_website", "has_website"]).default("no_website"),
  rating:        z.number().optional(),
  reviewCount:   z.number().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["admin", "manager", "sales"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body   = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const data = parsed.data;

  // Compute priority score
  let score = 0;
  if (data.websiteStatus === "no_website")    score += 40;
  if (data.websiteStatus === "social_only")   score += 35;
  if (data.websiteStatus === "broken_website") score += 25;
  if (data.rating && data.rating < 4)         score += 10;
  if (data.reviewCount && data.reviewCount > 10) score += 10;
  if (data.phone)                             score += 5;

  const priority = score >= 50 ? "high" : score >= 30 ? "medium" : "low";

  const lead = await prisma.lead.create({
    data: { ...data, priorityScore: score, priority },
  });

  return NextResponse.json(lead, { status: 201 });
}
