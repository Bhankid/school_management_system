"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const earningsData = [
  { day: "Mon", totalCollections: 85000, feesCollections: 70000 },
  { day: "Tue", totalCollections: 88000, feesCollections: 72000 },
  { day: "Wed", totalCollections: 86000, feesCollections: 71000 },
  { day: "Thu", totalCollections: 89000, feesCollections: 73000 },
  { day: "Fri", totalCollections: 87000, feesCollections: 74000 },
  { day: "Sat", totalCollections: 90000, feesCollections: 75000 },
  { day: "Sun", totalCollections: 92000, feesCollections: 76000 },
];

function EarningsSection() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
          Earnings
        </h2>
        <div className="text-sm sm:text-base text-gray-700">
          Jan 11, 2025
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
        <div>
          <p className="text-gray-700 text-sm sm:text-base">
            Total Collections
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500">
            $90,000
          </p>
        </div>
        <div>
          <p className="text-gray-700 text-sm sm:text-base">
            Fees Collections
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500">
            $75,000
          </p>
        </div>
      </div>
      
      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value}`}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCollections"
              name="Total Collections"
              stroke="#0546D1FF"
              strokeWidth={2}
              dot={{ fill: "#074AD9FF" }}
            />
            <Line
              type="monotone"
              dataKey="feesCollections"
              name="Fees Collections"
              stroke="#C71013FF"
              strokeWidth={2}
              dot={{ fill: "#C60A0AFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EarningsSection;