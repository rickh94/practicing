import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import {
  basicSpot,
  pieceFormData,
  spotFormData,
  pieceForList,
  pieceWithSpots,
  spotWithPieceInfo,
  updatePieceWithSpots,
} from "~/lib/validators/library";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  piecePracticeSessions,
  pieces,
  practiceSessions,
  spots,
  spotsToPieceSessions,
  users,
} from "~/server/db/schema";
import { eq, and, desc } from "drizzle-orm";
// import { utapi } from "~/server/uploadthing";

/*
// TODO: make this a cron quotas can be handled by pieces per user and spots per piece
// which will create a defacto max upload quota
async function deleteUploadthingFile(url?: string | null) {
  if (!url) return;
  if (url.startsWith("https://utfs.io/")) {
    const parts = url.split("/");
    const fname = parts[parts.length - 1];
    if (!fname) {
      return;
    }
    console.log("deleted", fname);
    await utapi.deleteFiles(fname);
  }
}
*/

export const libraryRouter = createTRPCRouter({
  createPiece: protectedProcedure
    .input(pieceFormData)
    .output(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const pieceCountResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(pieces)
        .where(eq(pieces.userId, ctx.session.user.id));
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
      });
      if (!user) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      if (
        !user.isUnlimited &&
        (pieceCountResult[0]?.count ?? 0) >= user.quota
      ) {
        throw new TRPCError({
          message: "You have reached your quota, please delete some pieces",
          code: "BAD_REQUEST",
        });
      }
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
          await tx.insert(spots).values({
            name: spot.name,
            order: spot.order,
            stage: spot.stage,
            measures: spot.measures,
            pieceId: piece.id,
            audioPromptUrl: spot.audioPromptUrl,
            textPrompt: spot.textPrompt,
            notesPrompt: spot.notesPrompt,
            imagePromptUrl: spot.imagePromptUrl,
          });
        }
        return piece;
      });
      return result;
    }),

  addSpotToPiece: protectedProcedure
    .input(
      z.object({
        pieceId: z.string(),
        spot: spotFormData,
      }),
    )
    .output(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { pieceId, spot } }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: eq(pieces.id, pieceId),
        columns: {
          userId: true,
        },
      });
      if (piece?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "You do not own this piece",
          code: "UNAUTHORIZED",
        });
      }
      const result = await ctx.db.transaction(async (tx) => {
        return await tx
          .insert(spots)
          .values({
            name: spot.name,
            order: spot.order,
            stage: spot.stage,
            measures: spot.measures,
            pieceId,
            audioPromptUrl: spot.audioPromptUrl,
            textPrompt: spot.textPrompt,
            notesPrompt: spot.notesPrompt,
            imagePromptUrl: spot.imagePromptUrl,
          })
          .returning({ id: spots.id });
      }); // end of transaction
      if (!result?.[0]) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return result[0];
    }),

  updatePiece: protectedProcedure
    .input(z.object({ id: z.string(), update: updatePieceWithSpots }))
    .mutation(async ({ ctx, input: { id, update } }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: eq(pieces.id, id),
        columns: {
          userId: true,
        },
        with: {
          spots: { columns: { id: true } },
        },
      });
      if (piece?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "You do not own this piece",
          code: "UNAUTHORIZED",
        });
      }

      // record spot ids to see if any have been deleted
      const oldSpotIds = new Set<string>();
      for (const { id } of piece.spots) {
        oldSpotIds.add(id);
      }

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(pieces)
          .set({
            title: update.title,
            description: update.description,
            composer: update.composer,
            recordingLink: update.recordingLink,
            practiceNotes: update.practiceNotes,
            measures: update.measures,
            beatsPerMeasure: update.beatsPerMeasure,
          })
          .where(eq(pieces.id, id));
        for (const spot of update.spots) {
          if (spot.id) {
            oldSpotIds.delete(spot.id);
            await tx
              .update(spots)
              .set({
                name: spot.name,
                order: spot.order,
                stage: spot.stage,
                measures: spot.measures,
                pieceId: id,
                audioPromptUrl: spot.audioPromptUrl,
                textPrompt: spot.textPrompt,
                notesPrompt: spot.notesPrompt,
                imagePromptUrl: spot.imagePromptUrl,
              })
              .where(eq(spots.id, spot.id));
          } else {
            await tx.insert(spots).values({
              name: spot.name,
              order: spot.order,
              stage: spot.stage,
              measures: spot.measures,
              pieceId: id,
              audioPromptUrl: spot.audioPromptUrl,
              textPrompt: spot.textPrompt,
              notesPrompt: spot.notesPrompt,
              imagePromptUrl: spot.imagePromptUrl,
            });
          }
        }
        // if any spot ids are left, they were missing from the request and should be deleted
        for (const spotId of oldSpotIds) {
          await tx.delete(spots).where(eq(spots.id, spotId));
        }
      }); // end of transaction
    }),
  practicePiece: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const result = await ctx.db
        .update(pieces)
        .set({
          lastPracticed: new Date(),
        })
        .where(and(eq(pieces.id, id), eq(pieces.userId, ctx.session.user.id)));
      if (result.rowsAffected === 0) {
        throw new TRPCError({
          message: "Could not update piece",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  practicePieceStartingPoint: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        measures: z.string(),
        durationMinutes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { id, measures, durationMinutes } }) => {
      await ctx.db.transaction(async (tx) => {
        const pieceUpdateResult = await tx
          .update(pieces)
          .set({
            lastPracticed: new Date(),
          })
          .where(
            and(eq(pieces.id, id), eq(pieces.userId, ctx.session.user.id)),
          );
        if (pieceUpdateResult.rowsAffected === 0) {
          throw new TRPCError({
            message: "Could not update piece",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        const [createdPracticeSession] = await tx
          .insert(practiceSessions)
          .values({
            date: new Date(),
            durationMinutes,
          })
          .returning({ id: practiceSessions.id });
        if (!createdPracticeSession?.id) {
          throw new TRPCError({
            message: "Could not create practice session",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        const pieceSessionResult = await tx
          .insert(piecePracticeSessions)
          .values({
            pieceId: id,
            practiceSessionId: createdPracticeSession.id,
            measures,
          });
        if (pieceSessionResult.rowsAffected === 0) {
          throw new TRPCError({
            message: "Could not create piece practice session",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      });
    }),

  practicePieceSpots: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        durationMinutes: z.number(),
        spotIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input: { id, spotIds, durationMinutes } }) => {
      const [practiceSessionId, pieceSessionId] = await ctx.db.transaction(
        async (tx) => {
          const pieceUpdateResult = await tx
            .update(pieces)
            .set({
              lastPracticed: new Date(),
            })
            .where(
              and(eq(pieces.id, id), eq(pieces.userId, ctx.session.user.id)),
            );
          if (pieceUpdateResult.rowsAffected === 0) {
            throw new TRPCError({
              message: "Could not update piece",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
          const [createdPracticeSession] = await tx
            .insert(practiceSessions)
            .values({
              date: new Date(),
              durationMinutes,
            })
            .returning({ id: practiceSessions.id });
          if (!createdPracticeSession?.id) {
            throw new TRPCError({
              message: "Could not create practice session",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
          const [pieceSession] = await tx
            .insert(piecePracticeSessions)
            .values({
              pieceId: id,
              practiceSessionId: createdPracticeSession.id,
            })
            .returning({ id: piecePracticeSessions.id });
          if (!pieceSession?.id) {
            throw new TRPCError({
              message: "Could not create piece practice session",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
          return [createdPracticeSession.id, pieceSession.id];
        },
      );

      const spotToPieceSessionPromises = [];
      for (const spotId of spotIds) {
        spotToPieceSessionPromises.push(
          ctx.db.insert(spotsToPieceSessions).values({
            pieceSessionId: pieceSessionId,
            spotId,
          }),
        );
      }
      await Promise.all(spotToPieceSessionPromises);
      return practiceSessionId;
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

  getPieceForUpdate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(pieceWithSpots.nullable())
    .query(async ({ ctx, input }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: and(
          eq(pieces.id, input.id),
          eq(pieces.userId, ctx.session.user.id),
        ),
        with: {
          spots: true,
        },
        columns: {
          userId: false,
        },
      });
      if (!piece) {
        return null;
      }
      return piece;
    }),

  checkForPiece: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(z.object({ id: z.string(), title: z.string() }).nullable())
    .query(async ({ ctx, input }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: and(
          eq(pieces.id, input.id),
          eq(pieces.userId, ctx.session.user.id),
        ),
        columns: {
          id: true,
          title: true,
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
    .input(z.object({ perPage: z.number().default(12) }).optional())
    .output(z.object({ totalPages: z.number() }))
    .query(async ({ ctx, input }) => {
      const limit = input?.perPage ?? 12;
      const result = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(pieces)
        .where(eq(pieces.userId, ctx.session.user.id));
      if (!result?.[0]) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return { totalPages: Math.ceil(result[0].count / limit) };
    }),

  deletePieceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(pieces)
        .where(
          and(eq(pieces.id, input.id), eq(pieces.userId, ctx.session.user.id)),
        )
        .returning();
      if (!result?.[0]) {
        throw new TRPCError({
          message: "Could not delete piece",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getSpotById: protectedProcedure
    .input(z.object({ spotId: z.string(), pieceId: z.string() }))
    .output(spotWithPieceInfo.nullable())
    .query(async ({ ctx, input }) => {
      const spot = await ctx.db.query.spots.findFirst({
        where: and(
          eq(spots.id, input.spotId),
          eq(spots.pieceId, input.pieceId),
        ),
        with: {
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

  updateSpotById: protectedProcedure
    .input(
      z.object({
        spotId: z.string(),
        pieceId: z.string(),
        update: spotFormData,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: get old prompt file urls and delete at the top if they've changed to handle all cases, resolve later in background
      await ctx.db.transaction(async (tx) => {
        const piece = await tx.query.pieces.findFirst({
          where: and(
            eq(pieces.id, input.pieceId),
            eq(pieces.userId, ctx.session.user.id),
          ),
        });
        if (!piece) {
          throw new TRPCError({
            message: "You do not own this piece",
            code: "UNAUTHORIZED",
          });
        }
        await tx
          .update(spots)
          .set({
            name: input.update.name,
            order: input.update.order,
            stage: input.update.stage,
            measures: input.update.measures,
            audioPromptUrl: input.update.audioPromptUrl,
            imagePromptUrl: input.update.imagePromptUrl,
            notesPrompt: input.update.notesPrompt,
            textPrompt: input.update.textPrompt,
          })
          .where(
            and(eq(spots.id, input.spotId), eq(spots.pieceId, input.pieceId)),
          );
      });
    }),

  repeatPracticeSpot: protectedProcedure
    .input(
      z.object({
        pieceId: z.string(),
        spotId: z.string(),
        durationMinutes: z.number(),
        successful: z.boolean(),
      }),
    )
    .mutation(
      async ({
        ctx,
        input: { pieceId, durationMinutes, spotId, successful },
      }) => {
        await ctx.db.transaction(async (tx) => {
          const pieceUpdateResult = await tx
            .update(pieces)
            .set({
              lastPracticed: new Date(),
            })
            .where(
              and(
                eq(pieces.id, pieceId),
                eq(pieces.userId, ctx.session.user.id),
              ),
            );
          if (pieceUpdateResult.rowsAffected === 0) {
            throw new TRPCError({
              message: "Could not update piece",
              code: "INTERNAL_SERVER_ERROR",
            });
          }

          const [createdPracticeSession] = await tx
            .insert(practiceSessions)
            .values({
              date: new Date(),
              durationMinutes,
            })
            .returning({ id: practiceSessions.id });
          if (!createdPracticeSession?.id) {
            throw new TRPCError({
              message: "Could not create practice session",
              code: "INTERNAL_SERVER_ERROR",
            });
          }

          const [createdPieceSession] = await tx
            .insert(piecePracticeSessions)
            .values({
              pieceId,
              practiceSessionId: createdPracticeSession.id,
              measures: "",
            })
            .returning({ id: piecePracticeSessions.id });
          if (!createdPieceSession?.id) {
            throw new TRPCError({
              message: "Could not create piece practice session",
              code: "INTERNAL_SERVER_ERROR",
            });
          }

          await tx.insert(spotsToPieceSessions).values({
            pieceSessionId: createdPieceSession.id,
            spotId: spotId,
          });
          if (successful) {
            await tx
              .update(spots)
              .set({
                stage: "interleave",
              })
              .where(
                and(
                  eq(spots.id, spotId),
                  eq(spots.pieceId, pieceId),
                  eq(spots.stage, "repeat"),
                ),
              );
          }
        });
      },
    ),

  getSpotsForPiece: protectedProcedure
    .input(z.object({ pieceId: z.string() }))
    .output(z.array(basicSpot))
    .query(async ({ ctx, input }) => {
      const foundSpots = await ctx.db.query.spots.findMany({
        where: eq(spots.pieceId, input.pieceId),
        with: {
          piece: {
            columns: {
              userId: true,
            },
          },
        },
      });
      if (!foundSpots?.[0]) {
        return [];
      }
      if (foundSpots[0].piece.userId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "You do not own this piece",
          code: "UNAUTHORIZED",
        });
      }
      return foundSpots;
    }),

  deleteSpotById: protectedProcedure
    .input(z.object({ pieceId: z.string(), spotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const piece = await ctx.db.query.pieces.findFirst({
        where: and(
          eq(pieces.id, input.pieceId),
          eq(pieces.userId, ctx.session.user.id),
        ),
      });
      if (!piece) {
        return null;
      }
      const result = await ctx.db
        .delete(spots)
        .where(
          and(eq(spots.id, input.spotId), eq(spots.pieceId, input.pieceId)),
        )
        .returning();
      if (!result?.[0]) {
        throw new TRPCError({
          message: "Could not delete spot",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
