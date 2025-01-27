"use client";

import Image from "next/image";
import { useState } from "react";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import Swal from 'sweetalert2';
import { deleteStudent } from "../actions/studentActions"; 

interface StudentType {
  id: number;
  name: string;
  gender: string;
  class: string;
  dateOfBirth: string;
  photoUrl: string | null;
  Parent?: {
    fatherName: string;
    motherName: string;
    phone: string;
    address: string;
  };
}

interface StudentProfileCardProps {
  student: StudentType;
}

function StudentProfileCard({ student }: StudentProfileCardProps) {
  const [imageError, setImageError] = useState(false);

  // Use the photoUrl or a default image if there's an error
  const profilePhotoUrl = imageError || !student.photoUrl
    ? "/student_profile.png"
    : student.photoUrl;
  
    // Placeholder functions for update, delete, and export as PDF
  const handleUpdate = () => {
    console.log("Update student:", student.id);
    // Add your update logic here
  };

// Function to delete a student
const handleDelete = async () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteStudent(student.id).then(() => {
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        );
        // Refresh the page or update the UI
        window.location.reload();
      }).catch((error) => {
        console.error('Failed to delete student:', error);
        Swal.fire(
          'Error!',
          'Failed to delete student.',
          'error'
        );
      });
    }
  });
};

   // Function to export the student profile as PDF
  const handleExportPdf = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Set page size

      // Load a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

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

      // Add the logo to the PDF
      page.drawImage(logoImage, {
        x: 50, // X position
        y: 750 - logoDims.height, // Y position (below the top margin)
        width: logoDims.width,
        height: logoDims.height,
      });

      // Fetch the student's profile photo (if available)
      const profilePhotoResponse = await fetch(profilePhotoUrl);
      const profilePhotoArrayBuffer = await profilePhotoResponse.arrayBuffer();

      // Determine the profile photo format and embed it
      let profilePhotoImage;
      if (profilePhotoUrl.endsWith(".png")) {
        profilePhotoImage = await pdfDoc.embedPng(profilePhotoArrayBuffer);
      } else if (profilePhotoUrl.endsWith(".jpg") || profilePhotoUrl.endsWith(".jpeg")) {
        profilePhotoImage = await pdfDoc.embedJpg(profilePhotoArrayBuffer);
      } else {
        throw new Error("Unsupported profile photo format. Use PNG or JPG.");
      }

      // Scale the profile photo to fit within the page width
      const profilePhotoMaxWidth = 150; // Maximum width for the profile photo
      const profilePhotoScale = profilePhotoMaxWidth / profilePhotoImage.width;
      const profilePhotoDims = profilePhotoImage.scale(profilePhotoScale);

      // Add the profile photo to the PDF
      page.drawImage(profilePhotoImage, {
        x: 400, // X position (right side of the page)
        y: 750 - profilePhotoDims.height, // Y position (aligned with the logo)
        width: profilePhotoDims.width,
        height: profilePhotoDims.height,
      });

      // Add the student's details to the PDF
      const { name, id, gender, class: studentClass, dateOfBirth, Parent } = student;

      const text = `
        Student Profile
        ===============

        ID Number: ${id}
        Name: ${name}
        Gender: ${gender}
        Class: ${studentClass}
        Date of Birth: ${new Date(dateOfBirth).toLocaleDateString()}
        Father's Name: ${Parent?.fatherName || "N/A"}
        Mother's Name: ${Parent?.motherName || "N/A"}
        Phone: ${Parent?.phone || "N/A"}
        Address: ${Parent?.address || "N/A"}
      `;

      // Draw the text on the page (below the logo and profile photo)
      page.drawText(text, {
        x: 50,
        y: 750 - logoDims.height - 50, // Adjust Y position to leave space for the logo and profile photo
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and trigger a download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Student_Profile_${name}.pdf`;
      link.click();

      console.log("PDF exported successfully!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full transform scale-95 opacity-0 animate-bounceIn">
      <div className="mb-6">
        <Image src="/logo.png" alt="School Logo" width={48} height={48} />
      </div>

      <div className="flex gap-8">
        <div className="ml-4 relative w-[150px] h-[150px]">
          <Image
            src={profilePhotoUrl}
            alt={`Profile of ${student.name}`}
            fill
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="flex-1">
          <h2 className="text -xl font-bold text-blue-600 mb-4">{student.name}</h2>
          <div className="text-gray-800 grid grid-cols-2 gap-4">
            <p className="mb-2">
              <span className="font-medium">ID Number:</span> {student.id}
            </p>
            <p className="mb-2">
              <span className="font-medium">Name:</span> {student.name}
            </p>
            <p className="mb-2">
              <span className="font-medium">Gender:</span> {student.gender}
            </p>
            <p className="mb-2">
              <span className="font-medium">Father Name:</span> {student.Parent?.fatherName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Mother Name:</span> {student.Parent?.motherName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Date Of Birth:</span> {new Date(student.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-medium">Class:</span> {student.class}
            </p>
            <p className="mb-2">
              <span className="font-medium">Phone:</span> {student.Parent?.phone}
            </p>
            <p className="mb-2 col-span-2 flex items-center gap-4">
              <span className="font-medium">Address:</span> {student.Parent?.address}
             <span className="flex items-center gap-2 ml-auto">
                {/* Icons for Update, Delete, and Export as PDF */}
                <FaEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl"
                  onClick={handleUpdate}
                  title="Update"
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
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
    </div>
  );
}

export default StudentProfileCard;