"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import MessageDropdown from "./MessageDropdown";

interface SearchResult {
  id: string;
  title: string;
  value: string | number;
  type: "student" | "teacher" | "parent" | "earning";
}

function Header() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        messageRef.current &&
        !messageRef.current.contains(event.target as Node)
      ) {
        setShowMessages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <Search onSearch={handleSearch} />
        </div>

        <div className="flex items-center justify-center w-full md:w-auto space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative" ref={messageRef}>
              <i
                className="fas fa-envelope text-red-500 hover:text-red-600 cursor-pointer text-lg md:text-xl"
                onClick={() => setShowMessages(!showMessages)}
              ></i>
              <MessageDropdown isOpen={showMessages} />
            </div>
            <div className="relative" ref={notificationRef}>
              <i
                className="fas fa-bell text-red-500 hover:text-red-600 cursor-pointer text-lg md:text-xl"
                onClick={() => setShowNotifications(!showNotifications)}
              ></i>
              <NotificationDropdown isOpen={showNotifications} />
            </div>
          </div>

          <div className="hidden md:block border-l-2 border-red-500 h-8 mx-4"></div>

          <div
            className="flex items-center cursor-pointer relative"
            ref={profileMenuRef}
          >
            <div
              className="flex items-center"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/profile-picture.png"
                  alt="User profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <i
                className={`fas fa-caret-down text-gray-500 ml-2 text-sm md:text-base transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              ></i>
            </div>

            <ProfileDropdown isOpen={showProfileMenu} />
          </div>
        </div>
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 md:left-auto md:right-4 md:w-80 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50 mx-4 md:mx-0">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm md:text-base"
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
