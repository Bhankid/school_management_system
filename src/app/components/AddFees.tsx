"use client";

import { useRef } from "react";

function AddFees() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white p-4 md:p-8 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-400 pb-4">Account</h1>
          <div className="text-sm text-gray-500">
            Home <span className="text-red-500">&gt; Add Fees</span>
          </div>
        </div>
        <div className="bg-white p-4 md:p-8 rounded shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Add New Student Fees
          </h2>
          <form ref={formRef} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class *
                </label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Class</option>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num.toString()}>
                      Class {num}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount *
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Status</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFees;
