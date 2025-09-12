import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const item = await prisma.listing.findUnique({ where: { id } });
    return NextResponse.json(item ?? null);
  }
  const type = url.searchParams.get("type") || undefined;
  const where = type ? { type } : {};
  const listings = await prisma.listing.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(listings);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const created = await prisma.listing.create({ data });
  return NextResponse.json(created, { status: 201 });
}


