import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SingleTransaction from '../components/SingleTransaction'
import AddTransaction from '../components/AddTransaction'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase'
import { toast } from 'react-toastify'

function Transactions() {
    let auth = getAuth(app)
    let navigate = useNavigate()
    const [transactions, setTransactions] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [userEmail, setUserEmail] = useState("")
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        category: "All",
        type: "All"
    })

    function handleFilter(e) {
        let name = e.target.name;
        let value = e.target.value;
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    async function ApplyFilters() {
        try {
            filters.email = userEmail;
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transaction/getFilters`, {
                filters
            })

            if (response.data.success) {
                setTransactions(response.data.transactions)
                setHasMore(false)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Could not apply filters")
        }
    }

    async function fetchTransaction() {
        try {
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transaction/getTransactions`, {
                email: auth.currentUser.email,
                page,
                limit: 4
            })
            if (response.data.success) {
                setTransactions(prev => prev.concat(response.data.transactions))
                setPage(page + 1)
                if (transactions.length >= response.data.count) {
                    setHasMore(false)
                }
            }
            else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchFirst() {
        try {
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transaction/getTransactions`, {
                email: auth.currentUser.email,
                page,
                limit: 6
            })
            if (response.data.success) {
                setTransactions(prev => prev.concat(response.data.transactions))
                setPage(page + 1)
                if (transactions.length >= response.data.count) {
                    setHasMore(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchFirst()
                setUserEmail(user.email)
            }
        })
    }, [])
    return (
        <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md min-h-full bg-gradient-to-b from-white to-blue-50'>
            <button className='font-bold text-lg flex items-center justify-start cursor-pointer gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white shadow-sm' onClick={() => navigate(-1)}><FaArrowLeft /> My Transactions</button>
            <div className='mt-8 flex gap-6 flex-col xl:flex-col justify-center items-center'>
                <div className='w-full xl:w-2/5 items-center justify-center'>
                    <AddTransaction />
                </div>
                <div className='!w-full lg:min-h-[450px] m-5 xl:m-0 xl:w-3/5 p-4 shadow-sm bg-white rounded overflow-x-scroll'>
                    <SingleTransaction transactions={transactions} setTransactions={setTransactions} hasMore={hasMore} setHasMore={setHasMore} fetchTransaction={fetchTransaction} setFilters={setFilters} filters={filters} handleFilter={handleFilter} ApplyFilters={ApplyFilters} />
                </div>
            </div>
        </div>
    )
}

export default Transactions
