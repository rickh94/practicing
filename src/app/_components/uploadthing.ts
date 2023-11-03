import { generateComponents } from "@uploadthing/react";

import type { PFileRouter } from "~/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<PFileRouter>();
