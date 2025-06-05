import React from 'react';
import { useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase/firebase.js'
import { toast } from 'react-toastify'
import axios from 'axios'

const COLORS = ['red', 'green', 'yellow', 'orange'];

function DashboardPieChart() {
    let auth = getAuth(app)
    const [graphData, setGraphData] = React.useState([])
    const [colors, setColors] = React.useState([])
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    async function fetchExpensesByCateogery() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/getExpenseByCategory?email=${auth.currentUser.email}`)
            if (response.data.success) {
                setGraphData(response.data.data)
                let colors = response.data.data.map((item, index) => {
                    return item.colorValue;
                })
                setColors(colors);
            }
        } catch (error) {
            toast.error("Failed to fetch expenses by category");
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchExpensesByCateogery()
            }
        })
    }, [])

    return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-2xl">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={graphData}
                        dataKey="totalAmount"
                        nameKey="categoryName"
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        paddingAngle={3}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                    >
                        {graphData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.colorValue} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '10px', border: 'none' }}
                        itemStyle={{ color: '#333' }}
                        formatter={(value, name) => [`₹${value}`, name]}
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: '20px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DashboardPieChart;
