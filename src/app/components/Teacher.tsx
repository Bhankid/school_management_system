const Teacher = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-red-600">Teachers</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-600">All Teachers</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Teachers Data
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <select className="border border-gray-300 rounded-lg p-3 w-48 focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option>Select Class</option>
          </select>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
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
              <th className="py-2 px-4 border-b text-red-500">Subject</th>
              <th className="py-2 px-4 border-b text-red-500">Address</th>
              <th className="py-2 px-4 border-b text-red-500">Date of Birth</th>
              <th className="py-2 px-4 border-b text-red-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 13 }).map((_, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-gray-800">22</td>
                <td className="py-2 px-4 border-b text-gray-800">Daniel Grant</td>
                <td className="py-2 px-4 border-b text-gray-800">Male</td>
                <td className="py-2 px-4 border-b text-gray-800">2</td>
                <td className="py-2 px-4 border-b text-gray-800">English</td>
                <td className="py-2 px-4 border-b text-gray-800">59 Australia, Sydney</td>
                <td className="py-2 px-4 border-b text-gray-800">02/05/2001</td>
                <td className="py-2 px-4 border-b text-gray-800">+123 9988568</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-500">Previous</button>
          <div className="flex space-x-2">
            <button className="bg-red-600 text-white px-3 py-1 rounded">
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
  );
};

export default Teacher;
