"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router =useRouter();
  const handleLogin =async (e) => {
    e.preventDefault();
    try {
      
      const res= await signIn("credentials",{
        email,password,redirect:false
      })
      if(res.error){
        setError("Invalid credentials");
        return;

      }
      
       setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      console.log(error)
      
    }
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-no-repeat bg-cover   mt-[65px]"  style={{ backgroundImage: "url('/New_folder/bg2.jpg')" }}>
      <div className="bg-white/70 backdrop-blur-lg border-2 shadow-xl rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h1 className="text-3xl font-bold text-center text-[#1e263b] mb-6">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 justify-center items-center"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 text-bold rounded-lg px-4 py-2 w-full "
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full "
            type="password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-[#1e263b] to-[#3a3954] hover:bg-gradient-to-l py-2 rounded-lg transition-all duration-300"
          >
            Login
          </button>

          {error && (
            <p className="text-center bg-red-500 text-white py-2 rounded-lg text-sm w-full">
              {error}
            </p>
          )}

          <div className="flex justify-center text-[18px] border-dotted hover:shadow-2xl bg-white w-full rounded-sm mt-2">
           
            <Link
              className="text-[#1e263b] hover:shadow-2xl"
              href={"/register"}
            >
              Create Account
            </Link>
          </div>
        </form>

        <div className="flex flex-col gap-2 justify-center items-center mt-5">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="flex items-center justify-center w-full bg-white border border-gray-300 hover:shadow-md text-gray-700 rounded-lg py-2 transition-all duration-300"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
