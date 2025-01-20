"use client";

import React, { useState, useEffect } from "react";
import { getTotalEarnings } from "../actions/feeActions"; // Import the server action

const EarningsStatsCard = () => {
  const [earnings, setEarnings] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEarnings() {
      try {
        const total = await getTotalEarnings(); // Fetch the total earnings
        setEarnings(total);
      } catch (error) {
        console.error("Failed to fetch earnings:", error);
        setEarnings(0); // Handle error gracefully
      }
    }

    fetchEarnings();
  }, []);

  return (
    <div className="flex items-center">
      <div className="bg-red-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
        <i className="fas fa-dollar-sign text-red-500 text-sm sm:text-base"></i>
        <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
      </div>
      <div className="ml-4 sm:ml-6">
        <p className="text-gray-800 font-medium text-sm sm:text-base">
          Earnings
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          {earnings !== null ? `₵${earnings.toLocaleString()}` : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default EarningsStatsCard;
