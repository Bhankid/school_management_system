"use client";

import { useState, useEffect, useRef } from "react";
import { createSubject, getAllSubjects } from "../actions/subjectActions";
import { toast } from "react-hot-toast";

interface SubjectType {
  id?: number;
  subjectName: string;
  teacher: string;
  classes: string;
  days: string;
}

const Subject = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjects = await getAllSubjects();
      setSubjects(subjects);
    } catch {
      toast.error("Failed to fetch subjects");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createSubject(formData);
      toast.success("Subject added successfully");
      await fetchSubjects();
      formRef.current?.reset();
    } catch {
      toast.error("Failed to add subject");
    }
  };

  const totalPages = Math.ceil(subjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="border-t transition-colors duration-200 ease-in-out hover:bg-gray-50"
              >
                <td className="border p-2 text-gray-800">{item.subjectName}</td>
                <td className="border p-2 text-gray-800">{item.teacher}</td>
                <td className="border p-2 text-gray-800">{item.classes}</td>
                <td className="border p-2 text-gray-800">{item.days}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-gray-500 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:text-gray-700"
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-red-500 text-white"
                    : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`text-gray-500 ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Subject</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              name="subjectName"
              placeholder="Subject Name *"
              required
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="teacher"
              placeholder="Teacher"
              required
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="classes"
              placeholder="Classes"
              required
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="days"
              placeholder="Days"
              required
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button type="reset" className="bg-blue-500 text-white p-2 rounded">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subject;
