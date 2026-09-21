CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`website` varchar(255),
	`industry` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_user_id_name_idx` UNIQUE(`userId`,`name`)
);
--> statement-breakpoint
CREATE TABLE `contact_tags` (
	`contactId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `contact_tags_contactId_tagId_pk` PRIMARY KEY(`contactId`,`tagId`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(36) NOT NULL,
	`companyId` int,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`position` varchar(150),
	`contactType` varchar(50),
	`lastContactedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_user_id_name_idx` UNIQUE(`userId`,`name`)
);
--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contact_tags` ADD CONSTRAINT `contact_tags_contactId_contacts_id_fk` FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contact_tags` ADD CONSTRAINT `contact_tags_tagId_tags_id_fk` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_companyId_companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tags` ADD CONSTRAINT `tags_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `contacts_user_id_idx` ON `contacts` (`userId`);--> statement-breakpoint
CREATE INDEX `contacts_company_id_idx` ON `contacts` (`companyId`);