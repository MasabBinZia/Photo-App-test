"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import AddComment from "./AddComment";
import { useState } from "react";

export default function PhotoCard({
  photo,
  comment,
}: {
  photo: any;
  comment: any;
}) {
  const [comments, setComments] = useState(photo.comments);

  const handleNewComment = (newComment: any) => {
    setComments((prevComments: any) => [newComment, ...prevComments]);
  };

  return (
    <div key={photo.id} className="border p-2 rounded">
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={photo.url}
            alt={photo.caption || "Uploaded photo"}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded cursor-pointer"
          />
        </DialogTrigger>

        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{photo.caption || "Photo Details"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Image
              src={photo.url}
              alt={photo.caption || "Uploaded photo"}
              width={300}
              height={300}
              className="w-full object-cover rounded mb-4"
            />

            <ScrollArea className="w-full h-48 border-t pt-2">
              {comments.length > 0 ? (
                comments.map((comment: any) => (
                  <div key={comment.id} className="text-sm mb-2">
                    <strong>{comment.user.name}</strong>: {comment.text}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center font-bold">
                  No comments yet.
                </p>
              )}
            </ScrollArea>
          </div>
          <AddComment photoId={photo.id} onNewComment={handleNewComment} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
