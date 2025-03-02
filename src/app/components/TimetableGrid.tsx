"use client"

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
    <div className="p-4 relative">
      <div className="text-lg font-bold mb-4 text-gray-800">Schedule</div>
       <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <nav className="text-sm text-gray-600 mb-6 py-4">
        <a href="#" className="text-black">
          Home
        </a>
        <i className="fas fa-chevron-right mx-2"></i>
        <span className="text-red-500">Generate Timetable</span>
      </nav>
     
        <table className="w-full border-collapse border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border p-2 text-white">Class</th>
              <th className="border p-2 text-white">Day</th>
              {Array.from({ length: 9 }, (_, i) => (
                <th key={i} className="border p-2 text-white">
                  Slot {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([className, days]) =>
              daysOfWeek.map((day) => (
                <tr key={`${className}-${day}`} className="border-t">
                  <td className="border p-2 hover:bg-gray-50  text-gray-800">{className}</td>
                  <td className="border p-2 hover:bg-gray-50  text-gray-800">{day}</td>
                  {days[day].map((slot, index) => (
                    <td key={index} className="border p-2 hover:bg-gray-50  text-gray-800">
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
    </div>
  );
};

export default TimetableGrid;