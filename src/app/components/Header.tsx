"use client";

import Image from "next/image";
import React, { useState } from "react";
import Search from "../components/Search";

interface SearchResult {
  id: string;
  title: string;
  value: string | number;
  type: "student" | "teacher" | "parent" | "earning";
}

function Header() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const getDashboardData = (): SearchResult[] => [
    { id: "1", title: "Students", value: "50000", type: "student" },
    { id: "2", title: "Teachers", value: "1500", type: "teacher" },
    { id: "3", title: "Parents", value: "60000", type: "parent" },
    { id: "4", title: "Total Collections", value: "$90,000", type: "earning" },
    { id: "5", title: "Fees Collections", value: "$75,000", type: "earning" },
  ];

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      const dashboardData = getDashboardData();
      const filtered = dashboardData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.value.toString().toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-end p-4 bg-white shadow">
        <Search onSearch={handleSearch} />

        <div className="flex items-center ml-4 space-x-4">
          <i className="fas fa-envelope text-red-500 hover:text-red-600 cursor-pointer"></i>
          <i className="fas fa-bell text-red-500 hover:text-red-600 cursor-pointer"></i>
          <div className="border-l-2 border-red-500 h-8 mx-4"></div>

          <div className="flex items-center cursor-pointer">
            <Image
              src="/profile-picture.png"
              alt="User profile picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <i className="fas fa-caret-down text-gray-500 ml-2"></i>
          </div>
        </div>
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50 text-gray-600">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    item.type === "student"
                      ? "bg-blue-500"
                      : item.type === "teacher"
                      ? "bg-green-500"
                      : item.type === "parent"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span>{item.title}</span>
              </div>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
