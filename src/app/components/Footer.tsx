import React from "react";
import Link from "next/link";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 text-center shadow-md w-full flex justify-between">
      <p className="text-gray-600">
        &copy; Copyrights <Link href="https://alfred-portfolio-site.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">EduAdminPro</Link> {currentYear}. All rights reserved.
      </p>
      <p className="text-gray-600 text-sm">
        v1.1.0-alpha.1
      </p>
    </footer>
  );
};

export default Footer;