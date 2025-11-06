"use client";
import { useUser } from '../_context/UserContext';
import Link from 'next/link';
import { useAllHaikus } from '@/app/hooks/useHaiku';

export default function HaikuListPage() {
  const { user } = useUser();
  const { haikus, loading } = useAllHaikus();

  if (loading) return <p className="p-10 text-gray-500">Loading haikus...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
      <div className="p-4">
        <h1 className="text-2xl">Welcome, {user?.name || 'Guest'}!</h1>
      </div>

      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Haiku-Online</h1>
        <Link
          href="/createHaiku"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + add haiku
        </Link>
      </header>

      <div className="w-full max-w-3xl space-y-4">
        {haikus.map((haiku) => (
          <Link key={haiku.id} href={`/haiku/${haiku.id}`}>
            <button className="w-full text-left p-4 bg-white rounded-xl shadow hover:shadow-md hover:bg-gray-100 transition mt-5">
              <h2 className="text-xl font-semibold text-blue-700">{haiku.title}</h2>
              <p className="text-sm text-gray-500">by {haiku.userName}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
