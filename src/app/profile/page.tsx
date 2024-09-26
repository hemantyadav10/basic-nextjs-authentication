'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    try {
      const response = await axios.post('/api/users/me');
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout success');
      router.push('/login');
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])


  return (
    <div className='w-full min-h-screen grid place-content-center space-y-2'>
      <h1 className='text-center'>Profile page</h1>
      <h2 className='text-center'>
        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <div className='text-center'>
        <button className='px-4 py-2 bg-blue-600 rounded-md w-max text-center' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

