import Image from "next/image";

const EarningsCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Earnings</h2>
        <div className="text-gray-600">June 10, 2021</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600">Total Collections</p>
          <p className="text-2xl font-bold">$90,000</p>
        </div>
        <div>
          <p className="text-gray-600">Fees Collections</p>
          <p className="text-2xl font-bold">$75,000</p>
        </div>
      </div>
      <Image
        src="/earnings-graph.png"
        alt="Graph showing earnings over a week"
        width={600}
        height={300}
        className="w-full"
      />
    </div>
  );
};

export default EarningsCard;
