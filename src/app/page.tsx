"use client"

import Image from "next/image";

function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-6xl">
        <div className="flex w-full max-w-4xl bg-white shadow-lg mx-auto overflow-hidden">
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
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
              <Image
                src="/logo.png"
                alt="School logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <h1 className="text-4xl font-bold">WELCOME</h1>
            </div>
          </div>
          <div
            className="w-[55%] bg-blue-900 flex items-center justify-center p-8"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
              <input
                type="text"
                placeholder="Prince Afful Quansah"
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <a href="#" className="text-blue-500 text-sm mb-4 block">
                Forgot your password?
              </a>
              <button className="w-full bg-red-600 text-white p-3 rounded">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
