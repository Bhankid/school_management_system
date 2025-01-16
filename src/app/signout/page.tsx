"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

function SignOut() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/Dashboard" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-6xl">
        <div className="flex w-full max-w-4xl bg-white shadow-lg mx-auto overflow-hidden">
          {/* Left Section (Gradient Background with Image) */}
          <div
            className="w-[50%] relative bg-gradient-to-br from-red-600 to-red-500"
            style={{
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/Vector 4.png"
                alt="School hallway with lockers"
                fill
                className="object-cover opacity-50"
                priority
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
              <Image
                src="/logo.png"
                alt="School logo"
                width={80}
                height={80}
                className="mb-2"
              />
              <h1 className="text-3xl font-bold">SIGN OUT</h1>
            </div>
          </div>

          {/* Right Section (Sign Out Form) */}
          <div
            className="w-[55%] bg-blue-900 flex items-center justify-center p-6"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Are you sure you want to sign out?
              </h2>
              <button
                className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                onClick={handleSignOut}
              >
                SIGN OUT
              </button>
              <p className="text-sm text-gray-600 mt-3">
                If you&apos;re sure, click the sign out button above. Otherwise, you
                can{" "}
                <Link href="/Dashboard" className="text-blue-500 hover :underline">
                  go back
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOut;