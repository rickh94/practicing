CREATE TABLE `practiceSession` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`durationMinutes` integer NOT NULL,
	`pieceId` text,
	`measures` text,
	FOREIGN KEY (`pieceId`) REFERENCES `piece`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `spotsToPracticeSessions` (
	`practiceSessionId` text NOT NULL,
	`spotId` text NOT NULL,
	PRIMARY KEY(`practiceSessionId`, `spotId`),
	FOREIGN KEY (`practiceSessionId`) REFERENCES `practiceSession`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`spotId`) REFERENCES `spot`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `spot_practiceSessionId_idx` ON `spotsToPracticeSessions` (`practiceSessionId`);--> statement-breakpoint
CREATE INDEX `spot_spotId_idx` ON `spotsToPracticeSessions` (`spotId`);