import React from "react";
import PhotoCard from "./PhotoCard";
import { Photo } from "@/types";

// Define types to match previous type definitions

export default function PhotosGrid({
  photos,
}: {
  photos: Photo[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
        />
      ))}
    </div>
  );
}