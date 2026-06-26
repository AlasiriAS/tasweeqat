import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// GET /api/crm  → all CRM records with lead info (for kanban)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const records = await prisma.crmRecord.findMany({
    include: {
      lead:     true,
      assigned: { select: { id: true, name: true } },
      notes:    { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(records);
}

const updateSchema = z.object({
  id:             z.string(),
  stage:          z.string().optional(),
  agreedPrice:    z.number().optional(),
  hostingActive:  z.boolean().optional(),
  upsellServices: z.array(z.string()).optional(),
  note:           z.string().optional(),
});

// PATCH /api/crm  → update stage or fields
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { id, note, upsellServices, ...fields } = parsed.data;

  const record = await prisma.crmRecord.findUnique({ where: { id }, include: { lead: true } });
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updateData: any = { ...fields };
  if (upsellServices !== undefined) updateData.upsellServices = JSON.stringify(upsellServices);

  const ops: any[] = [
    prisma.crmRecord.update({ where: { id }, data: updateData }),
  ];

  // If stage changed, update lead + log activity
  if (fields.stage && fields.stage !== record.stage) {
    ops.push(
      prisma.lead.update({
        where: { id: record.leadId },
        data:  { pipelineStage: fields.stage },
      }),
      prisma.activity.create({
        data: {
          leadId:      record.leadId,
          userId:      session.user.id,
          type:        "stage_change",
          description: `Stage: ${record.stage} → ${fields.stage}`,
        },
      })
    );
  }

  if (note) {
    ops.push(
      prisma.crmNote.create({
        data: {
          crmRecordId: id,
          authorId:    session.user.id,
          content:     note,
        },
      })
    );
  }

  await prisma.$transaction(ops);
  const updated = await prisma.crmRecord.findUnique({
    where:   { id },
    include: { lead: true, notes: { orderBy: { createdAt: "desc" }, take: 3 }, assigned: { select: { id: true, name: true } } },
  });

  return NextResponse.json(updated);
}
