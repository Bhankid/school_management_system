"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { addExpense } from "../actions/expenseActions";

const AddExpense = ({ onAdd }: { onAdd: (expense: { id: number; name: string; expenseType: string; amount: string; status: string; email: string; phone: string; dueDate: string }) => void }) => {
  const [name, setName] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("expenseType", expenseType);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dueDate", dueDate);

    try {
      const newExpense = await addExpense(formData);
      onAdd({
        id: newExpense.id,
        name,
        expenseType,
        amount,
        status,
        email,
        phone,
        dueDate,
      });
      setName("");
      setExpenseType("");
      setAmount("");
      setStatus("");
      setEmail("");
      setPhone("");
      setDueDate("");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Expense added successfully!",
        confirmButtonColor: "#d33",
      });
    } catch (error) {
      console.error("Failed to add expense:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add expense.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expense Type *</label>
          <select
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700">Status *</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700">Amount *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-Mail Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
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
          onClick={() => {
            setName("");
            setExpenseType("");
            setAmount("");
            setStatus("");
            setEmail("");
            setPhone("");
            setDueDate("");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddExpense;