import { z } from "zod";

export const urlOrEmpty = z.union([z.string().url(), z.enum([""])]);

export const urlOrEmptyForm = z.object({ url: urlOrEmpty });

export const notesForm = z.object({
  notes: z.string(),
});

export const textForm = z.object({
  text: z.string(),
});

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
  audioPromptUrl: z.union([z.string().url(), z.null(), z.enum([""])]),
  imagePromptUrl: z.union([z.string().url(), z.null(), z.enum([""])]),
  notesPrompt: z.string().nullable(),
  textPrompt: z.string().nullable(),
});

// React hook form gets mad if you pass it something nullable, so I omit the order field and re-add it as optional

export const spotWithPromptsFormData = basicSpot
  .omit({ id: true, order: true })
  .extend({
    id: z.string().optional(),
    order: z.coerce
      .number()
      .optional()
      .transform((val) => val ?? undefined),
    audioPromptUrl: urlOrEmpty,
    imagePromptUrl: urlOrEmpty,
    notesPrompt: z.string(),
    textPrompt: z.string(),
  });

export const spotWithPromptsAndPieceTitle = basicSpot.extend({
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
  measures: z.number().nullish(),
  beatsPerMeasure: z.number().nullish(),
  practiceNotes: z.string().nullish(),
  spots: z.array(basicSpot),
});

export const pieceForList = pieceWithSpots.omit({
  description: true,
  recordingLink: true,
  practiceNotes: true,
});

export const pieceFormData = z.object({
  title: z
    .string()
    .min(1, "Title must be at least one letter")
    .max(255, "Title is too long."),
  description: z.string(),
  composer: z.string(),
  recordingLink: z.union([z.string().url(), z.enum([""])]),
  practiceNotes: z.string(),
  measures: z.number().optional().nullable(),
  beatsPerMeasure: z.number().optional().nullable(),
  spots: z.array(spotWithPromptsFormData),
});

export const basicPiece = pieceWithSpots.omit({ spots: true });

export const updatePieceWithSpots = pieceFormData.extend({
  id: z.string().optional(),
});

export type PieceForList = z.infer<typeof pieceForList>;
export type BasicPiece = z.infer<typeof basicPiece>;
export type PieceWithSpots = z.infer<typeof pieceWithSpots>;
export type UpdatePieceData = z.infer<typeof updatePieceWithSpots>;
export type PieceFormData = z.infer<typeof pieceFormData>;

export type BasicSpot = z.infer<typeof basicSpot>;
export type SpotWithPromptsFormData = z.infer<typeof spotWithPromptsFormData>;
export type SpotWithPromptsAndPieceTitle = z.infer<
  typeof spotWithPromptsAndPieceTitle
>;
export type UrlOrEmptyForm = z.infer<typeof urlOrEmptyForm>;
export type NotesForm = z.infer<typeof notesForm>;
export type TextForm = z.infer<typeof textForm>;
