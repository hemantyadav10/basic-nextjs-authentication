'use client'

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'



export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const urlToken = searchParams.get('token') || '';
  // const router = useRouter();
  console.log(urlToken)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const {query} = router;
    // const urlToken2 = query.token;

  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token])

  return (
    <div className='w-full min-h-screen grid place-content-center'>
      <h1 className='text-2xl mb-2 text-center'>Verify Email</h1>
      <h2 className='bg-orange-600 px-2 py-1 text-black'>
        {token ? `${token}` : 'no token'}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className='text-center'>Error</h2>
        </div>
      )}
    </div>
  )
}

