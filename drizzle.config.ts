import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

// @ts-ignore
export default {
  schema: "./src/server/db/schema.ts",
  driver: "libsql",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
