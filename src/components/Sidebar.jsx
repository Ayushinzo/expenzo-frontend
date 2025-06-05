import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { SiActualbudget } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useLocation } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase.js'
import { Bounce, ToastContainer } from 'react-toastify';

let menu = [
  {
    name: "Dashboard",
    icon: MdOutlineDashboard,
    slug: "dashboard"
  },
  {
    name: "Transactions",
    icon: TbTransactionRupee,
    slug: "transactions"
  },
  {
    name: "Categories",
    icon: MdOutlineCategory,
    slug: "categories"
  },
  {
    name: "Recurring",
    icon: MdOutlineCategory,
    slug: "recurring"
  }
]

function Sidebar({ setSidebarOpen, sidebarOpen }) {
  let auth = getAuth(app)
  const location = useLocation()
  const [photoUrl, setPhotoUrl] = React.useState(null)
  const [displayName, setDisplayName] = React.useState(null)
  const [email, setEmail] = React.useState(null)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoUrl(user.photoURL || "/user.avif")
        setDisplayName(user.displayName || "Anonymous")
        setEmail(user.email || "Anonymous")
      } else {
        setPhotoUrl(null)
        setDisplayName(null)
        setEmail(null)
      }
    })
  }, [auth])
  return (
    <>
      <ToastContainer
        position='top-right'
        limit={4}
        autoClose={3000}
        theme="colored"
        transition={Bounce}
      />
      <div className={`w-[300px] lg:w-[330px] h-screen p-3 bg-gradient-to-b from-white to-blue-50 shadow-sm fixed z-40 lg:relative translate-x-[-300px] lg:translate-x-0 duration-300 ease-in-out ${sidebarOpen && '!translate-x-0'}`}>
        <div className='flex items-center justify-between gap-3 mb-3 p-2'>
          <div className='flex items-center gap-3'>
            <img src="/logo.png" alt="logo" className='w-[50px] h-[50px] rounded-full' />
            <Link to={'/'} className='text-[26px] font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              Expenzo
            </Link>
          </div>
          <RxCross1 onClick={() => setSidebarOpen(false)} className='text-[35px] cursor-pointer bg-gray-400 p-0.5 block lg:hidden' />
        </div>
        <hr className='mb-10 border-blue-100' />
        <div className='flex flex-col gap-3'>
          {
            menu.map((item, index) => {
              return (
                <Link key={index} to={`/user/${item.slug}`} className={`group flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-xl transition-all duration-300 font-bold relative overflow-hidden ${location.pathname == `/user/${item.slug}` && '!text-blue-600 bg-blue-100'}`}>
                  {<item.icon className={`text-xl transform group-hover:scale-110 transition-transform ${location.pathname == `/user/${item.slug}` && 'scale-110'}`} />}
                  <span className={`transform group-hover:translate-x-2 transition-transform ${location.pathname == `/user/${item.slug}` && 'translate-x-2'}`}>{item.name}</span>
                  <div className={`absolute left-0 w-1 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top ${location.pathname == `/user/${item.slug}` && 'scale-y-100'}`}></div>
                </Link>
              )
            })
          }
        </div>
        <div className={`group flex items-center gap-3 p-2 cursor-pointer absolute bottom-5 hover:bg-blue-100 rounded-xl transition-all duration-300 w-[90%] ${location.pathname == '/user/profile' && 'bg-blue-100'}`}>
          <div className='relative overflow-hidden'>
            <img
              className='w-[45px] h-[45px] rounded-full border-2 border-blue-400 transform transition-all duration-300 hover:rotate-6'
              src={photoUrl || "/user.avif"}
              alt="profile-image"
            />
            <div className='absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300'></div>
          </div>
          <Link to='/user/profile' className='flex flex-col'>
            <p className={`font-semibold text-gray-700 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-300 ${location.pathname == '/user/profile' && '!text-blue-600 translate-x-1'}`}>{displayName}</p>
            <span className={`text-[10px] text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300 ${location.pathname == '/user/profile' && '!text-blue-400 translate-x-1'}`}>{email}</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
