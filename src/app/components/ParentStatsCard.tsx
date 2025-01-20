"use client";

import React, { useState, useEffect } from "react";
import { getParentCount } from "../actions/parentActions"; 

const ParentStatsCard = () => {
  const [parentCount, setParentCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchParentCount() {
      try {
        const count = await getParentCount(); // Fetch live parent count from server
        setParentCount(count);
      } catch (err) {
        console.error("Failed to fetch parent count:", err);
        setParentCount(0); // Handle error gracefully
      }
    }

    fetchParentCount();
  }, []);

  return (
    <div className="flex items-center">
      <div className="bg-yellow-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-user-friends text-yellow-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">Parents</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          {parentCount !== null ? parentCount : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default ParentStatsCard;
