import Image from "next/image";
import React from "react";
import PhotoCard from "./PhotoCard";

export default function PhotosGrid({ photos, comments }: { photos: any[]; comments: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          comment={comments.filter((comment) => comment.photoId === photo.id)} // Filter comments for each photo
        />
      ))}
    </div>
  );
}
