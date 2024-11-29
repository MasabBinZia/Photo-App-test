"use client";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { addPhoto } from "@/Apis";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import "@uploadthing/react/styles.css";

export default function UploadImg() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl text-center my-4">Pls Sign to Use the App</h1>
        <Button
          onClick={() => signIn()}
          className="h-14 w-1/2 text-xl font-bold"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 flex justify-center items-center  my-10">
      <UploadButton
        endpoint="photoUploader"
        onClientUploadComplete={async (res) => {
          console.log(res);
          console.log("Upload complete");
          console.log(res[0].url);

          await addPhoto(res[0].url, "My photo caption");
          router.refresh();

          console.log("added to Db");
        }}
        onUploadError={(error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </main>
  );
}
