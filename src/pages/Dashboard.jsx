import React, { useState } from 'react'
import balance from '/balance.svg'
import income from '/income.svg'
import expense from '/expense.svg'
import StatsCard from '../components/StatsCard'
import DashboardPieChart from '../components/DashboardPieChart'
import DashboardAreaChart from '../components/DashboardAreaChart'
import RecentTransaction from '../components/RecentTransaction'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase.js'
import axios from 'axios'
import { useEffect } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { mkConfig, generateCsv, download } from "export-to-csv";

function Dashboard() {
  const [stats, setStats] = React.useState([])
  let auth = getAuth(app)
  const [username, setUsername] = useState("No name")
  const [graphData, setGraphData] = useState([])
  const [exportType, setExportType] = useState("pdf")
  const [recentTransactions, setRecentTransactions] = useState([])

  async function getStats() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/getStats?email=${auth.currentUser.email}`)
      if (response.data.success) {
        setGraphData(response.data.graphData)
        setStats([
          {
            title: "Income",
            amount: response.data.income.toLocaleString(),
            icon: income,
          },
          {
            title: "Expense",
            amount: response.data.expense.toLocaleString(),
            icon: expense,
          },
          {
            title: "Balance",
            amount: response.data.balance.toLocaleString(),
            icon: balance,
          }
        ])
      }
      else {
        toast.error(response.data.message || "Could not fetch stats")
      }
    } catch (error) {
      toast.error("Could not fetch stats")
    }
  }

  async function handleExport() {
    try {
      if (exportType == 'pdf') {
        let doc = new jsPDF()
        let data = graphData
        const tableBody = data.map((item) => [
          item.year,
          item.monthName,
          item.income,
          item.expense,
        ]);
        autoTable(doc, {
          head: [['Year', 'Month', 'Income', 'Expense']],
          body: tableBody,
          startY: 30,
          styles: { fontSize: 10 },
        });
        doc.save('financial_report.pdf')
      }
      else if (exportType == 'csv') {
        const csvConfig = mkConfig({
          useKeysAsHeaders: true,
          filename: 'financial_report'
        });
        let data = graphData;
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv)
      }
      else {
        toast.error("Invalid export type selected")
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Could not export")
    }
  }

  async function recentTransaction() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/recentTransactions?email=${auth.currentUser.email}`)
      if (response.data.success) {
        setRecentTransactions(response.data.transactions || [])
      } else {
        toast.error(response.data.message || "Could not fetch recent transactions")
      }
    } catch (error) {
      toast.error("Could not fetch recent transactions")
    }
  }

  async function setEmail() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mail/addEmail`, {
        email: auth.currentUser.email
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName)
        getStats()
        recentTransaction()
        setEmail()
      }
    })
  }, [auth])

  return (
    <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md min-h-full bg-gradient-to-b from-white to-blue-50'>
      <h1 className='font-bold text-3xl lg:text-4xl'>Hi, <span className='text-blue-800 underline underline-offset-4'>{
        username}</span>👋</h1>
      <p className='mt-1 font-semibold'>Here's what happening with your money, lets manage your expense</p>
      <div className='grid gap-3.5 sm:gap-6 2xl:gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-6'>
        {
          stats.map((item) => {
            return (
              <StatsCard title={item.title} amount={item.amount} icon={item.icon} />
            )
          })
        }
      </div>
      <div className="overflow-x-auto h-auto mt-8 bg-white rounded-lg p-0 lg:p-4 shadow-sm">
        <div className="text-base sm:text-lg md:text-xl font-semibold mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4">
          <p className="text-sm sm:text-base md:text-lg">Monthly Expense Overview</p>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setExportType(e.target.value)} value={exportType}>
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
            <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer">
              Export
            </button>
          </div>
        </div>
        <DashboardAreaChart graphData={graphData} />
      </div>
      <div className='w-full flex gap-8 flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-2/3 mt-0 lg:mt-8 rounded-lg p-2 md:p-4 shadow-sm bg-white'>
          <RecentTransaction recentTransactions={recentTransactions} />
        </div>
        <div className="mt-8 bg-white rounded-lg p-4 shadow-sm max-w-4xl mx-auto w-full lg:w-1/3">
          <div className="text-xl font-semibold mb-4 text-center">Category wise expense</div>
          <div className="w-full h-[300px] sm:h-[400px]">
            <DashboardPieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
