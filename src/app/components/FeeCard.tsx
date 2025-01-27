"use client";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import { deleteFee } from "../actions/feeActions";
import Swal from "sweetalert2";

interface Fee {
  id: number;
  name: string;
  gender: string;
  class: string;
  amount: number;
  status: string;
  email: string;
  phone: string;
  dueDate: string;
}

interface FeeCardProps {
  fee: Fee;
}

const FeeCard = ({ fee }: FeeCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = () => {
    console.log("Update fee");
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);

        deleteFee(fee.id)
          .then(() => {
            Swal.fire("Deleted!", "Fee has been deleted.", "success");
          })
          .catch ((err) => {
  console.error("Failed to delete fee:", err);
  Swal.fire("Error!", "Failed to delete fee.", "error");
})
          .finally(() => {
            setIsDeleting(false);
          });
      }
    });
  };

  const handleExportPdf = () => {
    console.log("Export fee as PDF");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full transform scale-95 opacity-0 animate-bounceIn">
      <div className="flex-1">
        <h2 className="text-xl text-center font-bold text-blue-600 mb-4">Fee Details</h2>
        <div className="text-gray-800 grid grid-cols-2 gap-4">
          <p className="mb-2">
            <span className="font-medium">ID:</span> {fee.id}
          </p>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {fee.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Gender:</span> {fee.gender}
          </p>
          <p className="mb-2">
            <span className="font-medium">Class:</span> {fee.class}
          </p>
          <p className="mb-2">
            <span className="font-medium">Amount:</span> {fee.amount}
          </p>
          <p className="mb-2">
            <span className="font-medium">Status:</span> {fee.status}
          </p>
          <p className="mb-2">
            <span className="font-medium">Parent Email:</span> {fee.email}
          </p>
          <p className="mb-2">
            <span className="font-medium">Parent Phone:</span> {fee.phone}
          </p>
          <p className="mb-2">
            <span className="font-medium">Due Date:</span> {fee.dueDate}
          </p>
          <p className="mb-2 col-span-2 flex items-center gap-4">
            <span className="flex items-center gap-2 ml-auto">
              {/* Icons for Update, Delete, and Export as PDF */}
              <FaEdit
                className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl"
                onClick={handleUpdate}
                title="Update"
              />
              <FaTrash
                className={`text-red-500 cursor-pointer hover:text-red-700 text-xl ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleDelete}
                title="Delete"
              />
              <FaFilePdf
                className="text-green-500 cursor-pointer hover:text-green-700 text-xl"
                onClick={handleExportPdf}
                title="Export as PDF"
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeeCard;