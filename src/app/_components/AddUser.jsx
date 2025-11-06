'use client';
import { useRouter } from 'next/navigation'
import { useUser } from '../_context/UserContext'
import { useState } from 'react'

const AddUser = () => {
  const router = useRouter()
  const { setUser } = useUser() // access the context function
  const [username, setUsername] = useState('')

  const handleEnter = () => {
    if (username.trim() === '') return
    setUser({ name: username }) // save it in the shared context
    router.push('/main') // then go to the main page
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label className="block mb-2 text-xs">Enter your username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 text-xs text-gray-900 bg-gray-100 rounded outline-none"
          placeholder="Your username"
          name="username"
        />
      </div>

      <button
        type="button"
        onClick={handleEnter}
        className="w-full p-2 text-xs bg-blue-400 rounded"
      >
        Enter
      </button>
    </form>
  );
};

export default AddUser;