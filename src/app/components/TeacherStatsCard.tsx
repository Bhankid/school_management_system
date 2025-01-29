"use client";

import React, { useState, useEffect } from "react";
import { getTeacherCount, getPreviousTeacherCount } from "../actions/teacherActions"; 
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import the arrow icons

const TeacherStatsCard = () => {
  const [teacherCount, setTeacherCount] = useState<number | null>(null);
  const [previousTeacherCount, setPreviousTeacherCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeacherCount() {
      try {
        const count = await getTeacherCount(); // Fetch the current teacher count
        const previousCount = await getPreviousTeacherCount(); // Fetch the previous teacher count
        setTeacherCount(count);
        setPreviousTeacherCount(previousCount);
      } catch (err) {
        console.error("Failed to fetch teacher count:", err);
        setTeacherCount(0); // Handle error gracefully
        setPreviousTeacherCount(0); // Handle error gracefully
      } finally {
        setLoading(false);
      }
    }

    fetchTeacherCount();
  }, []);

  const getArrowIcon = () => {
    if (teacherCount === null || previousTeacherCount === null) {
      return null;
    }

    if (teacherCount > previousTeacherCount) {
      return (
        <FaArrowUp
          className="text-green-500 text-sm sm:text-base ml-1"
          title="Increase in teacher count"
        />
      );
    } else if (teacherCount < previousTeacherCount) {
      return (
        <FaArrowDown
          className="text-red-500 text-sm sm:text-base ml-1"
          title="Decrease in teacher count"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-blue-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-chalkboard-teacher text-blue-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">Teachers</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          {loading ? (
            <span className="animate-pulse text-gray-500">Loading...</span>
          ) : (
            <>
              {teacherCount}
              {getArrowIcon()}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default TeacherStatsCard;
