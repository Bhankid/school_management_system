"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
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
            <p className="mb-2 col-span-2">
              <span className="font-medium">Address:</span> {student.Parent?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileCard;