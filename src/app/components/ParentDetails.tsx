import Image from "next/image";

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
            <p className="mb-2 col-span-2">
              <span className="font-medium">Address:</span> {parent.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDetails;
