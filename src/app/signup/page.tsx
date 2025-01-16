"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
      });

      if (result?.ok) {
        setSuccess("User   created successfully");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else if (result) {
        setError(result.error);
      } else {
        setError("Failed to create user");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
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
              <h1 className="text-3xl font-bold">WELCOME</h1>
            </div>
          </div>

          {/* Right Section (Sign Up Form) */}
          <div
            className="w-[55%] bg-blue-900 flex items-center justify-center p-6"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Create Account
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Password"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                {error && (
                  <div className="mb-3 text-red-600 text-sm">{error}</div>
                )}
                {success && (
                  <div className="mb-3 text-green-600 text-sm">{success}</div>
                )}
                <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">
                  SIGN UP
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Already have an account?{" "}
                  <Link href="/" className="text-blue-500 hover :underline">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;