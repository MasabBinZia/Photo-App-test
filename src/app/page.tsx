import Header from "@/components/Header";
import UploadImg from "@/components/UploadImg";
import React from "react";
import { fetchPhotos } from "./api/fetcherFuntions";
import PhotosGrid from "@/components/PhotosGrid";
import { Photo } from "@/types";

export default async function Home() {
  const photos: Photo[] = await fetchPhotos();

  return (
    <main>
      <Header />
      <UploadImg />
      <PhotosGrid photos={photos} />
    </main>
  );
}
