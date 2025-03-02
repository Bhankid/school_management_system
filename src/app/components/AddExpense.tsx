"use client";

import { useRef } from "react";
import Swal from "sweetalert2";
import { addExpense } from "../actions/expenseActions";

interface Expense {
  name: string;
  expenseType: string;
  status: string;
  amount: number;
  phone?: string;
  email?: string;
  dueDate?: string;
}

function AddExpense({ onAdd }: { onAdd: (expense: Expense) => void }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const inputClasses =
    "mt-1 block w-full p-2 border border-gray-300 rounded text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-red-500";
  const selectClasses =
    "mt-1 block w-full p-2 border border-gray-300 rounded text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-red-500";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    try {
      const newExpense = await addExpense(formData); // Call the addExpense function
      onAdd({ ...newExpense, amount: Number(newExpense.amount), dueDate: newExpense.dueDate || undefined }); // Notify parent about the new expense
      handleReset(); // Reset the form after successful submission

      // Show SweetAlert2 success modal
      Swal.fire({
        title: "Success!",
        text: "Expense added successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
      });
    } catch (error) {
      console.error("Error adding expense:", error);

      // Show SweetAlert2 error modal
      Swal.fire({
        title: "Error!",
        text: "Failed to add expense. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#F44336",
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white p-4 md:p-8 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-400 pb-4">Account</h1>
          <div className="text-sm text-gray-500">
            Home <span className="text-red-500">{`>`} Add Expense</span>
          </div>
        </div>
        <div className="bg-white p-4 md:p-8 rounded shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Add New Expense
          </h2>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input type="text" name="name" required className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expense Type *
                </label>
                <select name="expenseType" required className={selectClasses}>
                  <option value="">Select Expense Type</option>
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
                <select name="status" required className={selectClasses}>
                  <option value="">Select Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount *
                </label>
                <input type="number" name="amount" required className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input type="tel" name="phone" className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  E-Mail Address
                </label>
                <input type="email" name="email" className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input type="date" name="dueDate" className={inputClasses} />
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

export default AddExpense;
