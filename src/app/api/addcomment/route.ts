import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  // Check if user is authenticated
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Parse the incoming JSON request body
    const { photoId, text } = await request.json();

    // Validate required parameters
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

    const comment = await prisma.comment.create({
      data: {
        photoId,
        text: text.trim(),
        userId:"cm42rfpsh00027kmlwmgvr9st", // Use dynamic user ID
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to Comment on Photo" },
      { status: 500 }
    );
  }
}
