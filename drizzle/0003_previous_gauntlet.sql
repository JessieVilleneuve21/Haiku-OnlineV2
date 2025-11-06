PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`haiku_id` text NOT NULL,
	`user_name` text NOT NULL,
	`text` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "haiku_id", "user_name", "text", "created_at") SELECT "id", "haiku_id", "user_name", "text", "created_at" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_haikus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`user_name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_haikus`("id", "title", "text", "user_name", "created_at") SELECT "id", "title", "text", "user_name", "created_at" FROM `haikus`;--> statement-breakpoint
DROP TABLE `haikus`;--> statement-breakpoint
ALTER TABLE `__new_haikus` RENAME TO `haikus`;