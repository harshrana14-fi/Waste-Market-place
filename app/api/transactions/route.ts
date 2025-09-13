import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recyclerId = url.searchParams.get("recyclerId");
    const producerId = url.searchParams.get("producerId");
    
    const filters: any = {};
    if (recyclerId) filters.recycler = recyclerId;
    if (producerId) filters.producer = producerId;
    
    const transactions = await db.findTransactions(filters);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await db.createTransaction(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
