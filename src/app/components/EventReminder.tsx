import React from "react";

interface EventReminderProps {
  selectedDate: Date;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

function EventReminder({ selectedDate, onClose, onSave }: EventReminderProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(title, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 md:p-12 lg:p-16 rounded-xl shadow-lg transform scale-95 opacity-0 animate-bounceIn">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="bg-blue-700 text-white px-4 py-2 rounded-full text-lg font-semibold w-fit">
            {selectedDate.toLocaleDateString()}
          </div>
          <input
            type="text"
            placeholder="Event Title"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-lg text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Description"
             className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-lg text-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-transform transform hover:scale-105"
          >
            Save Event
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 p-3 bg-red-500 hover:bg-red-600 rounded-full transition-transform transform hover:scale-105"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventReminder;
