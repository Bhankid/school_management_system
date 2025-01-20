"use client";

import React, { useEffect, useState } from "react";
import { getAllEvents } from "../actions/eventActions"; // Import the server action

interface EventType {
  id: number;
  title: string;
  description: string;
  date: string;
}

function Reminder() {
  const [events, setEvents] = useState<EventType[]>([]);

  const dateColors = [
    "bg-teal-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
  ];

  // Fetch events on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsData = await getAllEvents();
        // Sort events by date in descending order
        const sortedEvents = eventsData.sort(
          (a: EventType, b: EventType) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }
    fetchEvents();
  }, []);

  const getRandomColor = () => {
    return dateColors[Math.floor(Math.random() * dateColors.length)];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Reminders</h2>
          <i className="fas fa-ellipsis-h text-gray-400 cursor-pointer"></i>
        </div>
        <div className="flex flex-col space-y-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex flex-col space-y-2">
                <div
                  className={`${
                    getRandomColor()
                  } text-white px-3 py-1 rounded-full text-sm font-semibold w-fit`}
                >
                  {new Date(event.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <p className="text-gray-700 truncate">{event.title}</p>
                <p className="text-gray-500 truncate text-sm">
                  {event.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reminders available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reminder;
