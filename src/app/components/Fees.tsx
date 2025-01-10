"use client";
import { useState } from "react";

interface FeeType {
  id: number;
  name: string;
  gender: string;
  class: string;
  amount: string;
  status: string;
  email: string;
  phone: string;
}

const ITEMS_PER_PAGE = 13;

const Fees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const [filteredFees, setFilteredFees] = useState<FeeType[]>(allFees);

  const handleSearch = () => {
    const filtered = allFees.filter((fee) => {
      const matchesName =
        searchName === "" ||
        fee.name.toLowerCase().includes(searchName.toLowerCase());

      const matchesClass = selectedClass === "" || fee.class === selectedClass;

      const matchesStatus =
        selectedStatus === "" ||
        fee.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesName && matchesClass && matchesStatus;
    });

    setFilteredFees(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredFees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFees = filteredFees.slice(startIndex, endIndex);

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
            <span className="text-red-500">Student Fees</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            All Student Fees Data
          </h2>
          <div className="flex flex-wrap mb-4 gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              className="flex-1 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <select
              className="flex-1 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num.toString()}>
                  Class {num}
                </option>
              ))}
            </select>
            <select
              className="flex-1 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <button
              className="flex-1 min-w-[200px] bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200"
              onClick={handleSearch}
            >
              SEARCH
            </button>
          </div>

          <div className="overflow-x-auto">
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
                  <tr
                    key={fee.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md cursor-pointer"
                  >
                    <td className="py-2 px-4 border-b text-gray-800">
                      {fee.id}
                    </td>
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
                          fee.status.toLowerCase() === "unpaid"
                            ? "bg-red-500"
                            : "bg-blue-600"
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
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`text-gray-500 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:text-red-500"
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
                        : "bg-white border hover:bg-gray-50"
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
                  : "cursor-pointer hover:text-red-500"
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
