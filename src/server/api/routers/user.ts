import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { updateUserData } from "~/lib/validators/user";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { credentials, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  updateUserInfo: protectedProcedure
    .input(updateUserData)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          name: input.name,
          email: input.email,
        })
        .where(eq(users.id, ctx.session.user?.id))
        .returning({
          name: users.name,
          email: users.email,
        });
    }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user?.id),
    });
    if (!user) {
      throw new TRPCError({
        message: "User does not exist",
        code: "BAD_REQUEST",
      });
    }
    return {
      name: user.name,
      email: user.email,
    };
  }),
  getPasskeyCount: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user?.id),
    });
    if (!user) {
      throw new TRPCError({
        message: "User does not exist",
        code: "BAD_REQUEST",
      });
    }

    return await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(credentials)
      .where(eq(credentials.userId, user.id));
  }),
  deletePasskeys: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user?.id),
    });
    if (!user) {
      throw new TRPCError({
        message: "User does not exist",
        code: "BAD_REQUEST",
      });
    }

    await ctx.db.delete(credentials).where(eq(credentials.userId, user.id));
  }),
});
