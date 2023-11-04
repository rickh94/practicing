import { z } from "zod";

export const updateUserData = z.object({
  name: z.string(),
  email: z.string().email(),
});

type UserInfo = z.infer<typeof updateUserData>;
