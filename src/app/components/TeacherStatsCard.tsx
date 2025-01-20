"use client";

import React, { useState, useEffect } from "react";
import { getTeacherCount } from "../actions/teacherActions"; // Import the server action

const TeacherStatsCard = () => {
  const [teacherCount, setTeacherCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTeacherCount() {
      try {
        const count = await getTeacherCount(); // Fetch live teacher count from server
        setTeacherCount(count);
      } catch (err) {
        console.error("Failed to fetch teacher count:", err);
        setTeacherCount(0); // Handle error gracefully
      }
    }

    fetchTeacherCount();
  }, []);

  return (
    <div className="flex items-center">
      <div className="bg-blue-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-chalkboard-teacher text-blue-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">Teachers</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          {teacherCount !== null ? teacherCount : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default TeacherStatsCard;
