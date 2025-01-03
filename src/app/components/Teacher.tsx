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
        <h2 className="text-xl font-bold mb-4">All Teachers Data</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded-l-lg p-2 flex-grow"
          />
          <select className="border border-gray-300 p-2">
            <option>Select Class</option>
          </select>
          <button className="bg-red-600 text-white p-2 rounded-r-lg">
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
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Date of Birth</th>
              <th className="py-2 px-4 border-b">Phone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 13 }).map((_, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">22</td>
                <td className="py-2 px-4 border-b">Daniel Grant</td>
                <td className="py-2 px-4 border-b">Male</td>
                <td className="py-2 px-4 border-b">2</td>
                <td className="py-2 px-4 border-b">English</td>
                <td className="py-2 px-4 border-b">59 Australia, Sydney</td>
                <td className="py-2 px-4 border-b">02/05/2001</td>
                <td className="py-2 px-4 border-b">+123 9988568</td>
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
