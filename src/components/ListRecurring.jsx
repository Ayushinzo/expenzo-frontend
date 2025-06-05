import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdOutlineCategory } from "react-icons/md";

function ListRecurring({ recurrences, getAllRecurrences }) {
  const handleActive = async (e, id) => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/recurrence/turnOnOff`, {
        recurrenceId: id,
        active: e.target.checked
      })
      if (response.data.success) {
        e.target.checked = response.data.active;
      } else {
        toast.error("Failed to update recurrence status");
        e.target.checked = !e.target.checked; // Revert checkbox state on failure
      }
    } catch (error) {
      console.error("Error updating recurrence status:", error);
      toast.error("Failed to update recurrence status");
      e.target.value = !e.target.checked; // Revert checkbox state on failure
    }
  };

  async function handleRecurrenceDelete(id) {
    let confirmation = window.confirm("Are you sure you want to delete this recurrence? This action cannot be undone.");
    if (confirmation) {
      try {
        let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/recurrence/delete`, { recurrenceId: id });
        if (response.data.success) {
          toast.success("Recurrence deleted successfully");
          getAllRecurrences(); // Refresh the list after deletion
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete recurrence");
      }
    }
  }
  return (
    <div className='bg-white p-3 lg:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
        <span className='w-1.5 h-8 bg-blue-500 rounded-full'></span>
        Recurrence Transactions
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-1 lg:p-4">
        {
          recurrences.length != 0 &&
          recurrences.map((item, index) => {
            return (
              <div key={item._id} className="bg-white rounded-2xl p-3 lg:p-6 border border-gray-100 shadow-md transition-all duration-300 transform">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MdCurrencyRupee className="text-blue-500 text-xl" />
                      <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-start">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={item.active} onChange={(e) => handleActive(e, item._id)} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-green-500 transition-all"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
                    </label>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.active ? "on" : "off"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                  {[
                    { label: "Category", value: item.categoryId.name},
                    { label: "Frequency", value: item.frequency },
                    { label: "Start Date", value: item.startDate.split("T")[0] },
                    { label: "Type", value: item.type },
                    { label: "Amount", value: item.amount, icon: <MdCurrencyRupee /> },
                    { label: "Created At", value: item.createdAt.split("T")[0] },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-bold text-gray-700 block">{item.label}:</span>
                      <span className="text-gray-600 flex items-center gap-1">
                        {item.icon}{item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3">
                  <button className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-full transition-colors cursor-pointer" onClick={()=>handleRecurrenceDelete(item._id)}>
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            )
          })

        }

      </div>
    </div>
  );
}

export default ListRecurring;