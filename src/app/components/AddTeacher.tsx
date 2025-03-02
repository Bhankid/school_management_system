"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { addTeacher } from "../actions/teacherActions";
import Swal from 'sweetalert2';

function AddTeacher() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will clear all form data",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1932ECFF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!'
    });

    if (result.isConfirmed && formRef.current) {
      formRef.current.reset();
      setImagePreview(null);
      Swal.fire(
        'Reset!',
        'Form has been cleared',
        'success'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await addTeacher(formData);
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Teacher added successfully',
        confirmButtonColor: '#10B981'
      });
      formRef.current?.reset();
      setImagePreview(null);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Failed to add teacher',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  return (
    <div className="p-6">
      <div className="text-lg font-bold mb-4 text-gray-800">Teachers</div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <nav className="text-sm text-gray-600 mb-4">
          <a href="#" className="text-black">Home</a>
          <i className="fas fa-chevron-right mx-2"></i>
          <span className="text-red-500">Teacher Add Form</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6 text-gray-500">Add New Teacher</h1>
        
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender *</label>
            <select
              name="gender"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            >
              <option value="">Please Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Date Of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Blood Group *</label>
            <input
              type="text"
              name="bloodGroup"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Religion *</label>
            <select
              name="religion"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            >
              <option value="">Please Select Religion</option>
              <option value="christianity">Christianity</option>
              <option value="islam">Islam</option>
              <option value="hinduism">Hinduism</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Class *</label>
            <select
  name="class"
  className="w-full p-2 border border-gray-300 rounded text-lg text-gray-900"
  required
>
  <option value="">Please Select Class</option>
  <option value="Creche">Creche</option>
  <option value="Nursery 1">Nursery 1</option>
  <option value="Nursery 2">Nursery 2</option>
  <option value="KG1">KG1</option>
  <option value="KG2">KG2</option>
  <option value="1">Class 1</option>
  <option value="2">Class 2</option>
  <option value="3">Class 3</option>
  <option value="4">Class 4</option>
  <option value="5">Class 5</option>
  <option value="6">Class 6</option>
  <option value="JHS 1">JHS 1</option>
  <option value="JHS 2">JHS 2</option>
  <option value="JHS 3">JHS 3</option>
</select>
          </div>
          <div>
            <label className="block text-gray-700">Address *</label>
            <input
              type="text"
              name="address"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Admission Date *</label>
            <input
              type="date"
              name="admissionDate"
              required
              className="w-full mt-1 p-2 border rounded"
              style={{ color: '#080808FF' }}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center">
            <div className="w-36 h-36 bg-gray-200 rounded-full mb-4 overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <span className="text-gray-400">150px x 150px</span>
              )}
            </div>
            <label className="block text-gray-700 mb-2">
              Upload Teacher Photo (150px X 150px)
            </label>
            <input
              type="file"
              name="photoUrl"
              className="mb-4"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;