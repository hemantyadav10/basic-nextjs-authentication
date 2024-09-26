'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type UserType = {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user])

  const onLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    console.log('hello')
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('login success', response.data);
      router.push('/profile');
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("login failed:", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value })
  }

  return (
    <form onSubmit={onLogin} className='w-full min-h-screen grid place-content-center '>
      <h1 className='text-center text-xl'>{loading ? "Processing..." : "Login"}</h1>
      <label className='text-sm mt-4' htmlFor="email">Email</label>
      <input
        type="text"
        id='email'
        value={user.email}
        placeholder='email'
        autoComplete='true'
        className='p-2 rounded-md min-w-96 outline-none focus:ring-[gray] focus:ring text-black'
        onChange={handleEmailChange}
      />
      <label className='text-sm mt-4' htmlFor="password">Password</label>
      <input
        type="password"
        id='password'
        autoComplete='true'
        value={user.password}
        placeholder='password'
        className='p-2 rounded-md min-w-96 outline-none focus:ring-[gray] focus:ring text-black'
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button
        type='submit'
        disabled={buttonDisabled || loading}
        className='px-4 py-2 my-4 rounded-md w-full border disabled:cursor-not-allowed hover:opacity-80 active:opacity-100 di'
      >
        Login
      </button>
      <Link href='/signup'>Visit Signup page</Link>
    </form>
  )
}

