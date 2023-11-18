import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

export const config = {
  runtime: "edge",
};

// Quota should be 40 spots per piece, 10 pieces per user, won't run out of uploadthing free tier until 40 users
export const pFileRouter = {
  audioUploader: f({ audio: { maxFileSize: "512KB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(({}) => {
      // console.log("Upload complete for userId:", metadata.userId);
      //
      // console.log("file url", file.url);
    }),
  imageUploader: f({ image: { maxFileSize: "512KB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(({}) => {
      // console.log("Upload complete for userId:", metadata.userId);
      //
      // console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type PFileRouter = typeof pFileRouter;
