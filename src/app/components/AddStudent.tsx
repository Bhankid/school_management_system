function AddStudent() {
  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-700 pb-4">Students</h1>
          <p className="text-sm text-gray-500">
            Home &gt; <span className="text-red-500">Student Admit Form</span>
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-500">Add New Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700">Name *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender *</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Please Select Gender</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Class *</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Please Select Class</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Date Of Birth *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="dd/mm/yy"
              />
            </div>
            <div>
              <label className="block text-gray-700">Blood group *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Religion *</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Please Select Religion</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Admission Date *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="dd/mm/yy"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-4">Add New Parent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700">Father&apos;s Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Mother&apos;s Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Father&apos;s Occupation
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Religion</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Please Select Religion</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center">
            <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">150px x 150px</span>
            </div>
            <div className="ml-4">
              <label className="block text-gray-700">
                Upload Student Photo (150px X 150px)
              </label>
              <input type="file" className="mt-2" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
