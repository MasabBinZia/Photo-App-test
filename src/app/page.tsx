import Header from "@/components/Header";
import UploadImg from "@/components/UploadImg";
import React from "react";
import { fetchComments, fetchPhotos } from "./api/fetcherFuntions";
import PhotosGrid from "@/components/PhotosGrid";

export default async function Home() {
  const photos = await fetchPhotos();
  const comments = await fetchComments();

  return (
    <main>
      <Header />
      <UploadImg />
      <PhotosGrid photos={photos} comments={comments} />
    </main>
  );
}
