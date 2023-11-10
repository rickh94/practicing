import { relations } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  text,
  blob,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const users = sqliteTable("user", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$default(() => createId()),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull().unique(),
  emailVerified: integer("emailVerified", {
    mode: "timestamp",
  }).$defaultFn(() => new Date()),
  image: text("image", { length: 255 }),
  quota: integer("quota").default(10).notNull(),
  isUnlimited: integer("isUnlimited", { mode: "boolean" })
    .default(false)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  credentials: many(credentials),
  pieces: many(pieces),
}));

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("acc_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = sqliteTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("sess_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const credentials = sqliteTable(
  "credential",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$default(() => createId()),
    credentialID: text("credentialID").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    credentialPublicKey: blob("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    transports: text("transports", { mode: "json" }).notNull(),
  },
  (credential) => ({
    userIdIdx: index("cred_userId_idx").on(credential.userId),
  }),
);

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, { fields: [credentials.userId], references: [users.id] }),
}));

export const pieces = sqliteTable(
  "piece",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$default(() => createId()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    composer: text("composer", { length: 255 }).notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    measures: integer("measures"),
    beatsPerMeasure: integer("beatsPerMeasure"),
    recordingLink: text("recordingLink", { length: 255 }),
    practiceNotes: text("practiceNotes"),
    lastPracticed: integer("lastPracticed", { mode: "timestamp" }),
  },
  (piece) => ({
    userIdIdx: index("piece_userId_idx").on(piece.userId),
    titleIdx: index("piece_title_idx").on(piece.title),
  }),
);

export const piecesRelations = relations(pieces, ({ one, many }) => ({
  user: one(users, { fields: [pieces.userId], references: [users.id] }),
  spots: many(spots),
}));

export const spots = sqliteTable(
  "spot",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$default(() => createId()),
    name: text("name", { length: 255 }).notNull(),
    pieceId: text("pieceId")
      .notNull()
      .references(() => pieces.id, { onDelete: "cascade" }),
    order: integer("order"),
    stage: text("stage", {
      enum: ["repeat", "random", "interleave", "interleave_days", "completed"],
    })
      .notNull()
      .default("repeat"),
    measures: text("measures").default("").notNull(),
    audioPromptUrl: text("audioPromptUrl"),
    textPrompt: text("textPrompt"),
    notesPrompt: text("notesPrompt"),
    imagePromptUrl: text("imagePromptUrl"),
  },
  (spot) => ({
    pieceIdIdx: index("spot_pieceId_idx").on(spot.pieceId),
    nameIdx: index("spot_name_idx").on(spot.name),
    stageIdx: index("spot_stage_idx").on(spot.stage),
    stagePieceIdx: index("spot_stage_piece_idx").on(spot.stage, spot.pieceId),
  }),
);

export const spotsRelations = relations(spots, ({ one }) => ({
  piece: one(pieces, { fields: [spots.pieceId], references: [pieces.id] }),
}));
