import { db } from "@/db";
import { commentTable } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";

export async function getCommentByHaikuId(haikuId) {
  if (!haikuId) return [];
  return await db
    .select()
    .from(commentTable)
    .where(eq(commentTable.haikuId, haikuId))
    .limit(100);
}

export async function addComment(haikuId, text, userName) {
  try {
    return await db
      .insert(commentTable)
      .values({
        haikuId: haikuId, 
        text: text,
        userName: userName,
      })
      .returning();
  } catch (err) {
    console.log("[ADD COMMENT ERROR]", err);
    return [];
  }
}

export async function deleteComment(id) {
  try {
    await db.delete(commentTable).where(eq(commentTable.id, id));
  } catch (err) {
    console.log("[DELETE COMMENT ERROR]", err);
  }
}
