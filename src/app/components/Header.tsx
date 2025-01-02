"use client";

import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-end p-4 bg-white shadow">
      <div className="flex items-center border rounded-full px-3 py-1">
        <i className="fas fa-search text-gray-400"></i>
        <input type="text" placeholder="Search" className="ml-2 outline-none" />
      </div>
      <div className="flex items-center ml-4 space-x-4">
        <i className="fas fa-envelope text-red-500"></i>
        <i className="fas fa-bell text-red-500"></i>
        <div className="border-l-2 border-red-500 h-8 mx-4"></div>

        <div className="flex items-center">
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
  );
}

export default Header;
