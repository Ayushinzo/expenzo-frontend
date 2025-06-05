import React, { useState } from 'react'
import { PiSignOutBold } from "react-icons/pi";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.js';
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Navbar({ setSidebarOpen }) {
  const [viewProfile, setViewProfile] = React.useState(false);
  const [photoUrl, setPhotoUrl] = useState()
  const auth = getAuth(app);
  let user;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setPhotoUrl(user.photoURL || '/user.avif')
    }
  })
  window.onclick = (e) => {
    if (e.target.className !== 'w-[45px] h-[45px] rounded-full border-2 border-blue-400 cursor-pointer hover:border-blue-600 transition-all duration-300') {
      setViewProfile(false);
    }
  }
  return (
    <header className='w-full py-4 px-4 sm:px-7 bg-gradient-to-b from-white to-blue-50 shadow-sm relative flex items-center justify-between'>
      <div className='hidden lg:block'></div>
      <AiOutlineMenu className='block lg:hidden text-[35px] hover:text-blue-600 cursor-pointer p-0.5' onClick={() => setSidebarOpen(true)} />
      <div>
        <img onClick={() => setViewProfile(prev => !prev)} className='w-[45px] h-[45px] rounded-full border-2 border-blue-400 cursor-pointer hover:border-blue-600 transition-all duration-300' src={photoUrl || '/user.avif'} alt="profile-image" />
      </div>
      <div className={`absolute top-16 right-5 bg-white shadow-xl rounded-xl p-3 ${viewProfile ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} transform transition-all duration-200 z-30 min-w-[200px]`}>
        <div className='flex flex-col items-stretch gap-1'>
          <Link to='/user/profile' className='text-gray-700 text-sm font-medium w-full text-left rounded-lg hover:bg-blue-50 py-2.5 px-4 cursor-pointer transition-colors duration-200'>
            View profile
          </Link>
          <button onClick={() => signOut(auth)} className='flex items-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg py-2.5 px-4 cursor-pointer transition-colors duration-200'>
            <PiSignOutBold className="text-lg" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar
