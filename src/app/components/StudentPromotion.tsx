function StudentPromotion() {
  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">
        <span className="font-bold text-black">Students</span>
        <span className="mx-2">&gt;</span>
        <span className="text-red-500">Student Admit Form</span>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Student Promotion</h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Current Class</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Please Select Class</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Promotion From Class *
            </label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Promotion To Class *
            </label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>
        </form>
        <div className="mt-6 flex space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentPromotion;
