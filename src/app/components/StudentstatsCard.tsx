"use client";

import React from "react";
import useSWR from "swr";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getStudentCount, getPreviousStudentCount } from "../actions/studentActions";

const fetcher = async () => {
  const [studentCount, previousStudentCount] = await Promise.all([
    getStudentCount(),
    getPreviousStudentCount(),
  ]);
  return { studentCount, previousStudentCount };
};

const StudentStatsCard = () => {
  const { data, error, isLoading } = useSWR("student-stats", fetcher, {
    refreshInterval: 60 * 1000, // Refresh every minute
  });

  // Ensure values are numbers, fallback to 0 if null/undefined
  const studentCount = data?.studentCount ?? 0;
  const previousStudentCount = data?.previousStudentCount ?? 0;

  const getArrowIcon = () => {
    if (studentCount > previousStudentCount) {
      return <FaArrowUp className="text-green-500 text-sm sm:text-base ml-1" title="Increase in student count" />;
    } else if (studentCount < previousStudentCount) {
      return <FaArrowDown className="text-red-500 text-sm sm:text-base ml-1" title="Decrease in student count" />;
    }
    return null; 
  };

  return (
    <div className="flex items-center">
      <div className="bg-green-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-user-graduate text-green-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">Students</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          {isLoading ? (
            <span className="animate-pulse text-gray-500">Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error loading data</span>
          ) : (
            <>
              {studentCount.toLocaleString()}
              {getArrowIcon()}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default StudentStatsCard;
