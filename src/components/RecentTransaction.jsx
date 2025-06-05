import React, { useEffect } from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { IoAddOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { RiSubtractLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CiViewList } from "react-icons/ci";

function RecentTransaction({ recentTransactions }) {
  return (
    <div>
      <div className="!p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg mb-4 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-md sm:text-xl md:text-2xl font-bold flex items-center gap-2 hover:text-gray-900">
            Recent Transactions
          </h2>
          <Link to={'/user/transactions'} className="text-blue-500 hover:text-blue-700 text-sm sm:text-xs md:text-sm py-1.5 px-3 bg-white border border-blue-500 rounded-md flex items-center gap-1 transition-all duration-200 hover:bg-blue-50 hover:scale-105 shadow-sm">
            <CiViewList className="text-lg" />
            View All
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <div className="bg-white shadow-sm rounded-lg">
          <ul className="divide-y divide-gray-200">
            {
              (recentTransactions && recentTransactions.length != 0) &&
              recentTransactions.map((transaction, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-1.5 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <span className={`text-xl ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.type === 'expense' ? <RiSubtractLine /> : <IoAddOutline />}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.name}</p>
                      <span className="text-xs text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIndianRupeeSign className='inline mx-1' />
                    <span className={`font-semibold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.amount}
                    </span>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecentTransaction;
