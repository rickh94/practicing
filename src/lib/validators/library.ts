import { z } from "zod";

export const audioPrompt = z.object({
  id: z.string(),
  description: z.string(),
  url: z.string(),
});

export const createAudioPrompt = audioPrompt.omit({ id: true });

export const textPrompt = z.object({
  id: z.string(),
  description: z.string(),
  text: z.string(),
});

export const createTextPrompt = textPrompt.omit({ id: true });

export const notesPrompt = z.object({
  id: z.string(),
  description: z.string(),
  notes: z.string(),
});

export const createNotesPrompt = notesPrompt.omit({ id: true });

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

export const basicSpotWithPrompts = basicSpot.extend({
  audioPrompt: audioPrompt.nullish().optional(),
  textPrompt: textPrompt.nullish().optional(),
  notesPrompt: notesPrompt.nullish().optional(),
});

export const pieceWithSpots = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  description: z.string(),
  composer: z.string(),
  recordingLink: z.union([z.string().url(), z.enum([""]), z.null()]),
  practiceNotes: z.string().nullish(),
  spots: z.array(basicSpotWithPrompts),
});

export const pieceForList = pieceWithSpots.omit({
  description: true,
  recordingLink: true,
  practiceNotes: true,
});

export const createPieceData = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  composer: z.string(),
  recordingLink: z.union([z.string().url(), z.enum([""])]),
  practiceNotes: z.string(),
  // React hook form gets mad if you pass it something nullalbe, so I omit the order field and re-add it as optional
  spots: z.array(
    basicSpot.omit({ id: true, order: true }).extend({
      order: z.number().optional(),
      audioPrompt: audioPrompt.omit({ id: true }).nullish(),
      textPrompt: textPrompt.omit({ id: true }).nullish(),
      notesPrompt: notesPrompt.omit({ id: true }).nullish(),
    }),
  ),
});

export const basicPiece = pieceWithSpots.omit({ spots: true });

export type PieceForList = z.infer<typeof pieceForList>;
export type BasicPiece = z.infer<typeof basicPiece>;
export type PieceWithSpots = z.infer<typeof pieceWithSpots>;
export type BasicSpot = z.infer<typeof basicSpot>;
export type CreateAudioPrompt = z.infer<typeof createAudioPrompt>;
export type CreateTextPrompt = z.infer<typeof createTextPrompt>;
export type CreateNotesPrompt = z.infer<typeof createNotesPrompt>;
