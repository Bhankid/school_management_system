"use client";

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
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="border p-3 text-left text-white">Class</th>
            <th className="border p-3 text-left text-white">Day</th>
            <th className="border p-3 text-left text-white">Time Slot</th>
            <th className="border p-3 text-left text-white">Activity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetable).flatMap(([className, days]) =>
            Object.entries(days).flatMap(([day, slots]) =>
              slots.map((slot, idx) => (
                <tr
                  key={`${className}-${day}-${idx}`}
                  className="border-t hover:bg-gray-100 transition-colors"
                >
                  <td className="border p-3 text-gray-800">{className}</td>
                  <td className="border p-3 text-gray-800">{day}</td>
                  <td className="border p-3 text-gray-800">
                    {slot.startTime} - {slot.endTime}
                  </td>
                  <td className="border p-3 text-gray-800">{slot.activity}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableGrid;