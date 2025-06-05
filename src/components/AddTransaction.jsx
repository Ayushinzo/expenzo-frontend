import React, { useEffect } from 'react'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase.js'
import { toast } from 'react-toastify'
import { TbLoader2 } from "react-icons/tb";

function AddTransaction() {
  let auth = getAuth(app)
  const [type, setType] = React.useState("expense")
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState()
  const [categorise, setCategories] = React.useState([])
  const [selectCategory, setSelectCategory] = React.useState()
  const [loader, setLoader] = React.useState(false)

  async function categoriesByType() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/typeCategories?q=${type}&email=${auth.currentUser.email}`)
      if (response.data.success) {
        setCategories(response.data.categories)
        setSelectCategory(response.data.categories[0]._id)
      }
    } catch (error) {
      toast.error("Could not fetch categories")
    }
  }

  async function addTransaction(e) {
    e.preventDefault()
    try {
      setLoader(true)
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transaction/add`, {
        email: auth.currentUser.email,
        selectCategory,
        type,
        name,
        amount: Number.parseInt(amount)
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setLoader(false)
        setName("")
        setAmount("")
      }
      else {
        toast.error(response.data.message)
        setLoader(false)
      }
    } catch (error) {
      toast.error("Could not add transaction")
      setLoader(false)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        categoriesByType()
      }
    })
  }, [type])
  return (
    <div className='p-4 w-full lg:w-[400px] shadow-sm bg-white rounded inline-block'>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Transaction</h3>
      <form onSubmit={addTransaction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 outline-none shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" required maxLength={20} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" required value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
            required
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}>
            {
              categorise.length != 0 && categorise.map((item) => {
                return (
                  <option key={item._id} value={item._id}>{item.name}</option>
                )
              })
            }
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center gap-2 font-bold" disabled={loader}>
          {loader && <TbLoader2 className='animate-spin' />}  Add Transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransaction
