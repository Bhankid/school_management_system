import Image from "next/image";

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
            <p className="mb-2 col-span-2">
              <span className="font-medium">Address:</span> {teacher.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;