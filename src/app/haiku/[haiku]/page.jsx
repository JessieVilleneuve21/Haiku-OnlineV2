"use client";
import React, { useState } from "react";
import { useUser } from '../../_context/UserContext'
import Link from "next/link";
import { use } from "react";
import { useCommentById } from "@/app/hooks/useComment";
import { addCommentAction, deleteCommentAction } from "@/app/_actions/commentActions";
import { useHaikuById } from "@/app/hooks/useHaiku";


export default function HaikuPage(props) {
  const { user } = useUser();
  const params = use(props.params);
  const haikuId = params.haiku;

  const { haiku, hloading } = useHaikuById(haikuId);
  const { comments, setComments, loading: cloading } = useCommentById(haikuId);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = await addCommentAction(haikuId, newComment, (user?.name||"unkown"));
    setComments((prev) => [...prev, ...added]);
    setNewComment("");
  };

  const handleDelete = async (id) => {
    await deleteCommentAction(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  if (hloading) return <p className="p-10 text-gray-500">Loading haiku...</p>;
  if (!haiku) return <p className="p-10 text-gray-500">Haiku not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Haiku-Online</h1>
        <Link href="/main" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Home
        </Link>
      </header>

      <div className="w-full max-w-3xl space-y-4">
        <div className="w-full text-left p-4 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-blue-700">{haiku.title}</h2>
          <h3 className="text-sm text-gray-400">by {haiku.userName}</h3>
          <p className="text-lg text-gray-900 mt-5 leading-relaxed whitespace-pre-line">{haiku.text}</p>
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-4 mt-5">
        <div className="w-full text-left p-4 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700">Comments</h2>

          {cloading ? (
            <p>Loading comments...</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="w-full text-left p-4 bg-gray-50 rounded-xl shadow mt-5 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">{c.userName}</h3>
                  <p className="text-base text-gray-900 mt-2">{c.text}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows="3"
            />
            <button type="submit" className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
