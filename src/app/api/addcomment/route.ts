import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Get the current session
  const session = await auth();

  // If no session exists, return unauthorized
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

    // Parse the request body
    const { photoId, text } = await request.json();

    // Validate input
    if (!photoId) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Comment text cannot be empty" },
        { status: 400 }
      );
    }

    // Create comment using the retrieved user ID
    const comment = await prisma.comment.create({
      data: {
        photoId,
        text: text.trim(),
        userId: user.id // Use the ID retrieved from the database
      }
    });

    return NextResponse.json(comment, { status: 201 });

  } catch (error:any) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to Comment on Photo", details: error.message },
      { status: 500 }
    );
  }
}