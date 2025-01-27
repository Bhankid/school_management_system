import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import { deleteExpense } from "../actions/expenseActions";
import Swal from "sweetalert2";

interface ExpenseType {
  id: number;
  name: string;
  expenseType: string;
  amount: string;
  status: string;
  email: string;
  phone: string;
  dueDate: string | null;
}

interface ExpenseProfileProps {
  expense: ExpenseType;
}

const ExpenseProfile = ({ expense }: ExpenseProfileProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = () => {
    console.log("Update expense");
  };

 const handleDelete = async () => {
  if (isDeleting) return;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0F30D3FF",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setIsDeleting(true);

      deleteExpense(expense.id)
        .then(() => {
          Swal.fire("Deleted!", "Expense has been deleted.", "success");
          window.location.reload(); 
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete expense.", "error");
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  });
};
  const handleExportPdf = () => {
    console.log("Export expense as PDF");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full transform scale-95 opacity-0 animate-bounceIn">
      <div className="flex-1">
        <h2 className="text-xl text-center font-bold text-blue-600 mb-4">Expense Details</h2>
        <div className="text-gray-800 grid grid-cols-2 gap-4">
          <p className="mb-2">
            <span className="font-medium">ID:</span> {expense.id}
          </p>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {expense.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Expense Type:</span> {expense.expenseType}
          </p>
          <p className="mb-2">
            <span className="font-medium">Amount:</span> {expense.amount}
          </p>
          <p className="mb-2">
            <span className="font-medium">Status:</span> {expense.status}
          </p>
          <p className="mb-2">
            <span className="font-medium">Parent Email:</span> {expense.email}
          </p>
          <p className="mb-2">
            <span className="font-medium">Parent Phone:</span> {expense.phone}
          </p>
          <p className="mb-2">
            <span className="font-medium">Due Date:</span> {expense.dueDate}
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

export default ExpenseProfile;