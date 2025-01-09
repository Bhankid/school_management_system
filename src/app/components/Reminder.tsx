function Reminder() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Reminders</h2>
          <i className="fas fa-ellipsis-h text-gray-400 cursor-pointer"></i>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="bg-teal-400 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
              16 June, 2021
            </div>
            <p className="text-gray-700 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
              16 June, 2021
            </div>
            <p className="text-gray-700 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
              16 June, 2021
            </div>
            <p className="text-gray-700 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="bg-purple-400 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
              17 June, 2021
            </div>
            <p className="text-gray-700 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
