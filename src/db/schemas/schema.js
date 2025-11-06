import { sql } from "drizzle-orm";
import { integer,sqliteTable, text } from "drizzle-orm/sqlite-core";

export const haikuTable = sqliteTable("haikus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  text: text("text").notNull(),
  userName: text("user_name").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const commentTable = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  haikuId: text("haiku_id").notNull(),
  userName: text("user_name").notNull(),
  text: text("text").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

