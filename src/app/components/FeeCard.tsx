"use client";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import { deleteFee } from "../actions/feeActions";
import Swal from "sweetalert2";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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

    // Add the fee receipt title
    page.drawText("Fee Receipt", {
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

    // Add the fee details below the school's name
    const feeDetailsLeft = `
      ID Number: ${fee.id}
      Name: ${fee.name}
      Gender: ${fee.gender}
      Class: ${fee.class}
    `;

    const feeDetailsRight = `
      Amount: ${fee.amount}
      Status: ${fee.status}
      Parent Email: ${fee.email}
      Parent Phone: ${fee.phone}
      Due Date: ${fee.dueDate}
    `;

    // Draw the fee details on the page in 2 columns
    page.drawText(feeDetailsLeft, {
      x: 50,
      y: 620,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(feeDetailsRight, {
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
    link.download = `Fee_Receipt_${fee.name}.pdf`;
    link.click();

    console.log("PDF exported successfully!");
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
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