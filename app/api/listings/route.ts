import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";
import connectDB from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const ownerId = url.searchParams.get("ownerId");
    const type = url.searchParams.get("type");
    const location = url.searchParams.get("location");
    const search = url.searchParams.get("search");
    
    // Get single listing
    if (id) {
      const item = await db.findListingById(id);
      if (!item) {
        return NextResponse.json({ error: "Listing not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    // Get user's listings
    if (ownerId) {
      const listings = await db.findListingsByOwner(ownerId);
      return NextResponse.json(listings);
    }
    
    // Build filters for marketplace search
    const filters: Record<string, any> = {};
    if (type) filters.type = type;
    if (location) filters.location = { $regex: location, $options: 'i' };
    if (search) {
      filters.$or = [
        { type: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const listings = await db.findListings(filters);
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Ensure database connection
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ 
        error: "Database connection failed. Please try again later." 
      }, { status: 503 });
    }

    // Parse request body
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      return NextResponse.json({ 
        error: "Invalid request format" 
      }, { status: 400 });
    }

    // Basic validation
    const { type, volume, location, ownerId } = data;
    
    // Validate required fields
    if (!type?.trim()) {
      return NextResponse.json({ error: "Waste type is required" }, { status: 400 });
    }
    if (!volume?.trim()) {
      return NextResponse.json({ error: "Volume is required" }, { status: 400 });
    }
    if (!location?.trim()) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }
    if (!ownerId) {
      return NextResponse.json({ error: "User must be logged in" }, { status: 401 });
    }
    if (!type || !volume || !location || !ownerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if owner exists
    const owner = await db.findUserById(ownerId);
    if (!owner) {
      return NextResponse.json({ error: "Invalid owner ID" }, { status: 400 });
    }

    const created = await db.createListing(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Create listing error:', error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}


