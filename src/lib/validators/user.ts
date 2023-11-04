import { z } from "zod";

export const updateUserData = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type UserInfo = z.infer<typeof updateUserData>;
