"use client";

import { FC } from "react";

interface MessageDropdownProps {
  isOpen: boolean;
}

const MessageDropdown: FC<MessageDropdownProps> = ({ isOpen }) => {
  return (
    <div
      className={`
        absolute right-0 md:right-0 top-full mt-6 w-[90vw] md:w-72
        left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0
        bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50
        transform origin-top transition-all duration-500 ease-bounce
        ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-90 pointer-events-none"
        }
      `}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="fas fa-envelope text-red-500 text-xl"></i>
            <h4 className="text-sm font-semibold text-gray-800">Messages</h4>
          </div>
          <span className="text-xs text-gray-500">Inbox</span>
        </div>
      </div>

      <div className="py-6 px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <i className="fas fa-inbox text-gray-400 text-2xl mb-2"></i>
          <p className="text-sm text-gray-600">Your inbox is empty</p>
        </div>
      </div>
    </div>
  );
};

export default MessageDropdown;
