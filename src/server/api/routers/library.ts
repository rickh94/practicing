import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import {
  createPieceData,
  pieceForList,
  pieceWithSpots,
} from "~/lib/validators/library";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pieces } from "~/server/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const libraryRouter = createTRPCRouter({
  createPiece: protectedProcedure
    .input(createPieceData)
    .output(z.array(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(pieces)
        .values({
          title: input.title,
          description: input.description,
          composer: input.composer,
          recordingLink: input.recordingLink,
          practiceNotes: input.practiceNotes,
          userId: ctx.session.user.id,
          lastPracticed: new Date(),
        })
        .returning({
          id: pieces.id,
        });
    }),
  getPieceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(pieceWithSpots)
    .query(async ({ ctx, input }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: and(
          eq(pieces.id, input.id),
          eq(pieces.userId, ctx.session.user.id),
        ),
        with: { spots: true },
        columns: {
          userId: false,
        },
      });
      if (!piece) {
        throw new TRPCError({
          message: "Piece does not exist",
          code: "NOT_FOUND",
        });
      }
      return piece;
    }),

  getRecentPieces: protectedProcedure
    .input(z.object({ limit: z.number().default(5) }).optional())
    .output(z.array(pieceForList))
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 5;
      const recentPieces = await ctx.db.query.pieces.findMany({
        where: eq(pieces.userId, ctx.session.user.id),
        orderBy: desc(pieces.lastPracticed),
        limit: limit,
        columns: {
          userId: false,
          practiceNotes: false,
          recordingLink: false,
        },
        with: {
          spots: true,
        },
      });
      return recentPieces;
    }),

  getPaginatedPieces: protectedProcedure
    .input(
      z
        .object({
          perPage: z.number().default(12),
          page: z.number().default(1),
        })
        .optional(),
    )
    .output(z.array(pieceForList))
    .query(async ({ ctx, input }) => {
      const limit = input?.perPage ?? 12;
      const offset = ((input?.page ?? 1) - 1) * limit;
      return ctx.db.query.pieces.findMany({
        where: eq(pieces.userId, ctx.session.user.id),
        orderBy: desc(pieces.lastPracticed),
        limit,
        offset,
        columns: {
          userId: false,
          practiceNotes: false,
          recordingLink: false,
        },
        with: {
          spots: true,
        },
      });
    }),
  getPiecePages: protectedProcedure
    .input(
      z
        .object({
          perPage: z.number().default(12),
        })
        .optional(),
    )
    .output(
      z.object({
        totalPages: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.perPage ?? 12;
      const result = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(pieces);
      if (!result?.[0]) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return { totalPages: Math.ceil(result[0].count / limit) };
    }),
});
