import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../firebase/firebase.js'

function auth() {
  let auth = getAuth(app)
  let navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/user/dashboard');
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [navigate]);
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 relative h-full hidden md:block'>
        <img className='w-full h-full' src="/auth.webp" alt="hy" />
        <div className='absolute bottom-6 p-4'>
          <h2 className='text-center text-black font-bold text-4xl'>Welcome to expense tracker</h2>
          <p className='w-full mt-6 text-black'>Stay on top of your spending with our smart and simple expense tracker. Whether you're budgeting for a trip, managing daily expenses, or planning long-term savings, our tool helps you make sense of your money — effortlessly.</p>
        </div>
      </div>
      <div className='w-full md:w-1/2 p-3 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default auth