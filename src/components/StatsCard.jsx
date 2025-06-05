import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6';

function StatsCard({ title, amount, icon }) {
  return (
    <div className='p-8 rounded-lg bg-white shadow-md flex justify-between hover:scale-103 transition'>
      <div className='space-y-2'>
        <h3 className='text-gray-600 text-sm font-medium'>{title}</h3>
        <p className='text-2xl font-bold text-gray-900 flex items-center justify-center'><FaIndianRupeeSign/> {amount}</p>
      </div>
      <div className='text-blue-500 text-2xl'>
        <img src={icon} alt={title} className='h-[80px] w-[80px]'/>
      </div>
    </div>
  )
}

export default StatsCard