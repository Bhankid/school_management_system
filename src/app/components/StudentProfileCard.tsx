import Image from "next/image";

function StudentProfileCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
      <div className="flex items-center mb-6">
        <Image
          src="/logo.png"
          alt="School Logo"
          width={48}
          height={48}
          className="mr-4"
        />
        <Image
          src="/student_profile.png"
          alt="Profile of Daniel Grant"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      </div>
      <h2 className="text-xl font-bold text-blue-600 mb-2">Daniel Grant</h2>
      <p className="text-gray-600 mb-4">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
      </p>
      <div className="text-gray-800">
        <p className="mb-2">
          <span className="font-medium">ID Number:</span> 22
        </p>
        <p className="mb-2">
          <span className="font-medium">Name:</span> Daniel Grant
        </p>
        <p className="mb-2">
          <span className="font-medium">Gender:</span> Male
        </p>
        <p className="mb-2">
          <span className="font-medium">Father Name:</span> Steve Grant
        </p>
        <p className="mb-2">
          <span className="font-medium">Mother Name:</span> Naomi Grant
        </p>
        <p className="mb-2">
          <span className="font-medium">Date Of Birth:</span> 07.08.2016
        </p>
        <p className="mb-2">
          <span className="font-medium">Religion:</span> Islam
        </p>
        <p className="mb-2">
          <span className="font-medium">Father Occupation:</span> Graphic
          Designer
        </p>
        <p className="mb-2">
          <span className="font-medium">E-mail:</span> arabgrant@gmail.com
        </p>
        <p className="mb-2">
          <span className="font-medium">Admission Date:</span> 07.08.2019
        </p>
        <p className="mb-2">
          <span className="font-medium">Class:</span> 2
        </p>
      </div>
    </div>
  );
}

export default StudentProfileCard;
