import { createNextRouteHandler } from "uploadthing/next";

import { pFileRouter } from "./core";

export const config = {
  runtime: "edge",
};

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: pFileRouter,
});
