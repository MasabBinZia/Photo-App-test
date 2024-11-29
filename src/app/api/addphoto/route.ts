import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Get the current session
  const session = await auth();

  // Check if user is authenticated via email
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find the user by matching the email from the session
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true // Only select the ID to optimize the query
      }
    });

    // If no user found, return unauthorized
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse the incoming JSON request body
    const { url, caption } = await request.json();

    // Validate required parameters
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Create photo record in database using the dynamically retrieved user ID
    const photo = await prisma.photo.create({
      data: {
        url: url, // Use the URL from the request body
        caption: caption || "", // Use provided caption or empty string
        userId: user.id, // Use the dynamically retrieved user ID
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error:any) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { error: "Failed to Upload Photo", details: error.message },
      { status: 500 }
    );
  }
}