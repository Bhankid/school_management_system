const Parent = () => {
  return (
    <div className="p-4">
      <nav className="text-sm text-gray-600 mb-4">
        <a href="#" className="text-black">
          Home
        </a>{" "}
        <i className="fas fa-chevron-right mx-2"></i>{" "}
        <span className="text-red-500">All Parents</span>
      </nav>
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">
        All Parents Data
      </h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
        />
        <select className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded">
          <option>Select Class</option>
        </select>
        <button className="flex-1 min-w-[200px] p-2 bg-red-500 text-white rounded hover:bg-red-600">
          SEARCH
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-red-500">ID</th>
              <th className="py-2 px-4 border-b text-red-500">Name</th>
              <th className="py-2 px-4 border-b text-red-500">Gender</th>
              <th className="py-2 px-4 border-b text-red-500">Occupation</th>
              <th className="py-2 px-4 border-b text-red-500">Address</th>
              <th className="py-2 px-4 border-b text-red-500">E-mail</th>
              <th className="py-2 px-4 border-b text-red-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 13 }).map((_, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-gray-800">22</td>
                <td className="py-2 px-4 border-b text-gray-800">
                  Daniel Grant
                </td>
                <td className="py-2 px-4 border-b text-gray-800">Male</td>
                <td className="py-2 px-4 border-b text-gray-800">Banker</td>
                <td className="py-2 px-4 border-b text-gray-800">
                  59 Australia, Sydney
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  arabagrant@gmail.com
                </td>
                <td className="py-2 px-4 border-b text-gray-800">
                  +23359988568
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-gray-600">Previous</button>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-red-500 text-white rounded">1</button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded">
            2
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded">
            3
          </button>
        </div>
        <button className="text-gray-600">Next</button>
      </div>
    </div>
  );
};

export default Parent;
