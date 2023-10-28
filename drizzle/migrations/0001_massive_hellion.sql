CREATE TABLE `piece` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`description` text(255) NOT NULL,
	`composer` text(255) NOT NULL,
	`userId` text NOT NULL,
	`recordingLink` text(255),
	`practiceNotes` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `prompt` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`text` text(255),
	`musicNotes` text,
	`type` text NOT NULL,
	`spotId` text,
	FOREIGN KEY (`spotId`) REFERENCES `spot`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `spot` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`pieceId` text NOT NULL,
	`number` integer,
	`stage` text DEFAULT 'repeat' NOT NULL,
	FOREIGN KEY (`pieceId`) REFERENCES `piece`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `piece_userId_idx` ON `piece` (`userId`);--> statement-breakpoint
CREATE INDEX `piece_title_idx` ON `piece` (`title`);--> statement-breakpoint
CREATE INDEX `prompt_spotId_idx` ON `prompt` (`spotId`);--> statement-breakpoint
CREATE INDEX `spot_pieceId_idx` ON `spot` (`pieceId`);--> statement-breakpoint
CREATE INDEX `spot_name_idx` ON `spot` (`name`);--> statement-breakpoint
CREATE INDEX `spot_stage_idx` ON `spot` (`stage`);--> statement-breakpoint
CREATE INDEX `spot_stage_piece_idx` ON `spot` (`stage`,`pieceId`);