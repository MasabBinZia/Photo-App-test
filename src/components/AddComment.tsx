"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addComment } from "@/Apis";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  comment: z
    .string()
    .min(2, "Comment is too short")
    .max(100, "Comment is too long"),
});

export type NewComment = {
  id: string;
  text: string;
  user: {
    name: string | null; 
  };
};

export default function AddComment({
  photoId,
  onNewComment,
}: {
  photoId: string;
  onNewComment: (newComment: NewComment) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const newComment = {
        id: `temp-${Date.now()}`,
        text: values.comment,
        user: {
          name: session?.user?.name || "",
        },
      };

      onNewComment(newComment);

      await addComment(photoId, values.comment);

      toast.success("Comment added successfully!");

      form.reset();
    } catch (error) {
      console.error("Failed to add comment:", error);

      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your comment..."
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <p className="flex justify-center items-center gap-1">
              <Loader2 className="animate-spin h-4 w-4" /> Commenting...
            </p>
          ) : (
            "Comment"
          )}
        </Button>
      </form>
    </Form>
  );
}
