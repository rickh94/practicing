import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

export const pFileRouter = {
  audioUploader: f({ audio: { maxFileSize: "2MB" } })
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
  imageUploader: f({ image: { maxFileSize: "2MB" } })
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
