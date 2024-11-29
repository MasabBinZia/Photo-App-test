import React from "react";
import { fetchPhotos } from "../api/fetcherFuntions";
import Image from "next/image";

export default async function page() {
  const photos = await fetchPhotos();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {photos.map((photo) => (
        <div key={photo.id} className="border p-2 rounded">
          <Image
            src={photo.url}
            alt={photo.caption || "Uploaded photo"}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded"
          />

          <div className="mt-2">
            {photo.comments.map((comment: any) => (
              <div key={comment.id} className="text-sm mb-1">
                <strong>{comment.user.name}</strong>: {comment.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
