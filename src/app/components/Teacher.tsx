"use client";

import { useState } from "react";
import TeacherProfile from "./TeacherProfile";

interface TeacherType {
  id: number;
  name: string;
  gender: string;
  class: string;
  subject: string;
  address: string;
  dateOfBirth: string;
  phone: string;
}

const ITEMS_PER_PAGE = 13;

const Teacher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
    null
  );
  const [isProfileVisible, setIsProfileVisible] = useState(false);

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

  const [filteredTeachers, setFilteredTeachers] =
    useState<TeacherType[]>(allTeachers);

  const handleTeacherClick = (teacher: TeacherType) => {
    setSelectedTeacher(teacher);
    setIsProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
    setTimeout(() => setSelectedTeacher(null), 300);
  };

  const handleSearch = () => {
    const filtered = allTeachers.filter((teacher) => {
      const matchesSearch =
        searchTerm === "" ||
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        selectedClass === "" || teacher.class === selectedClass;

      return matchesSearch && matchesClass;
    });
    setFilteredTeachers(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

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
            placeholder="Search by name or subject..."
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg p-3 w-48 focus:ring-2 focus:ring-red-500 focus:outline-none"
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
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
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
                <th className="py-2 px-4 border-b text-red-500">Subject</th>
                <th className="py-2 px-4 border-b text-red-500">Address</th>
                <th className="py-2 px-4 border-b text-red-500">
                  Date of Birth
                </th>
                <th className="py-2 px-4 border-b text-red-500">Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  onClick={() => handleTeacherClick(teacher)}
                  className="transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow cursor-pointer"
                >
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
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-gray-500 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:text-red-600"
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
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                : "cursor-pointer hover:text-red-600"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {selectedTeacher && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            isProfileVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseProfile}
        >
          <div
            className={`transform transition-all duration-300 ${
              isProfileVisible
                ? "scale-100 translate-y-0"
                : "scale-95 translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <TeacherProfile teacher={selectedTeacher} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
