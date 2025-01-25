import Image from "next/image";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";

interface ParentType {
  id: number;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  fatherOccupation: string;
  address: string;
  religion: string;
}

interface ParentDetailsProps {
  parent: ParentType;
}
function ParentDetails({ parent }: ParentDetailsProps) {
  // Placeholder functions for update, delete, and export as PDF
  const handleUpdate = () => {
    console.log("Update parent:", parent.id);
    // Add your update logic here
  };

  const handleDelete = () => {
    console.log("Delete parent:", parent.id);
    // Add your delete logic here
  };

  const handleExportPdf = () => {
    console.log("Export parent as PDF:", parent.id);
    // Add your PDF export logic here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
      <div className="mb-6">
        <Image src="/logo.png" alt="School Logo" width={48} height={48} />
      </div>

      <div className="flex gap-8">
        <div className="ml-4">
          <Image
            src="/student_profile.png"
            alt={`Profile of ${parent.fatherName}`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            {parent.fatherName}
          </h2>
          <div className="text-gray-800 grid grid-cols-2 gap-4">
            <p className="mb-2">
              <span className="font-medium">ID Number:</span> {parent.id}
            </p>
            <p className="mb-2">
              <span className="font-medium">Father&apos;s Name:</span>{" "}
              {parent.fatherName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Mother&apos;s Name:</span>{" "}
              {parent.motherName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Occupation:</span>{" "}
              {parent.fatherOccupation}
            </p>
            <p className="mb-2">
              <span className="font-medium">Religion:</span> {parent.religion}
            </p>
            <p className="mb-2">
              <span className="font-medium">Phone:</span> {parent.phone}
            </p>
            <p className="mb-2">
              <span className="font-medium">Email:</span> {parent.email}
            </p>
            <p className="mb-2 col-span-2 flex items-center gap-4">
              <span className="font-medium">Address:</span> {parent.address}
              <span className="flex items-center gap-2 ml-auto">
    {/* Icons for Update, Delete, and Export as PDF */}
    <FaEdit
      className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl" // Added text-xl
      onClick={handleUpdate}
      title="Update"
    />
    <FaTrash
      className="text-red-500 cursor-pointer hover:text-red-700 text-xl" // Added text-xl
      onClick={handleDelete}
      title="Delete"
    />
    <FaFilePdf
      className="text-green-500 cursor-pointer hover:text-green-700 text-xl" // Added text-xl
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

export default ParentDetails;
