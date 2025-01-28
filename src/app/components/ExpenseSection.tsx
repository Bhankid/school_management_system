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
import { useState, useEffect } from "react";
import toastr from "toastr";
import { getAllExpenses } from "../actions/expenseActions";

interface ExpenseData {
  month: string;
  expenses: number;
  color: string;
}

function ExpenseSection() {
  const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getAllExpenses();

        if (expenses.length === 0) {
          toastr.error("No expenses found!");
          setLoading(false);
          return;
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Set current month and year for display
        setCurrentMonthYear(
          currentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        );

        // Get data for the past 3 months dynamically
        const pastThreeMonths = [
          new Date(currentYear, currentMonth - 2, 1),
          new Date(currentYear, currentMonth - 1, 1),
          new Date(currentYear, currentMonth, 1),
        ];

        const monthsData = pastThreeMonths.map((date, index) => {
          const adjustedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          );
          const month = adjustedDate.toLocaleDateString("en-US", { month: "short" });
          const year = adjustedDate.getFullYear();

          const expensesForMonth = expenses
            .filter((expense) => {
              if (!expense.dueDate) return false;
              const dueDate = new Date(expense.dueDate);
              return (
                dueDate.getMonth() === adjustedDate.getMonth() &&
                dueDate.getFullYear() === adjustedDate.getFullYear()
              );
            })
            .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

          const colors = ["#0C9B40FF", "#0E25D5FF", "#D51212FF"];
          return {
            month: `${month} ${year}`,
            expenses: expensesForMonth,
            color: colors[index % colors.length],
          };
        });

        toastr.success("Expenses data fetched successfully!");
        setExpensesData(monthsData);
      } catch (error) {
        toastr.error("Failed to fetch expenses data.");
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg flex justify-center items-center min-h-[250px] sm:min-h-[300px]">
        <h2 className="text-lg text-gray-800 animate-pulse">Loading Expenses...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
          Expenses
        </h2>
        <div className="text-sm sm:text-base text-gray-600">{currentMonthYear}</div>
      </div>

      <div className="flex justify-between items-center mb-4">
        {expensesData.map((data) => (
          <div key={data.month}>
            <p className="text-xs sm:text-sm text-gray-600">{data.month}</p>
            <p className="text-sm sm:text-base text-gray-600" style={{ color: data.color }}>
              ₵{data.expenses.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expensesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `₵${value.toLocaleString()}`}
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
              fill="#E51E1EFF"
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
