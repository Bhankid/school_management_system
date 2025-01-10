"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 13;

const Parent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample parent data - replace with your actual data
  const allParents = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: "Daniel Grant",
    gender: "Male",
    occupation: "Banker",
    address: "59 Australia, Sydney",
    email: "arabagrant@gmail.com",
    phone: "+23359988568",
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allParents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentParents = allParents.slice(startIndex, endIndex);

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
      <nav className="text-sm text-gray-600 mb-4">
        <a href="#" className="text-black">
          Home
        </a>
        <i className="fas fa-chevron-right mx-2"></i>
        <span className="text-red-500">All Parents</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-4 text-gray-700">
        All Parents Data
      </h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
        />
        <select className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded">
          <option>Select Class</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
          <option>Class 4</option>
          <option>Class 5</option>
          <option>Class 6</option>
        </select>
        <button className="flex-1 min-w-[200px] p-2 bg-red-500 text-white rounded hover:bg-red-600">
          SEARCH
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-red-500">ID</th>
              <th className="py-2 px-4 border-b text-red-500">Name</th>
              <th className="py-2 px-4 border-b text-red-500">Gender</th>
              <th className="py-2 px-4 border-b text-red-500">Occupation</th>
              <th className="py-2 px-4 border-b text-red-500">Address</th>
              <th className="py-2 px-4 border-b text-red-500">E-mail</th>
              <th className="py-2 px-4 border-b text-red-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentParents.map((parent) => (
              <tr key={parent.id}>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.id}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.name}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.gender}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.occupation}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.address}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.email}
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {parent.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`text-gray-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className={`text-gray-600 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Parent;
