/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE spot ADD `audioPromptUrl` text;--> statement-breakpoint
ALTER TABLE spot ADD `textPrompt` text;--> statement-breakpoint
ALTER TABLE spot ADD `notesPrompt` text;--> statement-breakpoint
ALTER TABLE spot ADD `imagePromptUrl` text;--> statement-breakpoint
ALTER TABLE `spot` DROP COLUMN `audioPromptId`;--> statement-breakpoint
ALTER TABLE `spot` DROP COLUMN `textPromptId`;--> statement-breakpoint
ALTER TABLE `spot` DROP COLUMN `notesPromptId`;--> statement-breakpoint
ALTER TABLE `spot` DROP COLUMN `imagePromptId`;