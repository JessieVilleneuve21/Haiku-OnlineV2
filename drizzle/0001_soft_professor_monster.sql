CREATE TABLE `haikus` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`user_name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
DROP TABLE `user`;