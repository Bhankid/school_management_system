"use client";

import React, { useState, useEffect } from "react";
import { getTotalEarnings, getPreviousTotalEarnings } from "../actions/feeActions"; 
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 

const EarningsStatsCard = () => {
  const [earnings, setEarnings] = useState<number | null>(null);
  const [previousEarnings, setPreviousEarnings] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEarnings() {
      try {
        const total = await getTotalEarnings(); // Fetch the total earnings
        const previousTotal = await getPreviousTotalEarnings(); // Fetch the previous total earnings
        setEarnings(total);
        setPreviousEarnings(previousTotal);
      } catch (error) {
        console.error("Failed to fetch earnings:", error);
        setEarnings(0); // Handle error gracefully
        setPreviousEarnings(0); // Handle error gracefully
      } finally {
        setLoading(false);
      }
    }

    fetchEarnings();
  }, []);

  const getArrowIcon = () => {
    if (earnings === null || previousEarnings === null) {
      return null;
    }

    if (earnings > previousEarnings) {
      return (
        <FaArrowUp
          className="text-green-500 text-sm sm:text-base ml-1"
          title="Increase in earnings"
        />
      );
    } else if (earnings < previousEarnings) {
      return (
        <FaArrowDown
          className="text-red-500 text-sm sm:text-base ml-1"
          title="Decrease in earnings"
        />
      );
    } else {
      return null;
    }
  };

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
        <p className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          {loading ? (
            <span className="animate-pulse text-gray-500">Loading...</span>
          ) : (
            <>
              {earnings !== null ? `₵${earnings.toLocaleString()}` : ""}
              {getArrowIcon()}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default EarningsStatsCard;