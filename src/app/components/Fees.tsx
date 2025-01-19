"use client";

import { useState, useEffect } from "react";
import { getAllFees } from "../actions/feeActions";

interface FeeType {
  id: number;
  name: string;
  gender: string;
  class: string;
  amount: number;
  status: string;
  email: string | undefined;
  phone: string | undefined;
  dueDate: string | null;
}

const ITEMS_PER_PAGE = 13;
const CLASS_OPTIONS = [1, 2, 3, 4, 5, 6];
const STATUS_OPTIONS = ["paid", "unpaid"];

const Fees = () => {
  const [fees, setFees] = useState<FeeType[]>([]);
  const [filteredFees, setFilteredFees] = useState<FeeType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const data = await getAllFees();
        setFees(data);
        setFilteredFees(data);
      } catch (error) {
        console.error("Failed to fetch fees:", error);
      }
    };
    fetchFees();
  }, []);

  const handleSearch = () => {
    const filtered = fees.filter((fee) => {
      const matchesName = searchName === "" || fee.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesClass = selectedClass === "" || fee.class === selectedClass;
      const matchesStatus = selectedStatus === "" || fee.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchesName && matchesClass && matchesStatus;
    });
    setFilteredFees(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredFees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFees = filteredFees.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold pb-4 text-black">Account</h1>
          <div className="text-sm text-gray-800">
            <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>
            <span className="text-red-500">Student Fees</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">All Student Fees Data</h2>
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
              {CLASS_OPTIONS.map((num) => (
                <option key={`class-${num}`} value={num.toString()}>
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
              {STATUS_OPTIONS.map((status) => (
                <option key={`status-${status}`} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="flex-1 min-w-[200px] bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200"
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
                  <th className="py-2 px-4 border-b text-red-500">Parent Email</th>
                  <th className="py-2 px-4 border-b text-red-500">Parent Phone</th>
                </tr>
              </thead>
              <tbody>
                {currentFees.map((fee, index) => (
                  <tr key={`fee-${fee.id}-${index}`} className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md">
                    <td className="py-2 px-4 border-b text-gray-800">{fee.id}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.name}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.gender}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.class}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.amount}</td>
                    <td className="py-2 px-4 border-b text-gray-800">
                      <span className={`px-2 py-1 rounded text-white ${fee.status.toLowerCase() === "unpaid" ? "bg-red-500" : "bg-blue-600"}`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.email}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{fee.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`text-gray-500 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-red-500"}`}
              onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={`page-${page}`}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${currentPage === page ? "bg-red-500 text-white" : "bg-white border hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className={`text-gray-500 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-red-500"}`}
              onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
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