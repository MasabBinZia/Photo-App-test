import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export async function fetchPhotos() {
  try {
    console.log("Fetching photos...");

    const photos = await prisma.photo.findMany({
      include: {
        user: true,
        comments: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`Fetched ${photos.length} photos successfully`);

    return photos;
  } catch (error) {
    console.error("Failed to fetch photos:", {
      errorName: error instanceof Error ? error.name : "Unknown Error",
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
    });

    throw new Error("Unable to retrieve photos. Please try again later.");
  }
}



export async function fetchComments() {
  try {
    console.log("Fetching comments...");

    const comments = await prisma.comment.findMany({
      include: {
        user: true, // Include user details for each comment
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`Fetched ${comments.length} comments successfully`);

    return comments;
  } catch (error) {
    console.error("Failed to fetch comments:", {
      errorName: error instanceof Error ? error.name : "Unknown Error",
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
    });

    throw new Error("Unable to retrieve comments. Please try again later.");
  }
}

