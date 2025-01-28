"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getUserDetails } from "../actions/auth";
import { createAccount, updateAccount } from "../actions/Account";

function AccountSettings() {
  const [formData, setFormData] = useState({
    schoolName: "Firm Foundation School - Accra",
    email: "",
    mobile: "0264622310",
    city: "Accra",
    address: "Greater-Accra",
    username: "Bhankid the Admin",
    password: "",
    language: "English",
  });

  const [profileImage, setProfileImage] = useState("/profile-picture.png");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleUsernameEditable = () => {
    setIsUsernameEditable((prevState) => !prevState);
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    const data = {
      schoolName: formData.schoolName,
      email: formData.email,
      mobile: formData.mobile,
      city: formData.city,
      address: formData.address,
      username: formData.username,
      password: formData.password,
      language: formData.language,
      profileImage: profileImage,
    };
    if (userId) {
      await updateAccount(userId, data);
    } else {
      const account = await createAccount(data);
      setUserId(account.id);
    }
    console.log("Account saved successfully");
  } catch (error) {
    console.error("Error saving account:", error);
  }
};

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const userDetails: {
          id: number;
          name: string;
          email: string;
          password: string;
        } = await getUserDetails({ token });
        setFormData({
          ...formData,
          email: userDetails.email,
          password: userDetails.password,
        });
        setUserId(userDetails.id);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, [formData]);

  return (
    <div className="p-4 relative">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 p-4">
          <h1 className="text-xl font-bold text-black pb-4">Settings</h1>
          <nav className="text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Home
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-red-500">Settings</span>
          </nav>
        </div>

        {/* Profile Image Section */}
        <div className="relative">
          <Image
            src="/settings_bg.png"
            alt="Waterfall background"
            width={800}
            height={200}
            className="w-full h-48 object-cover"
            priority
          />
          <div className="absolute top-4 left-4 text-white text-lg font-bold">
            Account Setting
          </div>
          <div className="absolute -bottom-12 left-4 cursor-pointer group">
            <Image
              src={profileImage}
              alt="Profile picture"
              width={96}
              height={96}
              className="rounded-full border-4 border-white"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <i className="fas fa-camera text-white text-xl"></i>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 pt-16">
          <h2 className=" text-xl font-semibold text-black">
            {formData.username}
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-gray-800">
            {/* School Name */}
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

            {/* Email */}
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

            {/* Mobile */}
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

            {/* City */}
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

            {/* Address */}
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

            {/* Username */}
            <div className="relative">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                readOnly={!isUsernameEditable}
              />
              <i
                className="fas fa-pen absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={toggleUsernameEditable}
              ></i>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <i
                className={`fas ${
                  isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                } absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            {/* Language */}
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

            {/* Submit Button */}
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