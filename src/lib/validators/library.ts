import { z } from "zod";

export const basicSpot = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().nullish(),
  stage: z.enum([
    "repeat",
    "random",
    "interleave",
    "interleave_days",
    "completed",
  ]),
  measures: z.string().default(""),
});

export const pieceWithSpots = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
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
  // React hook form gets mad if you pass it something nullalbe, so I omit the order field and re-add it as optional
  spots: z.array(
    basicSpot
      .omit({ id: true, order: true })
      .extend({ order: z.number().optional() }),
  ),
});

export const basicPiece = pieceWithSpots.omit({ spots: true });

export type PieceForList = z.infer<typeof pieceForList>;
export type BasicPiece = z.infer<typeof basicPiece>;
export type PieceWithSpots = z.infer<typeof pieceWithSpots>;
export type BasicSpot = z.infer<typeof basicSpot>;
