"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 13;

const Fees = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample fees data
  const allFees = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: "Daniel Grant",
    gender: "Male",
    class: "2",
    amount: "$2,000.00",
    status: index % 2 === 0 ? "unpaid" : "Paid",
    email: "arabogrant@gmail.com",
    phone: "+23359988568",
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allFees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFees = allFees.slice(startIndex, endIndex);

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
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold pb-4 text-black">Account</h1>
          <div className="text-sm text-gray-800">
            <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
            <span>Student Fees</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            All Student Fees Data
          </h2>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="border p-2 rounded mr-2 mb-2 md:mb-0"
            />
            <select className="border p-2 rounded mr-2 mb-2 md:mb-0">
              <option>Select Class</option>
            </select>
            <select className="border p-2 rounded mr-2 mb-2 md:mb-0">
              <option>Select Status</option>
            </select>
            <button className="bg-red-500 text-white p-2 rounded">
              SEARCH
            </button>
          </div>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-red-500">ID</th>
                <th className="py-2 px-4 border-b text-red-500">Name</th>
                <th className="py-2 px-4 border-b text-red-500">Gender</th>
                <th className="py-2 px-4 border-b text-red-500">Class</th>
                <th className="py-2 px-4 border-b text-red-500">Amount</th>
                <th className="py-2 px-4 border-b text-red-500">Status</th>
                <th className="py-2 px-4 border-b text-red-500">
                  Parent Email
                </th>
                <th className="py-2 px-4 border-b text-red-500">
                  Parent Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFees.map((fee) => (
                <tr key={fee.id}>
                  <td className="py-2 px-4 border-b text-gray-800">{fee.id}</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.name}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.gender}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.class}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.amount}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        fee.status === "unpaid" ? "bg-red-500" : "bg-blue-600"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.email}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {fee.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`text-gray-500 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "bg-white border"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              className={`text-gray-500 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
