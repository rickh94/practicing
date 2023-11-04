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
  order: z.coerce.number().nullish().optional(),
  stage: z.enum([
    "repeat",
    "random",
    "interleave",
    "interleave_days",
    "completed",
  ]),
  measures: z.string().default(""),
});

// React hook form gets mad if you pass it something nullalbe, so I omit the order field and re-add it as optional
export const basicSpotWithPrompts = basicSpot.extend({
  audioPrompt: audioPrompt.nullish().optional(),
  textPrompt: textPrompt.nullish().optional(),
  notesPrompt: notesPrompt.nullish().optional(),
});

export const createSpotWithPrompts = basicSpot
  .omit({ id: true, order: true })
  .extend({
    id: z.string().optional(),
    order: z.coerce
      .number()
      .optional()
      .transform((val) => val ?? undefined),
    audioPrompt: audioPrompt
      .omit({ id: true })
      .extend({ id: z.string().optional() })
      .nullish(),
    textPrompt: textPrompt
      .omit({ id: true })
      .extend({ id: z.string().optional() })
      .nullish(),
    notesPrompt: notesPrompt
      .omit({ id: true })
      .extend({ id: z.string().optional() })
      .nullish(),
  });

export const spotWithPromptsAndPieceTitle = basicSpotWithPrompts.extend({
  piece: z.object({
    title: z.string(),
    id: z.string(),
  }),
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
  spots: z.array(createSpotWithPrompts),
});

export const basicPiece = pieceWithSpots.omit({ spots: true });

export const updatePieceWithSpots = createPieceData.extend({
  id: z.string().optional(),
});

export type PieceForList = z.infer<typeof pieceForList>;
export type BasicPiece = z.infer<typeof basicPiece>;
export type PieceWithSpots = z.infer<typeof pieceWithSpots>;
export type BasicSpot = z.infer<typeof basicSpot>;
export type CreateAudioPrompt = z.infer<typeof createAudioPrompt>;
export type CreateTextPrompt = z.infer<typeof createTextPrompt>;
export type CreateNotesPrompt = z.infer<typeof createNotesPrompt>;
export type AudioPrompt = z.infer<typeof audioPrompt>;
export type TextPrompt = z.infer<typeof textPrompt>;
export type NotesPrompt = z.infer<typeof notesPrompt>;
export type CreatePieceData = z.infer<typeof createPieceData>;
export type CreateSpotWithPrompts = z.infer<typeof createSpotWithPrompts>;
export type UpdatePieceData = z.infer<typeof updatePieceWithSpots>;
