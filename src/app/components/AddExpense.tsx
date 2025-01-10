"use client";
import { useRef } from "react";

function AddExpense() {
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
            Home <span className="text-red-500"> &gt; Add Expense</span>
          </div>
        </div>
        <div className="bg-white p-4 md:p-8 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Add New Expenses
          </h2>
          <form ref={formRef} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expense Type *
                </label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Please Select Class</option>
                  <option value="salary">Salary</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="purchase">Purchase</option>
                  <option value="utilities">Utilities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Please Select</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
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
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default AddExpense;
