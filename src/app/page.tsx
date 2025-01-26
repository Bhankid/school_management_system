"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signInAction } from "../app/actions/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Call the signInAction function to validate credentials
      const user = await signInAction({ email, password });

      if (user) {
        // Redirect to the dashboard after successful login
        window.location.href = "/Dashboard";
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-6xl">
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

          {/* Right Section (Login Form) */}
          <div
            className="w-[55%] bg-blue-900 flex items-center justify-center p-8"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-3 mb-4 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-3 mb-4 border border-gray-300 rounded"
                />
                <Link
                  href="/forgot-password" 
                  className="text-blue-500 text-sm mb-4 block hover:underline"
                >
                  Forgot your password?
                </Link>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "SIGN IN"}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                {error && (
                  <div className="text-red-600 text-sm mt-4">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;