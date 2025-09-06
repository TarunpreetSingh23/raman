"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const router = useRouter();
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset error/success when mode changes
  useEffect(() => {
    setError("");
    setSuccess("");
    setUsername("");
    setEmail("");
    setPassword("");
  }, [mode]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!username || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (password.length <= 4) {
      setError("Password must contain at least 5 characters");
      setLoading(false);
      return;
    }

    try {
      const Existuser = await fetch("/api/userexist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await Existuser.json();

      if (user) {
        setError("User already exists");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        setSuccess("User registered successfully!");
        await signIn("credentials", { redirect: false, email, password });
        setTimeout(() => router.push("/"), 1000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to register user");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              <span className="text-[#5d7afc]">Trusted.Quick</span>
            </h1>
            <p className="text-gray-700 max-w-lg">
              Join Swiftly — Enjoy Quick home service without any effort...
            </p>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setMode("signup")}
                className={`px-6 py-3 rounded-xl font-semibold transition shadow-md ${
                  mode === "signup"
                    ? "bg-[#5d7afc] text-white scale-105"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Create Account
              </button>

              <button
                onClick={() => setMode("login")}
                className={`px-6 py-3 rounded-xl font-semibold transition shadow-md ${
                  mode === "login"
                    ? "bg-[#5d7afc] text-white scale-105"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative">
            <motion.div className="relative bg-gray-200/40 backdrop-blur-md border border-gray-300 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="relative overflow-hidden h-[420px] md:h-[480px]">
                  <AnimatePresence mode="wait">
                    {mode === "signup" ? (
                      <motion.form
                        key="signup"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-50%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        onSubmit={handleSignUp}
                        className="absolute inset-0 flex flex-col gap-4"
                      >
                        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                        <p className="text-sm text-gray-700">
                          Join the adventure — save progress and get rewards.
                        </p>

                        <label className="block">
                          <span className="text-xs text-gray-700">Username</span>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs text-gray-700">Email</span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs text-gray-700">Password</span>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </label>

                        {error && (
                          <div className="p-2 rounded-md bg-red-100 text-red-700 text-sm">{error}</div>
                        )}
                        {success && (
                          <div className="p-2 rounded-md bg-green-100 text-green-700 text-sm">{success}</div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="py-3 rounded-lg bg-[#5d7afc] text-white font-semibold"
                        >
                          {loading ? "Creating..." : "Create Account"}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="login"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "50%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        onSubmit={handleLogin}
                        className="absolute inset-0 flex flex-col gap-4"
                      >
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>

                        <label className="block">
                          <span className="text-xs text-gray-700">Email</span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs text-gray-700">Password</span>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100"
                          />
                        </label>

                        {error && (
                          <div className="p-2 rounded-md bg-red-100 text-red-700 text-sm">{error}</div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="py-3 rounded-lg bg-[#5d7afc] text-white font-semibold"
                        >
                          {loading ? "Signing in..." : "Sign In"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
