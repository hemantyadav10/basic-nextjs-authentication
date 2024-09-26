'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignuPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user])

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('signup success', response.data);
      toast.success(response.data.message);
      router.push('/login');

    } catch (error: any) {
      console.log("Signup failed:", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSignup} className='w-full min-h-screen grid place-content-center '>
      <h1 className='text-center text-xl'>{loading ? "Processing..." : "Signup"}</h1>
      <label className='text-sm mt-4' htmlFor="username">Username:</label>
      <input
        type="text"
        id='username'
        value={user.username}
        placeholder='username'
        autoComplete='true'
        className='p-2 rounded-md min-w-96 outline-none focus:ring-[gray] focus:ring text-black'
        onChange={e => setUser({ ...user, username: e.target.value })}
      />
      <label className='text-sm mt-4' htmlFor="email">Email</label>
      <input
        type="text"
        id='email'
        value={user.email}
        placeholder='email'
        autoComplete='true'
        className='p-2 rounded-md min-w-96 outline-none focus:ring-[gray] focus:ring text-black'
        onChange={e => setUser({ ...user, email: e.target.value })}
      />
      <label className='text-sm mt-4' htmlFor="password">Password</label>
      <input
        type="password"
        id='password'
        value={user.password}
        placeholder='password'
        autoComplete='true'
        className='p-2 rounded-md min-w-96 outline-none focus:ring-[gray] focus:ring text-black'
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button
        type='submit'
        disabled={buttonDisabled || loading}
        className='px-4 py-2 my-4 rounded-md w-full border disabled:cursor-not-allowed hover:opacity-80 active:opacity-100 di'
      >
        {buttonDisabled ? 'No signup' : 'Signup'}
      </button>
      <Link href='/login'>Visit Login page</Link>
    </form>
  )
}


