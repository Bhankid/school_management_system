import Image from "next/image";

const ExpensesCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Expenses</h2>
        <div className="text-gray-600">June 2021</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600">April 2021</p>
          <p className="text-green-500">$125,000</p>
        </div>
        <div>
          <p className="text-gray-600">May 2021</p>
          <p className="text-blue-500">$100,000</p>
        </div>
        <div>
          <p className="text-gray-600">June 2021</p>
          <p className="text-red-500">$75,000</p>
        </div>
      </div>
      <Image
        src="/expenses-graph.png"
        alt="Graph showing expenses over three months"
        width={300}
        height={300}
        className="w-full"
      />
    </div>
  );
};

export default ExpensesCard;
