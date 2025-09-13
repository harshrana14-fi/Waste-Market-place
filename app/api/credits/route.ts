import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    const credits = await db.findGreenCredits();
    return NextResponse.json(credits);
  } catch (error) {
    console.error('Get credits error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { transactionId, amount, metadata } = await req.json();
    const credit = await db.createGreenCredit({ transactionId, amount, metadata });
    return NextResponse.json(credit, { status: 201 });
  } catch (error) {
    console.error('Create credit error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


