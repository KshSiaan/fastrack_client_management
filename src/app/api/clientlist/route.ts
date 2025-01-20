import connectdb from "@/lib/db";
import Client from "@/model/clientsModel";
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
  try {
    // Connect to the database
    await connectdb();

    const client = await Client.create(requestBody);
    return NextResponse.json(
      { message: `${client.clientName} Successfully added to database` },
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

export async function GET() {
  try {
    // Connect to the database
    await connectdb();

    const client = await Client.find();
    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    console.error("Error authenticating user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
