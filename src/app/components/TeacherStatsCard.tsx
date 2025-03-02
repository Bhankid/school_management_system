"use client";

import React from "react";
import useSWR from "swr";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getTeacherCount, getPreviousTeacherCount } from "../actions/teacherActions";

const fetcher = async () => {
  const [teacherCount, previousTeacherCount] = await Promise.all([
    getTeacherCount(),
    getPreviousTeacherCount(),
  ]);
  return { teacherCount, previousTeacherCount };
};

const TeacherStatsCard = () => {
  const { data, error, isLoading } = useSWR("teacher-stats", fetcher, {
   refreshInterval: 15 * 1000, // Refresh every 15 seconds
  });

  // Ensure values are numbers, fallback to 0 if null/undefined
  const teacherCount = data?.teacherCount ?? 0;
  const previousTeacherCount = data?.previousTeacherCount ?? 0;

  const getArrowIcon = () => {
    if (teacherCount > previousTeacherCount) {
      return <FaArrowUp className="text-green-500 text-sm sm:text-base ml-1" title="Increase in teacher count" />;
    } else if (teacherCount < previousTeacherCount) {
      return <FaArrowDown className="text-red-500 text-sm sm:text-base ml-1" title="Decrease in teacher count" />;
    }
    return null; // No change
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
          {isLoading ? (
            <span className="animate-pulse text-gray-500">Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error loading data</span>
          ) : (
            <>
              {teacherCount.toLocaleString()}
              {getArrowIcon()}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default TeacherStatsCard;
