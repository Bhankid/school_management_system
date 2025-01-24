"use client";

import React, { useState, useEffect } from "react";
import {
  getStudentCount,
  getPreviousStudentCount,
} from "../actions/studentActions"; // Import the server actions
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import the arrow icons

const StudentStatsCard = () => {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [previousStudentCount, setPreviousStudentCount] = useState<
    number | null
  >(null);

  useEffect(() => {
    async function fetchStudentCount() {
      try {
        const count = await getStudentCount(); // Fetch the student count
        const previousCount = await getPreviousStudentCount(); // Fetch the previous student count
        setStudentCount(count);
        setPreviousStudentCount(previousCount);
      } catch (error) {
        console.error("Failed to fetch student count:", error);
        setStudentCount(0); // Handle error gracefully
        setPreviousStudentCount(0); // Handle error gracefully
      }
    }

    fetchStudentCount();
  }, []);

  const getArrowIcon = () => {
    if (studentCount === null || previousStudentCount === null) {
      return null;
    }

    if (studentCount > previousStudentCount) {
      return (
        <FaArrowUp
          className="text-green-500 text-sm sm:text-base ml-1"
          title="Increase in student count"
        />
      );
    } else if (studentCount < previousStudentCount) {
      return (
        <FaArrowDown
          className="text-red-500 text-sm sm:text-base ml-1"
          title="Decrease in student count"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-green-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-user-graduate text-green-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">
          Students
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          {studentCount !== null ? studentCount.toLocaleString() : "Loading..."}
          {getArrowIcon()}
        </p>
      </div>
    </div>
  );
};

export default StudentStatsCard;
