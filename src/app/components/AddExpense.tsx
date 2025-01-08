   function AddExpense() {
            return (
              <div className="p-4 md:p-8">
                <div className="bg-white p-4 md:p-8 rounded shadow-md">
                  <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-400 pb-4">Account</h1>
                    <div className="text-sm text-gray-500">
                      Home{" "}
                      <span className="text-red-500"> &gt; Add Expense</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-8 rounded shadow-md">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">
                      Add New Expenses
                    </h2>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Name *
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Expense Type *
                          </label>
                          <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                            <option>Please Select Class</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Status *
                          </label>
                          <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                            <option>Please Select</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Amount *
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            E-Mail Address
                          </label>
                          <input
                            type="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Due Date
                          </label>
                          <div className="relative mt-1">
                            <input
                              type="text"
                              className="block w-full p-2 border border-gray-300 rounded"
                              placeholder="dd/mm/yy"
                            />
                            <i className="fas fa-calendar-alt absolute right-3 top-3 text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <button
                          type="submit"
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="reset"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
        }

        export default AddExpense;