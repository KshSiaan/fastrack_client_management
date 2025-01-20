import connectdb from "@/lib/db";
import Client from "@/model/clientsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectdb();

    // Extract the query parameter 'serialNo' from the URL
    const { searchParams } = new URL(request.url);
    const serialNo = searchParams.get("serialNo");

    if (!serialNo) {
      return NextResponse.json(
        { error: "serialNo is required" },
        { status: 400 }
      );
    }

    // Find the client using the 'serialNo'
    const client = await Client.findOne({ serialNo });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Respond with success message
    return NextResponse.json(
      { message: "Client found", client },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error finding client:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { serialNo, ...updateData } = requestBody;

    if (!serialNo) {
      return NextResponse.json(
        { error: "Serial number is required" },
        { status: 400 }
      );
    }

    await connectdb();

    const updatedClient = await Client.findOneAndUpdate(
      { serialNo },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Client updated successfully", client: updatedClient },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
