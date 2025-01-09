"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 13;

const StudentsData = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data array - replace with your actual data
  const allStudents = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: "Daniel Grant",
    gender: "Male",
    class: "2",
    parents: "Kofi Grant",
    address: "59 Australia, Sydney",
    dateOfBirth: "02/05/2001",
    phone: "+23359988568",
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = allStudents.slice(startIndex, endIndex);

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
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Students</h1>
          <span className="mx-2 text-gray-500">/</span>
          <h2 className="text-red-500">All Students</h2>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-500">
            All Students Data
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Select Class</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
            </select>
            <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
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
                <th className="py-2 px-4 border-b text-red-500">Parents</th>
                <th className="py-2 px-4 border-b text-red-500">Address</th>
                <th className="py-2 px-4 border-b text-red-500">
                  Date of Birth
                </th>
                <th className="py-2 px-4 border-b text-red-500">Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.id}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.name}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.gender}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.class}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.parents}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.address}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.dateOfBirth}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`text-gray-500 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                        : "bg-gray-200 text-gray-700"
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
                  : ""
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

export default StudentsData;
