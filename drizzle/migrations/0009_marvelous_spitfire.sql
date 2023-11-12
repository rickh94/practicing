CREATE TABLE `piecePracticeSession` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`practiceSessionId` text NOT NULL,
	`pieceId` text NOT NULL,
	`measures` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`practiceSessionId`) REFERENCES `practiceSession`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pieceId`) REFERENCES `piece`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `practiceSession` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`durationMinutes` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `spotsToPieceSessions` (
	`pieceSessionId` text NOT NULL,
	`spotId` text NOT NULL,
	FOREIGN KEY (`pieceSessionId`) REFERENCES `piecePracticeSession`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`spotId`) REFERENCES `spot`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ps_pieceId_idx` ON `piecePracticeSession` (`pieceId`);--> statement-breakpoint
CREATE INDEX `spotId_idx` ON `spotsToPieceSessions` (`spotId`);