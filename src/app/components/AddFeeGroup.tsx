"use client";

import { useState } from "react";
import { addFeeGroup } from "../actions/feeGroupActions";
import Swal from "sweetalert2";

const AddFeeGroup = ({ onAdd }: { onAdd: (feeGroup: { id: number; name: string; description: string; fees: { type: string; amount: string }[] }) => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState([{ type: "", amount: "" }]);

  const addFeeField = () => {
    setFees([...fees, { type: "", amount: "" }]);
  };

  const removeFeeField = (index: number) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const handleFeeChange = (index: number, field: "type" | "amount", value: string) => {
    const newFees = [...fees];
    newFees[index][field] = value;
    setFees(newFees);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("fees", JSON.stringify(fees));

    try {
      const newFeeGroup = await addFeeGroup(formData);
      onAdd({ id: newFeeGroup.id, name, description, fees });
      setName("");
      setDescription("");
      setFees([{ type: "", amount: "" }]);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Fee group added successfully!",
        confirmButtonColor: "#d33",
      });
    } catch (error) {
      console.error("Failed to add fee group:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add fee group.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-red-500 focus:border-red-500"
            rows={3}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Fees *</label>
            <button
              type="button"
              onClick={addFeeField}
              className="text-red-500 hover:text-red-700"
            >
              <i className="fas fa-plus"></i> Add Fee
            </button>
          </div>

          {fees.map((fee, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Fee Type"
                value={fee.type}
                onChange={(e) => handleFeeChange(index, "type", e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-gray-900 focus:ring-red-500 focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleFeeChange(index, "amount", e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-gray-900 focus:ring-red-500 focus:border-red-500"
              />
              {fees.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeeField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
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
            setDescription("");
            setFees([{ type: "", amount: "" }]);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddFeeGroup;
