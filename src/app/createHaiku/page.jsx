'use client';
import { useUser } from '../_context/UserContext'
import { addHaikuAction } from "../_actions/haikuActions";
import React from 'react';
import Link from 'next/link';

export default function HaikuListPage() {
  const { user } = useUser();

  const addHaikuHandler = async (formData) => {
  const title = formData.get("title");
  const text = formData.get("line1")+"\n"+ formData.get("line2")+"\n"+formData.get("line3");
  if (!title) {
    return;
  }
  await addHaikuAction(title,text,(user?.name||"unkown"));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Haiku-Online</h1>
        <Link  href="/main"  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Home</Link>
      </header>

      <div className="w-full max-w-3xl space-y-4 mt-5">
        <div className="w-full text-left p-4 bg-white rounded-xl shadow">

          <form action={addHaikuHandler} className="mt-5 flex flex-col gap-3">
            <input             
              id="title"
              name="title"
              placeholder="title..."
              className="w-[60%] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows="1"
              ></input>
            <input
              id="line1"
              name="line1"
              placeholder="first line..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows="1"
              ></input>
            <input
              id="line2"
              name="line2"
              placeholder="second line..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows="1"
              ></input>
            <input
              id="line3"
              name="line3"
              placeholder="third line..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows="1"
              ></input>
            <button
              type="submit"
              className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
