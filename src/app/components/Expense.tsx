"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 15;

const Expense = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample expense data
  const allExpenses = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    name: "Daniel Grant",
    expenseType: "Salary",
    amount: "$2,000.00",
    status: index % 3 === 0 ? "unpaid" : index % 3 === 1 ? "Paid" : "Due",
    email: "arabgrant@gmail.com",
    phone: "+2339988568",
    dueDate: "02/02/2019",
  }));

  const totalPages = Math.ceil(allExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentExpenses = allExpenses.slice(startIndex, endIndex);

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
            className="p-2 border rounded w-1/3 text-gray-800"
          />
          <input
            type="text"
            placeholder="Search by expense type..."
            className="p-2 border rounded w-1/3 text-gray-800"
          />
          <select className="p-2 border rounded w-1/3 text-gray-800">
            <option>Select Status...</option>
          </select>
          <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
            SEARCH
          </button>
        </div>

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
              <tr key={expense.id}>
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
                      expense.status === "unpaid"
                        ? "bg-red-600"
                        : expense.status === "Paid"
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

        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-gray-700 font-medium ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-gray-900"
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
                className={`px-3 py-1 rounded font-medium ${
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
            className={`text-gray-700 font-medium ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-gray-900"
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
