import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import {
  basicSpotWithPrompts,
  createPieceData,
  pieceForList,
  pieceWithSpots,
  spotWithPromptsAndPieceTitle,
} from "~/lib/validators/library";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  audioPrompts,
  notesPrompts,
  pieces,
  spots,
  textPrompts,
} from "~/server/db/schema";
import { eq, and, desc } from "drizzle-orm";

// TODO: implement quota
export const libraryRouter = createTRPCRouter({
  createPiece: protectedProcedure
    .input(createPieceData)
    .output(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const [piece] = await tx
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
        if (!piece) {
          throw new TRPCError({
            message: "Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        for (const spot of input.spots) {
          let audioPromptId,
            textPromptId,
            notesPromptId = null;
          if (spot.audioPrompt) {
            const [result] = await tx
              .insert(audioPrompts)
              .values({
                description: spot.audioPrompt.description,
                url: spot.audioPrompt.url,
              })
              .returning({ id: audioPrompts.id });
            if (!result) {
              throw new TRPCError({
                message: "Something went wrong",
                code: "INTERNAL_SERVER_ERROR",
              });
            }
            audioPromptId = result.id;
          }
          if (spot.textPrompt) {
            const [result] = await tx
              .insert(textPrompts)
              .values({
                description: spot.textPrompt.description,
                text: spot.textPrompt.text,
              })
              .returning({ id: textPrompts.id });
            if (!result) {
              throw new TRPCError({
                message: "Something went wrong",
                code: "INTERNAL_SERVER_ERROR",
              });
            }
            textPromptId = result.id;
          }

          if (spot.notesPrompt) {
            const [result] = await tx
              .insert(notesPrompts)
              .values({
                description: spot.notesPrompt.description,
                notes: spot.notesPrompt.notes,
              })
              .returning({ id: notesPrompts.id });
            if (!result) {
              throw new TRPCError({
                message: "Something went wrong",
                code: "INTERNAL_SERVER_ERROR",
              });
            }
            notesPromptId = result.id;
          }
          await tx.insert(spots).values({
            name: spot.name,
            order: spot.order,
            stage: spot.stage,
            measures: spot.measures,
            pieceId: piece.id,
            audioPromptId,
            textPromptId,
            notesPromptId,
          });
        }
        return piece;
      });
      return result;
    }),
  getPieceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(pieceWithSpots.nullable())
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
        return null;
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

  getSpotById: protectedProcedure
    .input(z.object({ spotId: z.string(), pieceId: z.string() }))
    .output(spotWithPromptsAndPieceTitle.nullable())
    .query(async ({ ctx, input }) => {
      const spot = await ctx.db.query.spots.findFirst({
        where: and(
          eq(spots.id, input.spotId),
          eq(spots.pieceId, input.pieceId),
        ),
        with: {
          audioPrompt: true,
          textPrompt: true,
          notesPrompt: true,
          piece: {
            columns: {
              title: true,
              userId: true,
              id: true,
            },
          },
        },
      });
      if (!spot) {
        return null;
      }
      if (spot.piece.userId !== ctx.session.user.id) {
        return null;
      }
      return spot;
    }),
});
