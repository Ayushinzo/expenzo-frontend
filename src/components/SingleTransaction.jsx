import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import InfiniteScroll from 'react-infinite-scroll-component'
import InfinityLoader from '../components/InfinityLoader'
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import NoMoretransaction from './NoMoretransaction';
import { memo } from 'react';
import Button from '@mui/material/Button';

function SingleTransaction({ transactions, setTransactions, hasMore, fetchTransaction, setFilters, filters, handleFilter, ApplyFilters }) {
  async function deleteTrans(id) {
    let isConfirm = confirm("Are you sure you want to delete this transaction?")
    if (isConfirm) {
      try {
        let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/transaction/deleteTrans?id=${id}`)
        if (response.data.success) {
          toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error("Could not delete transaction")
      }
    }
  }
  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col bg-white p-4 rounded-2xl shadow-sm mb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label htmlFor="fromDate" className="whitespace-nowrap text-sm font-medium text-gray-700 w-24">From:</label>
              <input
                type="date"
                id="fromDate"
                name='fromDate'
                onChange={handleFilter}
                value={filters.fromDate}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label htmlFor="toDate" className="whitespace-nowrap text-sm font-medium text-gray-700 w-24">To:</label>
              <input
                type="date"
                id="toDate"
                name='toDate'
                onChange={handleFilter}
                value={filters.toDate}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <label htmlFor="category" className="whitespace-nowrap text-sm font-medium text-gray-700 w-24">Category:</label>
              <select
                id="category"
                name='category'
                onChange={handleFilter}
                value={filters.category}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Type */}
            <div className="flex items-center gap-2">
              <label htmlFor="type" className="whitespace-nowrap text-sm font-medium text-gray-700 w-24">Type:</label>
              <select
                id="type"
                name='type'
                onChange={handleFilter}
                value={filters.type}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <Button onClick={ApplyFilters} variant="contained" className="w-full">Apply</Button>
          </div>
        </div>

        <div className="overflow-y-auto rounded-lg h-[400px] border border-gray-200 bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" id='scrollableDiv'>
          <div className='min-w-[550px]'>
            <div className="sticky top-0 grid grid-cols-5 gap-2 lg:gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg border-b border-gray-200 shadow-sm">
              <p className="font-bold text-gray-800 text-center text-sm">Date</p>
              <p className='font-bold text-gray-800 text-center text-sm'>Name</p>
              <p className='font-bold text-gray-800 text-center text-sm'>Category</p>
              <p className='font-bold text-gray-800 text-center text-sm'>Amount</p>
              <p className='font-bold text-gray-800 text-center text-sm'>Delete</p>
            </div>
            <hr />
            <InfiniteScroll
              dataLength={transactions.length}
              next={fetchTransaction}
              hasMore={hasMore}
              loader={<InfinityLoader />}
              endMessage={<NoMoretransaction />}
              scrollableTarget="scrollableDiv"
            >
              {transactions.map((item) => (
                <div key={item._id}>
                  <div className='grid grid-cols-5 gap-2 lg:gap-4 p-4 bg-white hover:bg-gray-50 transition-all duration-200'>
                    <p className="font-medium text-gray-600 flex items-center justify-center text-[13.5px]">
                      {new Date(item.createdAt).toDateString()}
                    </p>
                    <p className="font-medium text-gray-600 flex items-center justify-center text-center text-[13.5px]">
                      {item.name}
                    </p>
                    <p className="font-medium text-gray-600 flex items-center justify-center text-center text-[13.5px]">
                      {item.categoryId.name}
                    </p>
                    <p className={`font-medium flex items-center justify-center text-center text-[13.5px] rounded-full ${item.type === 'expense' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
                      {item.type === 'expense' ?
                        <RiSubtractLine className="text-red-500" /> :
                        item.type === 'income' ?
                          <IoAddOutline className="text-green-500" /> : null}
                      <FaIndianRupeeSign className='text-[13.5px] mx-1' />
                      {item.amount}
                    </p>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => deleteTrans(item._id)}
                        className="p-1.5 rounded-full hover:bg-red-100 transition-colors duration-200"
                      >
                        <MdDelete className='text-xl text-red-500 hover:text-red-600' />
                      </button>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(SingleTransaction)
