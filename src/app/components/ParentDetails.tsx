import Image from "next/image";

function ParentDetails() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full object-cover"
            src="/student_profile.png"
            alt="Profile picture of a man wearing a cap and sleeveless shirt"
            width={160}
            height={160}
            priority
          />
        </div>
        <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-700">Daniel Grant</h2>
          <p className="mt-2 text-gray-600">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
          </p>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="font-bold text-gray-700 w-32">ID Number:</span>
              <span className="text-gray-700">22</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Name:</span>
              <span className="text-gray-700">Daniel Grant</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Gender:</span>
              <span className="text-gray-700">Male</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Phone:</span>
              <span className="text-gray-700">+123 9988568</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Religion:</span>
              <span className="text-gray-700">Islam</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Occupation:</span>
              <span className="text-gray-700">Banker</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">E-mail:</span>
              <span className="text-gray-700">arabagrant@gmail.com</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="font-bold text-gray-700 w-32">Address:</span>
              <span className="text-gray-700">59 Australia, Sydney</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDetails;
