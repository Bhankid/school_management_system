import Image from "next/image";

interface TeacherType {
  id: number;
  name: string;
  gender: string;
  class: string;
  subject: string;
  address: string;
  dateOfBirth: string;
  phone: string;
}

interface TeacherProfileProps {
  teacher: TeacherType;
}

function TeacherProfile({ teacher }: TeacherProfileProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
      <div className="mb-6">
        <Image src="/logo.png" alt="School Logo" width={48} height={48} />
      </div>

      <div className="flex gap-8">
        <div className="ml-4">
          <Image
            src="/student_profile.png"
            alt={`Profile of ${teacher.name}`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            {teacher.name}
          </h2>
          <div className="text-gray-800 grid grid-cols-2 gap-4">
            <p className="mb-2">
              <span className="font-medium">ID Number:</span> {teacher.id}
            </p>
            <p className="mb-2">
              <span className="font-medium">Name:</span> {teacher.name}
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
