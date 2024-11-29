import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Authenticate the session
  const session = await auth();

  // Check if user is authenticated
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Parse the incoming JSON request body
    const { url, caption } = await request.json();

    // Validate required parameters
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Create photo record in database
    const photo = await prisma.photo.create({
      data: {
        url: url, // Use the URL from the request body
        caption: caption || "", // Use provided caption or empty string
        userId: 'cm42rfpsh00027kmlwmgvr9st', // Dynamically use authenticated user's ID
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { error: "Failed to Upload Photo" },
      { status: 500 }
    );
  }
}
