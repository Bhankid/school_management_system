"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 13;

const Teacher = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample teacher data
  const allTeachers = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: "Daniel Grant",
    gender: "Male",
    class: "2",
    subject: "English",
    address: "59 Australia, Sydney",
    dateOfBirth: "02/05/2001",
    phone: "+23359988568",
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allTeachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTeachers = allTeachers.slice(startIndex, endIndex);

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
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-red-600">Teachers</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-600">All Teachers</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Teachers Data
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <select className="border border-gray-300 rounded-lg p-3 w-48 focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option>Select Class</option>
          </select>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
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
              <th className="py-2 px-4 border-b text-red-500">Subject</th>
              <th className="py-2 px-4 border-b text-red-500">Address</th>
              <th className="py-2 px-4 border-b text-red-500">Date of Birth</th>
              <th className="py-2 px-4 border-b text-red-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.id}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.name}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.gender}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.class}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.subject}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.address}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.dateOfBirth}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {teacher.phone}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
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
  );
};

export default Teacher;
