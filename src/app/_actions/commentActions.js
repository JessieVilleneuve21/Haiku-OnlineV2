// src/app/_actions/commentActions.js
"use server";

import { getCommentByHaikuId, addComment, deleteComment } from "../_data/comments";

// Fetch comments for a haiku
export const getCommentsAction = async (haikuId) => {
  return getCommentByHaikuId(haikuId);
};

// Add a comment
export const addCommentAction = async (haikuId, text, userName) => {
  return addComment(haikuId, text, userName);
};

// Delete a comment
export const deleteCommentAction = async (id) => {
  return deleteComment(id);
};
