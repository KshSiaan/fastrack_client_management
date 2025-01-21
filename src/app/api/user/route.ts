import connectdb from "@/lib/db";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Parse request body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { username, password } = requestBody;

  // Validate input
  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectdb();

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Compare password (plain-text for now, hashing to be implemented later)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Respond with success message (token and hashing can be added later)
    return NextResponse.json(
      { message: "User authenticated successfully", username: user.username },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error authenticating user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
