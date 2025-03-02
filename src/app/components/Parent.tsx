"use client";

import { useState, useEffect } from "react";
import { getAllParents } from "../actions/parentActions";
import ParentDetails from "./ParentDetails";

interface ParentType {
  id: number;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  fatherOccupation: string;
  address: string;
  religion: string;
}

const ITEMS_PER_PAGE = 13;

const Parent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parents, setParents] = useState<ParentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredResults, setFilteredResults] = useState<ParentType[]>([]);
  const [selectedParent, setSelectedParent] = useState<ParentType | null>(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    const loadParents = async () => {
      try {
        const parentsData = await getAllParents();
        setParents(parentsData);
        setFilteredResults(parentsData);
      } catch (error) {
        console.error("Failed to load parents:", error);
      }
    };
    loadParents();
  }, []);

  const handleParentClick = (parent: ParentType) => {
    setSelectedParent(parent);
    setIsProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
    setTimeout(() => setSelectedParent(null), 300);
  };

  const handleSearch = () => {
    const filtered = parents.filter((parent) => {
      const matchesSearch =
        searchTerm === "" ||
        parent.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
    setFilteredResults(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentParents = filteredResults.slice(startIndex, endIndex);

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
    <div className="p-4 relative">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold pb-4 text-black">Parents</h1>
          <div className="text-sm text-gray-800">
            <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
            <span className="text-red-500">All Parents</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-500">
            All Parents Data
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <input
  type="text"
  placeholder="Search by name or email..."
  className="flex-1 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none text-lg text-gray-900"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            <select
  className="flex-1 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none text-lg text-gray-900"
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
>
  <option value="">Select Class</option>
  <option value="Creche">Creche</option>
  <option value="Nursery 1">Nursery 1</option>
  <option value="Nursery 2">Nursery 2</option>
  <option value="KG1">KG1</option>
  <option value="KG2">KG2</option>
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <option key={num} value={num.toString()}>
      Class {num}
    </option>
  ))}
  {[1, 2, 3].map((num) => (
    <option key={num} value={`JHS ${num}`}>
      JHS {num}
    </option>
  ))}
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
                  <th className="py- 2 px-2 border-b text-red-500">ID</th>
                  <th className="py-2 px-2 border-b text-red-500">Father&apos;s Name</th>
                  <th className="py-2 px-2 border-b text-red-500">Mother&apos;s Name</th>
                  <th className="py-2 px-2 border-b text-red-500">Occupation</th>
                  <th className="py-2 px-2 border-b text-red-500">Address</th>
                  <th className="py-2 px-2 border-b text-red-500">E-mail</th>
                  <th className="py-2 px-2 border-b text-red-500">Phone</th>
                  <th className="py-2 px-2 border-b text-red-500">Religion</th>
                </tr>
              </thead>
              <tbody>
                {currentParents.map((parent) => (
                  <tr
                    key={parent.id}
                    onClick={() => handleParentClick(parent)}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md cursor-pointer"
                  >
                    <td className="py-2 px-2 border-b text-gray-800">{parent.id}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.fatherName}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.motherName}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.fatherOccupation}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.address}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.email}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.phone}</td>
                    <td className="py-2 px-2 border-b text-gray-800">{parent.religion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`text-gray-500 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-red-500"}`}
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
                  className={`px-3 py-1 rounded ${currentPage === page ? "bg-red-500 text-white" : "bg-white border hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className={`text-gray-500 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-red-500"}`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedParent && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isProfileVisible ? "opacity-100" : "opacity-0"}`}
          onClick={handleCloseProfile}
        >
          <div
            className={`transform transition-all duration-300 ${isProfileVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ParentDetails parent={selectedParent} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Parent;