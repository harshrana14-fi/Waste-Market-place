import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    const stats = await db.getUserStats(userId);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
