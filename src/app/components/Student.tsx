"use client";
import { useState, useEffect } from "react";
import { getAllStudents } from "../actions/studentActions";

interface StudentType {
  id: number;
  name: string;
  gender: string;
  class: string;
  dateOfBirth: string;
  Parent?: {
    fatherName: string;
    motherName: string;
    phone: string;
    address: string;
  };
}

const ITEMS_PER_PAGE = 13;

const StudentsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredResults, setFilteredResults] = useState<StudentType[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      const data = await getAllStudents();
      setStudents(data);
      setFilteredResults(data);
    };
    loadStudents();
  }, []);

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.Parent?.fatherName + " " + student.Parent?.motherName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesClass =
        selectedClass === "" || student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
    setFilteredResults(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredResults.slice(startIndex, endIndex);

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
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-500">
            All Students Data
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <input
              type="text"
              placeholder="Search by name or parent..."
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
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
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            >
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
                <tr
                  key={student.id}
                  className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-sm hover:scale-[1.01] cursor-pointer"
                >
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
                    {`${student.Parent?.fatherName}, ${student.Parent?.motherName}`}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.Parent?.address}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {student.Parent?.phone}
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
