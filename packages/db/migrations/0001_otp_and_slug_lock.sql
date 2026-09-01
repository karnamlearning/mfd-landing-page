ALTER TABLE `tenants` ADD `slug_locked` tinyint(1) NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE TABLE `otp_challenges` (
	`phone` varchar(20) NOT NULL,
	`code_hash` varchar(64) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	CONSTRAINT `otp_challenges_phone` PRIMARY KEY(`phone`)
);
