import axios from "axios";

export async function addPhoto(url: string, caption?: string) {
  try {
    const response = await axios.post("/api/addphoto", {
      url,
      caption,
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export async function addComment(photoId: string, text: string) {
  try {
    const response = await axios.post("/api/addcomment", {
      photoId,
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Comment on Photo failed:", error);
    throw error;
  }
}