"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export type ActiveTab =
  | "dashboard"
  | "students"
  | "add-student"
  | "student-promotion"
  | "parents"
  | "subjects"
  | "teachers"
  | "fees-group"
  | "student-fees"
  | "add-fees"
  | "expenses"
  | "add-expenses"
  | "add-teacher"
  | "settings";

interface SidebarProps {
  setActiveTab: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isTeachersOpen, setIsTeachersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab") as ActiveTab;
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [setActiveTab]);

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const getActiveClass = (tab: ActiveTab) => {
    return activeTab === tab
      ? "bg-blue-950 border-l-4 border-red-500"
      : "hover:bg-blue-800";
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } min-h-screen bg-blue-900 text-white fixed lg:sticky top-0 left-0 z-40 lg:z-0 transition-all duration-300`}
      >
        <div className="bg-red-600 p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          )}
          <i
            className={`fas ${
              isSidebarOpen ? "fa-times" : "fa-bars"
            } cursor-pointer text-2xl font-bold ${!isSidebarOpen && "mx-auto"}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        <ul className="mt-4">
          <li
            onClick={() => handleTabClick("dashboard")}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${getActiveClass(
              "dashboard"
            )}`}
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            {isSidebarOpen && <span>Dashboard</span>}
          </li>

          {/* Students Menu */}
          <div>
            <li
              className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${
                isStudentsOpen ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
              onClick={() => setIsStudentsOpen(!isStudentsOpen)}
            >
              <i className="fas fa-users mr-3"></i>
              {isSidebarOpen && (
                <>
                  <span>Students</span>
                  <i
                    className={`fas fa-chevron-${
                      isStudentsOpen ? "down" : "right"
                    } ml-auto`}
                  />
                </>
              )}
            </li>
            {isSidebarOpen && isStudentsOpen && (
              <ul className="bg-blue-800">
                <li
                  onClick={() => handleTabClick("students")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "students"
                  )}`}
                >
                  <i className="fas fa-user-graduate mr-3"></i>
                  <span>All Students</span>
                </li>
                <li
                  onClick={() => handleTabClick("add-student")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "add-student"
                  )}`}
                >
                  <i className="fas fa-user-plus mr-3"></i>
                  <span>Add Students</span>
                </li>
                <li
                  onClick={() => handleTabClick("student-promotion")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "student-promotion"
                  )}`}
                >
                  <i className="fas fa-level-up-alt mr-3"></i>
                  <span>Students Promotion</span>
                </li>
              </ul>
            )}
          </div>

          {/* Parents Tab */}
          <li
            onClick={() => handleTabClick("parents")}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${getActiveClass(
              "parents"
            )}`}
          >
            <i className="fas fa-user-friends mr-3"></i>
            {isSidebarOpen && <span>Parents</span>}
          </li>

          {/* Teachers Menu */}
          <div>
            <li
              className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${
                isTeachersOpen ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
              onClick={() => setIsTeachersOpen(!isTeachersOpen)}
            >
              <i className="fas fa-chalkboard-teacher mr-3"></i>
              {isSidebarOpen && (
                <>
                  <span>Teachers</span>
                  <i
                    className={`fas fa-chevron-${
                      isTeachersOpen ? "down" : "right"
                    } ml-auto`}
                  />
                </>
              )}
            </li>
            {isSidebarOpen && isTeachersOpen && (
              <ul className="bg-blue-800">
                <li
                  onClick={() => handleTabClick("teachers")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "teachers"
                  )}`}
                >
                  <i className="fas fa-user-tie mr-3"></i>
                  <span>All Teachers</span>
                </li>
                <li
                  onClick={() => handleTabClick("add-teacher")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "add-teacher"
                  )}`}
                >
                  <i className="fas fa-user-plus mr-3"></i>
                  <span>Add Teachers</span>
                </li>
              </ul>
            )}
          </div>

          {/* Account Menu */}
          <div>
            <li
              className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${
                isAccountOpen ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
              onClick={() => setIsAccountOpen(!isAccountOpen)}
            >
              <i className="fas fa-user-circle mr-3"></i>
              {isSidebarOpen && (
                <>
                  <span>Account</span>
                  <i
                    className={`fas fa-chevron-${
                      isAccountOpen ? "down" : "right"
                    } ml-auto`}
                  />
                </>
              )}
            </li>
            {isSidebarOpen && isAccountOpen && (
              <ul className="bg-blue-800">
                <li
                  onClick={() => handleTabClick("fees-group")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "fees-group"
                  )}`}
                >
                  <i className="fas fa-money-bill-wave mr-3"></i>
                  <span>Fees Group</span>
                </li>
                <li
                  onClick={() => handleTabClick("student-fees")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "student-fees"
                  )}`}
                >
                  <i className="fas fa-dollar-sign mr-3"></i>
                  <span>Student Fees</span>
                </li>
                <li
                  onClick={() => handleTabClick("add-fees")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "add-fees"
                  )}`}
                >
                  <i className="fas fa-plus-circle mr-3"></i>
                  <span>Add Fees</span>
                </li>
                <li
                  onClick={() => handleTabClick("expenses")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "expenses"
                  )}`}
                >
                  <i className="fas fa-file-invoice-dollar mr-3"></i>
                  <span>Expenses</span>
                </li>
                <li
                  onClick={() => handleTabClick("add-expenses")}
                  className={`flex items-center p-3 pl-12 cursor-pointer transition-colors duration-300 ${getActiveClass(
                    "add-expenses"
                  )}`}
                >
                  <i className="fas fa-plus-circle mr-3"></i>
                  <span>Add Expenses</span>
                </li>
              </ul>
            )}
          </div>

          {/* Other Tabs */}
          <li
            onClick={() => handleTabClick("subjects")}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${getActiveClass(
              "subjects"
            )}`}
          >
            <i className="fas fa-book mr-3"></i>
            {isSidebarOpen && <span>Subject</span>}
          </li>
          <li
            onClick={() => handleTabClick("settings")}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-300 ${getActiveClass(
              "settings"
            )}`}
          >
            <i className="fas fa-cog mr-3"></i>
            {isSidebarOpen && <span>Settings</span>}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
