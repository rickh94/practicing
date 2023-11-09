CREATE TABLE `account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `credential` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`credentialID` text NOT NULL,
	`userId` text NOT NULL,
	`credentialPublicKey` blob NOT NULL,
	`counter` integer NOT NULL,
	`transports` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `piece` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`description` text NOT NULL,
	`composer` text(255) NOT NULL,
	`userId` text NOT NULL,
	`recordingLink` text(255),
	`practiceNotes` text,
	`lastPracticed` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `spot` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`pieceId` text NOT NULL,
	`order` integer,
	`stage` text DEFAULT 'repeat' NOT NULL,
	`measures` text DEFAULT '' NOT NULL,
	`audioPromptUrl` text,
	`textPrompt` text,
	`notesPrompt` text,
	`imagePromptUrl` text,
	FOREIGN KEY (`pieceId`) REFERENCES `piece`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer,
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `acc_userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `cred_userId_idx` ON `credential` (`userId`);--> statement-breakpoint
CREATE INDEX `piece_userId_idx` ON `piece` (`userId`);--> statement-breakpoint
CREATE INDEX `piece_title_idx` ON `piece` (`title`);--> statement-breakpoint
CREATE INDEX `sess_userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE INDEX `spot_pieceId_idx` ON `spot` (`pieceId`);--> statement-breakpoint
CREATE INDEX `spot_name_idx` ON `spot` (`name`);--> statement-breakpoint
CREATE INDEX `spot_stage_idx` ON `spot` (`stage`);--> statement-breakpoint
CREATE INDEX `spot_stage_piece_idx` ON `spot` (`stage`,`pieceId`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);