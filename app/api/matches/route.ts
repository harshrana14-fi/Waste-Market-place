import { NextRequest, NextResponse } from "next/server";
import { rankRecyclers } from "@/lib/ai-matching";

export async function POST(req: NextRequest) {
  const { waste, recyclers } = await req.json();
  const ranked = rankRecyclers(waste, recyclers || []);
  return NextResponse.json({ matches: ranked });
}


