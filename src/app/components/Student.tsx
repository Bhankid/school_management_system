"use client";

import React, { useState } from "react";

interface StudentData {
  id: number;
  name: string;
  gender: string;
  class: number;
  parents: string;
  address: string;
  dob: string;
  phone: string;
}

const Student: React.FC = () => {
  const data: StudentData[] = Array.from({ length: 34 }).map((_, index) => ({
    id: 22 + index,
    name: "Daniel Grant",
    gender: "Male",
    class: Math.floor(Math.random() * 5) + 1,
    parents: "Kofi Grant",
    address: "59 Australia, Sydney",
    dob: "02/05/2001",
    phone: "+123 9988568",
  }));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const handleClick = (page: number): void => {
    setCurrentPage(page);
  };

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: StudentData[] = data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const renderPageNumbers = (): React.ReactNode[] => {
     const pageNumbers: React.ReactNode[] = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-500">All Students</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">All Students Data</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <select className="flex-1 p-2 border border-gray-300 rounded">
            <option>Select Class</option>
          </select>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            SEARCH
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Class</th>
                <th className="py-2 px-4 border-b">Parents</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Date of Birth</th>
                <th className="py-2 px-4 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.gender}</td>
                  <td className="py-2 px-4 border-b">{item.class}</td>
                  <td className="py-2 px-4 border-b">{item.parents}</td>
                  <td className="py-2 px-4 border-b">{item.address}</td>
                  <td className="py-2 px-4 border-b">{item.dob}</td>
                  <td className="py-2 px-4 border-b">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex space-x-2">{renderPageNumbers()}</div>
          <button
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            className="text-gray-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
