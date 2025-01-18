"use client";

import { useState, useEffect } from "react";
import { getAllExpenses } from "../actions/expenseActions";

interface ExpenseType {
  id: number;
  name: string;
  expenseType: string;
  amount: string;
  status: string;
  email: string;
  phone: string;
  dueDate: string | null;
}

const ITEMS_PER_PAGE = 15;

const Expense = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchExpenseType, setSearchExpenseType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [allExpenses, setAllExpenses] = useState<ExpenseType[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    const loadExpenses = async () => {
      const expenses = await getAllExpenses();
      const formattedExpenses = expenses.map(expense => ({
        ...expense,
        dueDate: expense.dueDate ? new Date(expense.dueDate).toISOString().split('T')[0] : null
      }));
      setAllExpenses(formattedExpenses);
      setFilteredExpenses(formattedExpenses);
    };

    loadExpenses();
  }, []);

  const handleSearch = () => {
    const filtered = allExpenses.filter((expense) => {
      const matchesName =
        searchName === "" ||
        expense.name.toLowerCase().includes(searchName.toLowerCase());

      const matchesExpenseType =
        searchExpenseType === "" ||
        expense.expenseType.toLowerCase().includes(searchExpenseType.toLowerCase());

      const matchesStatus =
        searchStatus === "" || expense.status.toLowerCase() === searchStatus.toLowerCase();

      return matchesName && matchesExpenseType && matchesStatus;
    });

    setFilteredExpenses(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">Account</h1>
        <div className="border-b-2 border-red-500 w-12 my-1"></div>
        <div className="mt-2 text-gray-600">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-red-500">Expenses</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          All Expenses
        </h3>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 border rounded w-1/3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by expense type..."
            className="p-2 border rounded w-1/3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={searchExpenseType}
            onChange={(e) => setSearchExpenseType(e.target.value)}
          />
          <select
            className="p-2 border rounded w-1/3 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">Select Status...</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="due">Due</option>
          </select>
          <button
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors duration-200"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Expense Type
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Amount
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Parent Email
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Parent Phone
                </th>
                <th className="py-2 px-4 border-b text-gray-900 font-semibold">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                >
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.name}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.expenseType}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.amount}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-white font-medium ${
                        expense.status.toLowerCase() === "unpaid"
                          ? "bg-red-600"
                          : expense.status.toLowerCase() === "paid"
                          ? "bg-blue-600"
                          : "bg-red-700"
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.email}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.phone}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {expense.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-gray-700 font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-red-600"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={`text-gray-700 font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-red-600"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
