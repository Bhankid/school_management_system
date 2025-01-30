"use client";

import { useState, useEffect, useRef } from "react";
import { createSubject, getAllSubjects, deleteSubject, updateSubject } from "../actions/subjectActions";
import Swal from 'sweetalert2';

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredResults, setFilteredResults] = useState<SubjectType[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const itemsPerPage = 5;
  const [editingSubject, setEditingSubject] = useState<SubjectType | null>(null);
  const [inputValues, setInputValues] = useState({
    subjectName: "",
    teacher: "",
    classes: "",
    days: "",
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjects = await getAllSubjects();
      setSubjects(subjects);
      setFilteredResults(subjects);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Failed to fetch subjects',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleSearch = () => {
    const filtered = subjects.filter((subject) => {
      const matchesSearch =
        searchTerm === "" ||
        subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.teacher.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        selectedClass === "" || subject.classes.includes(selectedClass);

      return matchesSearch && matchesClass;
    });
    setFilteredResults(filtered);
    setCurrentPage(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingSubject) {
      try {
        await updateSubject(editingSubject.id, formData);
        Swal.fire({
          icon: 'success',
          title: 'Subject updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        await fetchSubjects();
        setEditingSubject(null);
        setInputValues({
          subjectName: "",
          teacher: "",
          classes: "",
          days: "",
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update subject',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      try {
        await createSubject(formData);
        Swal.fire({
          icon: 'success',
          title: 'Subject added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        await fetchSubjects();
        setInputValues({
          subjectName: "",
          teacher: "",
          classes: "",
          days: "",
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed to add subject',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteSubject = (subject: SubjectType) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && subject.id !== undefined) {
        deleteSubject(subject.id).then(() => {
          fetchSubjects();
        });
      }
    });
  };

  const handleEditSubject = (subject: SubjectType) => {
    setEditingSubject(subject);
    setInputValues({
      subjectName: subject.subjectName,
      teacher: subject.teacher,
      classes: subject.classes,
      days: subject.days,
    });
  };

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black pb-4">Subjects</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-500">Subject</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-600">All Subjects</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by subject name or teacher..."
            className="border border-gray-300 p-2 rounded mr-2 basis-1/3 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="basis-1/3 min-w-[200px] border p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none text-lg  text-gray-900"
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
            className="bg-red-500 text-white p-2 rounded basis-1/3"
            onClick={handleSearch}
          >
            SEARCH
          </button>
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
              <th className="border p-2 text-left text-red-500">Actions</th>
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
                <td className="border p-2 text-gray-800 flex justify-center">
                  <button className="mr-2" onClick={() => handleEditSubject(item)}>
                    <i className="fas fa-edit text-blue-500"></i>
                  </button>
                  <button onClick={() => handleDeleteSubject(item)}>
                    <i className="fas fa-trash-alt text-red-500"></i>
                  </button>
                </td>
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
              value={editingSubject ? editingSubject.subjectName : inputValues.subjectName}
              onChange={(e) => {
                if (editingSubject) {
                  setEditingSubject({ ...editingSubject, subjectName: e.target.value });
                } else {
                  setInputValues({ ...inputValues, subjectName: e.target.value });
                }
              }}
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="teacher"
              placeholder="Teacher"
              required
              value={editingSubject ? editingSubject.teacher : inputValues.teacher}
              onChange={(e) => {
                if (editingSubject) {
                  setEditingSubject({ ...editingSubject, teacher: e.target.value });
                } else {
                  setInputValues({ ...inputValues, teacher: e.target.value });
                }
              }}
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="classes"
              placeholder="Classes"
              required
              value={editingSubject ? editingSubject.classes : inputValues.classes}
              onChange={(e) => {
                if (editingSubject) {
                  setEditingSubject({ ...editingSubject, classes: e.target.value });
                } else {
                  setInputValues({ ...inputValues, classes: e.target.value });
                }
              }}
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
            <input
              type="text"
              name="days"
              placeholder="Days"
              required
              value={editingSubject ? editingSubject.days : inputValues.days}
              onChange={(e) => {
                if (editingSubject) {
                  setEditingSubject({ ...editingSubject, days: e.target.value });
                } else {
                  setInputValues({ ...inputValues, days: e.target.value });
                }
              }}
              className="border border-gray-300 p-2 rounded text-gray-800"
            />
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2"
            >
              {editingSubject ? "Update" : "Save"}
            </button>
                      <button type="reset" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" onClick={() => {
            setInputValues({
              subjectName: "",
              teacher: "",
              classes: "",
              days: "",
            });
            setEditingSubject(null);
          }}>
            Reset
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subject;