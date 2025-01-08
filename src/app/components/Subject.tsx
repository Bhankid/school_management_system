const Subject = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black pb-4">Subjects</h1>
        <div className="text-sm text-gray-500">
          <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
          <span className="text-red-500">Subject</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-600">All Subjects</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by subject name..."
            className="border border-gray-300 p-2 rounded mr-2 flex-1"
          />
          <select className="border border-gray-300 p-2 rounded mr-2">
            <option>Select Class</option>
            <option>Basic 1</option>
            <option>Basic 2</option>
            <option>Basic 3</option>
            <option>Basic 4</option>
            <option>Basic 5</option>
            <option>Basic 6</option>
          </select>
          <button className="bg-red-500 text-white p-2 rounded">SEARCH</button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left text-red-500">
                Subject Name
              </th>
              <th className="border p-2 text-left text-red-500">Teacher</th>
              <th className="border p-2 text-left text-red-500">Classes</th>
              <th className="border p-2 text-left text-red-500">Days</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                subject: "English",
                teacher: "Daniel Grant",
                classes: "12&4",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "Maths",
                teacher: "Daniel Grant",
                classes: "6&JH51",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "French",
                teacher: "Daniel Grant",
                classes: "12&4",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "Science",
                teacher: "Daniel Grant",
                classes: "6&JH51",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "Arts",
                teacher: "Daniel Grant",
                classes: "12&4",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "French",
                teacher: "Daniel Grant",
                classes: "12&4",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "Science",
                teacher: "Daniel Grant",
                classes: "6&JH51",
                days: "Mon, Tue and Fri",
              },
              {
                subject: "Arts",
                teacher: "Daniel Grant",
                classes: "12&4",
                days: "Mon, Tue and Fri",
              },
            ].map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border p-2 text-gray-800">{item.subject}</td>
                <td className="border p-2 text-gray-800">{item.teacher}</td>
                <td className="border p-2 text-gray-800">{item.classes}</td>
                <td className="border p-2 text-gray-800">{item.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500">Previous</span>
          <div className="flex space-x-2">
            <button className="bg-red-500 text-white px-3 py-1 rounded">
              1
            </button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded">
              2
            </button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded">
              3
            </button>
          </div>
          <span className="text-gray-500">Next</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Subject</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Subject Name *"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Teacher"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Classes"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
          <input
            type="text"
            placeholder="Days"
            className="border border-gray-300 p-2 rounded text-gray-800"
          />
        </div>
        <div className="flex mt-4">
          <button className="bg-red-500 text-white p-2 rounded mr-2">
            Save
          </button>
          <button className="bg-blue-500 text-white p-2 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Subject;
