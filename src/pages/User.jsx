import React from "react"
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from "react-router-dom"

function User() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  window.onclick = (e) => {
    if (e.target.className !== 'w-[45px] h-[45px] rounded-full border-2 border-blue-400 cursor-pointer hover:border-blue-600 transition-all duration-300') {
      setSidebarOpen(false);
    }
  }
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className="h-[89vh] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default User