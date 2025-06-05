import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

function DashboardAreaChart({ graphData }) {
  const data = graphData
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] min-w-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="monthName"
            tick={{ fontSize: window.innerWidth >= 768 ? 12 : 8 }}
            interval={0}
            angle={window.innerWidth >= 768 ? 0 : -90}
            textAnchor="end"
            height={50}
            fontSize={3}
          />
          <YAxis fontSize={window.innerWidth >= 768 ? 12 : 8} padding={0} />
          <Tooltip contentStyle={{ fontSize: window.innerWidth >= 768 ? '14px' : '10px' }} formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Bar dataKey="income" fill="green" maxBarSize={35} />
          <Bar dataKey="expense" fill="red" maxBarSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardAreaChart;