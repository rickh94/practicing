import { z } from "zod";

export const basicSpot = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().nullable(),
  stage: z.enum([
    "repeat",
    "random",
    "interleave",
    "interleave_days",
    "completed",
  ]),
});

export const pieceWithSpots = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  composer: z.string(),
  recordingLink: z.union([z.string().url(), z.enum([""]), z.null()]),
  practiceNotes: z.string().nullish(),
  spots: z.array(basicSpot),
});

export const pieceForList = pieceWithSpots.omit({
  description: true,
  recordingLink: true,
  practiceNotes: true,
});

export const createPieceData = z.object({
  title: z.string(),
  description: z.string(),
  composer: z.string(),
  recordingLink: z.union([z.string().url(), z.enum([""])]),
  practiceNotes: z.string(),
});

export const basicPiece = pieceWithSpots.omit({ spots: true });

export type PieceForList = z.infer<typeof pieceForList>;
export type BasicPiece = z.infer<typeof basicPiece>;
export type PieceWithSpots = z.infer<typeof pieceWithSpots>;
export type BasicSpot = z.infer<typeof basicSpot>;
