import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import AddRecurring from '../components/AddRecurring';
import ListRecurring from '../components/ListRecurring'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase'
import { toast } from 'react-toastify'
import axios from 'axios'

function Recurring() {
    let navigate = useNavigate()
    let auth = getAuth(app)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState()
    const [frequency, setFrequency] = useState("monthly")
    const [type, setType] = useState("expense")
    const [category, setCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [startDate, setStartDate] = useState("")
    const [active, setActive] = useState("on")
    const [loading, setLoading] = useState(false)
    const [recurrences, setRecurrences] = useState([])

    async function getAllRecurrences() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recurrence/getAll?email=${auth.currentUser.email}`)
            if (response.data.success) {
                setRecurrences(response.data.recurrences)
                console.log(response.data.recurrences)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            // toast.error("Could not fetch recurrences")
        }
    }

    async function fetchCategories(){
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/typeCategories?email=${auth.currentUser.email}&q=${type}`)
            if (response.data.success){
                setCategoryList(response.data.categories)
                setCategory(response.data.categories[0]?._id || "")
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            // toast.success("Could not fetch categories")
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                fetchCategories()
                getAllRecurrences()
            }
        })
    }, [auth])

    useEffect(()=>{
        fetchCategories()
    }, [type])
    return (
        <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md min-h-full bg-gradient-to-b from-white to-blue-50'>
            <button className='font-bold text-lg flex items-center justify-start cursor-pointer gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white shadow-sm' onClick={() => navigate(-1)}><FaArrowLeft /> My Recurring</button>
            <div className='mt-6 flex flex-col gap-8'>
                <div className='flex items-center justify-center'>
                    <AddRecurring
                        name={name}
                        setName={setName}
                        email={email}
                        amount={amount}
                        setAmount={setAmount}
                        frequency={frequency}
                        setFrequency={setFrequency}
                        type={type}
                        setType={setType}
                        category={category}
                        setCategory={setCategory}
                        categoryList={categoryList}
                        setCategoryList={setCategoryList}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        active={active}
                        setActive={setActive}
                        loading={loading}
                        setLoading={setLoading}
                        getAllRecurrences={getAllRecurrences}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <ListRecurring recurrences={recurrences} getAllRecurrences={getAllRecurrences} />
                </div>
            </div>
        </div>
    )
}

export default Recurring;