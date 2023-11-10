ALTER TABLE user ADD `quota` integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `isUnlimited` integer DEFAULT false NOT NULL;