import React from "react";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 text-center shadow-md w-full">
      <p className="text-gray-600">
        © Copyrights FredComTech {currentYear}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
