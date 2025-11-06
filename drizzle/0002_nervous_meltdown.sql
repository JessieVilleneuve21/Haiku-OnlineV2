CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`haiku_id` text NOT NULL,
	`user_name` text NOT NULL,
	`text` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
