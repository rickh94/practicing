CREATE TABLE `audioPrompt` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`description` text(255) NOT NULL,
	`url` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notesPrompt` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`description` text(255) NOT NULL,
	`notes` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `textPrompt` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`description` text(255) NOT NULL,
	`text` text(255) NOT NULL
);
--> statement-breakpoint
DROP TABLE `prompt`;--> statement-breakpoint
ALTER TABLE spot ADD `audioPromptId` text REFERENCES audioPrompt(id);--> statement-breakpoint
ALTER TABLE spot ADD `textPromptId` text REFERENCES textPrompt(id);--> statement-breakpoint
ALTER TABLE spot ADD `notesPromptId` text REFERENCES notesPrompt(id);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/