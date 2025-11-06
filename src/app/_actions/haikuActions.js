"use server";
import { revalidatePath } from "next/cache";
import { addHaiku, deleteHaiku, getAllHaikus, getHaikuById } from "../_data/haikus";
import { redirect } from "next/dist/server/api-utils";

export const getAllHaikuAction = async () => {
  return getAllHaikus();
};

export const getHaikuByIdAction = async (id) => {
  return getHaikuById(id);
};

export const addHaikuAction = async (title, text, userName) => {
  try {
    const result = await addHaiku(title, text, userName);
    console.log(result);
    revalidatePath("/haikus");
    redirect(`/haiku/${result[0].id}`);
  } catch (err) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }
};

export const deleteAction = async (id) => {
  await deleteHaiku(id);
  revalidatePath("/haikus");
};