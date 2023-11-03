import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

export const pFileRouter = {
  audioUploader: f({ audio: { maxFileSize: "2MB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      // TODO: implement some kind of max quota
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type PFileRouter = typeof pFileRouter;
