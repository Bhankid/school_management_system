"use client";
import React, { useState } from "react";
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
  | "expenses"
  | "add-expenses"
  | "add-teacher"
  | "settings";

interface SidebarProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isTeachersOpen, setIsTeachersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } min-h-screen bg-blue-900 text-white sticky transition-all duration-300`}
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
          } cursor-pointer ${!isSidebarOpen && "mx-auto"}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ></i>
      </div>

      <ul className="mt-4">
        <li
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          {isSidebarOpen && <span>Dashboard</span>}
        </li>

        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
            onClick={() => isSidebarOpen && setIsStudentsOpen(!isStudentsOpen)}
          >
            <i className="fas fa-users mr-3"></i>
            {isSidebarOpen && (
              <>
                <span>Students</span>
                <i
                  className={`fas fa-chevron-${
                    isStudentsOpen ? "down" : "right"
                  } ml-auto transition-transform duration-500`}
                ></i>
              </>
            )}
          </li>

          {isSidebarOpen && (
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isStudentsOpen ? "max-h-48" : "max-h-0"
              }`}
            >
              <ul className="bg-blue-800">
                <li
                  onClick={() => setActiveTab("students")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-user-graduate mr-3"></i>
                  <span>All Students</span>
                </li>
                <li
                  onClick={() => setActiveTab("add-student")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-user-plus mr-3"></i>
                  <span>Add Students</span>
                </li>
                <li
                  onClick={() => setActiveTab("student-promotion")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-level-up-alt mr-3"></i>
                  <span>Students Promotion</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <li
          onClick={() => setActiveTab("parents")}
          className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-user-friends mr-3"></i>
          {isSidebarOpen && <span>Parents</span>}
        </li>

        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
            onClick={() => isSidebarOpen && setIsTeachersOpen(!isTeachersOpen)}
          >
            <i className="fas fa-chalkboard-teacher mr-3"></i>
            {isSidebarOpen && (
              <>
                <span>Teachers</span>
                <i
                  className={`fas fa-chevron-${
                    isTeachersOpen ? "down" : "right"
                  } ml-auto transition-transform duration-500`}
                ></i>
              </>
            )}
          </li>

          {isSidebarOpen && (
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isTeachersOpen ? "max-h-32" : "max-h-0"
              }`}
            >
              <ul className="bg-blue-800">
                <li
                  onClick={() => setActiveTab("teachers")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-user-tie mr-3"></i>
                  <span>All Teachers</span>
                </li>
                <li
                  onClick={() => setActiveTab("add-teacher")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-user-plus mr-3"></i>
                  <span>Add Teachers</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
            onClick={() => isSidebarOpen && setIsAccountOpen(!isAccountOpen)}
          >
            <i className="fas fa-user-circle mr-3"></i>
            {isSidebarOpen && (
              <>
                <span>Account</span>
                <i
                  className={`fas fa-chevron-${
                    isAccountOpen ? "down" : "right"
                  } ml-auto transition-transform duration-500`}
                ></i>
              </>
            )}
          </li>

          {isSidebarOpen && (
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isAccountOpen ? "max-h-48" : "max-h-0"
              }`}
            >
              <ul className="bg-blue-800">
                <li
                  onClick={() => setActiveTab("fees-group")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-money-bill-wave mr-3"></i>
                  <span>Fees Group</span>
                </li>
                <li
                  onClick={() => setActiveTab("student-fees")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-dollar-sign mr-3"></i>
                  <span>Student Fees</span>
                </li>
                <li
                  onClick={() => setActiveTab("expenses")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-file-invoice-dollar mr-3"></i>
                  <span>Expenses</span>
                </li>
                <li
                  onClick={() => setActiveTab("add-expenses")}
                  className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer transition-colors duration-300"
                >
                  <i className="fas fa-plus-circle mr-3"></i>
                  <span>Add Expenses</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <li
          onClick={() => setActiveTab("subjects")}
          className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-book mr-3"></i>
          {isSidebarOpen && <span>Subject</span>}
        </li>

        <li
          onClick={() => setActiveTab("settings")}
          className="flex items-center p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-cog mr-3"></i>
          {isSidebarOpen && <span>Settings</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
