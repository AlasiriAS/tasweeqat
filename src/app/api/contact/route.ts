import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name:    z.string().max(100).optional().default(""),
  email:   z.string().email().optional().or(z.literal("")).default(""),
  phone:   z.string().min(7).max(20),
  company: z.string().max(100).optional().default(""),
  service: z.string().optional(),
  message: z.string().max(2000).optional().default("طلب تواصل من الموقع"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.contactSubmission.create({
      data: {
        name:    data.name,
        email:   data.email || "",
        phone:   data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        status:  "new",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
}

export async function GET() {
  // Protected - only for internal use via dashboard API
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(submissions);
}
