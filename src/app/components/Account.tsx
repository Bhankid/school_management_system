const Account = () => {
  return (
    <div className="p-6">
      <div className="text-lg font-bold mb-4">Account</div>
      <div className="text-sm text-red-500 mb-6">Home &gt; Fees Group</div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-gray-700">
              <i className="fas fa-list"></i>
              <span>Fees Group List</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-700">
              <i className="fas fa-plus"></i>
              <span>Add Fees Group</span>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No.</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Fees Type</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">1</td>
              <td className="border p-2">Creche Fees</td>
              <td className="border p-2">
                Feeding Fee - GHS200.00
                <br />
                Maintenance - GHS100.00
                <br />
                Tuition - GHS250.00
              </td>
              <td className="border p-2">To be paid every semester</td>
            </tr>
            <tr>
              <td className="border p-2 text-center">2</td>
              <td className="border p-2">Nurse Fee Group</td>
              <td className="border p-2">
                Feeding Fee - GHS150.00
                <br />
                Maintenance - GHS100.00
                <br />
                Tuition - GHS450.00
              </td>
              <td className="border p-2">To be paid every semester</td>
            </tr>
            <tr>
              <td className="border p-2 text-center">3</td>
              <td className="border p-2">Kindergarten Fee Group</td>
              <td className="border p-2">
                Feeding Fee - GHS180.00
                <br />
                Maintenance - GHS120.00
                <br />
                Tuition - GHS500.00
              </td>
              <td className="border p-2">To be paid every semester</td>
            </tr>
            <tr>
              <td className="border p-2 text-center">4</td>
              <td className="border p-2">Class 1 Fee Group</td>
              <td className="border p-2">
                Feeding Fee - GHS100.00
                <br />
                PTA - GHS50.00
                <br />
                Computer Fees - GHS150.00
                <br />
                Tuition - GHS500.00
              </td>
              <td className="border p-2">To be paid every semester</td>
            </tr>
            <tr>
              <td className="border p-2 text-center">5</td>
              <td className="border p-2">Class 2 Fee Group</td>
              <td className="border p-2">
                Feeding Fee - GHS100.00
                <br />
                PTA - GHS50.00
                <br />
                Computer Fees - GHS150.00
                <br />
                Tuition - GHS500.00
              </td>
              <td className="border p-2">To be paid every semester</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-700">Previous</button>
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
          <button className="text-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
