"use client";

import { useState } from "react";
import AddFeeGroup from "../components/AddFeeGroup";

interface Fee {
  type: string;
  amount: string;
}

interface FeeGroup {
  id: number;
  name: string;
  fees: Fee[];
  description: string;
}

const ITEMS_PER_PAGE = 5;

const Account = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");

  const allFeeGroups: FeeGroup[] = [
    {
      id: 1,
      name: "Creche Fees",
      fees: [
        { type: "Feeding Fee", amount: "GHS200.00" },
        { type: "Maintenance", amount: "GHS100.00" },
        { type: "Tuition", amount: "GHS250.00" },
      ],
      description: "To be paid every semester",
    },
    {
      id: 2,
      name: "Nurse Fee Group",
      fees: [
        { type: "Feeding Fee", amount: "GHS150.00" },
        { type: "Maintenance", amount: "GHS100.00" },
        { type: "Tuition", amount: "GHS450.00" },
      ],
      description: "To be paid every semester",
    },
    {
      id: 3,
      name: "Kindergarten Fee Group",
      fees: [
        { type: "Feeding Fee", amount: "GHS180.00" },
        { type: "Maintenance", amount: "GHS120.00" },
        { type: "Tuition", amount: "GHS500.00" },
      ],
      description: "To be paid every semester",
    },
    {
      id: 4,
      name: "Class 1 Fee Group",
      fees: [
        { type: "Feeding Fee", amount: "GHS100.00" },
        { type: "PTA", amount: "GHS50.00" },
        { type: "Computer Fees", amount: "GHS150.00" },
        { type: "Tuition", amount: "GHS500.00" },
      ],
      description: "To be paid every semester",
    },
    {
      id: 5,
      name: "Class 2 Fee Group",
      fees: [
        { type: "Feeding Fee", amount: "GHS100.00" },
        { type: "PTA", amount: "GHS50.00" },
        { type: "Computer Fees", amount: "GHS150.00" },
        { type: "Tuition", amount: "GHS500.00" },
      ],
      description: "To be paid every semester",
    },
  ];

  const filteredFeeGroups = allFeeGroups.filter((group) => {
    const searchLower = searchTerm.toLowerCase();
    const hasMatchingFees = group.fees.some(
      (fee) =>
        fee.type.toLowerCase().includes(searchLower) ||
        fee.amount.toLowerCase().includes(searchLower)
    );

    return (
      group.name.toLowerCase().includes(searchLower) ||
      group.description.toLowerCase().includes(searchLower) ||
      hasMatchingFees
    );
  });

  const totalPages = Math.ceil(filteredFeeGroups.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFeeGroups = filteredFeeGroups.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
      <div className="text-lg font-bold mb-4 text-gray-800">Account</div>
      <nav className="text-sm text-gray-600 mb-4">
        <a href="#" className="text-black">
          Home
        </a>
        <i className="fas fa-chevron-right mx-2"></i>
        <span className="text-red-500">Fees Group</span>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-8">
            <button
              className={`flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors pb-2 relative ${
                activeTab === "list" ? "text-red-500" : ""
              }`}
              onClick={() => setActiveTab("list")}
            >
              <i className="fas fa-list"></i>
              <span>Fees Group List</span>
              {activeTab === "list" && (
                <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-red-500"></div>
              )}
            </button>
            <button
              className={`flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors pb-2 relative ${
                activeTab === "add" ? "text-red-500" : ""
              }`}
              onClick={() => setActiveTab("add")}
            >
              <i className="fas fa-plus"></i>
              <span>Add Fees Group</span>
              {activeTab === "add" && (
                <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-red-500"></div>
              )}
            </button>
          </div>
          {activeTab === "list" && (
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          )}
        </div>

        {activeTab === "list" ? (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border p-2 text-gray-800">No.</th>
                  <th className="border p-2 text-gray-800">Name</th>
                  <th className="border p-2 text-gray-800">Fees Type</th>
                  <th className="border p-2 text-gray-800">Description</th>
                </tr>
              </thead>
              <tbody>
                {currentFeeGroups.length > 0 ? (
                  currentFeeGroups.map((group) => (
                    <tr
                      key={group.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="border p-2 text-center text-gray-800">
                        {group.id}
                      </td>
                      <td className="border p-2 text-gray-800">{group.name}</td>
                      <td className="border p-2 text-gray-800">
                        {group.fees.map((fee, index) => (
                          <div key={index}>
                            {fee.type} - {fee.amount}
                            {index < group.fees.length - 1 && <br />}
                          </div>
                        ))}
                      </td>
                      <td className="border p-2 text-gray-800">
                        {group.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No matching fee groups found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                className={`text-gray-700 hover:text-red-500 transition-colors ${
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
                      className={`px-3 py-1 rounded transition-colors ${
                        currentPage === page
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                className={`text-gray-700 hover:text-red-500 transition-colors ${
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
          </>
        ) : (
          <AddFeeGroup />
        )}
      </div>
    </div>
  );
};

export default Account;
