const Fees = () => {
  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Account</h1>
          <div className="text-sm text-gray-500">
            <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
            <span>Student Fees</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">All Student Fees Data</h2>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="border p-2 rounded mr-2 mb-2 md:mb-0"
            />
            <select className="border p-2 rounded mr-2 mb-2 md:mb-0">
              <option>Select Class</option>
            </select>
            <select className="border p-2 rounded mr-2 mb-2 md:mb-0">
              <option>Select Status</option>
            </select>
            <button className="bg-red-500 text-white p-2 rounded">
              SEARCH
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Class</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Parent Email</th>
                <th className="py-2 px-4 border-b">Parent Phone</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 13 }).map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">22</td>
                  <td className="py-2 px-4 border-b">Daniel Grant</td>
                  <td className="py-2 px-4 border-b">Male</td>
                  <td className="py-2 px-4 border-b">2</td>
                  <td className="py-2 px-4 border-b">$2,000.00</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        index % 2 === 0 ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      {index % 2 === 0 ? "unpaid" : "Paid"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">arabogrant@gmail.com</td>
                  <td className="py-2 px-4 border-b">+123 9988568</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button className="text-gray-500">Previous</button>
            <div className="flex space-x-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                1
              </button>
              <button className="bg-white border px-3 py-1 rounded">2</button>
              <button className="bg-white border px-3 py-1 rounded">3</button>
            </div>
            <button className="text-gray-500">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
