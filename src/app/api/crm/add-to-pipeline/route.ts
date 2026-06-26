import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ leadId: z.string() });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { leadId } = parsed.data;

  // Check lead exists and is not already in pipeline
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (lead.pipelineStage) return NextResponse.json({ error: "Already in pipeline" }, { status: 409 });

  // Create CRM record and update lead in a transaction
  const [crmRecord] = await prisma.$transaction([
    prisma.crmRecord.create({
      data: {
        leadId,
        stage:      "contact",
        assignedId: session.user.id,
      },
    }),
    prisma.lead.update({
      where: { id: leadId },
      data:  { pipelineStage: "contact" },
    }),
    prisma.activity.create({
      data: {
        leadId,
        userId:      session.user.id,
        type:        "stage_change",
        description: `Added to pipeline by ${session.user.name || session.user.email}`,
      },
    }),
  ]);

  return NextResponse.json({ success: true, crmRecord });
}
