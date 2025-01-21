"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import EventReminder from "../components/EventReminder";
import { addEvent } from "../actions/eventActions";
import Swal from 'sweetalert2';

function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const handleSaveEvent = async (title: string, description: string) => {
    if (!selectedDate) return;

    try {
      const result = await addEvent(title, description, selectedDate);
      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Event successfully saved!',
          confirmButtonColor: '#10B981'
        });
        setShowPopup(false);
      }
    } catch (error) {
      console.error("Failed to save event:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save event. Please try again.',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-50 shadow rounded-xl w-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Event Calendar</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <i className="fas fa-ellipsis-h text-gray-700 w-4 h-4"></i>
        </button>
      </div>
      <Calendar
        defaultValue={new Date()}
        className="react-calendar w-full"
        onClickDay={handleDateClick}
      />
      {showPopup && selectedDate && (
        <EventReminder
          selectedDate={selectedDate}
          onClose={() => setShowPopup(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}

export default EventCalendar;