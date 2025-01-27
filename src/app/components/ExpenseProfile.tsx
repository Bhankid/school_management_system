import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import { deleteExpense } from "../actions/expenseActions";
import Swal from "sweetalert2";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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
  
const handleExportPdf = async () => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Set page size

    // Load a standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Fetch the school logo image
    const logoUrl = "/logo.png"; // Path to the logo image
    const logoResponse = await fetch(logoUrl);
    const logoArrayBuffer = await logoResponse.arrayBuffer();

    // Determine the logo image format and embed it
    let logoImage;
    if (logoUrl.endsWith(".png")) {
      logoImage = await pdfDoc.embedPng(logoArrayBuffer);
    } else if (logoUrl.endsWith(".jpg") || logoUrl.endsWith(".jpeg")) {
      logoImage = await pdfDoc.embedJpg(logoArrayBuffer);
    } else {
      throw new Error("Unsupported logo image format. Use PNG or JPG.");
    }

    // Scale the logo to fit within the page width
    const logoMaxWidth = 100; // Maximum width for the logo
    const logoScale = logoMaxWidth / logoImage.width;
    const logoDims = logoImage.scale(logoScale);

    // Add the school's name at the top of the page
    page.drawText("Bhankid International IT Institute", {
      x: 50,
      y: 750,
      size: 24,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Add the logo to the PDF
    page.drawImage(logoImage, {
      x: 450, // X position (right side of the school's name)
      y: 750 - logoDims.height, // Y position (aligned with the school's name)
      width: logoDims.width,
      height: logoDims.height,
    });

    // Add the expense receipt title
    page.drawText("Expense Receipt", {
      x: 250,
      y: 700,
      size: 18,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("===============", {
      x: 250,
      y: 680,
      size: 18,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Add the expense details below the school's name
    const expenseDetailsLeft = `
      ID Number: ${expense.id}
      Name: ${expense.name}
      Expense Type: ${expense.expenseType}
      Amount: ${expense.amount}
    `;

    const expenseDetailsRight = `
      Status: ${expense.status}
      Parent Email: ${expense.email}
      Parent Phone: ${expense.phone}
      Due Date: ${expense.dueDate}
    `;

    // Draw the expense details on the page in 2 columns
    page.drawText(expenseDetailsLeft, {
      x: 50,
      y: 620,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(expenseDetailsRight, {
      x: 300,
      y: 620,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    // Add a signature field
    page.drawText("Signature:", {
      x: 50,
      y: 500,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText("................................", {
      x: 150,
      y: 500,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and trigger a download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Expense_Receipt_${expense.name}.pdf`;
    link.click();

    console.log("PDF exported successfully!");
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
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