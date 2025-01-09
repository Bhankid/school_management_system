"use client";
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

const Subject = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample subject data
  const allSubjects = [
    {
      subject: "English",
      teacher: "Daniel Grant",
      classes: "12&4",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "Maths",
      teacher: "Daniel Grant",
      classes: "6&JH51",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "French",
      teacher: "Daniel Grant",
      classes: "12&4",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "Science",
      teacher: "Daniel Grant",
      classes: "6&JH51",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "Arts",
      teacher: "Daniel Grant",
      classes: "12&4",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "French",
      teacher: "Daniel Grant",
      classes: "12&4",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "Science",
      teacher: "Daniel Grant",
      classes: "6&JH51",
      days: "Mon, Tue and Fri",
    },
    {
      subject: "Arts",
      teacher: "Daniel Grant",
      classes: "12&4",
      days: "Mon, Tue and Fri",
    },
    // Add more subjects as needed
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allSubjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSubjects = allSubjects.slice(startIndex, endIndex);

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black pb-4">Subjects</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-500">Subject</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-600">All Subjects</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by subject name..."
            className="border border-gray-300 p-2 rounded mr-2 flex-1"
          />
          <select className="border border-gray-300 p-2 rounded mr-2">
            <option>Select Class</option>
            <option>Basic 1</option>
            <option>Basic 2</option>
            <option>Basic 3</option>
            <option>Basic 4</option>
            <option>Basic 5</option>
            <option>Basic 6</option>
          </select>
          <button className="bg-red-500 text-white p-2 rounded">SEARCH</button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left text-red-500">
                Subject Name
              </th>
              <th className="border p-2 text-left text-red-500">Teacher</th>
              <th className="border p-2 text-left text-red-500">Classes</th>
              <th className="border p-2 text-left text-red-500">Days</th>
            </tr>
          </thead>
          <tbody>
            {currentSubjects.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border p-2 text-gray-800">{item.subject}</td>
                <td className="border p-2 text-gray-800">{item.teacher}</td>
                <td className="border p-2 text-gray-800">{item.classes}</td>
                <td className="border p-2 text-gray-800">{item.days}</td>
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
                    ? "bg-red-500 text-white"
                    : "bg-white border border-gray-300 text-gray-500"
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

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Subject</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Subject Name *"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Teacher"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Classes"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Days"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
        </div>
        <div className="flex mt-4">
          <button className="bg-red-500 text-white p-2 rounded mr-2">
            Save
          </button>
          <button className="bg-blue-500 text-white p-2 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Subject;
