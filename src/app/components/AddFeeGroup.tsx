"use client";

import { useState } from "react";

const AddFeeGroup = () => {
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

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
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
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddFeeGroup;
