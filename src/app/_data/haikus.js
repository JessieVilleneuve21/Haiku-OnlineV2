import "server-only";
import { db } from "@/db";
import { haikuTable } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";

export const getAllHaikus = async () => {
  return db.select().from(haikuTable).limit(100);
};

export async function getHaikuById(haikuId) {
  try {
    console.log(haikuId)
    const result = await db.select().from(haikuTable).where(eq(haikuTable.id, haikuId));
    const foundHaiku = result[0];

    return foundHaiku || "Inconnu";
  } catch (err) {
    console.error("Erreur récupération Haiku :", err);
    return "Inconnu";
  }
}

export const addHaiku = async (title, text, userName) => {
  try {
    console.log("why");
    await db.select().from(haikuTable).limit(1);
    return await db
      .insert(haikuTable)
      .values({
        title: title,
        text: text,
        userName: userName,
      })
      .returning();
  } catch (err) {
    console.log("[CREATE HAIKU ERROR]", err);
  }
};

export const deleteHaiku = async (id) => {
  try {
    await db.delete(haikuTable).where(eq(haikuTable.id, id));
  } catch (err) {
    console.log("[DELETE Haiku ERROR]", err);
  }
};
