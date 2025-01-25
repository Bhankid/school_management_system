"use client";

import { useFormStatus } from "react-dom";
import { addStudent } from "../actions/studentActions";
import { useState, useRef } from "react";
import Image from "next/image";
import Swal from 'sweetalert2';

function AddStudent() {
  const { pending } = useFormStatus();
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
      text: "You want to reset the form?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!'
    });

    if (result.isConfirmed && formRef.current) {
      formRef.current.reset();
      setImagePreview(null);
      await Swal.fire(
        'Reset!',
        'The form has been cleared.',
        'success'
      );
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await addStudent(formData);
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Student added successfully',
        confirmButtonColor: '#10B981'
      });
      formRef.current?.reset();
      setImagePreview(null);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Failed to add student',
        confirmButtonColor: '#EF4444'
      });
    }
  };

return (
  <form ref={formRef} action={handleSubmit}>
      <div className="p-8">
        <div className="text-lg font-bold mb-4 text-gray-800">Students</div>
        <div className="bg-white p-6 rounded-lg shadow-lg">   
      <nav className="text-sm text-gray-600 mb-4">
        <a href="#" className="text-black">
          Home
        </a>
        <i className="fas fa-chevron-right mx-2"></i>
        <span className="text-red-500">Student Admit Form</span>
          </nav>
          
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">
              Add New Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">Name *</label>
                <input
                  name="name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender *</label>
                <select
                  name="gender"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                >
                  <option value="">Please Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                <label className="block text-gray-700">Date Of Birth *</label>
                <input
                  name="dateOfBirth"
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Blood group *</label>
                <input
                  name="bloodGroup"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Religion *</label>
                <select
                  name="religion"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
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
                <label className="block text-gray-700">Admission Date *</label>
                <input
                  name="admissionDate"
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">Add New Parent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">
                  Father&apos;s Name
                </label>
                <input
                  name="fatherName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Mother&apos;s Name
                </label>
                <input
                  name="motherName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Father&apos;s Occupation
                </label>
                <input
                  name="fatherOccupation"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  name="address"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                />
              </div>
              <div>
                <label className="block text-gray-700">Religion</label>
                <select
                  name="parentReligion"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  style={{ color: '#080808FF' }}
                >
                  <option value="">Please Select Religion</option>
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center">
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
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
              <div className="ml-4">
                <label className="block text-gray-700">
                  Upload Student Photo (150px X 150px)
                </label>
                <input
                  name="photoUrl"
                  type="file"
                  className="mt-2"
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={pending}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
            >
              {pending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddStudent;
