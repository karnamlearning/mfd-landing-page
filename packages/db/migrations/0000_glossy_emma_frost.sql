CREATE TABLE `leads` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tenant_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`mobile` varchar(20) NOT NULL,
	`city` varchar(128),
	`message` text,
	`source` varchar(64) NOT NULL,
	`payload` json,
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`status` enum('draft','trial','active','suspended') NOT NULL DEFAULT 'draft',
	`config` json NOT NULL,
	`owner_phone` varchar(20),
	`owner_email` varchar(255),
	`razorpay_sub_id` varchar(64),
	`plan` enum('monthly','yearly'),
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	CONSTRAINT `tenants_id` PRIMARY KEY(`id`),
	CONSTRAINT `tenants_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`phone` varchar(20) NOT NULL,
	`tenant_id` bigint unsigned NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
ALTER TABLE `leads` ADD CONSTRAINT `leads_tenant_id_tenants_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_tenant_id_tenants_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `leads_tenant_created_idx` ON `leads` (`tenant_id`,`created_at`);