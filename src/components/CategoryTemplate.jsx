import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CategoryTemplate({ item }) {
  let navigate = useNavigate()
  function redirectToView() {
    navigate(`/user/categories/${item.name}`, {
      state: {
        id: item._id
      }
    })
  }
  return (
    <div key={item._id} onClick={redirectToView} className='p-6 shadow-md bg-white cursor-pointer hover:scale-105 transition-transform'>
      <div className='flex gap-4 items-center rounded-lg'>
        <div className='flex-shrink-0'>
          <span className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-inner text-2xl'>
            {item.emoji}
          </span>
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-md xl:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
            {item.name}
          </h2>
          <p className='text-sm text-gray-500 font-medium'>4 items</p>
        </div>
      </div>
      <div className='mt-3'>
        <span className='font-bold'>Type:</span>
        <span className='text-blue-600 font-semibold'> {item.type}</span>
      </div>
      <div className='mt-2 text-sm italic'>
        {item.note}
      </div>
    </div>
  )
}

export default CategoryTemplate