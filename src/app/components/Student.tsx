const StudentsData = () => {
  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Students</h1>
          <span className="mx-2 text-gray-500">/</span>
          <h2 className="text-red-500">All Students</h2>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-500">
            All Students Data
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Select Class</option>
            </select>
            <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
              SEARCH
            </button>
          </div>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-red-500">ID</th>
                <th className="py-2 px-4 border-b text-red-500">Name</th>
                <th className="py-2 px-4 border-b text-red-500">Gender</th>
                <th className="py-2 px-4 border-b text-red-500">Class</th>
                <th className="py-2 px-4 border-b text-red-500">Parents</th>
                <th className="py-2 px-4 border-b text-red-500">Address</th>
                <th className="py-2 px-4 border-b text-red-500">
                  Date of Birth
                </th>
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
                  <td className="py-2 px-4 border-b text-gray-800">2</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    Kofi Grant
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    59 Australia, Sydney
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    02/05/2001
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    +23359988568
                  </td>
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
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
                2
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
                3
              </button>
            </div>
            <button className="text-gray-500">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsData;
