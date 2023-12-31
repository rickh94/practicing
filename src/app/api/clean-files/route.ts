import { client } from "~/server/db";
import { utapi } from "~/server/uploadthing";

export const runtime = "edge";

export async function GET() {
  if (!process.env.VERCEL || process.env.CI) {
    return new Response("not allowed", { status: 403 });
  }
  const ufFilesPromise = utapi.listFiles();
  const spotRecordUrls = await client.execute(
    'SELECT audioPromptUrl, imagePromptUrl from spot WHERE audioprompturl LIKE "%utfs.io%" OR imageprompturl LIKE "%utfs.io%"',
  );
  if (spotRecordUrls.rows.length === 0) {
    return new Response("no spot records found", { status: 404 });
  }
  const keepingKeys = [];
  for (const row of spotRecordUrls.rows) {
    const { audioPromptUrl, imagePromptUrl } = row;
    if (audioPromptUrl && typeof audioPromptUrl === "string") {
      const parts = audioPromptUrl.split("/");
      if (parts.length !== 5) {
        console.log("malformed utfs url", audioPromptUrl);
        return new Response("malformed utfs url", { status: 500 });
      } else {
        keepingKeys.push(parts[4]);
      }
    }
    if (imagePromptUrl && typeof imagePromptUrl === "string") {
      const parts = imagePromptUrl.split("/");
      if (parts.length !== 5) {
        console.log("malformed utfs url", imagePromptUrl);
        return new Response("malformed utfs url", { status: 500 });
      } else {
        keepingKeys.push(parts[4]);
      }
    }
  }
  const ufFilesList = await ufFilesPromise;
  const deleteFilesList = [];
  for (const file of ufFilesList) {
    if (!keepingKeys.includes(file.key)) {
      deleteFilesList.push(file.key);
    }
  }
  await utapi.deleteFiles(deleteFilesList);
  return new Response(JSON.stringify({ deleteFilesList }), { status: 200 });
}
