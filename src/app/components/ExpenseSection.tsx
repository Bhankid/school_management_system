"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ExpenseData {
  month: string;
  expenses: number;
  color: string;
}

const expensesData: ExpenseData[] = [
  { month: "April", expenses: 125000, color: "#0C9B40FF" },
  { month: "May", expenses: 100000, color: "#0E25D5FF" },
  { month: "June", expenses: 75000, color: "#D51212FF" },
];

function ExpenseSection() {
  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
          Expenses
        </h2>
        <div className="text-sm sm:text-base text-gray-600">Jan 2025</div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-600">April 2021</p>
          <p className="text-sm sm:text-base text-green-500">$125,000</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-600">May 2021</p>
          <p className="text-sm sm:text-base text-blue-600">$100,000</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-600">June 2021</p>
          <p className="text-sm sm:text-base text-red-600">$75,000</p>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expensesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value}`}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="expenses"
              name="Monthly Expenses"
              radius={[4, 4, 0, 0]}
              fill="#ef4444"
            >
              {expensesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseSection;