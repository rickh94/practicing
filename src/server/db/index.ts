import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";

import { env } from "~/env.mjs";
import * as schema from "./schema";

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client, { schema });
