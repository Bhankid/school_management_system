"use client";

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function EventCalendar() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl w-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Event Calendar</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <i className="fas fa-ellipsis-h text-gray-700"></i>
        </button>
      </div>
      <Calendar defaultValue={new Date()} className="react-calendar w-full" />
    </div>
  );
}

export default EventCalendar;
