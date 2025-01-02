import Image from 'next/image';

const StudentsCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Students</h2>
      </div>
      <Image
        src="/students-chart.png"
        alt="Pie chart showing student distribution"
        width={300}
        height={300}
        className="w-full"
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <p className="text-gray-600">30,000</p>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <p className="text-gray-600">20,000</p>
        </div>
      </div>
    </div>
  );
};

export default StudentsCard;
