"use client";

import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isTeachersOpen, setIsTeachersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false); // New state for Account

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white sticky">
      <div className="bg-red-600 p-4 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <i className="fas fa-bars"></i>
      </div>
      <ul className="mt-4">
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-tachometer-alt mr-3"></i>
          <span>Dashboard</span>
        </li>

        {/* Students Section */}
        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer"
            onClick={() => setIsStudentsOpen(!isStudentsOpen)}
          >
            <i className="fas fa-users mr-3"></i>
            <span>Students</span>
            <i
              className={`fas fa-chevron-${
                isStudentsOpen ? "down" : "right"
              } ml-auto`}
            ></i>
          </li>

          {isStudentsOpen && (
            <ul className="bg-blue-800">
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-user-graduate mr-3"></i>
                <span>All Students</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-user-plus mr-3"></i>
                <span>Add Students</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-level-up-alt mr-3"></i>
                <span>Students Promotion</span>
              </li>
            </ul>
          )}
        </div>

        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-user-friends mr-3"></i>
          <span>Parents</span>
        </li>

        {/* Teachers Section */}
        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer"
            onClick={() => setIsTeachersOpen(!isTeachersOpen)}
          >
            <i className="fas fa-chalkboard-teacher mr-3"></i>
            <span>Teachers</span>
            <i
              className={`fas fa-chevron-${
                isTeachersOpen ? "down" : "right"
              } ml-auto`}
            ></i>
          </li>

          {isTeachersOpen && (
            <ul className="bg-blue-800">
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-user-tie mr-3"></i>
                <span>All Teachers</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-user-plus mr-3"></i>
                <span>Add Teachers</span>
              </li>
            </ul>
          )}
        </div>

        {/* Account Section */}
        <div>
          <li
            className="flex items-center p-4 hover:bg-blue-800 cursor-pointer"
            onClick={() => setIsAccountOpen(!isAccountOpen)}
          >
            <i className="fas fa-user-circle mr-3"></i>
            <span>Account</span>
            <i
              className={`fas fa-chevron-${
                isAccountOpen ? "down" : "right"
              } ml-auto`}
            ></i>
          </li>

          {isAccountOpen && (
            <ul className="bg-blue-800">
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-money-bill-wave mr-3"></i>
                <span>Fees Group</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-dollar-sign mr-3"></i>
                <span>Student Fees</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-file-invoice-dollar mr-3"></i>
                <span>Expenses</span>
              </li>
              <li className="flex items-center p-3 pl-12 hover:bg-blue-700 cursor-pointer">
                <i className="fas fa-plus-circle mr-3"></i>
                <span>Add Expenses</span>
              </li>
            </ul>
          )}
        </div>

        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-book mr-3"></i>
          <span>Subject</span>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-cog mr-3"></i>
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
