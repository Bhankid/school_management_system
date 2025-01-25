import Image from "next/image";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TeacherType {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string | null;
  bloodGroup: string;
  religion: string;
  email: string;
  phone: string;
  class: string;
  address: string;
  admissionDate: string | null;
  photoUrl: string | null;
  subject?: string; 
}

interface TeacherProfileProps {
  teacher: TeacherType;
}

function TeacherProfile({ teacher }: TeacherProfileProps) {
  // Ensure the photoUrl is a valid path
  const profilePhotoUrl = teacher.photoUrl ? teacher.photoUrl : "/student_profile.png"; // Use the photoUrl or a default image

    // Placeholder functions for update, delete, and export as PDF
  const handleUpdate = () => {
    console.log("Update teacher:", teacher.id);
    // Add your update logic here
  };

  const handleDelete = () => {
    console.log("Delete teacher:", teacher.id);
    // Add your delete logic here
  };

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

    // Fetch the teacher's profile photo (if available)
    const profilePhotoUrl = teacher.photoUrl || "/student_profile.png"; // Use default if no photo is available
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

    // Add the teacher's details to the PDF
    const { firstName, lastName, id, gender, subject, class: teacherClass, dateOfBirth, phone, address } = teacher;

    const text = `
      Teacher Profile
      ===============

      ID Number: ${id}
      Name: ${firstName} ${lastName}
      Gender: ${gender}
      Subject: ${subject}
      Class: ${teacherClass}
      Date of Birth: ${dateOfBirth}
      Phone: ${phone}
      Address: ${address}
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
    link.download = `Teacher_Profile_${firstName}_${lastName}.pdf`;
    link.click();

    console.log("PDF exported successfully!");
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
};

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
      <div className="mb-6">
        <Image src="/logo.png" alt="School Logo" width={48} height={48} />
      </div>

      <div className="flex gap-8">
        <div className="ml-4">
          <Image
            src={profilePhotoUrl} // Use the constructed profile photo URL
            alt={`Profile of ${teacher.firstName} ${teacher.lastName}`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            {teacher.firstName} {teacher.lastName}
          </h2>
          <div className="text-gray-800 grid grid-cols-2 gap-4">
            <p className="mb-2">
              <span className="font-medium">ID Number:</span> {teacher.id}
            </p>
            <p className="mb-2">
              <span className="font-medium">Name:</span> {teacher.firstName} {teacher.lastName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Gender:</span> {teacher.gender}
            </p>
            <p className="mb-2">
              <span className="font-medium">Subject:</span> {teacher.subject}
            </p>
            <p className="mb-2">
              <span className="font-medium">Class:</span> {teacher.class}
            </p>
            <p className="mb-2">
              <span className="font-medium">Date Of Birth:</span>{" "}
              {teacher.dateOfBirth}
            </p>
            <p className="mb-2">
              <span className="font-medium">Phone:</span> {teacher.phone}
            </p>
           <p className="mb-2 col-span-2 flex items-center gap-4">
              <span className="font-medium">Address:</span> {teacher.address}
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

export default TeacherProfile;