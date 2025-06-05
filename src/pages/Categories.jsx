import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { IoAddOutline } from "react-icons/io5";
import CategoryTemplate from '../components/CategoryTemplate';
import AddCategory from '../components/AddCategory';
import axios from 'axios';
import app from '../firebase/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Categories() {
  let navigate = useNavigate()
  const [displayCategory, setDisplayCategory] = useState(false)
  const [categories, setCategories] = useState([])
  let auth = getAuth(app)

  async function fetchCategories(email) {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/get?email=${email}`)
      if (response.data.success) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCategories(user.email);
      } else {
        navigate('/auth/sign-in')
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <>
      {
        displayCategory && <AddCategory setDisplayCategory={setDisplayCategory} fetchCategories={fetchCategories} />
      }
      <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md min-h-full bg-gradient-to-b from-white to-blue-50'>
        <button className='font-bold text-lg flex items-center justify-start cursor-pointer gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white shadow-sm' onClick={() => navigate(-1)}><FaArrowLeft /> My Categories</button>
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 xl:gap-6 p-2'>
          <div className='shadow-md p-6 bg-blue-100 flex items-center justify-center gap-2 cursor-pointer !max-h-[200px] hover:scale-105 transition-all group' onClick={() => setDisplayCategory(true)}>
            <IoAddOutline className='text-3xl cursor-pointer ' />
            <p className='font-bold text-lg'>Create new category</p>
          </div>
          {
            categories.length != 0 &&
            categories.map((item) => {
              return (
                <CategoryTemplate item={item} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Categories;