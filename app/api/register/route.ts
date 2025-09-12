import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { company, email, password, role } = await req.json();
  if (!company || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already used" }, { status: 409 });
  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({ data: { company, email, passwordHash, role } });
  return NextResponse.json({ id: user.id, email: user.email, company: user.company, role: user.role }, { status: 201 });
}


