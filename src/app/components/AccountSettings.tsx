"use client";

import Image from "next/image";
import { useState } from "react";

function AccountSettings() {
  const [formData, setFormData] = useState({
    schoolName: "Firm Foundation School - Accra",
    email: "arabqgrant@gmail.com",
    mobile: "0264622310",
    city: "Accra",
    address: "Greater-Accra",
    username: "Prince Afful Quansah",
    password: "*********",
    language: "English",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <h1 className="text-xl font-bold text-black">Settings</h1>
          <nav className="text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Home
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-red-500">Settings</span>
          </nav>
        </div>

        <div className="relative">
          <Image
            src="/settings_bg.png"
            alt="Waterfall background"
            width={800}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 text-white text-lg font-bold">
            Account Setting
          </div>
          <div className="absolute -bottom-12 left-4">
            <Image
              src="/profile-picture.png"
              alt="Profile picture"
              width={96}
              height={96}
              className="rounded-full border-4 border-white"
            />
          </div>
        </div>

        <div className="p-6 pt-16">
          <h2 className="text-xl font-semibold text-black">
            Prince Afful Quansah - Admin
          </h2>
          <form className="mt-6 space-y-4 text-gray-800">
            <div>
              <label className="block text-sm font-medium">School Name *</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile No</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <i className="fas fa-pen absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <i className="fas fa-pen absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
            </div>

            <div>
              <label className="block text-sm font-medium">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
