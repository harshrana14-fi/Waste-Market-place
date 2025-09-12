import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const credits = await prisma.greenCredit.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(credits);
}

export async function POST(req: NextRequest) {
  const { transactionId, amount, metadata } = await req.json();
  const credit = await prisma.greenCredit.create({ data: { transactionId, amount, metadata } });
  return NextResponse.json(credit, { status: 201 });
}


