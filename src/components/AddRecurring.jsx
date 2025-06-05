import axios from 'axios';
import React, { useState } from 'react'
import { memo } from 'react';
import { TbLoader2 } from "react-icons/tb";
import { toast } from 'react-toastify';

function AddRecurring({ name, setName, email, amount, setAmount, frequency, setFrequency, type, setType, category, setCategory, categoryList, setCategoryList, startDate, setStartDate, active, setActive, loading, setLoading, getAllRecurrences }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/recurrence/add`, {
        name,
        email,
        amount,
        frequency,
        type,
        categoryId: category,
        startDate,
        active: active === 'on' ? true : false
      })

      if (response.data.success) {
        toast.success("Recurrence added successfully");
        setLoading(false)
        setName("");
        setAmount("");
        setFrequency("monthly");
        setType("expense");
        setStartDate("");
        setActive("on"); 
        getAllRecurrences()
      }
      else {
        setLoading(false)
        console.log(response.data.errors);
      }
    } catch (error) {
      toast.error("Could not add recurrence")
      console.error("Error adding recurrence:", error);
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg'>
      <h2 className='text-2xl font-bold mb-8 text-gray-800 border-b pb-4'>Add Recurring Transaction</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Transaction Name</label>
            <input
              type="text"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
              placeholder='Enter transaction name'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Amount (₹)</label>
            <input
              type="number"
              name='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
              placeholder='0.00'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Frequency</label>
            <select
              name="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white'
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
              className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white'
            >
              {
                categoryList.length != 0 &&
                categoryList.map((item, index) => {
                  return (
                    <>
                      <option key={index} value={item._id}>{item.name}</option>
                    </>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Transaction Type</label>
          <div className='flex gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type="radio"
                value="expense"
                id='expense'
                name='type'
                checked={type === 'expense'}
                onChange={(e) => setType(e.target.value)}
                className='w-4 h-4 text-blue-600'
              />
              <label htmlFor='expense' className='text-sm text-gray-700'>Expense</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type="radio"
                value="income"
                id='income'
                name='type'
                checked={type === 'income'}
                onChange={(e) => setType(e.target.value)}
                className='w-4 h-4 text-blue-600'
              />
              <label htmlFor='income' className='text-sm text-gray-700'>Income</label>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Start Date</label>
          <input
            type="date"
            name='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Status</label>
          <div className='flex gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type="radio"
                name='active'
                id='on'
                value="on"
                checked={active == 'on'}
                onChange={(e) => setActive(e.target.value)}
                className='w-4 h-4 text-blue-600'
              />
              <label htmlFor='on' className='text-sm text-gray-700'>On</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type="radio"
                name='active'
                id='off'
                value="off"
                checked={active == 'off'}
                onChange={(e) => setActive(e.target.value)}
                className='w-4 h-4 text-blue-600'
              />
              <label htmlFor='off' className='text-sm text-gray-700'>Off</label>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium cursor-pointer'
          >
            {
              loading &&
              <TbLoader2 className='inline-block animate-spin mr-2' />
            }
            Add Recurring Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(AddRecurring);