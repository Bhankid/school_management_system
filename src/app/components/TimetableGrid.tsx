import React from "react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  activity: string;
}

interface TimetableGridProps {
  timetable: { [className: string]: { [day: string]: TimeSlot[] } };
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ timetable }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border p-3 text-white">Class</th>
            <th className="border p-3 text-white">Day</th>
            {Array.from({ length: 8 }, (_, i) => (
              <th key={i} className="border p-3 text-white">
                Slot {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetable).map(([className, days]) =>
            daysOfWeek.map((day) => (
              <tr key={`${className}-${day}`} className="border-t">
                <td className="border p-3 text-gray-800">{className}</td>
                <td className="border p-3 text-gray-800">{day}</td>
                {days[day].map((slot, index) => (
                  <td key={index} className="border p-3 text-gray-800">
                    {slot.activity}
                    <br />
                    <span className="text-xs text-gray-500">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableGrid;
