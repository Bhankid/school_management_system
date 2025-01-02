"use client";

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function EventCalendar() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Event Calendar</h2>
        <i className="fas fa-ellipsis-h text-gray-400"></i>
      </div>
      <Calendar
        defaultValue={new Date(2025, 0, 2)}
        className="react-calendar w-full"
      />
    </div>
  );
}

export default EventCalendar;
