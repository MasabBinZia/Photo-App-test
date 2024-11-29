import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
// import { auth } from "../auth"

const f = createUploadthing()

export const ourFileRouter = {
  photoUploader: f({ 
    image: { 
      maxFileSize: "4MB", 
      maxFileCount: 1 
    } 
  })
    .middleware(async () => {
      // const session = await auth()
      
      // if (!session?.user) {
      //   throw new UploadThingError("Must be logged in")
      // }
      
      return { userId: '1' }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter