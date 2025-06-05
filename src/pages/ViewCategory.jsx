import React, { useEffect, useState } from 'react'
import { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { IoArrowBackSharp } from "react-icons/io5";
import axios from 'axios'
import { toast } from 'react-toastify'
import { TbLoader2 } from "react-icons/tb";
import EditCategory from '../components/EditCategory';
import { MdDelete } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";

function ViewCategory() {
    let navigator = useNavigate()
    const location = useLocation()
    const { id } = location.state || {}
    const [category, setCategory] = useState({})
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [transactions, setTransactions] = useState([])
    async function fetchcategory() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/getOne?id=${id}`)
            if (response.data.success) {
                setCategory(response.data.category)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteTrans(id){
        try {
            let isConfirm = confirm("Are you sure you want to delete this transaction? This action cannot be undone.")
            if (isConfirm){
                let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/transaction/deleteTrans?id=${id}`)
                if (response.data.success) {
                    toast.success("Transaction deleted successfully")
                    fetchByCatogery()
                }
                else {
                    toast.error(response.data.message || "Failed to delete transaction")
                }
            }
        } catch (error) {
            toast.error('Could not delete transaction')
        }
    }

    async function deleteCategory() {
        if (!id) {
            toast.error("Category ID is required to delete")
            return;
        }
        let confirmDelete = window.confirm("Are you sure you want to delete this category? This action cannot be undone.");
        if (confirmDelete) {
            setDeleteLoading(true)
            try {
                let response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/category/delete?id=${id}`)
                if (response.data.success) {
                    toast.success("Category deleted successfully")
                    setDeleteLoading(false)
                    navigator('/user/categories')
                } else {
                    toast.error(response.data.message || "Failed to delete category")
                    setDeleteLoading(false)
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error("An error occurred while deleting the category");
                setDeleteLoading(false);
            }
            finally {
                setDeleteLoading(false)
            }
        }
    }

    async function fetchByCatogery() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transaction/getTransById?id=${id}`)
            if (response.data.success) {
                setTransactions(response.data.transactions)
            }
            else {
                toast.error("Could not fetch transactions for this category")
            }
        } catch (error) {
            toast.error("Could not fetch catogeries")
        }
    }

    useEffect(() => {
        fetchcategory()
        fetchByCatogery()
    }, [])
    return (
        <>
            {
                edit && <EditCategory category={category} setEdit={setEdit} />
            }
            <div className='m-2 md:m-5 p-1 lg:p-4 shadow-lg min-h-full bg-gradient-to-b from-white to-blue-50 rounded-xl'>
                <div className='flex justify-between'>
                    <button className='flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-bold cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5' onClick={() => navigator('/user/categories')}>
                        <IoArrowBackSharp />
                        Back
                    </button>
                    <div className='flex gap-3'>
                        <button className='flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-bold cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5' onClick={() => setEdit(true)}>Edit</button>
                        <button className='flex items-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 transition-all rounded-lg text-white font-bold cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5' disabled={deleteLoading} onClick={deleteCategory}>
                            {
                                deleteLoading && <TbLoader2 className='animate-spin' />
                            }
                            Delete
                        </button>
                    </div>
                </div>
                <div className='mt-6 space-y-6'>
                    <div>
                        <div className='p-6 shadow-lg bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                            <div className='flex gap-4 items-center'>
                                <div className='flex-shrink-0'>
                                    <span className='w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner text-2xl transform hover:scale-110 transition-transform duration-200'>
                                        {category.emoji}
                                    </span>
                                </div>
                                <div className='flex flex-col items-start'>
                                    <h2 className='text-md xl:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
                                        {category.name}
                                    </h2>
                                    <p className='text-sm text-gray-500 font-medium'>4 items</p>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <span className='font-bold'>Type:</span>
                                <span className='text-blue-600 font-semibold'> {category.type}</span>
                            </div>
                            <div className='mt-2 text-sm italic text-gray-600 bg-gray-50 p-3 rounded-lg'>
                                {category.note}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-2 lg:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                            <span className='w-1 h-6 bg-blue-500 rounded-full'></span>
                            Transactions
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <div className="max-h-[500px] overflow-y-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            transactions != 0 &&
                                            transactions.map((item) => {
                                                return (
                                                    <tr key={item._id} className="hover:bg-blue-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{item.name}</td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${category.type == 'income' ? 'text-green-600' : 'text-red-600'}  font-semibold`}>
                                                            <div className="flex items-center justify-end">
                                                                {category.type == 'expense' ? <RiSubtractFill /> : category.type == 'income' ? <IoAddOutline /> : null} <MdCurrencyRupee />
                                                                <span>{item.amount}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                                            <button onClick={() => deleteTrans(item._id)} className="text-red-500 hover:text-red-700 transition-all duration-200 p-2 rounded-full hover:bg-red-50 transform hover:scale-110">
                                                                <MdDelete size={20} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ViewCategory);
