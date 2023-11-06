import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { updateUserData } from "~/lib/validators/user";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { credentials, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  updateUserInfo: protectedProcedure
    .input(updateUserData)
    .mutation(async ({ ctx, input }) => {
      const oldUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, ctx.session.user?.id),
        columns: {
          email: true,
          emailVerified: true,
        },
      });
      if (!oldUser) {
        throw new TRPCError({
          message: "User does not exist",
          code: "BAD_REQUEST",
        });
      }
      let emailVerified = oldUser.emailVerified;
      if (input.email !== oldUser.email) {
        emailVerified = null;
      }
      return await ctx.db
        .update(users)
        .set({
          name: input.name,
          email: input.email,
          emailVerified: emailVerified,
        })
        .where(eq(users.id, ctx.session.user?.id))
        .returning({
          name: users.name,
          email: users.email,
          emailVerified: users.emailVerified,
        });
    }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.session.user?.id);
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
