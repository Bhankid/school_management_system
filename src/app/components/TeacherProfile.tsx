import Image from "next/image";

const TeacherProfile = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <div className="flex items-center">
        <Image
          src="/student_profile.png"
          alt="Profile picture of a young man wearing a cap and a sleeveless shirt"
          width={128}
          height={128}
          className="rounded-full mr-8"
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Daniel Grant</h1>
          <p className="text-gray-600 mt-2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-700">
            <p>
              <span className="font-bold">ID Number:</span> 22
            </p>
            <p>
              <span className="font-bold">Name:</span> Daniel Grant
            </p>
            <p>
              <span className="font-bold">Gender:</span> Male
            </p>
            <p>
              <span className="font-bold">Father Name:</span> Steve Grant
            </p>
            <p>
              <span className="font-bold">Mother Name:</span> Naomi Grant
            </p>
          </div>
          <div className="text-gray-700">
            <p>
              <span className="font-bold">Date Of Birth:</span> 07.08.2016
            </p>
            <p>
              <span className="font-bold">Religion:</span> Islam
            </p>
            <p>
              <span className="font-bold">Father Occupation:</span> Graphic
              Designer
            </p>
            <p>
              <span className="font-bold">E-mail:</span> arabagrant@gmail.com
            </p>
            <p>
              <span className="font-bold">Admission Date:</span> 07.08.2019
            </p>
            <p>
              <span className="font-bold">Class:</span> 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
