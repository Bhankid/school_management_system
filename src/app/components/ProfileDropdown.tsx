"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { ActiveTab } from "../Dashboard/page";
import { getAccount } from "../actions/Account";
import { getUserDetails } from "../actions/auth";

interface ProfileDropdownProps {
  isOpen: boolean;
  setActiveTab?: (tab: ActiveTab) => void; // Optional to handle cases where it's not passed
}

interface AccountData {
  id?: number;
  schoolName: string;
  email: string;
  mobile: string;
  city: string;
  address: string;
  username: string;
  password: string;
  language: string;
  profileImage: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ isOpen, setActiveTab }) => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const userDetails = await getUserDetails({ token });
        setUserId(userDetails.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchAccount = async () => {
        try {
          const data = await getAccount(userId);
          setAccount(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAccount();
    }
  }, [userId]);

  const handleAccountSettingsClick = () => {
    if (setActiveTab) {
      setActiveTab("settings"); // Update the active tab to "settings"
      console.log("Account Settings clicked");
    }
  };

  return (
    <div
      className={`
        absolute right-0 md:right-0 top-full mt-4 w-[90vw] md:w-72 
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
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            {account ? (
              <Image
                src={account.profileImage}
                alt="User  profile picture"
                width={40} // Fixed width
                height={40} // Fixed height
                className="rounded-full object-cover"
              />
            ) : (
              <Image
                src="/profile-picture.png"
                alt="User  profile picture"
                width={40} // Fixed width
                height={40} // Fixed height
                className="rounded-full object-cover"
              />
            )}
          </div>
          <div>
            {account ? (
              <>
                <h4 className="text-sm font-semibold text-gray-800">{account.username}</h4>
                <p className="text-xs text-gray-500">{account.email}</p>
              </>
            ) : (
              <>
                <h4 className="text-sm font-semibold text-gray-800">Loading...</h4>
                <p className="text-xs text-gray-500">Loading...</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="py-2">
        <div
          onClick={() => {
            handleAccountSettingsClick();
          }} // Add onClick handler
          className="flex items-center px-4 py-3 md:py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        >
          <i className="fas fa-user-circle w-5 text-gray-400"></i>
          <span className="ml-3">My Profile</span>
        </div>
        <div
          onClick={handleAccountSettingsClick} // Add onClick handler
          className="flex items-center px-4 py-3 md:py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        >
          <i className="fas fa-cog w-5 text-gray-400"></i>
          <span className="ml-3">Account Settings</span>
        </div>
        <div
          onClick={() => {
            handleAccountSettingsClick();
          }} // Add onClick handler
          className="flex items-center px-4 py-3 md:py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        >
          <i className="fas fa-user-shield w-5 text-gray-400"></i>
          <span className="ml-3">Privacy Settings</span>
        </div>
      </div>

      <div className="border-t border-gray-100"></div>

      <div className="py-2">
        <Link href="/signout" className="flex items-center px-4 py-3 md:py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
          <i className="fas fa-sign-out-alt w-5"></i>
          <span className="ml-3">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown;