import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {

    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { company, email, password, role } = body;

    // Validate required fields
    if (!company?.trim()) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password?.trim()) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }
    if (!role?.trim()) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Validate role
    const validRoles = ['producer', 'recycler', 'corporate'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role selected" }, { status: 400 });
    }
    
    // Check for existing user
    try {
      const existing = await db.findUserByEmail(email);
      if (existing) {
        return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return NextResponse.json({ error: "Error checking user existence" }, { status: 500 });
    }
    
    // Create new user
    try {
      const user = await db.createUser({ company, email, password, role });
      return NextResponse.json({ 
        id: user._id.toString(), 
        email: user.email, 
        company: user.company, 
        role: user.role 
      }, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 });
    }

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      error: "An unexpected error occurred during registration. Please try again." 
    }, { status: 500 });
  }
}


