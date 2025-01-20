import connectdb from "@/lib/db";
import Client from "@/model/clientsModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectdb();

    // Count the number of documents in the Client collection
    const clientCount = await Client.countDocuments();

    // Return a JSON response with the count
    return NextResponse.json(
      { message: "Ready to add data", count: clientCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching client count:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
